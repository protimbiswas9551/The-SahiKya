import React from 'react';

export const OrnateMastheadText: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none py-1 w-full max-w-3xl mx-auto">
      {/* Decorative Top Accent Rule with Fleurons */}
      <div className="flex items-center justify-center space-x-3 w-full mb-1 opacity-70">
        <span className="h-px bg-gradient-to-r from-transparent via-[#2b241e] to-[#2b241e] flex-1 max-w-[120px]" />
        <span className="text-xs text-[#2b241e] font-serif">✦ ❖ ✦</span>
        <span className="h-px bg-gradient-to-l from-transparent via-[#2b241e] to-[#2b241e] flex-1 max-w-[120px]" />
      </div>

      {/* Main Title: The SahiKya matching the exact Old English / Cloister Black blackletter in user picture */}
      <div className="relative flex items-center justify-center tracking-normal px-2">
        <h1 
          className="font-sahikya-masthead text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[6.5rem] text-[#110e0c] leading-none text-center whitespace-nowrap drop-shadow-[1px_1px_0px_rgba(230,210,180,0.6)]"
          style={{
            fontFamily: "'Cloister Black', 'Old English Text MT', 'Old English Text', 'Chomsky', 'Engravers Old English', 'UnifrakturCook', 'Grenze Gotisch', Georgia, serif",
            textRendering: 'optimizeLegibility',
          }}
        >
          <span className="text-[#3d3228] text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem] mr-2 sm:mr-3 font-normal align-baseline inline-block">
            The
          </span>
          <span className="text-[#110e0c] font-bold tracking-tight inline-block">
            SahiKya
          </span>
        </h1>
      </div>

      {/* Underline Flourish */}
      <div className="flex items-center justify-center space-x-2 w-full mt-1 opacity-80">
        <div className="h-[2px] bg-[#1a1410] flex-1 max-w-[140px]" />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#2b241e] shrink-0" />
        <span className="text-[10px] sm:text-[11px] font-typewriter uppercase text-[#44382f] px-1 font-bold tracking-widest">
          Est. 1898 • Veritas Inquirendo
        </span>
        <div className="w-1.5 h-1.5 rotate-45 bg-[#2b241e] shrink-0" />
        <div className="h-[2px] bg-[#1a1410] flex-1 max-w-[140px]" />
      </div>
    </div>
  );
};
