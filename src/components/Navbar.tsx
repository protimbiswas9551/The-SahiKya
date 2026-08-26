import React from 'react';
import { Terminal, BookOpen, Radio, Sparkles } from 'lucide-react';
import { OrnateMastheadText } from './OrnateMastheadText';

interface NavbarProps {
  onOpenPythonModal: () => void;
  onOpenInfoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPythonModal,
  onOpenInfoModal,
}) => {
  return (
    <header className="w-full text-[#1c1917] relative select-none">
      {/* Ornate Textured Masthead Area matching the reference picture */}
      <div className="pt-4 pb-3 px-3 sm:px-6 lg:px-8 border-b-2 border-[#2b241e] bg-parchment-banner relative shadow-sm">
        {/* Subtle tea-stain edges and vignette overlays */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 relative z-10">
          
          {/* Left Decorative Distressed Box: IMPARTIAL TRUTH & FACT-CHECKING ENGINE */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">
            {/* Left Fleuron Ornament */}
            <div className="text-2xl text-[#2b241e] font-serif select-none px-1">
              ❦
            </div>
            <div className="w-56 xl:w-64 distressed-box p-3 text-center">
              <h2 className="font-headline font-black text-sm sm:text-base xl:text-lg text-[#1c1917] leading-tight tracking-wider uppercase">
                IMPARTIAL TRUTH &amp; FACT-CHECKING ENGINE
              </h2>
            </div>
          </div>

          {/* Central Ornate Woodcut Illuminated Masthead: "The SahiKya" */}
          <div className="flex-1 text-center px-1 sm:px-4 w-full flex flex-col items-center justify-center">
            {/* Mobile / Tablet Left Box if not desktop */}
            <div className="lg:hidden w-full max-w-md mx-auto mb-2 distressed-box p-2 text-center">
              <h2 className="font-headline font-black text-xs sm:text-sm text-[#1c1917] leading-tight tracking-wider uppercase">
                IMPARTIAL TRUTH &amp; FACT-CHECKING ENGINE
              </h2>
            </div>

            <OrnateMastheadText />

            <div className="mt-1 flex items-center justify-center space-x-3 w-full max-w-lg">
              <span className="h-[1.5px] bg-[#2b241e]/60 flex-1" />
              <span className="text-[10px] sm:text-[11px] font-typewriter text-[#44382f] uppercase tracking-widest font-bold">
                ESTABLISHED 1898 • LATE CITY EDITION
              </span>
              <span className="h-[1.5px] bg-[#2b241e]/60 flex-1" />
            </div>
          </div>

          {/* Right Weather Forecast Distressed Parchment Box */}
          <div className="hidden md:flex items-center space-x-2 shrink-0">
            <div className="w-60 xl:w-68 distressed-box p-3 text-center relative">
              <div className="text-[#1c1917]">
                <p className="font-headline font-bold text-xs sm:text-[13px] text-[#1c1917] leading-snug">
                  Today's forecast: 100% chance I'm ignoring the weather report and wearing shorts in a blizzard.
                </p>
              </div>
            </div>
            {/* Right Fleuron Ornament */}
            <div className="text-2xl text-[#2b241e] font-serif select-none px-1">
              ❧
            </div>
          </div>

          {/* Mobile Weather Forecast Box */}
          <div className="md:hidden w-full max-w-md mx-auto distressed-box p-2 text-center">
            <p className="font-headline font-bold text-xs text-[#1c1917] leading-snug">
              Today's forecast: 100% chance I'm ignoring the weather report and wearing shorts in a blizzard.
            </p>
          </div>
        </div>
      </div>

      {/* Segmented Sub-Nav Bar with Cells */}
      <div className="border-b-2 border-[#1c1917] bg-[#f5ecda] text-xs font-typewriter font-bold text-[#1c1917]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x-2 divide-[#1c1917] border-x-0 md:border-x-2 border-[#1c1917]">
          {/* Cell 1: SahiKya Engine Brand */}
          <div className="md:col-span-5 px-3 py-1.5 flex items-center space-x-2 justify-center md:justify-start">
            <span className="w-4 h-4 rounded-full bg-[#1c1917] text-[#fdfbf7] flex items-center justify-center text-[10px] font-bold">
              P
            </span>
            <span className="tracking-wider uppercase text-[11px]">
              THE SAHIKYA <span className="bg-[#1c1917] text-white px-1 py-0.2 text-[9px] rounded-xs">s.e.a. 6</span> IMPARTIAL TRUTH ENGINE
            </span>
          </div>

          {/* Cell 2: Telegraph Line */}
          <div className="md:col-span-3 px-3 py-1.5 flex items-center justify-center space-x-2 text-[11px] text-[#44403c]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="uppercase tracking-wide">
              TELEGRAPH LINE: <strong className="text-[#1c1917]">Gemini Flash Connected</strong>
            </span>
          </div>

          {/* Cell 3: Python app.py Button */}
          <button
            type="button"
            onClick={onOpenPythonModal}
            className="md:col-span-2 px-3 py-1.5 flex items-center justify-center space-x-1.5 bg-[#f0e4d0] hover:bg-[#e4d4bd] transition cursor-pointer text-[11px] font-mono text-[#1c1917]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>&gt;_ - Python app.py</span>
          </button>

          {/* Cell 4: Methodology Button */}
          <button
            type="button"
            onClick={onOpenInfoModal}
            className="md:col-span-2 px-3 py-1.5 flex items-center justify-center space-x-1.5 bg-[#f0e4d0] hover:bg-[#e4d4bd] transition cursor-pointer text-[11px] font-typewriter uppercase text-[#1c1917]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>METHODOLOGY</span>
          </button>
        </div>
      </div>

      {/* Wire Ticker Strip underneath */}
      <div className="border-b-2 border-[#1c1917] bg-[#f9f4ea] py-1 px-3 text-[11px] font-typewriter text-[#44403c] overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="ticker-wrap w-full overflow-hidden flex items-center">
            <div className="ticker-move space-x-8 text-[#1c1917]">
              <span>★ Verified fact-checking protocols Standardized for Wire Services</span>
              <span>• AP BULLETIN: James Webb Space Telescope Verifies Atmospheric Spectrometry On Exoplanets</span>
              <span>• FINANCIAL GAZETTE: Gold Bullion Crosses Historic Highs Amid Central Bank Accumulation</span>
              <span>• HEALTH CHRONICLE: Peer-Reviewed Lancet Meta-Analysis Disproves Viral Superfood Myth</span>
              <span>• TELETYPE NOTICE: Cross-Reference All Claims Against Primary Institutional Registries</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

