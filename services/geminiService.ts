import { Question, QuestionCategory } from '../types';

// Wir simulieren eine Verzögerung von 0, damit es sich "instant" anfühlt.
const DELAY_MS = 50;

const STATIC_QUESTIONS: Omit<Question, 'id'>[] = [
  // ============================================================
  // KATEGORIE: BRÜCHE ADDIEREN & SUBTRAHIEREN (ADD_SUB)
  // 50 Fragen - Gleiche Nenner
  // Max 5x mit Null
  // ============================================================
  { text: "Monster-Snack:", expression: "1/5 + 2/5", options: ["3/5", "2/5", "1/5", "4/5"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Heilungstrank mischen:", expression: "2/7 + 3/7", options: ["5/7", "6/7", "1/7", "4/7"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Schild aufladen:", expression: "1/4 + 2/4", options: ["3/4", "1/2", "1/4", "2/4"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "XP sammeln:", expression: "3/8 + 4/8", options: ["7/8", "1/8", "5/8", "6/8"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Mana regenerieren:", expression: "1/10 + 7/10", options: ["8/10", "6/10", "4/10", "9/10"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Zweikampf:", expression: "2/9 + 4/9", options: ["6/9", "5/9", "7/9", "3/9"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Loot teilen:", expression: "5/12 + 2/12", options: ["7/12", "6/12", "8/12", "4/12"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Schaden erleiden:", expression: "3/4 - 1/4", options: ["2/4", "3/4", "1/4", "4/4"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Gold verlieren:", expression: "5/6 - 4/6", options: ["1/6", "2/6", "3/6", "5/6"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Energieverbrauch:", expression: "7/8 - 3/8", options: ["4/8", "3/8", "5/8", "2/8"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rechne:", expression: "2/3 + 1/3", options: ["3/3", "1/3", "2/3", "4/3"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Addiere:", expression: "4/9 + 1/9", options: ["5/9", "6/9", "3/9", "4/9"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Subtrahiere:", expression: "8/10 - 3/10", options: ["5/10", "4/10", "6/10", "2/10"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Was ergibt:", expression: "1/5 + 3/5", options: ["4/5", "2/5", "5/5", "3/5"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rechne:", expression: "6/7 - 2/7", options: ["4/7", "3/7", "5/7", "1/7"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Monsterhunger:", expression: "9/12 - 4/12", options: ["5/12", "6/12", "3/12", "4/12"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Kraftschub:", expression: "2/11 + 5/11", options: ["7/11", "6/11", "8/11", "9/11"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Ausdauer:", expression: "10/15 - 5/15", options: ["5/15", "6/15", "4/15", "3/15"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Teamwork:", expression: "1/6 + 4/6", options: ["5/6", "4/6", "3/6", "2/6"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Verteidigung:", expression: "4/5 - 2/5", options: ["2/5", "1/5", "3/5", "4/5"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Angriff:", expression: "3/10 + 4/10", options: ["7/10", "6/10", "8/10", "5/10"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Geschwindigkeit:", expression: "1/8 + 6/8", options: ["7/8", "5/8", "6/8", "8/8"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Magie:", expression: "11/20 - 1/20", options: ["10/20", "9/20", "12/20", "8/20"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Items:", expression: "2/15 + 11/15", options: ["13/15", "12/15", "14/15", "10/15"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Bosskampf:", expression: "19/20 - 9/20", options: ["10/20", "11/20", "8/20", "9/20"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rüstung:", expression: "3/7 + 3/7", options: ["6/7", "5/7", "4/7", "2/7"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Drop-Rate:", expression: "1/9 + 7/9", options: ["8/9", "6/9", "5/9", "9/9"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Kritischer Treffer:", expression: "5/8 - 4/8", options: ["1/8", "2/8", "3/8", "5/8"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Ausweichen:", expression: "2/6 + 3/6", options: ["5/6", "4/6", "1/6", "6/6"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Combo:", expression: "1/4 + 2/4", options: ["3/4", "2/4", "1/4", "4/4"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Level Up:", expression: "1/3 + 1/3", options: ["2/3", "1", "1/3", "4/3"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Game Start:", expression: "2/5 + 1/5", options: ["3/5", "1/5", "5/5", "2/5"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Highscore:", expression: "1/2 + 1/2", options: ["1", "3/4", "0", "1/2"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Map:", expression: "3/10 + 3/10", options: ["6/10", "5/10", "4/10", "7/10"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Quest:", expression: "7/12 - 2/12", options: ["5/12", "4/12", "6/12", "3/12"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Skill:", expression: "1/16 + 3/16", options: ["4/16", "3/16", "5/16", "2/16"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Inventory:", expression: "9/10 - 7/10", options: ["2/10", "3/10", "1/10", "4/10"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rechne:", expression: "4/15 + 4/15", options: ["8/15", "7/15", "9/15", "6/15"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rechne:", expression: "6/8 - 1/8", options: ["5/8", "4/8", "7/8", "3/8"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rechne:", expression: "1/20 + 1/20", options: ["2/20", "3/20", "1/20", "4/20"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rechne:", expression: "15/100 + 10/100", options: ["25/100", "15/100", "35/100", "5/100"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rechne:", expression: "2/5 + 2/5", options: ["4/5", "3/5", "5/5", "1/5"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rechne:", expression: "7/9 - 5/9", options: ["2/9", "1/9", "3/9", "4/9"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rechne:", expression: "1/3 + 1/3", options: ["2/3", "3/3", "1/3", "0"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Rechne:", expression: "12/20 - 10/20", options: ["2/20", "3/20", "4/20", "1/20"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  // NULL FRAGEN (5 Stk)
  { text: "Nichts:", expression: "2/3 - 2/3", options: ["0", "1/3", "3/3", "2/3"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Leere Menge:", expression: "1/5 + 0/5", options: ["1/5", "0", "5/5", "2/5"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Alles weg:", expression: "4/4 - 4/4", options: ["0", "1/4", "4/4", "1"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Nichts dazu:", expression: "3/7 + 0", options: ["3/7", "0", "1", "7/7"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },
  { text: "Voll minus Voll:", expression: "10/10 - 10/10", options: ["0", "1", "10", "1/10"], correctIndex: 0, difficulty: "easy", category: "ADD_SUB" },

  // ============================================================
  // KATEGORIE: PLUS & MINUS PRO (ADD_SUB_PRO)
  // 50 Fragen - Ungleiche Nenner
  // Max 5x mit Null
  // ============================================================
  { text: "Achtung! Nenner sind verschieden:", expression: "1/2 + 1/4", options: ["3/4", "2/6", "2/4", "1/6"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Addiere diese Brüche:", expression: "1/3 + 1/6", options: ["3/6", "2/9", "1/2", "2/6"], correctIndex: 2, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Das Monster rechnet schwer:", expression: "1/2 + 1/8", options: ["5/8", "2/10", "6/8", "2/8"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Was kommt hier raus?", expression: "1/4 + 3/8", options: ["5/8", "4/12", "4/8", "6/8"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Addiere:", expression: "1/5 + 1/10", options: ["3/10", "2/15", "2/10", "3/15"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne zusammen:", expression: "1/2 + 3/10", options: ["8/10", "4/12", "4/10", "6/10"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Pizza-Party:", expression: "1/2 + 1/4", options: ["3/4", "2/6", "2/4", "1"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Schaffst du das?", expression: "1/2 + 1/6", options: ["4/6", "2/8", "2/3", "5/6"], correctIndex: 2, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Subtraktion mit ungleichen Nennern:", expression: "1/2 - 1/4", options: ["1/4", "1/2", "3/4", "2/4"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Was bleibt übrig?", expression: "3/4 - 1/8", options: ["5/8", "2/4", "2/8", "4/8"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Profiaufgabe:", expression: "1/3 + 1/4", options: ["7/12", "2/7", "2/12", "1/12"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Addiere:", expression: "1/2 + 1/3", options: ["5/6", "2/5", "1/6", "1"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Berechne:", expression: "2/3 + 1/6", options: ["5/6", "3/9", "3/6", "1/2"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Subtrahiere:", expression: "1/2 - 1/6", options: ["1/3", "0", "1/6", "2/6"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Tankfüllung:", expression: "3/4 - 1/2", options: ["1/4", "2/4", "1/2", "3/8"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/4 + 1/12", options: ["4/12", "2/16", "3/12", "2/12"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "5/6 - 1/3", options: ["1/2", "4/6", "2/6", "3/6"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/2 + 1/10", options: ["6/10", "2/12", "5/10", "7/10"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/3 + 2/9", options: ["5/9", "3/12", "4/9", "3/9"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "3/4 - 1/2", options: ["1/4", "2/4", "1/2", "1/8"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/5 + 3/10", options: ["5/10", "4/15", "4/10", "1/2"], correctIndex: 3, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "2/3 - 1/6", options: ["1/2", "1/3", "3/6", "2/6"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "7/8 - 1/2", options: ["3/8", "6/8", "5/8", "4/8"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/6 + 1/12", options: ["1/4", "2/18", "3/12", "2/12"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/2 - 1/8", options: ["3/8", "1/4", "2/8", "1/6"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "3/5 + 1/10", options: ["7/10", "4/15", "4/10", "6/10"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/4 + 5/12", options: ["2/3", "6/16", "8/12", "6/12"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/2 + 2/6", options: ["5/6", "3/8", "4/6", "3/6"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "5/8 - 1/4", options: ["3/8", "4/8", "2/8", "1/4"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "2/5 + 1/10", options: ["1/2", "3/15", "3/10", "5/10"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/3 + 4/9", options: ["7/9", "5/12", "5/9", "6/9"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/2 + 3/8", options: ["7/8", "4/10", "5/8", "6/8"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "9/10 - 1/2", options: ["2/5", "8/10", "4/10", "3/10"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/4 + 1/2", options: ["3/4", "2/6", "1/6", "2/4"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "2/3 + 2/9", options: ["8/9", "4/12", "5/9", "6/9"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "5/12 - 1/4", options: ["1/6", "4/12", "3/12", "2/12"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "3/10 + 1/5", options: ["1/2", "4/15", "5/10", "2/5"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "7/12 - 1/3", options: ["1/4", "6/12", "3/12", "4/12"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/6 + 2/3", options: ["5/6", "3/9", "4/6", "3/6"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "3/8 + 1/2", options: ["7/8", "4/10", "5/8", "6/8"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/2 - 3/10", options: ["1/5", "2/10", "4/10", "3/10"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/4 + 3/12", options: ["1/2", "4/16", "6/12", "5/12"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "4/5 - 1/10", options: ["7/10", "3/5", "5/10", "6/10"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/3 - 1/6", options: ["1/6", "2/6", "1/9", "1/3"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Rechne:", expression: "1/2 + 1/12", options: ["7/12", "2/14", "6/12", "5/12"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  // NULL FRAGEN (5 Stk)
  { text: "Nullnummer:", expression: "1/2 - 2/4", options: ["0", "1/2", "1/4", "2/4"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Alles weg:", expression: "3/6 - 1/2", options: ["0", "1/6", "1/2", "2/6"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Leer:", expression: "2/8 - 1/4", options: ["0", "1/8", "1/4", "2/8"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Nichts:", expression: "4/12 - 1/3", options: ["0", "1/12", "3/12", "1/3"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },
  { text: "Weggezaubert:", expression: "5/10 - 1/2", options: ["0", "1/10", "5/10", "1/2"], correctIndex: 0, difficulty: "medium", category: "ADD_SUB_PRO" },


  // ============================================================
  // KATEGORIE: BRÜCHE MULTIPLIZIEREN (MULTIPLY)
  // 50 Fragen
  // Max 5x mit Null
  // ============================================================
  { text: "Was ist die Hälfte von einem Halb?", expression: "1/2 * 1/2", options: ["1/4", "2/4", "1", "1/2"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Multipliziere:", expression: "1/3 * 1/2", options: ["1/6", "1/5", "2/6", "2/5"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne aus:", expression: "2/3 * 1/2", options: ["1/3", "3/5", "2/6", "2/5"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Ein Bruch mal eine ganze Zahl:", expression: "2 * 1/5", options: ["2/5", "1/10", "2/10", "1/5"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Verdreifache 1/4:", expression: "3 * 1/4", options: ["3/4", "1/12", "3/12", "4/4"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne:", expression: "3/4 * 1/2", options: ["3/8", "4/6", "3/6", "4/8"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Multipliziere:", expression: "2/5 * 2/3", options: ["4/15", "4/8", "4/5", "2/15"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Was ergibt:", expression: "1/2 * 4", options: ["2", "1/8", "4/8", "4"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Das Monster teilt seinen Schatz:", expression: "1/4 * 4", options: ["1", "1/16", "4/4", "16"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "2/3 * 3/4", options: ["1/2", "5/7", "6/7", "5/12"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Quadriere:", expression: "1/3 * 1/3", options: ["1/9", "1/6", "2/3", "2/9"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Multipliziere:", expression: "3/5 * 2", options: ["6/5", "6/10", "3/10", "5/5"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/2 * 1/3", options: ["1/6", "2/5", "1/5", "2/6"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/4 * 1/2", options: ["1/8", "2/6", "1/6", "2/8"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/5 * 1/5", options: ["1/25", "2/10", "1/10", "2/25"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "2 * 1/3", options: ["2/3", "2/6", "1/6", "3/2"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne:", expression: "5 * 1/10", options: ["1/2", "1/50", "5/50", "5/10"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "3/4 * 3", options: ["9/4", "9/12", "3/12", "6/4"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "2/3 * 2/3", options: ["4/9", "4/6", "2/9", "4/3"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/2 * 2/3", options: ["1/3", "3/5", "1/5", "3/6"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "3/5 * 1/2", options: ["3/10", "4/7", "3/7", "4/10"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/6 * 3", options: ["1/2", "3/18", "3/6", "1/18"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne:", expression: "4/5 * 1/4", options: ["1/5", "5/9", "4/20", "4/9"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/2 * 5/6", options: ["5/12", "6/8", "6/12", "5/8"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "2/7 * 1/2", options: ["1/7", "3/9", "2/14", "3/14"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "3 * 2/9", options: ["2/3", "6/27", "6/9", "5/9"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/8 * 1/2", options: ["1/16", "2/10", "1/10", "2/16"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1 * 4/7", options: ["4/7", "1", "7/4", "5/7"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne:", expression: "2/3 * 3", options: ["2", "6/3", "6/9", "5/3"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "3/4 * 4/3", options: ["1", "12/12", "7/7", "12"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/5 * 5", options: ["1", "5/5", "1/25", "5"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne:", expression: "2/9 * 3", options: ["2/3", "6/9", "6/27", "5/9"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/4 * 1/4", options: ["1/16", "2/8", "1/8", "2/16"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "3/2 * 1/2", options: ["3/4", "4/4", "3/2", "1"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/10 * 10", options: ["1", "10/100", "1/100", "10"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "2/5 * 1/2", options: ["1/5", "2/5", "3/7", "3/10"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/3 * 3/1", options: ["1", "3/3", "3/4", "1/3"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/2 * 6", options: ["3", "6/2", "6/12", "1/12"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne:", expression: "5/8 * 1", options: ["5/8", "1", "6/8", "5"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne:", expression: "3/7 * 2", options: ["6/7", "6/14", "5/7", "5/14"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/6 * 1/2", options: ["1/12", "2/8", "1/8", "2/12"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "2/4 * 2", options: ["1", "4/4", "4/8", "2/8"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "9/10 * 1/3", options: ["3/10", "9/30", "10/13", "1/3"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "1/2 * 1/5", options: ["1/10", "2/7", "1/7", "2/10"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  { text: "Rechne:", expression: "2/5 * 5/2", options: ["1", "10/10", "7/7", "25"], correctIndex: 0, difficulty: "medium", category: "MULTIPLY" },
  // NULL FRAGEN (5 Stk)
  { text: "Mal Nichts:", expression: "5/6 * 0", options: ["0", "5/6", "1", "6/5"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Rechne:", expression: "4/5 * 0/1", options: ["0", "4/5", "5/4", "1"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Verschwunden:", expression: "3/8 * 0", options: ["0", "3/8", "1", "8/3"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Alles weg:", expression: "0/2 * 5", options: ["0", "5", "5/2", "2"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },
  { text: "Null mal Bruch:", expression: "0 * 7/9", options: ["0", "7/9", "9/7", "1"], correctIndex: 0, difficulty: "easy", category: "MULTIPLY" },


  // ============================================================
  // KATEGORIE: BRÜCHE KÜRZEN (SIMPLIFY)
  // 50 Fragen
  // Max 5x mit Null
  // ============================================================
  { text: "Mach den Bruch kleiner (kürzen):", expression: "2/4", options: ["1/2", "1/4", "1/3", "2/2"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Vereinfache diesen Bruch:", expression: "3/9", options: ["1/3", "1/9", "3/3", "1/2"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Wie heißt der Bruch gekürzt?", expression: "4/8", options: ["1/2", "2/8", "1/4", "4/4"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze so weit wie möglich:", expression: "5/10", options: ["1/2", "1/5", "2/5", "5/5"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Mach ihn klein!", expression: "6/12", options: ["1/2", "1/3", "1/6", "2/3"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Vereinfache:", expression: "2/10", options: ["1/5", "1/10", "2/5", "5/10"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Welcher Bruch ist das Gleiche?", expression: "4/12", options: ["1/3", "1/4", "2/12", "1/2"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze diesen Bruch:", expression: "3/12", options: ["1/4", "1/3", "3/4", "1/6"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Vereinfache:", expression: "8/10", options: ["4/5", "2/5", "3/5", "8/5"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Was ist das gekürzt?", expression: "6/8", options: ["3/4", "1/4", "2/3", "1/2"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze vollständig:", expression: "10/20", options: ["1/2", "1/5", "1/10", "2/5"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "3/15", options: ["1/5", "1/3", "3/5", "1/15"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "4/16", options: ["1/4", "1/8", "2/8", "4/4"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "12/16", options: ["3/4", "2/4", "6/8", "1/2"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "15/20", options: ["3/4", "3/5", "5/4", "1/2"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "9/12", options: ["3/4", "2/3", "1/3", "3/3"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "14/21", options: ["2/3", "3/2", "7/3", "2/7"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "2/6", options: ["1/3", "1/2", "2/3", "1/6"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "4/6", options: ["2/3", "1/3", "1/2", "4/3"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "2/8", options: ["1/4", "2/4", "1/2", "1/8"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "6/9", options: ["2/3", "1/3", "3/3", "1/9"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "6/10", options: ["3/5", "2/5", "1/5", "6/5"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "4/10", options: ["2/5", "1/5", "4/5", "1/2"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "5/15", options: ["1/3", "1/5", "5/3", "3/5"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "10/12", options: ["5/6", "1/2", "2/3", "4/6"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "2/12", options: ["1/6", "1/5", "1/4", "2/6"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "8/12", options: ["2/3", "3/4", "1/2", "4/6"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "2/14", options: ["1/7", "1/6", "2/7", "1/5"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "7/14", options: ["1/2", "1/7", "7/2", "2/7"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "2/16", options: ["1/8", "1/6", "2/8", "1/4"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "8/16", options: ["1/2", "1/4", "1/8", "2/4"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "3/18", options: ["1/6", "1/3", "1/9", "3/6"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "9/18", options: ["1/2", "1/3", "1/9", "2/3"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "4/20", options: ["1/5", "1/4", "2/5", "2/10"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "5/20", options: ["1/4", "1/5", "5/4", "2/5"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "5/25", options: ["1/5", "1/4", "5/5", "2/5"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "10/30", options: ["1/3", "1/10", "3/10", "1/5"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "20/40", options: ["1/2", "1/4", "2/4", "1/10"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "6/24", options: ["1/4", "1/6", "2/8", "3/12"], correctIndex: 0, difficulty: "medium", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "11/22", options: ["1/2", "1/11", "2/11", "1/3"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "12/24", options: ["1/2", "1/12", "1/4", "2/4"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "2/2", options: ["1", "2", "0", "1/2"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "3/3", options: ["1", "3", "0", "1/3"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "100/200", options: ["1/2", "1/100", "10/20", "50/100"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "25/50", options: ["1/2", "1/5", "1/4", "1/25"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  // NULL FRAGEN (5 Stk)
  { text: "Vereinfache Null:", expression: "0/5", options: ["0", "1", "5", "1/5"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "0/100", options: ["0", "100", "1", "1/100"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "0/2", options: ["0", "1/2", "2", "1"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "0/10", options: ["0", "10", "1/10", "1"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },
  { text: "Kürze:", expression: "0/99", options: ["0", "99", "1", "9"], correctIndex: 0, difficulty: "easy", category: "SIMPLIFY" },


  // ============================================================
  // KATEGORIE: BRÜCHE ERWEITERN (EXPAND)
  // 50 Fragen
  // Max 5x mit Null
  // ============================================================
  { text: "Erweitere den Bruch mit 2:", expression: "1/2", options: ["2/4", "1/4", "2/2", "3/4"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Erweitere den Bruch mit 3:", expression: "1/3", options: ["3/9", "3/6", "1/9", "3/3"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Erweitere 2/3 mit 2:", expression: "2/3 = ?", options: ["4/6", "2/6", "4/3", "3/4"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Erweitere mit 5:", expression: "1/2", options: ["5/10", "5/5", "2/10", "5/2"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Erweitere mit 4:", expression: "1/4", options: ["4/16", "4/8", "1/16", "4/4"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Bringe den Bruch auf den Nenner 10:", expression: "1/5", options: ["2/10", "5/10", "1/10", "10/10"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Bringe den Bruch auf den Nenner 12:", expression: "2/3", options: ["8/12", "6/12", "4/12", "9/12"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 3:", expression: "3/4", options: ["9/12", "6/8", "12/16", "3/12"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 2:", expression: "4/5", options: ["8/10", "4/10", "8/5", "10/8"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere 1/6 mit 3:", expression: "1/6", options: ["3/18", "1/18", "3/6", "6/18"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Welche Zahl fehlt?", expression: "1/2 = ?/8", options: ["4", "2", "6", "1"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Welche Zahl fehlt?", expression: "3/5 = 6/?", options: ["10", "15", "5", "12"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Mache den Nenner zu 20:", expression: "3/4", options: ["15/20", "12/20", "16/20", "9/20"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 10:", expression: "7/10", options: ["70/100", "7/100", "70/10", "17/20"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere 1/2 mit 5:", expression: "1/2", options: ["5/10", "2/5", "5/5", "1/10"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Erweitere 1/3 mit 4:", expression: "1/3", options: ["4/12", "3/12", "4/4", "1/12"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere 2/5 mit 2:", expression: "2/5", options: ["4/10", "2/10", "4/5", "5/10"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Erweitere 1/4 mit 3:", expression: "1/4", options: ["3/12", "4/12", "3/4", "1/12"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Erweitere 3/5 mit 2:", expression: "3/5", options: ["6/10", "3/10", "6/5", "5/10"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere 1/2 mit 6:", expression: "1/2", options: ["6/12", "6/6", "1/12", "2/12"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere 1/2 mit 4:", expression: "1/2", options: ["4/8", "2/8", "4/4", "1/8"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Nenner zu 100:", expression: "1/10", options: ["10/100", "1/100", "100/100", "5/100"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Nenner zu 6:", expression: "1/3", options: ["2/6", "3/6", "1/6", "4/6"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Nenner zu 8:", expression: "3/4", options: ["6/8", "5/8", "7/8", "4/8"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Nenner zu 9:", expression: "2/3", options: ["6/9", "5/9", "4/9", "8/9"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Nenner zu 10:", expression: "1/2", options: ["5/10", "2/10", "4/10", "6/10"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Nenner zu 14:", expression: "1/7", options: ["2/14", "1/14", "3/14", "7/14"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Nenner zu 15:", expression: "2/5", options: ["6/15", "5/15", "4/15", "8/15"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Nenner zu 16:", expression: "3/8", options: ["6/16", "5/16", "4/16", "8/16"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Nenner zu 18:", expression: "1/9", options: ["2/18", "3/18", "1/18", "9/18"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 10:", expression: "3/10", options: ["30/100", "3/100", "30/10", "13/20"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 5:", expression: "4/5", options: ["20/25", "4/25", "20/5", "9/10"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 2:", expression: "5/6", options: ["10/12", "5/12", "10/6", "7/8"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 3:", expression: "2/7", options: ["6/21", "2/21", "6/7", "5/10"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 4:", expression: "3/5", options: ["12/20", "3/20", "12/5", "7/9"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Welche Zahl fehlt?", expression: "1/3 = ?/9", options: ["3", "1", "2", "4"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Welche Zahl fehlt?", expression: "1/4 = 2/?", options: ["8", "4", "6", "10"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Welche Zahl fehlt?", expression: "2/5 = ?/10", options: ["4", "2", "5", "6"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Welche Zahl fehlt?", expression: "3/4 = 9/?", options: ["12", "8", "16", "10"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Welche Zahl fehlt?", expression: "1/2 = 5/?", options: ["10", "5", "12", "2"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Welche Zahl fehlt?", expression: "5/6 = ?/12", options: ["10", "5", "11", "12"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Welche Zahl fehlt?", expression: "7/10 = 14/?", options: ["20", "10", "15", "100"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 11:", expression: "1/2", options: ["11/22", "1/22", "11/2", "12/13"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 8:", expression: "1/8", options: ["8/64", "1/64", "8/8", "9/16"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  { text: "Erweitere mit 9:", expression: "1/9", options: ["9/81", "1/81", "9/9", "10/18"], correctIndex: 0, difficulty: "medium", category: "EXPAND" },
  // NULL FRAGEN (5 Stk)
  { text: "Erweitere Null:", expression: "0/2 = ?/4", options: ["0", "2", "4", "1"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Null bleibt Null:", expression: "0/5 = ?/10", options: ["0", "10", "5", "2"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Nichts erweitern:", expression: "0/1 = ?/5", options: ["0", "1", "5", "10"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Erweitere:", expression: "0/3 = ?/6", options: ["0", "3", "6", "2"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },
  { text: "Erweitere:", expression: "0/10 = ?/100", options: ["0", "10", "100", "1"], correctIndex: 0, difficulty: "easy", category: "EXPAND" },

  // ============================================================
  // DEUTSCH: WORTARTEN (DE_WORTARTEN)
  // ============================================================
  {
    text: "Welche Wortart ist das unterstrichene Wort?",
    expression: "Der _Skin_ kostet 1200 V-Bucks.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_WORTARTEN",
    explanation: "Skin ist ein Ding/Name, also ein Nomen."
  },
  {
    text: "Bestimme die Wortart:",
    expression: "Micky Maus _lacht_ sehr laut.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_WORTARTEN",
    explanation: "Lachen ist etwas, das man tut. Ein Tunwort (Verb)."
  },
  {
    text: "Was ist das für ein Wort?",
    expression: "Das Trikot von Bayern ist _rot_.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_WORTARTEN",
    explanation: "Rot beschreibt, WIE etwas ist. Ein Wiewort (Adjektiv)."
  },
  {
    text: "Wortart erkennen:",
    expression: "_Der_ Battle-Pass ist neu.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "easy",
    category: "DE_WORTARTEN",
    explanation: "Der, die, das sind Artikel (Begleiter)."
  },
  {
    text: "Unterstrichenes Wort:",
    expression: "Harry Kane _schießt_ ein Tor.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_WORTARTEN",
  },
  {
    text: "Wortart?",
    expression: "Elsa zaubert ein _schönes_ Eisschloss.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "medium",
    category: "DE_WORTARTEN",
    explanation: "Schön beschreibt das Schloss."
  },
  {
    text: "Wortart?",
    expression: "Wir landen bei _Tilted Towers_.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "medium",
    category: "DE_WORTARTEN",
    explanation: "Tilted Towers ist ein Eigenname (Nomen)."
  },
  {
    text: "Wortart?",
    expression: "Ich trinke _eine_ kalte Cola.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "medium",
    category: "DE_WORTARTEN",
    explanation: "Eine ist ein unbestimmter Artikel."
  },
  {
    text: "Welche Wortart?",
    expression: "Der _schnelle_ Sonic rennt weg.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_WORTARTEN",
  },
  {
    text: "Wortart?",
    expression: "Wir _spielen_ Minecraft.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_WORTARTEN",
  },
  // NEUE FRAGEN (60 Stk)
  { text: "Wortart?", expression: "_Die_ Spitzhacke ist aus Diamant.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Ein _Zombie_ kommt auf uns zu.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Das Lama ist _lila_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Wir _bauen_ eine Base.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Das_ Portal leuchtet lila.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der _Creeper_ zischt leise.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Die Rüstung ist _stark_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Steve _craftet_ ein Schwert.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Ein_ Dorfbewohner will Smaragde.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Das _TNT_ explodiert gleich.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der Slime ist _klebrig_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Wir _farmen_ Holz.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Der_ Enderdrache fliegt hoch.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Mein _Inventar_ ist voll.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Die Nacht ist _gefährlich_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Spiderman _klettert_ die Wand hoch.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Die_ Macht ist stark in dir.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Das _Lichtschwert_ summt.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Yoda ist _alt_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Darth Vader _atmet_ schwer.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Ein_ Jedi beschützt die Galaxis.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der _Todesstern_ ist riesig.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Chewbacca ist _haarig_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Luke _kämpft_ gegen seinen Vater.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Das_ Raumschiff startet.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der _Stormtrooper_ trifft nichts.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der Droid ist _klein_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Wir _fliegen_ mit Lichtgeschwindigkeit.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Eine_ Prinzessin braucht Hilfe.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der _Helm_ glänzt.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Messi ist _schnell_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Ronaldo _jubelt_ laut.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Der_ Schiedsrichter pfeift.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Das _Stadion_ ist ausverkauft.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der Ball ist _rund_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Haaland _trifft_ das Tor.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Ein_ Elfmeter ist spannend.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der _Pokal_ ist aus Gold.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Das Spiel war _fair_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Die Fans _singen_ Hymnen.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Das_ Trikot ist schmutzig.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der _Trainer_ schreit.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der Rasen ist _grün_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Wir _gewinnen_ die Meisterschaft.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Die_ Mannschaft feiert.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Peppa Wutz _liebt_ Matschpfützen.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der _Dino_ macht Rooooaar.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Schorsch ist _klein_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Eine_ Fee zaubert.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Paw Patrol _hilft_ sofort.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Der _Turm_ stürzt ein.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Die Feuerwehr ist _rot_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Der_ Polizist regelt den Verkehr.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Skye _fliegt_ den Hubschrauber.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Das _Abzeichen_ blinkt.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Marshall ist _tollpatschig_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "_Ein_ Notruf kommt rein.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 3, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Wir _lösen_ den Fall.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 1, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Die _Zentrale_ ist hoch.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 0, difficulty: "easy", category: "DE_WORTARTEN" },
  { text: "Wortart?", expression: "Alle sind _bereit_.", options: ["Nomen", "Verb", "Adjektiv", "Artikel"], correctIndex: 2, difficulty: "easy", category: "DE_WORTARTEN" },

  // ============================================================
  // DEUTSCH: PERFEKT BILDEN (DE_PERFEKT)
  // ============================================================
  {
    text: "Setze den Satz ins Perfekt (Vergangenheit):",
    expression: "Ich _spiele_ Fortnite.",
    options: ["Ich habe Fortnite gespielt.", "Ich spielte Fortnite.", "Ich werde Fortnite spielen.", "Ich spiele Fortnite."],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_PERFEKT",
    explanation: "Perfekt braucht 'haben' oder 'sein' + Partizip II (gespielt)."
  },
  {
    text: "Bilde das Perfekt:",
    expression: "Mario _rennt_ zum Pilz.",
    options: ["Mario rannte zum Pilz.", "Mario ist zum Pilz gerannt.", "Mario hat zum Pilz gerannt.", "Mario rennt zum Pilz."],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_PERFEKT",
    explanation: "Bei Bewegung nutzt man 'ist' (sein)."
  },
  {
    text: "Wie heißt der Satz im Perfekt?",
    expression: "Ronaldo _schießt_ den Elfmeter.",
    options: ["Ronaldo schoss den Elfmeter.", "Ronaldo hat den Elfmeter geschossen.", "Ronaldo ist den Elfmeter geschossen.", "Ronaldo wird schießen."],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_PERFEKT",
  },
  {
    text: "Perfekt bilden:",
    expression: "Minnie Maus _kauft_ ein Kleid.",
    options: ["Minnie Maus hat ein Kleid gekauft.", "Minnie Maus kaufte ein Kleid.", "Minnie Maus ist ein Kleid gekauft.", "Minnie Maus kauft ein Kleid."],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_PERFEKT",
  },
  {
    text: "Setze ins Perfekt:",
    expression: "Der Creeper _explodiert_.",
    options: ["Der Creeper explodierte.", "Der Creeper hat explodiert.", "Der Creeper ist explodiert.", "Der Creeper wird explodieren."],
    correctIndex: 2,
    difficulty: "medium",
    category: "DE_PERFEKT",
    explanation: "Zustandsveränderung -> 'ist' explodiert."
  },
  {
    text: "Perfekt:",
    expression: "Wir _gewinnen_ das Match.",
    options: ["Wir gewannen das Match.", "Wir sind das Match gewonnen.", "Wir haben das Match gewonnen.", "Wir gewinnen das Match."],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_PERFEKT",
  },
  {
    text: "Perfekt:",
    expression: "Er _trinkt_ eine Fanta.",
    options: ["Er trank eine Fanta.", "Er hat eine Fanta getrunken.", "Er ist eine Fanta getrunken.", "Er hat eine Fanta getrinkt."],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_PERFEKT",
  },
  {
    text: "Perfekt:",
    expression: "Simba _wird_ König.",
    options: ["Simba wurde König.", "Simba hat König geworden.", "Simba ist König geworden.", "Simba wird König sein."],
    correctIndex: 2,
    difficulty: "medium",
    category: "DE_PERFEKT",
  },
  {
    text: "Bilde das Perfekt:",
    expression: "Ich _sehe_ den Film.",
    options: ["Ich sah den Film.", "Ich habe den Film gesehen.", "Ich bin den Film gesehen.", "Ich habe den Film geseht."],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_PERFEKT",
  },
  {
    text: "Perfekt:",
    expression: "Das Auto _fährt_ schnell.",
    options: ["Das Auto ist schnell gefahren.", "Das Auto hat schnell gefahren.", "Das Auto fuhr schnell.", "Das Auto fährte schnell."],
    correctIndex: 0,
    difficulty: "medium",
    category: "DE_PERFEKT",
  },

  // ============================================================
  // DEUTSCH: PRÄTERITUM BILDEN (DE_PRAETERITUM)
  // ============================================================
  {
    text: "Setze den Satz ins Präteritum (Schreibvergangenheit):",
    expression: "Ich _baue_ ein Haus in Minecraft.",
    options: ["Ich habe ein Haus gebaut.", "Ich baute ein Haus.", "Ich werde ein Haus bauen.", "Ich gebaut ein Haus."],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_PRAETERITUM",
  },
  {
    text: "Bilde das Präteritum:",
    expression: "Donald Duck _ärgert_ sich.",
    options: ["Donald Duck hat sich geärgert.", "Donald Duck ärgert sich.", "Donald Duck ärgerte sich.", "Donald Duck wird sich ärgern."],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_PRAETERITUM",
  },
  {
    text: "Wie heißt das Präteritum?",
    expression: "Messi _dribbelt_ an allen vorbei.",
    options: ["Messi dribbelte an allen vorbei.", "Messi hat gedribbelt.", "Messi ist gedribbelt.", "Messi dribbeltet."],
    correctIndex: 0,
    difficulty: "medium",
    category: "DE_PRAETERITUM",
  },
  {
    text: "Präteritum (starkes Verb):",
    expression: "Der Torwart _fängt_ den Ball.",
    options: ["Der Torwart fängte den Ball.", "Der Torwart fing den Ball.", "Der Torwart hat gefangen.", "Der Torwart fangte den Ball."],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_PRAETERITUM",
    explanation: "Fangen ist unregelmäßig: fangen -> fing."
  },
  {
    text: "Setze ins Präteritum:",
    expression: "Sie _gehen_ in den Park.",
    options: ["Sie gehten in den Park.", "Sie sind gegangen.", "Sie gingen in den Park.", "Sie gangen in den Park."],
    correctIndex: 2,
    difficulty: "medium",
    category: "DE_PRAETERITUM",
    explanation: "Gehen -> ging."
  },
  {
    text: "Präteritum:",
    expression: "Wir _essen_ Burger.",
    options: ["Wir essten Burger.", "Wir aßen Burger.", "Wir haben gegessen.", "Wir assten Burger."],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_PRAETERITUM",
  },
  {
    text: "Präteritum:",
    expression: "Darth Vader _sagt_ etwas.",
    options: ["Darth Vader sagte etwas.", "Darth Vader sagete etwas.", "Darth Vader hat gesagt.", "Darth Vader sieg etwas."],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_PRAETERITUM",
  },
  {
    text: "Präteritum:",
    expression: "Er _liest_ ein Comic.",
    options: ["Er lieste ein Comic.", "Er las ein Comic.", "Er hat gelesen.", "Er leste ein Comic."],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_PRAETERITUM",
  },
  {
    text: "Präteritum:",
    expression: "Das Spiel _beginnt_.",
    options: ["Das Spiel beginnte.", "Das Spiel begann.", "Das Spiel hat begonnen.", "Das Spiel begunnt."],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_PRAETERITUM",
  },
  {
    text: "Präteritum:",
    expression: "Ich _bin_ müde.",
    options: ["Ich binte müde.", "Ich war müde.", "Ich bin gewesen.", "Ich ware müde."],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_PRAETERITUM",
    explanation: "Sein -> war."
  },

  // ============================================================
  // DEUTSCH: FUTUR BILDEN (DE_FUTUR)
  // ============================================================
  {
    text: "Setze den Satz ins Futur I (Zukunft):",
    expression: "Wir _holen_ den epischen Sieg.",
    options: ["Wir werden den epischen Sieg holen.", "Wir haben den Sieg geholt.", "Wir holten den Sieg.", "Wir sind den Sieg holen."],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_FUTUR",
    explanation: "Futur wird mit 'werden' + Infinitiv gebildet."
  },
  {
    text: "Bilde das Futur:",
    expression: "Elsa _singt_ ein Lied.",
    options: ["Elsa wird ein Lied singen.", "Elsa hat gesungen.", "Elsa sang ein Lied.", "Elsa wird gesungen."],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_FUTUR",
  },
  {
    text: "Zukunft:",
    expression: "Bayern München _gewinnt_.",
    options: ["Bayern München gewann.", "Bayern München hat gewonnen.", "Bayern München wird gewinnen.", "Bayern München wird gewinnt."],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_FUTUR",
  },
  {
    text: "Futur I:",
    expression: "Ich _kaufe_ mir neue Sneaker.",
    options: ["Ich werde mir neue Sneaker kaufen.", "Ich werde mir neue Sneaker gekauft.", "Ich habe mir neue Sneaker kaufen.", "Ich kaufte mir neue Sneaker."],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_FUTUR",
  },
  {
    text: "Setze ins Futur:",
    expression: "Es _regnet_ morgen.",
    options: ["Es hat geregnet.", "Es wird morgen regnen.", "Es regnete morgen.", "Es ist geregnet."],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_FUTUR",
  },
  {
    text: "Futur:",
    expression: "Spider-Man _rettet_ die Stadt.",
    options: ["Spider-Man hat die Stadt gerettet.", "Spider-Man rettete die Stadt.", "Spider-Man wird die Stadt retten.", "Spider-Man wird retten die Stadt."],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_FUTUR",
  },
  {
    text: "Futur:",
    expression: "Ihr _schreibt_ einen Test.",
    options: ["Ihr werdet einen Test schreiben.", "Ihr habt einen Test geschrieben.", "Ihr schriebert einen Test.", "Ihr wird einen Test schreiben."],
    correctIndex: 0,
    difficulty: "medium",
    category: "DE_FUTUR",
    explanation: "Achtung bei 'ihr': Ihr werdet."
  },
  {
    text: "Futur:",
    expression: "Du _gehst_ ins Kino.",
    options: ["Du wirst ins Kino gehen.", "Du warst ins Kino gehen.", "Du hast ins Kino gehen.", "Du wirst ins Kino gegangen."],
    correctIndex: 0,
    difficulty: "medium",
    category: "DE_FUTUR",
  },

  // ============================================================
  // DEUTSCH: GEMISCHTE ZEITEN (DE_MIXED)
  // ============================================================
  {
    text: "In welcher Zeitform steht dieser Satz?",
    expression: "Ich habe Fortnite gespielt.",
    options: ["Präsens", "Präteritum", "Perfekt", "Futur"],
    correctIndex: 2,
    difficulty: "medium",
    category: "DE_MIXED",
  },
  {
    text: "Welche Zeit ist das?",
    expression: "Wir werden Meister werden.",
    options: ["Präsens", "Präteritum", "Perfekt", "Futur"],
    correctIndex: 3,
    difficulty: "medium",
    category: "DE_MIXED",
  },
  {
    text: "Bestimme die Zeit:",
    expression: "Goofy lachte laut.",
    options: ["Präsens", "Präteritum", "Perfekt", "Futur"],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_MIXED",
    explanation: "Lachte ist die Erzählvergangenheit (Präteritum)."
  },
  {
    text: "Zeitform?",
    expression: "Der Bus fährt ab.",
    options: ["Präsens", "Präteritum", "Perfekt", "Futur"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_MIXED",
  },
  {
    text: "Welche Zeitform?",
    expression: "Hast du das gesehen?",
    options: ["Präsens", "Präteritum", "Perfekt", "Futur"],
    correctIndex: 2,
    difficulty: "medium",
    category: "DE_MIXED",
  },
  {
    text: "Zeitform:",
    expression: "Er aß einen Apfel.",
    options: ["Präsens", "Präteritum", "Perfekt", "Futur"],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_MIXED",
  },
  {
    text: "Zeitform:",
    expression: "Es wird bald schneien.",
    options: ["Präsens", "Präteritum", "Perfekt", "Futur"],
    correctIndex: 3,
    difficulty: "medium",
    category: "DE_MIXED",
  },
  {
    text: "Welcher Satz steht im Präteritum?",
    expression: "",
    options: ["Ich laufe.", "Ich lief.", "Ich bin gelaufen.", "Ich werde laufen."],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_MIXED",
  },
    
  // ============================================================
  // DEUTSCH: DEINE MUTTER SPEZIAL (DE_DEINE_MUTTER)
  // ============================================================
  {
    text: "Wortart erkennen:",
    expression: "Deine Mutter _campt_ im Gebüsch.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
    explanation: "Campen ist etwas, das man tut (Verb)."
  },
  {
    text: "Was ist das unterstrichene Wort?",
    expression: "Der _Skin_ deiner Mutter ist selten.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
    explanation: "Skin ist ein Nomen."
  },
  {
    text: "Bestimme die Wortart:",
    expression: "Deine Mutter ist _krass_ in Fortnite.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
    explanation: "Krass beschreibt, WIE sie ist (Adjektiv)."
  },
  {
    text: "Wortart?",
    expression: "ChatGPT fragt _deine_ Mutter nach Tipps.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "medium",
    category: "DE_DEINE_MUTTER",
    explanation: "Deine ist ein Possessivartikel (Begleiter)."
  },
  {
    text: "Wortart?",
    expression: "Micky Maus _hat_ Angst vor deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Gucci _kopiert_ den Style deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Ronaldo will ein _Autogramm_ von deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter ist _schneller_ als Sonic.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "_Das_ WLAN deiner Mutter ist unendlich schnell.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter _gewinnt_ jedes Battle Royale.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Der Endgegner ist _deine_ Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "medium",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter _streamt_ auf Twitch.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Pikachu will _deine_ Mutter fangen.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "medium",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter baut _bessere_ Häuser als du.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "medium",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Thanos hat _Angst_ vor deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter _isst_ Döner mit Gabel.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Der _Creeper_ explodiert wegen deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter ist _level_ 100.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Google _sucht_ nach deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter hat _mehr_ Follower als MrBeast.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "medium",
    category: "DE_DEINE_MUTTER",
    explanation: "Mehr ist hier ein Adjektiv/Adverb (Komparativ)."
  },
  {
    text: "Wortart?",
    expression: "Der _Busfahrer_ dankt deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter _ist_ der Imposter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_DEINE_MUTTER",
    explanation: "Ist kommt von sein (Verb)."
  },
  {
    text: "Wortart?",
    expression: "Das _Internet_ gehört deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter tanzt _wild_ auf TikTok.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "_Eine_ Pizza reicht deiner Mutter nicht.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter _trägt_ Supreme.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Der _König_ verbeugt sich vor deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter ist _legendär_.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Siri _versteht_ deine Mutter nicht.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter klaut _deinen_ Loot.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "medium",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Batman _ruft_ deine Mutter an.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter ist _stärker_ als Hulk.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Der _Schiri_ gibt deiner Mutter Rot.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter _hackt_ den Server.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Darth Vader ist _dein_ Vater, aber sie ist deine Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "medium",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter spielt _besser_ als Ninja.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "_Die_ Zone erwischt deine Mutter nie.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter _hat_ den Highscore.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Spiderman _klebt_ an deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter ist ein _Pro_.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "medium",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Das _Lichtschwert_ deiner Mutter ist pink.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter _löscht_ das Internet.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Minecraft _stürzt_ ab wegen deiner Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter ist _episch_.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "_Das_ Pausenbrot deiner Mutter ist riesig.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 3,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter _fällt_ die Treppe hoch.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "medium",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Der _Noob_ ist nicht deine Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 0,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter ist _unsichtbar_.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 2,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "FIFA _bannt_ deine Mutter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
  {
    text: "Wortart?",
    expression: "Deine Mutter _kauft_ Twitter.",
    options: ["Nomen", "Verb", "Adjektiv", "Artikel"],
    correctIndex: 1,
    difficulty: "easy",
    category: "DE_DEINE_MUTTER",
  },
];

// Zustandsspeicher (State) für verwendete Fragen
// Wir verwenden ein Set von Strings (JSON.stringify(question) oder ein Index)
const usedQuestionIndices = new Set<string>();

export const resetQuestionHistory = () => {
  usedQuestionIndices.clear();
};

export const generateQuestion = async (
  difficulty: 'easy' | 'medium', 
  category: QuestionCategory = 'ALL',
  customPool: Question[] = []
): Promise<Question> => {
  // Simulierte Verzögerung
  await new Promise(resolve => setTimeout(resolve, DELAY_MS));

  let pool: Omit<Question, 'id'>[] = [];

  // Determine Source Pool
  if (category === 'CUSTOM') {
    if (customPool.length > 0) {
      pool = customPool;
    } else {
      // Fallback if empty custom pool
      pool = STATIC_QUESTIONS;
    }
  } else {
    pool = STATIC_QUESTIONS;
  }

  // 1. Filtere nach Schwierigkeit und Kategorie
  const candidates = pool
    .map((q, index) => ({ q, index: `${category === 'CUSTOM' ? 'c' : 's'}-${index}` }))
    .filter(item => {
      // For CUSTOM questions, ignore difficulty filter to ensure they are seen
      if (category === 'CUSTOM') return true;

      // Special handling for Subject filtering if category is 'ALL'
      // Currently 'ALL' in UI selects default math. We might want a 'ALL_MATH' vs 'ALL_GERMAN'.
      // But based on the UI implementation, specific categories are passed.
      // If 'ALL' is passed (default math mix), we exclude German questions to prevent mixing subjects unintentionally
      // unless specifically requested.
      
      const isGermanCategory = item.q.category.startsWith('DE_');
      
      if (category === 'ALL') {
         // 'ALL' implies Math Mix in this context
         if (isGermanCategory) return false;
      }

      // -------------------------------------------------------------
      // CHANGE: Ignore difficulty filter to mix all levels randomly
      // -------------------------------------------------------------
      const diffMatch = true; 
      // -------------------------------------------------------------

      let catMatch = true;
      
      if (category !== 'ALL') {
         if (category === 'EXPAND_SIMPLIFY') {
            catMatch = item.q.category === 'EXPAND' || item.q.category === 'SIMPLIFY';
         } else {
            catMatch = item.q.category === category;
         }
      }
      return diffMatch && catMatch;
    });

  // 2. Filtere bereits verwendete Fragen heraus
  let available = candidates.filter(item => !usedQuestionIndices.has(item.index));

  // 3. Wenn alle verbraucht sind -> Reset für diese Auswahl
  if (available.length === 0) {
    if (candidates.length > 0) {
       candidates.forEach(c => usedQuestionIndices.delete(c.index));
       available = candidates;
    } else {
       // Absolute fallback
       available = pool.map((q, i) => ({ q, index: `fallback-${i}` }));
    }
  }

  // 4. Zufällige Auswahl
  const randomIndex = Math.floor(Math.random() * available.length);
  const selectedItem = available[randomIndex];

  // 5. Als "benutzt" markieren
  if (selectedItem) {
    usedQuestionIndices.add(selectedItem.index);
    return {
      ...selectedItem.q,
      id: Date.now().toString() + Math.random().toString()
    };
  } else {
    // Should generally not happen due to fallback, but for safety
    return {
      ...STATIC_QUESTIONS[0],
      id: 'error-fallback'
    } as Question;
  }
};