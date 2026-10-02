import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send, Calendar, Check, Copy, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const email = 'inquiry@atelierrouge.luxury';

  const copyEmail = () => {
    navigator.clipboard?.writeText(email);
    sound.playChime(880);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Luxury Sheet */}
          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-lg glass-panel rounded-t-[2rem] sm:rounded-[2rem] p-6 sm:p-8 border border-white/10 shadow-[0_20px_60px_rgba(255,26,64,0.18)] max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-[#ff1a40] text-sm">✦</span>
                <span className="font-display-luxury text-sm tracking-[0.25em] uppercase text-white font-semibold">
                  Private Inquiries
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="mt-5 space-y-4">
              <div>
                <h3 className="font-serif-luxury italic text-2xl text-white">
                  Commission an Editorial Vision
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-sans-clean leading-relaxed">
                  Available for global creative direction, couture brand campaigns, and bespoke artistic collaborations.
                </p>
              </div>

              {/* Direct Email Card */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#ff1a40]/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#ff1a40]/15 flex items-center justify-center text-[#ff1a40]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-wider uppercase text-slate-400">Direct Contact</div>
                    <div className="text-xs sm:text-sm font-sans-clean text-white font-medium">{email}</div>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-full glass-pill text-xs flex items-center gap-1.5 hover:text-[#dfba73] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`mailto:${email}?subject=Private Editorial Inquiry`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff1a40] to-[#be123c] text-white text-xs font-sans-clean font-semibold tracking-wider uppercase shadow-[0_0_20px_rgba(255,26,64,0.35)] hover:shadow-[0_0_28px_rgba(255,26,64,0.5)] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
                <a
                  href="https://calendar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass-pill text-white text-xs font-sans-clean font-medium tracking-wider uppercase border border-white/10 hover:border-[#dfba73]/40 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#dfba73]" />
                  <span>Schedule</span>
                </a>
              </div>

              {/* Atelier Studios Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-slate-500 font-sans-clean">
                <span>Offices</span>
                <span>Paris • Milano • New York</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const PortfolioModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const projects = [
    {
      num: '01',
      title: 'Maison No. VII',
      category: 'Haute Horlogerie & Film',
      year: '2026',
      accent: '#ff1a40',
    },
    {
      num: '02',
      title: 'Crimson Silhouette',
      category: 'Runway Scenography',
      year: '2025',
      accent: '#dfba73',
    },
    {
      num: '03',
      title: 'Velvet Reverie',
      category: 'Editorial Monograph',
      year: '2025',
      accent: '#be123c',
    },
    {
      num: '04',
      title: "L'Amour Éternel",
      category: 'Fine Fragrance Visuals',
      year: '2026',
      accent: '#e11d48',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-lg glass-panel rounded-t-[2rem] sm:rounded-[2rem] p-6 sm:p-8 border border-white/10 shadow-[0_20px_60px_rgba(255,26,64,0.18)] max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#dfba73]" />
                <span className="font-display-luxury text-sm tracking-[0.25em] uppercase text-white font-semibold">
                  Curated Archive
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.num}
                  className="group relative p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#ff1a40]/30 transition-all flex items-center justify-between cursor-pointer"
                  onClick={() => sound.playChime(700)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#dfba73]/70">{proj.num}</span>
                    <div>
                      <h4 className="font-serif-luxury italic text-lg text-white group-hover:text-rose-200 transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-sans-clean">
                        {proj.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">{proj.year}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#ff1a40] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}

              <div className="pt-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-sans-clean font-medium tracking-wider uppercase transition-all"
                >
                  <span>View Complete Editorial Lookbook</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const DmModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const igHandle = 'atelier.rouge';

  const copyHandle = () => {
    navigator.clipboard?.writeText(`@${igHandle}`);
    sound.playChime(880);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-sm glass-panel rounded-t-[2rem] sm:rounded-[2rem] p-6 border border-white/10 shadow-[0_20px_60px_rgba(255,26,64,0.18)]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-display-luxury text-xs tracking-[0.25em] uppercase text-white font-semibold">
                Direct Message
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#ff1a40] to-[#be123c] p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(255,26,64,0.4)]">
                <div className="w-full h-full rounded-full bg-[#080808] flex items-center justify-center text-xl">
                  🌹
                </div>
              </div>

              <div>
                <h3 className="font-serif-luxury italic text-xl text-white">@{igHandle}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-sans-clean">
                  Connect instantly via Instagram Direct
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={`https://ig.me/m/${igHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff1a40] to-[#be123c] text-white text-xs font-sans-clean font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(255,26,64,0.35)] flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open Instagram Direct</span>
                </a>
                <button
                  onClick={copyHandle}
                  className="w-full py-2.5 rounded-xl glass-pill text-slate-300 text-xs font-sans-clean flex items-center justify-center gap-2 border border-white/10 hover:text-white transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Handle Copied to Clipboard' : 'Copy Handle (@atelier.rouge)'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const ShareModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(url);
    sound.playChime(880);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '✦ ATELIER | Maison Rouge',
          text: 'Explore the cinematic luxury editorial bio.',
          url,
        });
      } catch {
        // Share cancelled or unavailable
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-sm glass-panel rounded-t-[2rem] sm:rounded-[2rem] p-6 border border-white/10 shadow-[0_20px_60px_rgba(255,26,64,0.18)]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-display-luxury text-xs tracking-[0.25em] uppercase text-white font-semibold">
                Share Bio
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 text-center space-y-4">
              <p className="text-xs text-slate-300 font-sans-clean leading-relaxed">
                Share this luxury interactive card to your stories, contacts, or copy the direct link.
              </p>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleNativeShare}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#dfba73] to-[#c49746] text-[#080808] text-xs font-sans-clean font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(223,186,115,0.3)] hover:brightness-105 transition-all"
                >
                  Share Link
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-full py-2.5 rounded-xl glass-pill text-white text-xs font-sans-clean flex items-center justify-center gap-2 border border-white/10 hover:border-[#ff1a40]/30 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied' : 'Copy Direct Link'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
