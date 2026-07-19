import React, { useState, useEffect, useRef } from 'react';

const TRACKS = [
  { name: 'Dial-Up Chiptune', tempo: 130, type: 'chiptune' },
  { name: 'Neon Dreams Synthwave', tempo: 95, type: 'synthwave' },
  { name: 'Cyber Grunge Jam', tempo: 110, type: 'grunge' }
];

export default function RetroPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [eqHeights, setEqHeights] = useState(new Array(10).fill(10));
  
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const noteIndexRef = useRef(0);
  const nextNoteTimeRef = useRef(0.0);
  
  // Track specific scale notes
  const chiptuneBass = [33, 33, 41, 41, 36, 36, 38, 38, 33, 33, 41, 41, 45, 45, 43, 43];
  const chiptuneMelody = [69, 72, 76, 79, 81, 79, 76, 72, 74, 77, 81, 84, 86, 84, 81, 77];
  
  const synthwaveBass = [29, 29, 29, 29, 31, 31, 31, 31, 33, 33, 33, 33, 33, 33, 33, 33];
  const synthwaveMelody = [57, 60, 64, 67, 59, 62, 66, 69, 60, 64, 67, 71, 62, 66, 69, 72];
  
  const grungeBass = [28, 28, 31, 28, 33, 28, 30, 28, 28, 28, 31, 28, 35, 34, 33, 30];
  const grungeMelody = [64, 0, 67, 0, 69, 0, 66, 67, 64, 0, 67, 0, 71, 70, 69, 66];

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      stopAudio();
      setTimeout(() => {
        startAudio();
      }, 50);
    }
  }, [currentTrack]);

  const midiToFreq = (note) => {
    if (!note || note === 0) return 0;
    return 440 * Math.pow(2, (note - 69) / 12);
  };

  const playNote = (time, freq, type, duration, volScale = 1) => {
    if (freq === 0 || !audioCtxRef.current) return;

    const osc = audioCtxRef.current.createOscillator();
    const gainNode = audioCtxRef.current.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    // ADSR Envelope
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(volume * 0.15 * volScale, time + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtxRef.current.destination);

    osc.start(time);
    osc.stop(time + duration);
  };

  const scheduler = () => {
    if (!audioCtxRef.current) return;
    
    const lookahead = 25.0;
    const scheduleAheadTime = 0.1;
    const tempo = TRACKS[currentTrack].tempo;
    const secondsPerBeat = 60.0 / tempo;
    const secondsPerStep = secondsPerBeat / 2;

    while (nextNoteTimeRef.current < audioCtxRef.current.currentTime + scheduleAheadTime) {
      const time = nextNoteTimeRef.current;
      const step = noteIndexRef.current;
      const trackType = TRACKS[currentTrack].type;

      if (trackType === 'chiptune') {
        const bassFreq = midiToFreq(chiptuneBass[step]);
        playNote(time, bassFreq, 'triangle', secondsPerStep * 0.9, 1.2);

        if (step % 2 === 0 || Math.random() > 0.4) {
          const melFreq = midiToFreq(chiptuneMelody[step]);
          playNote(time, melFreq, 'square', secondsPerStep * 0.4, 0.6);
        }
      } else if (trackType === 'synthwave') {
        const bassFreq = midiToFreq(synthwaveBass[step]);
        playNote(time, bassFreq, 'sawtooth', secondsPerStep * 0.95, 0.8);

        if (step % 4 === 0) {
          const melFreq = midiToFreq(synthwaveMelody[step]);
          playNote(time, melFreq, 'triangle', secondsPerStep * 2.0, 0.9);
          playNote(time, midiToFreq(synthwaveMelody[step] - 12), 'sine', secondsPerStep * 2.0, 0.7);
        }
      } else {
        const bassFreq = midiToFreq(grungeBass[step]);
        playNote(time, bassFreq, 'sawtooth', secondsPerStep * 0.8, 1.0);

        if (grungeMelody[step] !== 0) {
          const melFreq = midiToFreq(grungeMelody[step]);
          playNote(time, melFreq, 'sawtooth', secondsPerStep * 0.5, 0.5);
        }
        
        if (step % 4 === 0) {
          const kickOsc = audioCtxRef.current.createOscillator();
          const kickGain = audioCtxRef.current.createGain();
          kickOsc.frequency.setValueAtTime(150, time);
          kickOsc.frequency.exponentialRampToValueAtTime(0.01, time + 0.15);
          kickGain.gain.setValueAtTime(volume * 0.4, time);
          kickGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
          kickOsc.connect(kickGain);
          kickGain.connect(audioCtxRef.current.destination);
          kickOsc.start(time);
          kickOsc.stop(time + 0.16);
        }
      }

      nextNoteTimeRef.current += secondsPerStep;
      noteIndexRef.current = (noteIndexRef.current + 1) % 16;
    }

    timerRef.current = setTimeout(scheduler, lookahead);
  };

  const startAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    
    noteIndexRef.current = 0;
    nextNoteTimeRef.current = audioCtxRef.current.currentTime + 0.05;
    scheduler();
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    let eqInterval;
    if (isPlaying) {
      eqInterval = setInterval(() => {
        setEqHeights(new Array(10).fill(0).map(() => Math.floor(Math.random() * 85) + 15));
      }, 100);
    } else {
      setEqHeights(new Array(10).fill(10));
    }
    return () => clearInterval(eqInterval);
  }, [isPlaying]);

  return (
    <div className="walkman-container">
      <div className="walkman-title">🎧 90s Diner Tape Deck</div>
      
      <div className="cassette-deck">
        <div className="cassette">
          <div className="cassette-label">
            90S CAFE MIXTAPES • VOL.{currentTrack + 1}
          </div>
          
          <div className="cassette-spindles">
            <div className={`spindle ${isPlaying ? 'spinning' : ''}`}></div>
            <div className={`spindle ${isPlaying ? 'spinning' : ''}`}></div>
          </div>
          
          <div className="cassette-window">
            <div className="tape-roll tape-left" style={{ transform: `scale(${isPlaying ? 0.65 : 0.85})` }}></div>
            <div className="tape-roll tape-right" style={{ transform: `scale(${isPlaying ? 0.85 : 0.65})` }}></div>
          </div>
        </div>
      </div>

      <div className="music-equalizer">
        {eqHeights.map((height, i) => (
          <div 
            key={i} 
            className="eq-bar" 
            style={{ 
              height: `${height}%`,
              animationDelay: `${i * 0.1}s`
            }}
          ></div>
        ))}
      </div>

      <div className="music-details">
        <span style={{ color: 'rgba(244, 233, 212, 0.5)', fontSize: '11px', textTransform: 'uppercase' }}>Now Playing:</span>
        <span className="song-title">{TRACKS[currentTrack].name}</span>
      </div>

      <div style={{ width: '100%' }}>
        <select 
          className="track-selector"
          value={currentTrack}
          onChange={(e) => setCurrentTrack(Number(e.target.value))}
        >
          {TRACKS.map((track, i) => (
            <option key={i} value={i}>
              {track.name} ({track.tempo} BPM)
            </option>
          ))}
        </select>
      </div>

      <div className="walkman-controls">
        <button 
          className={`walkman-btn ${isPlaying ? 'active' : ''}`} 
          onClick={handlePlayPause}
        >
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
        <button 
          className="walkman-btn" 
          onClick={() => {
            setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
          }}
        >
          SKIP
        </button>
        <button 
          className="walkman-btn" 
          onClick={() => {
            stopAudio();
            setCurrentTrack(0);
          }}
        >
          RESET
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '11px', color: 'rgba(244, 233, 212, 0.6)', fontWeight: 'bold' }}>VOL:</span>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          style={{ 
            flexGrow: 1, 
            accentColor: 'var(--orange)', 
            cursor: 'pointer',
            height: '6px',
            backgroundColor: '#110c08',
            border: 'none',
            outline: 'none',
            borderRadius: '3px'
          }}
        />
      </div>
    </div>
  );
}
