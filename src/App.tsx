import { useState } from 'react';
import { VelvetAtmosphere } from './components/VelvetAtmosphere';
import { PetalCanvas } from './components/PetalCanvas';
import { TopNav } from './components/TopNav';
import { BloomingRose } from './components/BloomingRose';
import { MultilingualGreeting } from './components/MultilingualGreeting';
import { motion } from 'framer-motion';

export default function App() {
  const [burstCount, setBurstCount] = useState(0);

  // Trigger romantic petal burst when the rose is tapped
  const handleRoseTap = () => {
    setBurstCount((prev) => prev + 1);
  };

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-between items-center select-none bg-[#080808] text-[#f8fafc]">
      {/* 1. Deep Velvet Lighting & Ambient Glow */}
      <VelvetAtmosphere />

      {/* 2. Interactive Falling Rose Petals Canvas (Depth of Field & Physics) */}
      <PetalCanvas burstTrigger={burstCount} />

      {/* 3. Minimalist Luxury Top Navigation & Audio Pill */}
      <TopNav />

      {/* 4. Centerpiece: Pure Majestic Blooming Rose & Multilingual Greeting (No Hand, No Unwanted UI) */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-xl mx-auto px-4 my-auto">
        {/* Pure Blooming Rose */}
        <BloomingRose onBloomTrigger={handleRoseTap} />

        {/* Multilingual Dynamic Greeting */}
        <MultilingualGreeting subtext="Welcome to my world" />
      </div>

      {/* 5. Minimalist Poetic Footer Accent */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="relative z-20 pb-6 text-center pointer-events-none select-none"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 24px)' }}
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-sans-clean text-slate-400">
          Touch the rose to bloom
        </span>
      </motion.footer>
    </main>
  );
}
