import { MonsterType } from './types';

export const MAX_TEAMS = 12;
export const EXP_TO_LEVEL = 100;
export const WINNING_STAGE = 4; // Titan

export const TEAM_CONFIGS = [
  { type: MonsterType.FIRE, color: 'bg-red-500', shadow: 'shadow-red-500/50', border: 'border-red-400', text: 'text-red-100' },
  { type: MonsterType.WATER, color: 'bg-blue-500', shadow: 'shadow-blue-500/50', border: 'border-blue-400', text: 'text-blue-100' },
  { type: MonsterType.EARTH, color: 'bg-green-500', shadow: 'shadow-green-500/50', border: 'border-green-400', text: 'text-green-100' },
  { type: MonsterType.ELECTRIC, color: 'bg-yellow-500', shadow: 'shadow-yellow-500/50', border: 'border-yellow-400', text: 'text-yellow-100' },
  { type: MonsterType.PSYCHIC, color: 'bg-purple-500', shadow: 'shadow-purple-500/50', border: 'border-purple-400', text: 'text-purple-100' },
  { type: MonsterType.ICE, color: 'bg-cyan-500', shadow: 'shadow-cyan-500/50', border: 'border-cyan-400', text: 'text-cyan-100' },
  { type: MonsterType.TOXIC, color: 'bg-lime-500', shadow: 'shadow-lime-500/50', border: 'border-lime-400', text: 'text-lime-100' },
  { type: MonsterType.VOID, color: 'bg-indigo-500', shadow: 'shadow-indigo-500/50', border: 'border-indigo-400', text: 'text-indigo-100' },
  { type: MonsterType.WIND, color: 'bg-teal-500', shadow: 'shadow-teal-500/50', border: 'border-teal-400', text: 'text-teal-100' },
  { type: MonsterType.SOLAR, color: 'bg-orange-500', shadow: 'shadow-orange-500/50', border: 'border-orange-400', text: 'text-orange-100' },
  { type: MonsterType.METAL, color: 'bg-slate-500', shadow: 'shadow-slate-500/50', border: 'border-slate-400', text: 'text-slate-100' },
  { type: MonsterType.FAIRY, color: 'bg-pink-500', shadow: 'shadow-pink-500/50', border: 'border-pink-400', text: 'text-pink-100' },
  { type: MonsterType.DRAGON, color: 'bg-rose-700', shadow: 'shadow-rose-700/50', border: 'border-rose-500', text: 'text-rose-100' },
  { type: MonsterType.PHOENIX, color: 'bg-amber-500', shadow: 'shadow-amber-500/50', border: 'border-amber-400', text: 'text-amber-100' },
  { type: MonsterType.UNICORN, color: 'bg-white', shadow: 'shadow-white/50', border: 'border-slate-200', text: 'text-slate-900' },
];

export const TOPICS = [
  "gemischte Zahlen in unechte Brüche umwandeln",
  "Brüche erweitern (gleichwertige Brüche finden)",
  "Brüche mit gleichen Nennern addieren",
  "Brüche mit einfachen ungleichen Nennern addieren (z.B. 2 und 4)",
  "Brüche vereinfachen (kürzen)"
];

export const BADGES = [
  { id: 'streak_3', name: 'Hattrick', icon: '🔥', description: '3 richtige Antworten in Folge', color: 'bg-orange-500' },
  { id: 'streak_5', name: 'Unaufhaltsam', icon: '⚡', description: '5 richtige Antworten in Folge', color: 'bg-yellow-500' },
  { id: 'score_500', name: 'Mathe-Genie', icon: '🧠', description: '500 Punkte erreicht', color: 'bg-purple-500' },
  { id: 'stage_hatchling', name: 'Erster Schritt', icon: '🐣', description: 'Aus dem Ei geschlüpft', color: 'bg-green-500' },
  { id: 'stage_adult', name: 'Erwachsen', icon: '🦁', description: 'Erwachsenen-Stadium erreicht', color: 'bg-blue-500' },
  { id: 'perfect_game', name: 'Perfektionist', icon: '💎', description: 'Keine Fehler gemacht (min. 5 Fragen)', color: 'bg-cyan-500' },
];
