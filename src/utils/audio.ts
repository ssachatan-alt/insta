// High-End Web Audio API Soundscape: Velvet Drone & Crystal Chimes

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  private init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Ambient Drone Bus with warm low-pass filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(340, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.2, this.ctx.currentTime);
      filter.connect(this.masterGain);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.ambientGain.connect(filter);

      // Create warm harmonic chord (A2, E3, A3, C4)
      const chordFrequencies = [110, 164.81, 220, 261.63];

      chordFrequencies.forEach((freq, i) => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        // Warm sine and triangle mix
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Gentle organic detune
        osc.detune.setValueAtTime((i - 1.5) * 4, this.ctx.currentTime);

        oscGain.gain.setValueAtTime(0.12 / (i + 1), this.ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.ambientGain);

        osc.start();
        this.oscillators.push(osc);
      });
    } catch {
      // AudioContext unavailable or blocked
    }
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx || !this.masterGain || !this.ambientGain) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isMuted) {
      // Fade in velvet ambient drone smoothly
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.7, now + 1.8);

      this.ambientGain.gain.cancelScheduledValues(now);
      this.ambientGain.gain.setValueAtTime(0.01, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.45, now + 2.5);

      this.isMuted = false;
      this.playChime(587.33); // D5 welcome chime
    } else {
      // Fade out
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      this.isMuted = true;
    }

    return !this.isMuted;
  }

  public playChime(freq = 659.25) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Shimmering chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.995, now + 1.5);

      // Delicate envelope
      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.7);
    } catch {
      // ignore
    }
  }

  public getMuted() {
    return this.isMuted;
  }
}

export const sound = new SoundEngine();
