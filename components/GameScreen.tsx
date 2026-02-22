import React, { useState, useEffect } from 'react';
import { GameState, MonsterStage, Team, Question } from '../types';
import { TEAM_CONFIGS, EXP_TO_LEVEL, WINNING_STAGE, BADGES } from '../constants';
import MonsterDisplay from './MonsterDisplay';
import { generateQuestion } from '../services/geminiService';
import { SoundService } from '../services/soundService';
import { ArrowRight, Loader2, Star, Frown, Users, LogOut, Home, AlertCircle } from 'lucide-react';
import MathText from './MathText';

interface GameScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onExit: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, setGameState, onExit }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [newBadge, setNewBadge] = useState<{ name: string, icon: string } | null>(null);

  const currentTeam = gameState.teams[gameState.currentTeamIndex];
  const teamConfig = TEAM_CONFIGS[gameState.currentTeamIndex % TEAM_CONFIGS.length];

  // Effect to load question if none exists
  useEffect(() => {
    if (!gameState.currentQuestion && !gameState.isGeneratingQuestion) {
      loadQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.currentTeamIndex, gameState.currentQuestion]);

  const loadQuestion = async () => {
    setGameState(prev => ({ ...prev, isGeneratingQuestion: true }));
    // Determine difficulty based on stage
    const difficulty = currentTeam.stage >= MonsterStage.TEEN ? 'medium' : 'easy';
    
    // Pass the selected category AND custom questions to the generator
    const question = await generateQuestion(difficulty, gameState.selectedCategory, gameState.customQuestions);
    
    setGameState(prev => ({ ...prev, isGeneratingQuestion: false, currentQuestion: question }));
  };

  const handleAnswer = async (index: number) => {
    if (isAnswering || !gameState.currentQuestion) return;
    
    SoundService.playClick();
    setSelectedOption(index);
    setIsAnswering(true);

    const isCorrect = index === gameState.currentQuestion.correctIndex;

    // Simulate small delay for suspense
    await new Promise(r => setTimeout(r, 800));

    setFeedback(isCorrect ? 'correct' : 'incorrect');

    // Update stats
    setGameState(prev => {
      const newTeams = [...prev.teams];
      const team = { ...newTeams[prev.currentTeamIndex] };
      let leveledUp = false;
      
      if (isCorrect) {
        team.streak += 1;
        team.totalCorrect += 1;
        team.score += 55; // Adjusted per request
        
        // Grow Logic
        team.exp += 50; // 2 correct answers to level up roughly
        if (team.exp >= EXP_TO_LEVEL) {
          if (team.stage < MonsterStage.TITAN) {
             team.stage += 1;
             team.exp = 0; // Reset exp for next level
             leveledUp = true;
          }
        }

        // Badge Logic
        const newlyUnlocked: string[] = [];
        
        if (team.streak === 3 && !team.badges.includes('streak_3')) newlyUnlocked.push('streak_3');
        if (team.streak === 5 && !team.badges.includes('streak_5')) newlyUnlocked.push('streak_5');
        if (team.score >= 500 && !team.badges.includes('score_500')) newlyUnlocked.push('score_500');
        if (team.stage === MonsterStage.HATCHLING && !team.badges.includes('stage_hatchling')) newlyUnlocked.push('stage_hatchling');
        if (team.stage === MonsterStage.ADULT && !team.badges.includes('stage_adult')) newlyUnlocked.push('stage_adult');
        
        if (newlyUnlocked.length > 0) {
          team.badges = [...team.badges, ...newlyUnlocked];
          const badge = BADGES.find(b => b.id === newlyUnlocked[0]);
          if (badge) {
            setNewBadge({ name: badge.name, icon: badge.icon });
            setTimeout(() => setNewBadge(null), 3000);
          }
        }
        
        // Play appropriate sound
        if (leveledUp) {
          SoundService.playLevelUp();
        } else {
          SoundService.playCorrect();
        }

      } else {
        SoundService.playIncorrect();
        team.streak = 0;
        // Shrink Logic: Lose EXP, if 0, de-level
        team.exp = Math.max(0, team.exp - 30);
        if (team.exp === 0 && team.stage > MonsterStage.EGG) {
           // Small chance to de-level if they really mess up, or just keep at 0 exp of current stage
           if (team.stage > MonsterStage.HATCHLING) {
              team.stage -= 1;
              team.exp = EXP_TO_LEVEL - 20; // Set them close to leveling up again
           }
        }
      }
      
      newTeams[prev.currentTeamIndex] = team;
      return { ...prev, teams: newTeams };
    });
  };

  const nextTurn = () => {
    SoundService.playClick();
    // Check if anyone won
    const winner = gameState.teams.find(t => t.stage === WINNING_STAGE);
    if (winner) {
      console.log("Check for winner next render");
    }

    setFeedback(null);
    setSelectedOption(null);
    setIsAnswering(false);
    setGameState(prev => ({
      ...prev,
      currentQuestion: null,
      currentTeamIndex: (prev.currentTeamIndex + 1) % prev.teams.length
    }));
  };

  const handleExitClick = () => {
    SoundService.playClick();
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    SoundService.playClick();
    onExit();
  };

  // Determine monster reaction
  let monsterReaction: 'idle' | 'happy' | 'sad' = 'idle';
  if (feedback === 'correct') monsterReaction = 'happy';
  if (feedback === 'incorrect') monsterReaction = 'sad';

  return (
    // Use h-[100dvh] for dynamic viewport height on mobile/tablets
    <div className="flex flex-col h-[100dvh] bg-slate-900 overflow-hidden font-sans text-white relative">
      
      {/* Exit Button */}
      <button 
        onClick={handleExitClick}
        className="absolute top-2 right-2 md:top-4 md:right-4 z-[50] p-2 bg-slate-800/80 hover:bg-red-500/80 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors shadow-lg backdrop-blur"
        title="Zum Hauptmenü"
      >
          <Home className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="glass-panel p-6 md:p-8 rounded-2xl max-w-sm w-full text-center bg-slate-900 border border-slate-700 shadow-2xl transform scale-100">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-900/50 flex items-center justify-center mb-4 text-red-500">
                  <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Spiel beenden?</h3>
              <p className="text-slate-400 mb-6 text-sm">Der aktuelle Spielstand geht dabei verloren.</p>
              <div className="flex gap-3">
                 <button 
                   onClick={() => setShowExitConfirm(false)}
                   className="flex-1 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
                 >
                   Abbrechen
                 </button>
                 <button 
                   onClick={confirmExit}
                   className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-900/20"
                 >
                   Beenden
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Badge Notification */}
      {newBadge && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top duration-500">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-1 rounded-2xl shadow-2xl shadow-yellow-500/20">
            <div className="bg-slate-900 px-6 py-3 rounded-[calc(1rem-1px)] flex items-center gap-4">
              <span className="text-3xl">{newBadge.icon}</span>
              <div>
                <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest leading-none mb-1">Abzeichen erhalten!</p>
                <p className="text-lg font-black text-white leading-none">{newBadge.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Header Bar (Compact) */}
      <header className="h-14 md:h-16 shrink-0 bg-slate-800/80 backdrop-blur border-b border-slate-700 flex items-center px-4 gap-4 overflow-x-auto z-20 no-scrollbar pr-14">
        <div className="flex items-center gap-2 mr-2 text-slate-400 font-bold uppercase tracking-wider hidden lg:flex text-sm">
          <Users className="w-4 h-4" /> Teams
        </div>
        <div className="flex gap-2 flex-1">
          {gameState.teams.map((team, idx) => {
             const isCurrent = idx === gameState.currentTeamIndex;
             const config = TEAM_CONFIGS[idx % TEAM_CONFIGS.length];
             return (
               <div 
                 key={team.id}
                 className={`
                   relative flex items-center gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-lg transition-all duration-300 min-w-[90px] md:min-w-[120px]
                   ${isCurrent ? `${config.color} text-white shadow-lg scale-105 border border-white/30` : 'bg-slate-700/50 text-slate-400 border border-transparent'}
                 `}
               >
                 <div className="w-5 h-5 md:w-6 md:h-6">
                    <MonsterDisplay type={team.type} stage={team.stage} />
                 </div>
                 <div className="flex flex-col leading-tight overflow-hidden">
                   <span className="font-bold whitespace-nowrap truncate text-xs md:text-sm">{team.name}</span>
                   <span className="text-[9px] md:text-[10px] opacity-80">{team.score} Pkt</span>
                 </div>
                 <div className="absolute bottom-0 left-0 h-0.5 md:h-1 bg-black/20 w-full rounded-b-lg overflow-hidden">
                    <div className="h-full bg-white/70" style={{ width: `${(team.exp / EXP_TO_LEVEL) * 100}%` }}></div>
                 </div>
               </div>
             );
          })}
        </div>
      </header>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Background Ambient Effect */}
        <div className={`absolute inset-0 opacity-10 transition-colors duration-1000 ${teamConfig.color}`}></div>
        
        {/* Monster Panel - Compact on mobile, Side on Desktop */}
        <div className="
          shrink-0 z-10 
          w-full lg:w-1/3 lg:max-w-md 
          h-auto max-h-[25vh] lg:max-h-none lg:h-full
          flex flex-row lg:flex-col items-center justify-between lg:justify-center 
          p-2 md:p-4 lg:p-8 
          bg-slate-900/30 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-white/10
        ">
           {/* Text Info */}
           <div className="text-left lg:text-center w-1/2 lg:w-full flex flex-col justify-center">
             <h2 className="text-xl md:text-3xl lg:text-5xl font-black tracking-tight mb-1 md:mb-2 drop-shadow-md truncate">{currentTeam.name}</h2>
             <div className="self-start lg:self-center inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/10 text-[10px] md:text-xs font-bold backdrop-blur-md border border-white/10 shadow-sm">
                <span>Stufe {currentTeam.stage + 1}</span>
                <span className="opacity-50">|</span>
                <span>{currentTeam.score} XP</span>
             </div>
             
             {/* XP Bar (Hidden on very small screens in portrait to save space, visible on tablet/desktop) */}
             <div className="hidden md:block w-full mt-4 bg-slate-800/80 p-2 md:p-3 rounded-xl border border-white/5 shadow-inner">
                <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-wider text-slate-400">
                  <span>Wachstum</span>
                  <span>{Math.floor(currentTeam.exp)}%</span>
                </div>
                <div className="h-2 md:h-3 bg-slate-900 rounded-full overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                   <div 
                     className={`h-full transition-all duration-700 ease-out ${teamConfig.color}`}
                     style={{ width: `${(currentTeam.exp / EXP_TO_LEVEL) * 100}%` }}
                   ></div>
                   <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10"></div>
                </div>
             </div>
           </div>

           {/* Monster Visual */}
           <div className="flex-1 h-full flex items-center justify-center w-1/2 lg:w-full pl-2 lg:pl-0 lg:py-4">
              <div className="h-full aspect-square relative max-h-[120px] md:max-h-[200px] lg:max-h-[350px]">
                <MonsterDisplay 
                  type={currentTeam.type} 
                  stage={currentTeam.stage} 
                  reaction={monsterReaction} 
                />
              </div>
           </div>
        </div>

        {/* Question Panel - Takes remaining space */}
        <div className="flex-1 p-2 md:p-4 lg:p-6 flex flex-col relative z-10 overflow-hidden h-full min-h-0">
           
           <div className="glass-panel w-full h-full rounded-xl md:rounded-3xl p-3 md:p-6 lg:p-10 flex flex-col shadow-2xl relative overflow-hidden bg-slate-800/40 border-slate-700/50">
              
              {gameState.isGeneratingQuestion ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-4">
                    <Loader2 className="w-10 h-10 md:w-16 md:h-16 animate-spin text-purple-500" />
                    <p className="text-lg md:text-2xl font-bold animate-pulse text-center px-4">Eine Mathe-Herausforderung erscheint...</p>
                 </div>
              ) : gameState.currentQuestion ? (
                <>
                  {/* Question Area - Shrinks if needed but tries to show full text */}
                  <div className="shrink-0 mb-2 md:mb-6 text-center flex flex-col items-center justify-center py-2">
                     <span className={`inline-block px-2 py-0.5 rounded bg-slate-900/50 text-slate-400 text-[9px] md:text-xs font-bold border border-slate-700 mb-1 md:mb-2 uppercase tracking-widest`}>
                        {gameState.currentQuestion.difficulty === 'easy' ? 'Leicht' : 'Mittel'}
                     </span>
                     
                     {/* Dynamic text size clamping */}
                     <h3 className="text-lg md:text-2xl lg:text-3xl font-bold leading-tight mb-1 md:mb-3 max-w-4xl mx-auto px-2">
                       <MathText text={gameState.currentQuestion.text} />
                     </h3>
                     
                     {/* Math Expression */}
                     {gameState.currentQuestion.expression && (
                       <div className="text-3xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] py-1 md:py-2">
                         <MathText text={gameState.currentQuestion.expression} scale={1.1} />
                       </div>
                     )}
                  </div>

                  {/* Answers Area - Fills remaining space, min-h-0 prevents overflow issues */}
                  <div className="flex-1 min-h-0 grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 pb-1 md:pb-2">
                     {gameState.currentQuestion.options.map((opt, i) => {
                       let stateClass = "bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-200 hover:border-purple-400/50";
                       
                       if (feedback) {
                         if (i === gameState.currentQuestion?.correctIndex) {
                           stateClass = "bg-green-600 border-green-400 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)] scale-[1.02] z-10";
                         } else if (i === selectedOption) {
                           stateClass = "bg-red-500/80 border-red-400 text-white opacity-50 grayscale";
                         } else {
                           stateClass = "opacity-20 bg-slate-900 border-transparent pointer-events-none";
                         }
                       } else if (selectedOption === i) {
                          stateClass = "bg-purple-600 border-purple-400 text-white shadow-[0_0_30px_rgba(147,51,234,0.3)] scale-[1.02]";
                       }

                       return (
                         <button
                           key={i}
                           disabled={isAnswering}
                           onClick={() => handleAnswer(i)}
                           className={`
                             relative rounded-xl md:rounded-2xl border-b-4 md:border-b-8 
                             text-xl md:text-3xl lg:text-5xl font-black transition-all duration-200
                             flex items-center justify-center p-2 md:p-4 shadow-lg h-full
                             active:scale-[0.98] active:border-b-0 active:translate-y-2
                             ${stateClass}
                           `}
                         >
                           <MathText text={opt} scale={1.1} />
                         </button>
                       );
                     })}
                  </div>
                </>
              ) : null}

              {/* Feedback Overlay */}
              {feedback && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 rounded-xl md:rounded-[2rem] p-4 text-center bg-slate-900/95 backdrop-blur-xl">
                   {feedback === 'correct' ? (
                     <>
                       <div className="relative mb-4 md:mb-6">
                         <div className="absolute inset-0 bg-yellow-500 blur-[60px] opacity-30 animate-pulse"></div>
                         <Star className="w-16 h-16 md:w-32 md:h-32 text-yellow-400 fill-yellow-400 animate-[spin_4s_linear_infinite]" />
                       </div>
                       <h3 className="text-4xl md:text-8xl font-black text-white mb-2 md:mb-4 tracking-tighter drop-shadow-2xl">RICHTIG!</h3>
                       <p className="text-lg md:text-3xl text-green-400 mb-6 md:mb-12 font-bold">+XP für {currentTeam.name}!</p>
                     </>
                   ) : (
                     <>
                       <Frown className="w-16 h-16 md:w-32 md:h-32 text-red-500 mb-4 md:mb-6 animate-bounce" />
                       <h3 className="text-4xl md:text-8xl font-black text-white mb-2 md:mb-4 tracking-tighter drop-shadow-2xl">FALSCH</h3>
                       <p className="text-lg md:text-2xl text-red-300 mb-2 md:mb-8 max-w-lg font-bold">
                         Das war knapp!
                       </p>
                       {gameState.currentQuestion?.explanation && (
                         <div className="bg-slate-800/80 p-3 md:p-6 rounded-xl max-w-2xl text-center border border-white/10 mb-6 shadow-xl overflow-y-auto max-h-[20vh]">
                           <p className="text-slate-200 text-sm md:text-xl leading-relaxed">
                             <span className="text-yellow-400 font-black uppercase mr-2 block text-[10px] md:text-sm tracking-widest mb-1">Erklärung</span> 
                             <MathText text={gameState.currentQuestion.explanation} />
                           </p>
                         </div>
                       )}
                     </>
                   )}
                   
                   <button 
                     onClick={nextTurn}
                     className="group relative px-6 py-3 md:px-12 md:py-6 bg-white text-slate-900 rounded-xl md:rounded-2xl text-lg md:text-3xl font-black hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] overflow-hidden"
                   >
                     <span className="relative z-10 flex items-center gap-2 md:gap-4">
                       WEITER <ArrowRight className="w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
                     </span>
                     <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   </button>
                </div>
              )}

           </div>
        </div>

      </div>
    </div>
  );
};

export default GameScreen;