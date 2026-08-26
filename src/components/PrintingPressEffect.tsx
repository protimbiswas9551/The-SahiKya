import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, Sparkles, CheckCheck, RefreshCw, Zap } from 'lucide-react';

interface PrintingPressEffectProps {
  triggerKey: string | number;
  children: React.ReactNode;
}

export const PrintingPressEffect: React.FC<PrintingPressEffectProps> = ({
  triggerKey,
  children,
}) => {
  const [isPrinting, setIsPrinting] = useState<boolean>(true);
  const [showFreshBadge, setShowFreshBadge] = useState<boolean>(false);

  // Trigger animation on key change
  useEffect(() => {
    setIsPrinting(true);
    setShowFreshBadge(false);

    // After roller sweeps down (approx 1.6s), show the "HOT OFF THE PRESS" badge
    const timer1 = setTimeout(() => {
      setIsPrinting(false);
      setShowFreshBadge(true);
    }, 1600);

    // Keep the "HOT OFF THE PRESS" stamp for 4 seconds then fade it smoothly
    const timer2 = setTimeout(() => {
      setShowFreshBadge(false);
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [triggerKey]);

  const handleManualReprint = () => {
    setIsPrinting(true);
    setShowFreshBadge(false);
    setTimeout(() => {
      setIsPrinting(false);
      setShowFreshBadge(true);
    }, 1600);
    setTimeout(() => {
      setShowFreshBadge(false);
    }, 4800);
  };

  return (
    <div className="relative w-full">
      {/* Manual Reprint Button in top-right floating toolbar */}
      <div className="absolute -top-9 right-0 z-20 flex items-center space-x-2">
        <button
          type="button"
          onClick={handleManualReprint}
          disabled={isPrinting}
          className="flex items-center space-x-1.5 px-2.5 py-1 bg-[#fcf9f2] hover:bg-[#efe6d5] border border-[#1c1917] font-typewriter text-[11px] font-bold text-[#1c1917] shadow-[2px_2px_0px_#1c1917] transition cursor-pointer disabled:opacity-50"
          title="Replay printing press ink animation"
        >
          <Printer className="w-3.5 h-3.5 text-[#854d0e]" />
          <span>{isPrinting ? 'Inking Press...' : 'Re-Run Printing Press'}</span>
        </button>
      </div>

      {/* Actual Content Container with Printing Reveal Animation */}
      <div className="relative overflow-hidden">
        {/* The children content */}
        <motion.div
          key={`content-${triggerKey}`}
          initial={{ filter: 'blur(1.5px) contrast(85%)', opacity: 0.7 }}
          animate={
            isPrinting
              ? { filter: ['blur(1.5px) contrast(85%)', 'blur(0px) contrast(100%)'], opacity: 1 }
              : { filter: 'blur(0px) contrast(100%)', opacity: 1 }
          }
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          {children}
        </motion.div>

        {/* PRINTING PRESS ROLLER & INK SWEEP OVERLAY */}
        <AnimatePresence>
          {isPrinting && (
            <motion.div
              key="printing-overlay"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
            >
              {/* Wet Ink Mask revealing from top to bottom */}
              <motion.div
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute left-0 right-0 h-28 pointer-events-none"
              >
                {/* 1. Heavy Mechanical Inked Roller Bar */}
                <div className="relative w-full">
                  {/* Brass/Iron Bar Body */}
                  <div className="h-6 w-full bg-gradient-to-b from-[#44382c] via-[#1c1917] to-[#292524] border-y-2 border-[#854d0e] shadow-[0_8px_16px_rgba(0,0,0,0.6)] flex items-center justify-between px-4">
                    {/* Left gear & rivet */}
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full border-2 border-[#ca8a04] bg-[#78350f] animate-spin flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#fef08a] rounded-full" />
                      </div>
                      <span className="font-typewriter text-[9px] uppercase tracking-widest text-[#fde047] font-bold hidden sm:inline">
                        ROTARY PRESS • HEIDELBERG CYLINDER
                      </span>
                    </div>

                    {/* Center Press Inscription */}
                    <div className="flex items-center space-x-1.5 text-[9px] font-mono text-[#e7e5e4] tracking-wider uppercase font-bold">
                      <Zap className="w-3 h-3 text-[#facc15] animate-pulse" />
                      <span>APPLYING FRESH INK & TYPE</span>
                    </div>

                    {/* Right gear & rivet */}
                    <div className="flex items-center space-x-2">
                      <span className="font-typewriter text-[9px] text-[#fef08a] font-mono hidden md:inline">
                        300 DPI
                      </span>
                      <div className="w-4 h-4 rounded-full border-2 border-[#ca8a04] bg-[#78350f] animate-spin flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#fef08a] rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* 2. Wet Ink Trail Sheen Gradient */}
                  <div className="h-16 w-full bg-gradient-to-b from-[#1c1917]/30 via-[#26180c]/15 to-transparent backdrop-blur-[0.5px]" />

                  {/* 3. Inked Stencil Sparks & Press Dots */}
                  <div className="absolute -top-1 left-0 right-0 flex justify-around opacity-40">
                    <span className="w-1.5 h-1.5 bg-[#ca8a04] rounded-full blur-[0.5px]" />
                    <span className="w-2 h-1.5 bg-[#1c1917] rounded-full" />
                    <span className="w-1 h-1 bg-[#854d0e] rounded-full" />
                    <span className="w-2 h-2 bg-[#ca8a04] rounded-full blur-[0.5px]" />
                    <span className="w-1.5 h-1.5 bg-[#1c1917] rounded-full" />
                  </div>
                </div>
              </motion.div>

              {/* Fresh Ink Paper Scanline Sweep */}
              <motion.div
                initial={{ height: '0%' }}
                animate={{ height: '100%' }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute top-0 left-0 right-0 bg-[#291e13]/[0.03] pointer-events-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* "HOT OFF THE PRESS" FINISHED RUBBER STAMP POPUP */}
        <AnimatePresence>
          {showFreshBadge && (
            <motion.div
              initial={{ scale: 2.2, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: -6 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 20,
              }}
              className="absolute top-6 right-6 z-30 pointer-events-none select-none"
            >
              <div className="px-4 py-2 bg-[#fef2f2]/90 border-4 border-dashed border-[#991b1b] text-[#7f1d1d] shadow-[4px_4px_0px_rgba(153,27,27,0.7)] transform">
                <div className="flex items-center space-x-1.5 font-stamp font-black text-sm uppercase tracking-widest text-[#991b1b]">
                  <CheckCheck className="w-4 h-4 text-[#991b1b] stroke-[3]" />
                  <span>HOT OFF THE PRESS</span>
                </div>
                <div className="font-typewriter text-[9px] uppercase tracking-wider text-[#991b1b] text-center font-bold">
                  VERIFIED • LATE CITY EDITION
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
