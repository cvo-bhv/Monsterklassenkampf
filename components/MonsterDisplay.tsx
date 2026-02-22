import React from 'react';
import { MonsterStage, MonsterType } from '../types';

interface MonsterDisplayProps {
  type: MonsterType;
  stage: MonsterStage;
  reaction?: 'idle' | 'happy' | 'sad'; // Enhanced from simple boolean
  isAnimating?: boolean; // For backwards compatibility, maps true -> happy
}

const MonsterDisplay: React.FC<MonsterDisplayProps> = ({ type, stage, reaction = 'idle', isAnimating }) => {
  
  // Backwards compatibility for isAnimating
  const currentReaction = isAnimating ? 'happy' : reaction;

  const getColors = () => {
    switch(type) {
      case MonsterType.FIRE: return { main: '#EF4444', accent: '#FECACA', eye: '#FFEDD5' }; // Red
      case MonsterType.WATER: return { main: '#3B82F6', accent: '#BFDBFE', eye: '#EFF6FF' }; // Blue
      case MonsterType.EARTH: return { main: '#10B981', accent: '#A7F3D0', eye: '#ECFDF5' }; // Green
      case MonsterType.ELECTRIC: return { main: '#EAB308', accent: '#FEF08A', eye: '#FFFBEB' }; // Yellow
      case MonsterType.PSYCHIC: return { main: '#A855F7', accent: '#E9D5FF', eye: '#FAF5FF' }; // Purple
      case MonsterType.ICE: return { main: '#06B6D4', accent: '#CFFAFE', eye: '#ECFEFF' }; // Cyan
      case MonsterType.TOXIC: return { main: '#84CC16', accent: '#D9F99D', eye: '#F7FEE7' }; // Lime
      case MonsterType.VOID: return { main: '#6366F1', accent: '#C7D2FE', eye: '#EEF2FF' }; // Indigo
      case MonsterType.WIND: return { main: '#14B8A6', accent: '#99F6E4', eye: '#F0FDFA' }; // Teal
      case MonsterType.SOLAR: return { main: '#F97316', accent: '#FFEDD5', eye: '#FFF7ED' }; // Orange
      case MonsterType.METAL: return { main: '#64748B', accent: '#CBD5E1', eye: '#F1F5F9' }; // Slate
      case MonsterType.FAIRY: return { main: '#EC4899', accent: '#FBCFE8', eye: '#FDF2F8' }; // Pink
      case MonsterType.DRAGON: return { main: '#BE123C', accent: '#FDA4AF', eye: '#FFF1F2' }; // Crimson
      case MonsterType.PHOENIX: return { main: '#D97706', accent: '#FDE68A', eye: '#FFFBEB' }; // Gold
      case MonsterType.UNICORN: return { main: '#F8FAFC', accent: '#E2E8F0', eye: '#0F172A' }; // White
      default: return { main: '#6B7280', accent: '#E5E7EB', eye: '#F9FAFB' };
    }
  };

  const c = getColors();

  // Container animation class based on reaction
  let animationClass = 'animate-float'; // Default idle
  if (currentReaction === 'happy') animationClass = 'animate-happy';
  if (currentReaction === 'sad') animationClass = 'animate-wobble';

  // Render different SVGs based on stage
  const renderMonster = () => {
    switch (stage) {
      case MonsterStage.EGG:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-lg ${animationClass}`}>
            <ellipse cx="50" cy="60" rx="30" ry="38" fill={c.main} stroke="white" strokeWidth="3" />
            <path d="M35 40 Q 50 55 65 40" stroke={c.accent} strokeWidth="3" fill="none" opacity="0.6"/>
            <path d="M40 70 Q 50 80 60 70" stroke={c.accent} strokeWidth="3" fill="none" opacity="0.6"/>
            {/* Cracks - animate them slightly in idle */}
            <g className={currentReaction === 'idle' ? 'animate-crack' : ''}>
               <path d="M50 22 L 45 30 L 55 35 L 50 42" stroke="rgba(0,0,0,0.2)" strokeWidth="2" fill="none" />
            </g>
          </svg>
        );
      case MonsterStage.HATCHLING:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-xl ${animationClass}`}>
            {/* Body */}
            <circle cx="50" cy="60" r="25" fill={c.main} stroke="white" strokeWidth="3" />
            {/* Eyes Group with blink animation */}
            <g className={currentReaction === 'sad' ? '' : 'animate-blink'}>
                <circle cx="42" cy="55" r="6" fill="white" />
                <circle cx="42" cy="55" r="2" fill="black" />
                <circle cx="58" cy="55" r="6" fill="white" />
                <circle cx="58" cy="55" r="2" fill="black" />
            </g>
            {/* Sad Eyes Overlay (if sad) */}
            {currentReaction === 'sad' && (
                <path d="M35 50 L 45 58 M 65 50 L 55 58" stroke="white" strokeWidth="2" />
            )}
            {/* Shell Hat */}
            <path d="M28 50 Q 50 10 72 50 L 65 55 L 60 48 L 50 55 L 40 48 L 35 55 Z" fill="white" stroke="#e5e7eb" strokeWidth="2" />
          </svg>
        );
      case MonsterStage.TEEN:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-2xl ${animationClass}`}>
            {/* Limbs */}
            <path d="M30 70 Q 20 90 40 90" stroke={c.main} strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M70 70 Q 80 90 60 90" stroke={c.main} strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Body */}
            <rect x="30" y="40" width="40" height="40" rx="10" fill={c.main} stroke="white" strokeWidth="3" />
            {/* Face */}
            <g className={currentReaction === 'sad' ? '' : 'animate-blink'}>
                <circle cx="45" cy="55" r="5" fill="white" />
                <circle cx="45" cy="55" r="2" fill="black" />
                <circle cx="65" cy="55" r="3" fill="white" />
                <circle cx="65" cy="55" r="1" fill="black" />
            </g>
            {/* Mouth */}
            {currentReaction === 'happy' ? (
                <path d="M45 68 Q 50 75 55 68" stroke="white" strokeWidth="2" fill="none" />
            ) : currentReaction === 'sad' ? (
                <path d="M45 72 Q 50 65 55 72" stroke="white" strokeWidth="2" fill="none" />
            ) : (
                <path d="M45 68 Q 50 75 55 68" stroke="white" strokeWidth="2" fill="none" />
            )}
            {/* Spikes/Hair */}
            <path d="M35 40 L 35 25 L 45 40 L 55 20 L 65 40 Z" fill={c.accent} />
          </svg>
        );
      case MonsterStage.ADULT:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-2xl ${animationClass}`}>
             {/* Wings/Back */}
             <path d="M20 50 Q 10 20 40 40" fill={c.accent} opacity="0.8" />
             <path d="M80 50 Q 90 20 60 40" fill={c.accent} opacity="0.8" />
             {/* Body */}
            <path d="M30 80 L 25 95 L 40 95 L 35 80" fill={c.main} stroke="white" strokeWidth="2"/>
            <path d="M70 80 L 75 95 L 60 95 L 65 80" fill={c.main} stroke="white" strokeWidth="2"/>
            <path d="M25 40 Q 50 20 75 40 L 80 80 Q 50 90 20 80 Z" fill={c.main} stroke="white" strokeWidth="3" />
            {/* Face */}
            <g className={currentReaction === 'sad' ? '' : 'animate-blink'}>
                {/* Angry Eyes style, but blinking */}
                <path d="M35 45 L 50 55" stroke="white" strokeWidth="3" />
                <path d="M65 45 L 50 55" stroke="white" strokeWidth="3" />
                <circle cx="40" cy="55" r="4" fill="white" />
                <circle cx="40" cy="55" r="1.5" fill="black" />
                <circle cx="60" cy="55" r="4" fill="white" />
                <circle cx="60" cy="55" r="1.5" fill="black" />
            </g>
            {/* Mouth */}
            {currentReaction === 'happy' ? (
                <g>
                    <path d="M40 70 Q 50 80 60 70 Z" fill="black" />
                    <path d="M42 70 L 45 74 L 48 70 Z" fill="white" />
                </g>
            ) : currentReaction === 'sad' ? (
                 <path d="M40 75 Q 50 65 60 75" stroke="black" strokeWidth="3" fill="none" />
            ) : (
                <g>
                    <path d="M40 70 Q 50 75 60 70 Z" fill="black" />
                    <path d="M42 70 L 45 74 L 48 70 Z" fill="white" />
                </g>
            )}
          </svg>
        );
      case MonsterStage.TITAN:
        return (
          <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] ${animationClass}`}>
             {/* Aura */}
             <circle cx="50" cy="50" r="48" fill={c.accent} opacity="0.3" className="animate-pulse-glow" />
             {/* Massive Body */}
             <path d="M20 90 L 10 100 H 40 L 30 90" fill={c.main} />
             <path d="M80 90 L 90 100 H 60 L 70 90" fill={c.main} />
             <path d="M15 40 Q 50 -10 85 40 L 90 85 Q 50 100 10 85 Z" fill={c.main} stroke="white" strokeWidth="4" />
             {/* Crown */}
             <path d="M30 30 L 30 10 L 40 30 L 50 5 L 60 30 L 70 10 L 70 30" fill="#FCD34D" stroke="white" strokeWidth="2" />
             {/* Face */}
             <g className={currentReaction === 'sad' ? '' : 'animate-blink'}>
                <rect x="30" y="45" width="15" height="10" fill="white" />
                <rect x="35" y="48" width="5" height="5" fill="black" />
                <rect x="55" y="45" width="15" height="10" fill="white" />
                <rect x="60" y="48" width="5" height="5" fill="black" />
             </g>
             
             {/* Mouth */}
             {currentReaction === 'happy' ? (
                 <path d="M40 70 Q 50 90 60 70" stroke="white" strokeWidth="4" fill="none" />
             ) : currentReaction === 'sad' ? (
                 <path d="M40 80 Q 50 65 60 80" stroke="white" strokeWidth="4" fill="none" />
             ) : (
                <g>
                    <path d="M40 70 Q 50 85 60 70" stroke="white" strokeWidth="4" fill="none" />
                    <path d="M40 70 L 45 78 L 50 70" fill="white" />
                    <path d="M60 70 L 55 78 L 50 70" fill="white" />
                </g>
             )}
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative transition-all duration-500 transform ${stage === MonsterStage.TITAN ? 'scale-125' : 'scale-100'}`}>
      {renderMonster()}
    </div>
  );
};

export default MonsterDisplay;