import React from 'react';

export const VintageEngravings: React.FC = () => {
  return (
    <div className="pointer-events-none select-none z-0">
      {/* Bottom-Left Vintage Woodcut Printing Press Engraving */}
      <div className="hidden xl:block fixed bottom-6 left-6 opacity-35 mix-blend-multiply max-w-[100px]">
        <svg viewBox="0 0 100 100" className="w-full h-auto text-[#2b2622]" fill="currentColor">
          <path d="M20 90 h60 v4 h-60 z" />
          <path d="M25 85 h10 v5 h-10 z M65 85 h10 v5 h-10 z" />
          <path d="M28 35 h8 v50 h-8 z M64 35 h8 v50 h-8 z" />
          <path d="M22 30 h56 v4 h-56 z" />
          <path d="M46 15 h8 v20 h-8 z" />
          <path d="M35 15 h30 v3 h-30 z" />
          <path d="M30 50 h40 v6 h-40 z" />
          <path d="M33 58 h34 v10 h-34 z" />
        </svg>
      </div>

      {/* Bottom-Right Vintage Inkwell & Feather Quill Engraving */}
      <div className="hidden xl:block fixed bottom-6 right-6 opacity-35 mix-blend-multiply max-w-[90px]">
        <svg viewBox="0 0 100 100" className="w-full h-auto text-[#2b2622]" fill="currentColor">
          <path d="M40 82 h22 c2 0 4 2 4 4 v6 c0 2 -2 4 -4 4 h-22 c-2 0 -4 -2 -4 -4 v-6 c0 -2 2 -4 4 -4 z" />
          <path d="M45 76 h12 v6 h-12 z" />
          <path d="M48 72 h6 v4 h-6 z" />
          <path d="M52 74 Q75 40 92 10 Q85 30 65 52 Q56 62 51 74 z" />
          <line x1="52" y1="74" x2="90" y2="12" stroke="#2b2622" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

