import React from 'react';
import { GameState, MonsterStage } from '../types';
import { BADGES } from '../constants';
import MonsterDisplay from './MonsterDisplay';
import { Trophy, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SoundService } from '../services/soundService';

interface VictoryScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ gameState, onRestart }) => {
  const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];

  // Check for perfect game badge for all teams
  gameState.teams.forEach(team => {
    // If team has at least 5 correct answers and no incorrect ones (streak equals totalCorrect)
    // Actually, streak is reset on incorrect. So if streak === totalCorrect and totalCorrect >= 5
    if (team.totalCorrect >= 5 && team.streak === team.totalCorrect && !team.badges.includes('perfect_game')) {
      team.badges.push('perfect_game');
    }
  });

  React.useEffect(() => {
    SoundService.playVictory(); // Fanfare!

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleRestart = () => {
      SoundService.playClick();
      onRestart();
  }

  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="glass-panel max-w-3xl w-full p-12 rounded-3xl text-center flex flex-col items-center">
        <div className="bg-yellow-500 rounded-full p-6 mb-6 shadow-2xl shadow-yellow-500/50 animate-bounce">
            <Trophy className="w-16 h-16 text-white" />
        </div>
        
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-2">
          {winner.name.toUpperCase()} GEWINNT!
        </h1>
        <p className="text-2xl text-slate-300 mb-12">Ihr Monster ist zum TITAN geworden!</p>

        <div className="w-64 h-64 mb-12">
           <MonsterDisplay type={winner.type} stage={winner.stage} reaction="happy" />
        </div>

        {/* Leaderboard Section */}
        <div className="w-full mb-12">
          <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest mb-6">Rangliste</h2>
          <div className="space-y-3">
            {sortedTeams.map((team, index) => (
              <div key={team.id} className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${index === 0 ? 'bg-yellow-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <p className="font-black text-xl text-white">{team.name}</p>
                    <div className="flex gap-1 mt-1">
                      {team.badges.map(badgeId => {
                        const badge = BADGES.find(b => b.id === badgeId);
                        return badge ? (
                          <span key={badgeId} title={badge.name} className="text-lg cursor-help">{badge.icon}</span>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white">{team.score}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Punkte</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleRestart}
          className="bg-white text-slate-900 px-8 py-4 rounded-xl text-xl font-black hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
        >
          <RefreshCw className="w-6 h-6" /> NOCHMAL SPIELEN
        </button>
      </div>
    </div>
  );
};

export default VictoryScreen;