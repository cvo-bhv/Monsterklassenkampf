export enum GamePhase {
  SETUP,
  PLAYING,
  VICTORY
}

export enum MonsterType {
  FIRE = 'FIRE',
  WATER = 'WATER',
  EARTH = 'EARTH',
  ELECTRIC = 'ELECTRIC',
  PSYCHIC = 'PSYCHIC', // Purple
  ICE = 'ICE',         // Cyan
  TOXIC = 'TOXIC',     // Lime
  VOID = 'VOID',       // Indigo
  WIND = 'WIND',       // Teal
  SOLAR = 'SOLAR',     // Orange
  METAL = 'METAL',     // Slate
  FAIRY = 'FAIRY',      // Pink
  DRAGON = 'DRAGON',    // Crimson
  PHOENIX = 'PHOENIX',  // Gold
  UNICORN = 'UNICORN'   // White
}

export enum MonsterStage {
  EGG = 0,
  HATCHLING = 1,
  TEEN = 2,
  ADULT = 3,
  TITAN = 4
}

export type QuestionCategory = 
  // MATH
  | 'ALL' 
  | 'ADD_SUB'         // Brüche addieren und subtrahieren (Gleiche Nenner)
  | 'ADD_SUB_PRO'     // Plus & Minus PRO (Ungleiche Nenner)
  | 'MULTIPLY'        // Brüche multiplizieren
  | 'EXPAND'          // Brüche erweitern
  | 'SIMPLIFY'        // Brüche kürzen
  | 'EXPAND_SIMPLIFY' // Gemischt: Erweitern und Kürzen
  // GERMAN
  | 'DE_WORTARTEN'    // Nomen, Verben, Adjektive
  | 'DE_PERFEKT'      // Perfekt bilden
  | 'DE_PRAETERITUM'  // Präteritum bilden
  | 'DE_FUTUR'        // Futur bilden
  | 'DE_MIXED'        // Gemischte Zeiten
  | 'DE_DEINE_MUTTER' // Deine Mutter Spezial (Wortarten)
  // COMMON
  | 'CUSTOM';         // Eigene Aufgaben

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface Team {
  id: string;
  name: string;
  type: MonsterType;
  score: number;
  stage: MonsterStage;
  exp: number; // 0 to 100, overflows to next stage
  streak: number;
  totalCorrect: number;
  badges: string[]; // Store badge IDs
}

export interface SavedTeamSet {
  id: string;
  name: string;
  teams: { name: string; type: MonsterType }[];
}

export interface Question {
  id: string;
  text: string; // The textual question
  expression?: string; // Optional math expression e.g. "1/2 + 1/4"
  options: string[];
  correctIndex: number;
  difficulty: 'easy' | 'medium';
  category: QuestionCategory;
  explanation?: string;
}

export interface GameState {
  phase: GamePhase;
  teams: Team[];
  currentTeamIndex: number;
  currentQuestion: Question | null;
  isGeneratingQuestion: boolean;
  message: string | null;
  selectedCategory: QuestionCategory;
  customQuestions: Question[];
}