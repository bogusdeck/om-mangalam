// Web Audio API Retro Sound Effects & Synthesizer for 90s Indian Shaadi Website

class ShaadiAudioEngine {
  constructor() {
    this.ctx = null;
    // Audio muted by default for development (will be re-enabled later)
    this.muted = true;
    this.bgmPlaying = false;
    this.bgmTimer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muteState) {
    this.muted = muteState;
    if (muteState) {
      this.stopBGM();
    }
  }

  // 1. Dholak / Dhol Beat (Low resonant drum + high snap)
  playDhol() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);

    // High snap
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(600, this.ctx.currentTime);
    snapOsc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);

    snapGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    snapGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    snapOsc.connect(snapGain);
    snapGain.connect(this.ctx.destination);
    snapOsc.start();
    snapOsc.stop(this.ctx.currentTime + 0.08);
  }

  // 2. Shehnai Scale Note (Nostalgic reed instrument simulation)
  playShehnaiNote(freq = 440, duration = 0.4) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Sawtooth with slight vibrato gives that authentic Shehnai reed character
    osc.type = 'sawtooth';
    
    // Vibrato LFO
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 5.5; // vibrato speed
    lfoGain.gain.value = 8;    // vibrato depth
    lfo.connect(osc.frequency);
    lfo.start();

    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Filter to soften the high frequencies
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1800;

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
    lfo.stop(this.ctx.currentTime + duration);
  }

  // 2b. Royal Elephant Trumpet / Auspicious Roar
  playElephantTrumpet() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // 1. Horn / Trumpet Sawtooth Oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';

    // Characteristic elephant trumpeting pitch glide
    osc.frequency.setValueAtTime(310, t);
    osc.frequency.exponentialRampToValueAtTime(530, t + 0.16);
    osc.frequency.setValueAtTime(530, t + 0.55);
    osc.frequency.exponentialRampToValueAtTime(360, t + 0.9);

    // Guttural lip flutter vibrato (LFO)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 17; // 17Hz flutter
    lfoGain.gain.value = 28;  // vibrato depth
    lfo.connect(osc.frequency);
    lfo.start(t);
    lfo.stop(t + 0.95);

    // Resonant bandpass filter for brass horn resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(820, t);
    filter.frequency.linearRampToValueAtTime(1450, t + 0.18);
    filter.frequency.linearRampToValueAtTime(750, t + 0.85);
    filter.Q.value = 2.8;

    // Volume envelope
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.08);
    gain.gain.setValueAtTime(0.35, t + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.95);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    // 2. Low chest rumble
    const rumble = this.ctx.createOscillator();
    const rumbleGain = this.ctx.createGain();
    rumble.type = 'sine';
    rumble.frequency.setValueAtTime(90, t);
    rumble.frequency.exponentialRampToValueAtTime(50, t + 0.85);
    rumbleGain.gain.setValueAtTime(0.35, t);
    rumbleGain.gain.exponentialRampToValueAtTime(0.01, t + 0.85);

    rumble.connect(rumbleGain);
    rumbleGain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.95);
    rumble.start(t);
    rumble.stop(t + 0.85);
  }

  // 3. Dramatic 90s TV Orchestra Hit / "DUN DUN DUN!"
  playDramaticHit() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [130.81, 164.81, 196.00, 261.63]; // C minor chord notes
    notes.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.7);
    });
  }

  // 4. Cheesy Celebration Fanfare
  playCelebrationFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 659.25, d: 0.15 }, // E5
      { f: 783.99, d: 0.15 }, // G5
      { f: 1046.50, d: 0.5 }  // C6
    ];

    let now = this.ctx.currentTime;
    melody.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + note.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + note.d);
      now += note.d * 0.8;
    });
  }

  // 5. Button Click Pop
  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  // 6. Background Shehnai Raga Loop
  toggleBGM() {
    if (this.bgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.muted = false;
      this.startBGM();
      return true;
    }
  }

  startBGM() {
    if (this.muted) return;
    if (this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;

    // Classic Indian wedding melody notes (Raag Yaman / Pahadi feel)
    const ragaNotes = [
      440.00, 493.88, 554.37, 659.25, 739.99, 880.00,
      739.99, 659.25, 554.37, 493.88, 440.00, 329.63
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.bgmPlaying || this.muted) return;
      
      const freq = ragaNotes[noteIdx % ragaNotes.length];
      this.playShehnaiNote(freq, 0.45);
      
      // Also occasionally play a low dhol beat in background
      if (noteIdx % 4 === 0) {
        this.playDhol();
      }

      noteIdx++;
      this.bgmTimer = setTimeout(playNextNote, 320);
    };

    playNextNote();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

export const shaadiAudio = new ShaadiAudioEngine();
