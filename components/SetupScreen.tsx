import React, { useState } from 'react';
import { MAX_TEAMS, TEAM_CONFIGS } from '../constants';
import { QuestionCategory, Question, MonsterType, SavedTeamSet } from '../types';
import { Plus, Play, User, X, Briefcase, Calculator, Scissors, ArrowRightLeft, Layers, PenTool, Edit3, Save, Upload, Download, Trash, Zap, BookOpen, Clock, AlignLeft, GraduationCap, Smile, ChevronLeft, ChevronRight, Settings, FolderOpen, Users } from 'lucide-react';
import { SoundService } from '../services/soundService';
import MonsterDisplay from './MonsterDisplay';

interface SetupScreenProps {
  onStart: (names: string[], types: MonsterType[], category: QuestionCategory, customQuestions: Question[]) => void;
}

type Subject = 'MATH' | 'GERMAN';

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [names, setNames] = useState<string[]>(['']);
  const [selectedTypes, setSelectedTypes] = useState<MonsterType[]>([TEAM_CONFIGS[0].type]);
  const [selectedSubject, setSelectedSubject] = useState<Subject>('MATH');
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>('ALL');
  
  // Saved Teams State
  const [savedTeamSets, setSavedTeamSets] = useState<SavedTeamSet[]>(() => {
    const saved = localStorage.getItem('monster_teams');
    return saved ? JSON.parse(saved) : [];
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Custom Questions State
  const [customQuestions, setCustomQuestions] = useState<Question[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  // Editor Form State
  const [editQ, setEditQ] = useState<Partial<Question>>({
    text: '',
    expression: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'CUSTOM'
  });
  const [jsonImport, setJsonImport] = useState('');

  const addTeam = () => {
    SoundService.playClick();
    if (names.length < MAX_TEAMS) {
      setNames([...names, '']);
      setSelectedTypes([...selectedTypes, TEAM_CONFIGS[names.length % TEAM_CONFIGS.length].type]);
    }
  };

  const removeTeam = (index: number) => {
    SoundService.playClick();
    const newNames = names.filter((_, i) => i !== index);
    const newTypes = selectedTypes.filter((_, i) => i !== index);
    setNames(newNames);
    setSelectedTypes(newTypes);
  };

  const updateName = (index: number, value: string) => {
    const updatedNames = [...names];
    updatedNames[index] = value;
    setNames(updatedNames);
  };

  const handleStart = () => {
    if (canStart) {
      SoundService.init(); // Initialize audio context on first major interaction
      SoundService.playGameStart();
      onStart(names, selectedTypes, selectedCategory, customQuestions);
    }
  };

  const handleSubjectChange = (subj: Subject) => {
    SoundService.playClick();
    setSelectedSubject(subj);
    // Reset to default category for that subject
    if (subj === 'MATH') setSelectedCategory('ALL');
    if (subj === 'GERMAN') setSelectedCategory('DE_WORTARTEN');
  };

  const saveCurrentSetup = () => {
    SoundService.playClick();
    const name = prompt("Name für diese Team-Zusammenstellung (z.B. Klasse 5a):");
    if (!name) return;

    const newSet: SavedTeamSet = {
      id: Date.now().toString(),
      name,
      teams: names.map((n, i) => ({ name: n, type: selectedTypes[i] }))
    };

    const updated = [...savedTeamSets, newSet];
    setSavedTeamSets(updated);
    localStorage.setItem('monster_teams', JSON.stringify(updated));
    alert("Teams gespeichert!");
  };

  const loadTeamSet = (set: SavedTeamSet) => {
    SoundService.playClick();
    setNames(set.teams.map(t => t.name));
    setSelectedTypes(set.teams.map(t => t.type));
    setIsSettingsOpen(false);
  };

  const deleteTeamSet = (id: string) => {
    SoundService.playClick();
    if (!confirm("Diese Team-Zusammenstellung wirklich löschen?")) return;
    const updated = savedTeamSets.filter(s => s.id !== id);
    setSavedTeamSets(updated);
    localStorage.setItem('monster_teams', JSON.stringify(updated));
  };

  const canStart = names.length >= 1 && names.every(n => n.trim().length > 0);

  // Editor Logic
  const addCustomQuestion = () => {
    if (!editQ.text || !editQ.options || editQ.options.some(o => !o)) return;
    
    const newQ: Question = {
      ...editQ as Question,
      id: Date.now().toString(),
      category: 'CUSTOM'
    };
    
    setCustomQuestions([...customQuestions, newQ]);
    setEditQ({ text: '', expression: '', options: ['', '', '', ''], correctIndex: 0, difficulty: 'medium', category: 'CUSTOM' });
    SoundService.playClick();
  };

  const removeCustomQuestion = (id: string) => {
     setCustomQuestions(customQuestions.filter(q => q.id !== id));
  };

  const handleJsonImport = () => {
    try {
      const parsed = JSON.parse(jsonImport);
      if (Array.isArray(parsed)) {
        // Basic validation
        const valid = parsed.every(q => q.text && Array.isArray(q.options) && typeof q.correctIndex === 'number');
        if (valid) {
          setCustomQuestions(parsed.map((q: any) => ({...q, category: 'CUSTOM', id: q.id || Math.random().toString()})));
          setJsonImport('');
          alert("Import erfolgreich!");
        } else {
          alert("Format ungültig. Array von Fragen erwartet.");
        }
      }
    } catch (e) {
      alert("Ungültiges JSON.");
    }
  };

  const categoriesMath: { id: QuestionCategory; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'ALL', label: 'Bunter Mix', icon: <Layers className="w-5 h-5"/>, color: 'bg-purple-500' },
    { id: 'EXPAND', label: 'Erweitern', icon: <ArrowRightLeft className="w-5 h-5"/>, color: 'bg-blue-500' },
    { id: 'SIMPLIFY', label: 'Kürzen', icon: <Scissors className="w-5 h-5"/>, color: 'bg-green-500' },
    { id: 'EXPAND_SIMPLIFY', label: 'Mix: Erw & Kür', icon: <Briefcase className="w-5 h-5"/>, color: 'bg-teal-500' },
    { id: 'ADD_SUB', label: 'Plus & Minus', icon: <Calculator className="w-5 h-5"/>, color: 'bg-orange-500' },
    { id: 'ADD_SUB_PRO', label: 'Plus & Minus PRO', icon: <Zap className="w-5 h-5"/>, color: 'bg-red-600' },
    { id: 'MULTIPLY', label: 'Multiplizieren', icon: <X className="w-5 h-5"/>, color: 'bg-yellow-500' },
  ];

  const categoriesGerman: { id: QuestionCategory; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'DE_WORTARTEN', label: 'Wortarten', icon: <BookOpen className="w-5 h-5"/>, color: 'bg-blue-600' },
    { id: 'DE_PERFEKT', label: 'Perfekt', icon: <Clock className="w-5 h-5"/>, color: 'bg-amber-600' },
    { id: 'DE_PRAETERITUM', label: 'Präteritum', icon: <Clock className="w-5 h-5"/>, color: 'bg-amber-700' },
    { id: 'DE_FUTUR', label: 'Futur', icon: <Zap className="w-5 h-5"/>, color: 'bg-cyan-600' },
    { id: 'DE_MIXED', label: 'Zeiten-Mix', icon: <Layers className="w-5 h-5"/>, color: 'bg-purple-600' },
    { id: 'DE_DEINE_MUTTER', label: 'Deine Mutter', icon: <Smile className="w-5 h-5"/>, color: 'bg-pink-600' },
  ];

  const updateAvatar = (index: number, direction: 'next' | 'prev') => {
    SoundService.playClick();
    const currentIndex = TEAM_CONFIGS.findIndex(c => c.type === selectedTypes[index]);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= TEAM_CONFIGS.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = TEAM_CONFIGS.length - 1;
    
    const updatedTypes = [...selectedTypes];
    updatedTypes[index] = TEAM_CONFIGS[nextIndex].type;
    setSelectedTypes(updatedTypes);
  };

  const currentCategories = selectedSubject === 'MATH' ? categoriesMath : categoriesGerman;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 md:p-8">
      <div className="glass-panel p-6 md:p-8 rounded-3xl max-w-5xl w-full text-center relative overflow-hidden flex flex-col h-full max-h-[95vh]">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="shrink-0 mb-4">
          <h1 className="text-3xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            MONSTER KLASSENKAMPF
          </h1>
          <p className="text-slate-300 text-lg game-font">Admin-Bereich: Teams & Mission wählen</p>
          
          {/* Settings Toggle */}
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="absolute top-4 right-4 p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-all shadow-lg border border-white/5 z-10"
            title="Einstellungen & Klassen"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Load Bar */}
        {savedTeamSets.length > 0 && !isSettingsOpen && (
          <div className="shrink-0 mb-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Schnell-Laden:</span>
            {savedTeamSets.slice(0, 5).map(set => (
              <button
                key={set.id}
                onClick={() => loadTeamSet(set)}
                className="px-3 py-1 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-xs font-bold rounded-full border border-white/5 transition-all whitespace-nowrap"
              >
                {set.name}
              </button>
            ))}
            {savedTeamSets.length > 5 && (
              <button onClick={() => setIsSettingsOpen(true)} className="text-[10px] text-blue-400 hover:underline font-bold whitespace-nowrap">
                + {savedTeamSets.length - 5} weitere
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6">
          
          {/* TEAM SETUP SECTION */}
          <div className="bg-slate-800/40 rounded-2xl p-4 border border-white/5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-left text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <User className="w-4 h-4"/> 1. Teams aufstellen (Max {MAX_TEAMS})
              </h2>
              <button 
                onClick={saveCurrentSetup}
                disabled={!canStart}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${canStart ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
              >
                <Save className="w-3.5 h-3.5" /> Teams speichern
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {names.map((name, index) => {
                const currentType = selectedTypes[index];
                const config = TEAM_CONFIGS.find(c => c.type === currentType) || TEAM_CONFIGS[0];
                return (
                  <div key={index} className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-800/80 p-3 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${config.color} shadow-lg text-white p-1 relative group overflow-hidden`}>
                        <MonsterDisplay type={currentType} stage={0} />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-between px-1 transition-opacity">
                          <button onClick={() => updateAvatar(index, 'prev')} className="p-0.5 hover:text-yellow-400"><ChevronLeft className="w-4 h-4"/></button>
                          <button onClick={() => updateAvatar(index, 'next')} className="p-0.5 hover:text-yellow-400"><ChevronRight className="w-4 h-4"/></button>
                        </div>
                      </div>
                      <div className="flex-1 relative min-w-0">
                        <input
                          type="text"
                          placeholder={`Team ${index + 1}`}
                          value={name}
                          onChange={(e) => updateName(index, e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-md py-1.5 pl-2 pr-2 text-base focus:border-purple-500 focus:outline-none transition-all text-white font-bold truncate"
                        />
                      </div>
                      {names.length > 1 && (
                          <button onClick={() => removeTeam(index)} className="p-1.5 rounded-md bg-slate-900 hover:bg-red-500/20 text-slate-400 hover:text-red-500 transition-colors shrink-0">
                            <X className="w-4 h-4" />
                          </button>
                      )}
                    </div>
                    <div className="flex justify-center gap-1 overflow-x-auto no-scrollbar py-1">
                      {TEAM_CONFIGS.map((c) => (
                        <button
                          key={c.type}
                          onClick={() => {
                            const updated = [...selectedTypes];
                            updated[index] = c.type;
                            setSelectedTypes(updated);
                            SoundService.playClick();
                          }}
                          className={`w-6 h-6 rounded-full border-2 shrink-0 transition-all ${selectedTypes[index] === c.type ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-40 hover:opacity-100'} ${c.color}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
               
               {/* Add Button */}
               {names.length < MAX_TEAMS && (
                <button 
                  onClick={addTeam}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-600 text-slate-400 hover:border-purple-500 hover:text-purple-400 transition-all font-bold h-[56px]"
                >
                  <Plus className="w-5 h-5" /> Hinzufügen
                </button>
              )}
            </div>
          </div>

          {/* MISSION CONTROL SECTION */}
          <div className="bg-slate-800/40 rounded-2xl p-4 border border-white/5">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <h2 className="text-left text-slate-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4"/> 2. Mission wählen
                </h2>
                
                <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-700">
                    <button
                      onClick={() => handleSubjectChange('MATH')}
                      className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${selectedSubject === 'MATH' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Calculator className="w-4 h-4"/> Mathe
                    </button>
                    <button
                      onClick={() => handleSubjectChange('GERMAN')}
                      className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${selectedSubject === 'GERMAN' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        <AlignLeft className="w-4 h-4"/> Deutsch
                    </button>
                </div>

                <button 
                  onClick={() => setIsEditorOpen(true)}
                  className="bg-slate-700 hover:bg-slate-600 text-xs px-3 py-1 rounded-full flex items-center gap-2 transition-colors border border-white/10 ml-auto md:ml-0"
                >
                  <Edit3 className="w-3 h-3"/> Aufgaben-Editor ({customQuestions.length})
                </button>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
                {currentCategories.map((cat) => (
                   <button
                     key={cat.id}
                     onClick={() => {
                        SoundService.playClick();
                        setSelectedCategory(cat.id);
                     }}
                     className={`
                       relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200
                       ${selectedCategory === cat.id 
                          ? `${cat.color} border-white text-white shadow-lg scale-105` 
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800'}
                     `}
                   >
                      <div className="mb-1 p-2 bg-white/10 rounded-full">{cat.icon}</div>
                      <span className="text-[10px] md:text-xs font-bold leading-tight text-center">{cat.label}</span>
                   </button>
                ))}
                
                {/* Custom Category Button always visible */}
                <button
                    onClick={() => {
                        SoundService.playClick();
                        setSelectedCategory('CUSTOM');
                    }}
                    className={`
                       relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200
                       ${selectedCategory === 'CUSTOM'
                          ? `bg-pink-500 border-white text-white shadow-lg scale-105` 
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-800'}
                     `}
                >
                    <div className="mb-1 p-2 bg-white/10 rounded-full"><PenTool className="w-5 h-5"/></div>
                    <span className="text-[10px] md:text-xs font-bold leading-tight">Eigene</span>
                    {customQuestions.length === 0 && selectedCategory !== 'CUSTOM' && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    )}
                </button>
             </div>
          </div>

        </div>

        <div className="shrink-0 mt-4 pt-4 border-t border-white/10">
          <button 
            onClick={handleStart}
            disabled={!canStart || (selectedCategory === 'CUSTOM' && customQuestions.length === 0)}
            className={`w-full py-4 rounded-2xl text-2xl font-black shadow-lg transform transition-all 
              ${canStart && (selectedCategory !== 'CUSTOM' || customQuestions.length > 0)
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] hover:shadow-green-500/50 cursor-pointer' 
                : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'}`}
          >
            <span className="flex items-center justify-center gap-3">
              {(selectedCategory === 'CUSTOM' && customQuestions.length === 0) ? 'KEINE AUFGABEN' : 'MISSION STARTEN'} 
              <Play className="w-6 h-6 fill-current" />
            </span>
          </button>
        </div>
      </div>

      {/* CUSTOM EDITOR MODAL */}
      {isEditorOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="glass-panel w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="bg-slate-800 p-4 border-b border-white/10 flex justify-between items-center">
                 <h2 className="text-xl font-bold flex items-center gap-2"><PenTool className="w-5 h-5"/> Aufgaben-Editor</h2>
                 <button onClick={() => setIsEditorOpen(false)} className="p-2 hover:bg-red-500/20 rounded-full transition-colors"><X/></button>
              </div>
              
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                 {/* LEFT: FORM */}
                 <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r border-white/10">
                    <h3 className="text-sm font-bold uppercase text-slate-400 mb-4">Neue Aufgabe erstellen</h3>
                    <div className="space-y-4">
                       <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Fragetext</label>
                          <input 
                            className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white" 
                            placeholder="Frage..."
                            value={editQ.text}
                            onChange={e => setEditQ({...editQ, text: e.target.value})}
                          />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">Mathe Ausdruck / Unterstrichener Text</label>
                          <p className="text-[10px] text-slate-400 mb-1">Tipp: _Wort_ für Unterstreichung, oder 1/2 für Brüche.</p>
                          <input 
                            className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white font-mono" 
                            placeholder="Ich sehe ein _Haus_."
                            value={editQ.expression}
                            onChange={e => setEditQ({...editQ, expression: e.target.value})}
                          />
                       </div>
                       <div className="grid grid-cols-2 gap-2">
                          {[0,1,2,3].map(i => (
                             <div key={i}>
                                <label className="block text-xs font-bold text-slate-500 mb-1 flex justify-between">
                                  Option {i+1}
                                  <input 
                                    type="radio" 
                                    name="correctIndex" 
                                    checked={editQ.correctIndex === i}
                                    onChange={() => setEditQ({...editQ, correctIndex: i})}
                                    className="accent-green-500"
                                  />
                                </label>
                                <input 
                                  className={`w-full border rounded p-2 text-white text-sm ${editQ.correctIndex === i ? 'bg-green-900/30 border-green-500' : 'bg-slate-800 border-slate-600'}`}
                                  value={editQ.options![i]}
                                  onChange={e => {
                                     const newOps = [...editQ.options!];
                                     newOps[i] = e.target.value;
                                     setEditQ({...editQ, options: newOps});
                                  }}
                                />
                             </div>
                          ))}
                       </div>
                       <button onClick={addCustomQuestion} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 mt-4">
                          <Plus className="w-5 h-5"/> Aufgabe hinzufügen
                       </button>

                       {/* JSON IMPORT */}
                       <div className="mt-8 pt-6 border-t border-white/10">
                          <h3 className="text-xs font-bold uppercase text-slate-400 mb-2">Import / Export (JSON)</h3>
                          <details className="mb-2 text-[10px] text-slate-500 cursor-pointer">
                              <summary className="hover:text-slate-300">Format-Hilfe & Beispiel anzeigen</summary>
                              <pre className="bg-black/40 p-2 rounded mt-1 overflow-x-auto text-green-400 font-mono">
{`[
  {
    "text": "Frage?",
    "expression": "Ich sehe ein _Haus_",
    "options": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "difficulty": "easy"
  }
]`}
                              </pre>
                          </details>
                          <textarea 
                             className="w-full h-24 bg-black/50 font-mono text-xs text-green-400 p-2 rounded border border-slate-700"
                             value={jsonImport}
                             onChange={e => setJsonImport(e.target.value)}
                             placeholder="JSON hier einfügen..."
                          />
                          <div className="flex gap-2 mt-2">
                             <button onClick={handleJsonImport} className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-xs font-bold flex items-center justify-center gap-1">
                                <Upload className="w-3 h-3"/> Importieren
                             </button>
                             <button 
                               onClick={() => navigator.clipboard.writeText(JSON.stringify(customQuestions))}
                               className="flex-1 bg-slate-700 hover:bg-slate-600 py-2 rounded text-xs font-bold flex items-center justify-center gap-1"
                             >
                                <Download className="w-3 h-3"/> JSON Kopieren
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* RIGHT: LIST */}
                 <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-black/20">
                    <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 flex justify-between">
                       Gespeicherte Fragen <span>{customQuestions.length}</span>
                    </h3>
                    {customQuestions.length === 0 ? (
                       <div className="text-slate-500 text-center py-10 italic">Noch keine Fragen.</div>
                    ) : (
                       <div className="space-y-3">
                          {customQuestions.map((q, idx) => (
                             <div key={q.id || idx} className="bg-slate-800 p-3 rounded-lg border border-slate-700 group">
                                <div className="flex justify-between items-start">
                                   <div>
                                      <div className="font-bold text-sm text-slate-200">{q.text}</div>
                                      {q.expression && <div className="font-mono text-xs text-blue-400 mt-1">{q.expression}</div>}
                                      <div className="text-xs text-slate-500 mt-1">Lösung: {q.options[q.correctIndex]}</div>
                                   </div>
                                   <button onClick={() => removeCustomQuestion(q.id)} className="text-slate-600 hover:text-red-500 p-1">
                                      <Trash className="w-4 h-4"/>
                                   </button>
                                </div>
                             </div>
                          ))}
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* SETTINGS / SAVED TEAMS MODAL */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-2xl bg-slate-900 rounded-3xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="bg-slate-800 p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2"><Settings className="w-5 h-5 text-blue-400"/> Einstellungen & Klassen</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-red-500/20 rounded-full transition-colors"><X/></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
                <FolderOpen className="w-4 h-4" /> Gespeicherte Team-Zusammenstellungen
              </h3>
              
              {savedTeamSets.length === 0 ? (
                <div className="text-center py-12 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
                  <p className="text-slate-500 italic">Noch keine Teams gespeichert.</p>
                  <p className="text-xs text-slate-600 mt-2">Stelle Teams auf und klicke auf "Teams speichern".</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {savedTeamSets.map((set) => (
                    <div key={set.id} className="bg-slate-800 p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-blue-500/50 transition-colors">
                      <div>
                        <p className="font-black text-lg text-white">{set.name}</p>
                        <p className="text-xs text-slate-500">{set.teams.length} Teams: {set.teams.map(t => t.name).join(', ')}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => loadTeamSet(set)}
                          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all active:scale-95"
                        >
                          Laden
                        </button>
                        <button 
                          onClick={() => deleteTeamSet(set.id)}
                          className="bg-slate-700 hover:bg-red-600 text-slate-300 hover:text-white p-2 rounded-lg transition-all"
                          title="Löschen"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SetupScreen;