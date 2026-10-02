import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

interface TopNavProps {
  onSoundToggled?: (active: boolean) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onSoundToggled }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    const active = sound.toggle();
    setIsPlaying(active);
    if (onSoundToggled) {
      onSoundToggled(active);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-5 pt-4 sm:pt-6 flex items-center justify-between pointer-events-none select-none">
      {/* Brand Monogram */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="pointer-events-auto flex items-center gap-2"
      >
        <span className="text-[#ff1a40] text-sm animate-pulse">✦</span>
        <span className="font-display-luxury text-xs sm:text-sm tracking-[0.35em] uppercase text-white font-semibold">
          Atelier Rouge
        </span>
      </motion.div>

      {/* Floating Audio Toggle Pill */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSound}
        className="pointer-events-auto group relative glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10 hover:border-[#ff1a40]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        title={isPlaying ? 'Mute ambient soundscape' : 'Play velvet soundscape'}
      >
        {isPlaying ? (
          <>
            {/* Animated sound wave bars */}
            <div className="flex items-center gap-[2.5px] h-3.5 px-0.5">
              <span className="w-[2px] bg-[#ff1a40] rounded-full audio-bar-1" />
              <span className="w-[2px] bg-[#dfba73] rounded-full audio-bar-2" />
              <span className="w-[2px] bg-[#ff1a40] rounded-full audio-bar-3" />
            </div>
            <Volume2 className="w-3.5 h-3.5 text-[#ff1a40]" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans-clean text-[#f8fafc]/90 font-medium">
              Audio On
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400 transition-colors" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans-clean text-slate-400 group-hover:text-white transition-colors">
              Sound Off
            </span>
          </>
        )}
      </motion.button>
    </header>
  );
};
