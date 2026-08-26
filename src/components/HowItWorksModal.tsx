import React from 'react';
import { X, ShieldCheck, Globe, Search, Feather, CheckCircle2, Award } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[85vh] newsprint-paper border-4 border-[#1c1917] shadow-[8px_8px_0px_#1c1917] flex flex-col overflow-hidden text-[#1c1917]">
        {/* Header */}
        <div className="px-6 py-4 border-b-2 border-[#1c1917] flex items-center justify-between bg-[#f4eee1]">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-[#1c1917] text-[#fdfbf7]">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-base sm:text-lg text-[#1c1917] uppercase">
                Editorial Code & Verification Methodology
              </h2>
              <p className="font-typewriter text-xs text-[#57534e]">
                SahiKya's Wire Corroboration & Truth Classification Charter
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 border border-[#1c1917] bg-[#fdfbf7] text-[#1c1917] hover:bg-[#1c1917] hover:text-[#fdfbf7] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 font-body-news text-sm text-[#292524]">
          <div className="space-y-1.5">
            <h3 className="font-headline font-bold text-sm uppercase text-[#1c1917] flex items-center space-x-2">
              <span>❧ 1. Empirical Claim Deconstruction</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#44403c] leading-relaxed">
              When complex dispatches or rumors are received, the system strips speculative rhetoric to isolate the core testable assertion against primary documentation.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-headline font-bold text-sm uppercase text-[#1c1917] flex items-center space-x-2">
              <span>❧ 2. Multi-Tiered Corroboration Standards</span>
            </h3>
            <div className="space-y-2 font-typewriter text-xs">
              <div className="p-3 bg-[#fcf9f2] border-2 border-[#1c1917]">
                <span className="font-bold text-[#166534]">[TIER 1] — Primary Outlets & Institutional Records:</span>
                <p className="text-[#44403c] font-body-news text-xs mt-1">Reuters, Associated Press (AP), Agence France-Presse (AFP), peer-reviewed scientific journals (Nature, Science, Lancet), and official government registries (.gov / .edu).</p>
              </div>
              <div className="p-3 bg-[#fcf9f2] border border-[#1c1917]">
                <span className="font-bold text-[#1e40af]">[TIER 2] — Verified National Broadsheets:</span>
                <p className="text-[#44403c] font-body-news text-xs mt-1">The Wall Street Journal, Financial Times, The Guardian, BBC, NYT, Bloomberg with accredited editorial review.</p>
              </div>
              <div className="p-3 bg-[#f4eee1] border border-[#78716c]">
                <span className="font-bold text-[#78716c]">[TIER 3] — Secondary / Blogs / Social Commentary:</span>
                <p className="text-[#57534e] font-body-news text-xs mt-1">Uncorroborated commentary, blog opinions, and unverified social media posts.</p>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-headline font-bold text-sm uppercase text-[#1c1917] flex items-center space-x-2">
              <span>❧ 3. The Rubber Stamp Verdict</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#44403c] leading-relaxed">
              Dispatches receive one of four definitive rulings: <strong className="text-[#166534]">True</strong>, <strong className="text-[#991b1b]">False</strong>, <strong className="text-[#b45309]">Misleading</strong>, or <strong className="text-[#44403c]">Unverifiable</strong>, backed by an exact empirical probability percentage.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t-2 border-[#1c1917] bg-[#f4eee1] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1c1917] hover:bg-[#292524] text-[#fdfbf7] text-xs font-typewriter font-bold uppercase shadow-[2px_2px_0px_#78716c] transition cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

