// Web Audio API Sound Service
// Generates retro arcade sounds procedurally

let audioCtx: AudioContext | null = null;
let isMuted = false;

const getContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

const playTone = (freq: number, type: OscillatorType, duration: number, startTime: number = 0, vol: number = 0.1) => {
  if (isMuted) return;
  const ctx = getContext();
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
  
  gainNode.gain.setValueAtTime(vol, ctx.currentTime + startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
};

export const SoundService = {
  // Initialize context (needs to be called on user interaction)
  init: () => {
    const ctx = getContext();
    if (ctx.state === 'suspended') ctx.resume();
  },

  playClick: () => {
    playTone(800, 'sine', 0.1, 0, 0.05);
  },

  playGameStart: () => {
    if (isMuted) return;
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  },

  playCorrect: () => {
    // Major Chord (C-E-G)
    playTone(523.25, 'sine', 0.3, 0, 0.1); // C5
    playTone(659.25, 'sine', 0.3, 0.1, 0.1); // E5
    playTone(783.99, 'sine', 0.4, 0.2, 0.1); // G5
  },

  playIncorrect: () => {
    // Dissonant slide down
    if (isMuted) return;
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  },

  playLevelUp: () => {
    // Magical arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C Major scale up
    notes.forEach((note, i) => {
      playTone(note, 'square', 0.2, i * 0.08, 0.05);
    });
  },

  playVictory: () => {
    // Fanfare
    const now = 0;
    playTone(523.25, 'triangle', 0.2, now, 0.2); // C
    playTone(523.25, 'triangle', 0.2, now + 0.2, 0.2); // C
    playTone(523.25, 'triangle', 0.2, now + 0.4, 0.2); // C
    playTone(783.99, 'square', 0.6, now + 0.6, 0.2); // G (Long)
  },
  
  toggleMute: () => {
    isMuted = !isMuted;
    return isMuted;
  }
};