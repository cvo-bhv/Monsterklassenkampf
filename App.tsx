import React, { useState, useEffect } from 'react';
import { GameState, GamePhase, Team, MonsterStage, QuestionCategory, Question, MonsterType } from './types';
import { TEAM_CONFIGS, WINNING_STAGE } from './constants';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import VictoryScreen from './components/VictoryScreen';
import { Maximize, Minimize } from 'lucide-react';
import { resetQuestionHistory } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: GamePhase.SETUP,
    teams: [],
    currentTeamIndex: 0,
    currentQuestion: null,
    isGeneratingQuestion: false,
    message: null,
    selectedCategory: 'ALL',
    customQuestions: []
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleStartGame = (names: string[], types: MonsterType[], category: QuestionCategory, customQuestions: Question[]) => {
    // Reset question history to ensure true shuffling every game
    resetQuestionHistory();

    const teams: Team[] = names.map((name, index) => ({
      id: `team-${index}`,
      name: name || `Team ${index + 1}`,
      type: types[index] || TEAM_CONFIGS[index % TEAM_CONFIGS.length].type,
      score: 0,
      stage: MonsterStage.EGG,
      exp: 0,
      streak: 0,
      totalCorrect: 0,
      badges: [],
    }));

    setGameState(prev => ({
      ...prev,
      phase: GamePhase.PLAYING,
      teams,
      currentTeamIndex: 0,
      selectedCategory: category,
      customQuestions: customQuestions
    }));
  };

  const handleBackToMenu = () => {
    // We keep customQuestions but reset game progress
    setGameState(prev => ({
      ...prev,
      phase: GamePhase.SETUP,
      teams: [],
      currentTeamIndex: 0,
      currentQuestion: null,
      isGeneratingQuestion: false,
      message: null,
      // selectedCategory: 'ALL', // Optional: Keep selected category? Better reset.
    }));
  };

  const handleRestart = () => {
    // Reset question history to ensure true shuffling every game
    resetQuestionHistory();

    setGameState(prev => ({
      ...prev,
      phase: GamePhase.SETUP,
      teams: [],
      currentTeamIndex: 0,
      currentQuestion: null,
      isGeneratingQuestion: false,
      message: null,
      selectedCategory: 'ALL'
    }));
  };

  // Check for victory condition every render when playing
  useEffect(() => {
    if (gameState.phase === GamePhase.PLAYING) {
      const winner = gameState.teams.find(t => t.stage === WINNING_STAGE);
      if (winner) {
        setGameState(prev => ({ ...prev, phase: GamePhase.VICTORY }));
      }
    }
  }, [gameState.teams, gameState.phase]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Global Fullscreen Button */}
      <button 
        onClick={toggleFullscreen}
        className="fixed top-2 left-2 md:top-4 md:left-4 z-[100] p-2 bg-slate-800/80 hover:bg-blue-600/80 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors shadow-lg backdrop-blur"
        title={isFullscreen ? "Vollbild beenden" : "Vollbildmodus"}
      >
        {isFullscreen ? <Minimize className="w-5 h-5 md:w-6 md:h-6" /> : <Maximize className="w-5 h-5 md:w-6 md:h-6" />}
      </button>

      {gameState.phase === GamePhase.SETUP && (
        <SetupScreen onStart={handleStartGame} />
      )}
      {gameState.phase === GamePhase.PLAYING && (
        <GameScreen 
          gameState={gameState} 
          setGameState={setGameState} 
          onExit={handleBackToMenu}
        />
      )}
      {gameState.phase === GamePhase.VICTORY && (
        <VictoryScreen gameState={gameState} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;