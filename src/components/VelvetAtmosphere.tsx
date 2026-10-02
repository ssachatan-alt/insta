import React from 'react';
import { motion } from 'framer-motion';

export const VelvetAtmosphere: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#080808]">
      {/* 1. Primary Bottom / Center Velvet Red Glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 0.98, 1],
          opacity: [0.28, 0.42, 0.3, 0.28],
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[550px] sm:h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(225, 29, 72, 0.45) 0%, rgba(139, 0, 0, 0.25) 40%, rgba(80, 5, 20, 0.1) 65%, transparent 80%)',
          filter: 'blur(70px)',
        }}
      />

      {/* 2. Top-Center Subtle Champagne Warmth */}
      <div
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(223, 186, 115, 0.3) 0%, rgba(255, 26, 64, 0.1) 50%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 3. Deep Obsidian Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, transparent 35%, rgba(8, 8, 8, 0.5) 70%, rgba(8, 8, 8, 0.95) 100%)',
        }}
      />

      {/* 4. Film Grain Texture Layer */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay">
        <filter id="film-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </div>
  );
};
