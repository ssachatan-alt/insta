import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, FolderHeart, Share2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface FloatingDockProps {
  onOpenConnect: () => void;
  onOpenPortfolio: () => void;
  onOpenDm: () => void;
  onOpenShare: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  onOpenConnect,
  onOpenPortfolio,
  onOpenDm,
  onOpenShare,
}) => {
  const handleClick = (callback: () => void, pitch: number) => {
    sound.playChime(pitch);
    callback();
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 inset-x-0 mx-auto z-40 max-w-sm px-4 select-none pointer-events-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}
    >
      <div className="relative glass-panel rounded-full p-1.5 px-3 flex items-center justify-between gap-1 shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-white/10 hover:border-[#ff1a40]/30 transition-all duration-500">
        {/* Subtle Bottom Crimson Glow Under Dock */}
        <div
          className="absolute -bottom-2 inset-x-8 h-4 rounded-full pointer-events-none -z-10 opacity-60"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 26, 64, 0.45) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />

        {/* 1. Connect Action */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick(onOpenConnect, 523.25)}
          className="group relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-sans-clean text-[#f8fafc]/90 hover:text-white transition-all duration-300 overflow-hidden"
        >
          <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-[#ff1a40]/15 group-hover:border group-hover:border-[#ff1a40]/30 transition-all duration-300" />
          <Sparkles className="w-3.5 h-3.5 text-[#dfba73] group-hover:text-[#ff1a40] transition-colors" />
          <span className="tracking-wider uppercase text-[11px] font-medium">Connect</span>
        </motion.button>

        <div className="w-[1px] h-4 bg-white/10" />

        {/* 2. Portfolio Action */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick(onOpenPortfolio, 659.25)}
          className="group relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-sans-clean text-[#f8fafc]/90 hover:text-white transition-all duration-300 overflow-hidden"
        >
          <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-[#ff1a40]/15 group-hover:border group-hover:border-[#ff1a40]/30 transition-all duration-300" />
          <FolderHeart className="w-3.5 h-3.5 text-rose-400 group-hover:text-[#ff1a40] transition-colors" />
          <span className="tracking-wider uppercase text-[11px] font-medium">Portfolio</span>
        </motion.button>

        <div className="w-[1px] h-4 bg-white/10" />

        {/* 3. Instagram DM Action */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick(onOpenDm, 783.99)}
          className="group relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-sans-clean bg-gradient-to-r from-[#ff1a40]/80 to-[#be123c]/80 text-white shadow-[0_0_15px_rgba(255,26,64,0.35)] hover:shadow-[0_0_22px_rgba(255,26,64,0.6)] transition-all duration-300"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="tracking-wider uppercase text-[11px] font-semibold">Direct</span>
        </motion.button>

        {/* 4. Minimal Share Icon */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleClick(onOpenShare, 880)}
          title="Share profile"
          className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
