import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GREETINGS = [
  { word: 'Hello', lang: 'English' },
  { word: 'Hola', lang: 'Español' },
  { word: 'Bonjour', lang: 'Français' },
  { word: 'Ciao', lang: 'Italiano' },
  { word: 'Namaste', lang: 'Hindi' },
  { word: 'Konnichiwa', lang: 'Japanese' },
  { word: 'Guten Tag', lang: 'Deutsch' },
  { word: 'Olá', lang: 'Português' },
];

interface MultilingualGreetingProps {
  subtext?: string;
}

export const MultilingualGreeting: React.FC<MultilingualGreetingProps> = ({
  subtext = 'Welcome to my world',
}) => {
  const [index, setIndex] = useState(0);

  // Cycle smoothly every 2.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const current = GREETINGS[index];

  return (
    <div className="flex flex-col items-center justify-center text-center mt-2 z-20 select-none px-4">
      {/* Delicate Gold Accent Monogram */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="flex items-center gap-3 mb-2 opacity-70"
      >
        <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#dfba73]" />
        <span className="text-[10px] tracking-[0.35em] uppercase text-[#dfba73] font-sans-clean font-medium">
          {current.lang}
        </span>
        <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#dfba73]" />
      </motion.div>

      {/* Main Dynamic Greeting with Vertical Slide & Soft Blur */}
      <div className="h-16 sm:h-20 flex items-center justify-center overflow-hidden relative w-full">
        <AnimatePresence mode="wait">
          <motion.h1
            key={current.word}
            initial={{ y: 28, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -28, opacity: 0, filter: 'blur(10px)' }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-serif-luxury italic text-5xl sm:text-6xl font-light tracking-wide text-white drop-shadow-[0_4px_25px_rgba(255,26,64,0.4)]"
          >
            {current.word}
            <span className="text-[#ff1a40] font-sans-clean text-3xl ml-1 not-italic">.</span>
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Subtle Poetic Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.8 }}
        className="mt-2 flex flex-col items-center gap-1.5"
      >
        <p className="text-xs sm:text-sm tracking-[0.38em] uppercase font-sans-clean text-slate-300/80 font-light">
          {subtext}
        </p>

        {/* Minimalist ornamental diamond */}
        <span className="text-[9px] text-[#ff1a40]/60 tracking-[0.5em] mt-1">✦  ✦  ✦</span>
      </motion.div>
    </div>
  );
};
