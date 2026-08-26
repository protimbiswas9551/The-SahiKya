import React from 'react';
import { FactCheckResult } from '../types';

interface FactCheckBulletinProps {
  history: FactCheckResult[];
  onSelectResult: (result: FactCheckResult) => void;
  isLoading: boolean;
}

export const FactCheckBulletin: React.FC<FactCheckBulletinProps> = ({
  history,
  onSelectResult,
  isLoading,
}) => {
  // Curated investigations matching the reference image
  const defaultBulletinItems: Array<{
    claim: string;
    verdict: 'True' | 'False' | 'Misleading' | 'Unverifiable';
    citations: number;
    time: string;
  }> = [
    {
      claim: "Bollywood actor Aamir Khan of' endorsing ehinies due to localised emergency protocols.",
      verdict: 'False',
      citations: 4,
      time: '05:14 PM',
    },
    {
      claim: 'SRM Delhi-NCR annonuced sudden closure due localize verified by Tier • wire services.',
      verdict: 'True',
      citations: 12,
      time: '05:25 PM',
    },
    {
      claim: 'Bollywoed superviar Aamir Khan get secretly married for the third time to private ceremony.',
      verdict: 'False',
      citations: 4,
      time: '05:14 PM',
    },
    {
      claim: 'Drinking raw celery juice every morning permaneotly eliminates antolnuons cooditious.',
      verdict: 'Misleading',
      citations: 4,
      time: '05:14 PM',
    },
    {
      claim: 'James Webb Space Telescope spectrometer traces potential biological gases in K2-18b exosphere.',
      verdict: 'True',
      citations: 8,
      time: '04:50 PM',
    },
  ];

  return (
    <div className="border-2 border-[#11100e] bg-[#fbf6ea] p-4 text-[#11100e] shadow-[3px_3px_0px_#11100e] relative">
      {/* Bulletin Card Header */}
      <div className="border-b-2 border-[#11100e] pb-2.5 text-center">
        <h2 className="font-headline font-black text-lg sm:text-xl uppercase tracking-wider text-[#11100e]">
          FACT-CHECK BULLETIN
        </h2>
        <div className="flex items-center justify-between text-[11px] font-typewriter font-bold uppercase text-[#292524] mt-1.5 border-t border-[#11100e]/30 pt-1.5">
          <span>RECENT INVESTIGATIONS</span>
          <span className="font-bold">(•)</span>
        </div>
      </div>

      {/* List of Investigations Cards */}
      <div className="mt-3.5 space-y-3">
        {history.length > 0
          ? history.slice(0, 5).map((item, idx) => {
              const verdictUpper = item.verdict.toUpperCase();
              let stampClass = 'rubber-stamp-unverifiable';
              if (item.verdict === 'True') stampClass = 'rubber-stamp-true';
              else if (item.verdict === 'False') stampClass = 'rubber-stamp-false';
              else if (item.verdict === 'Misleading') stampClass = 'rubber-stamp-misleading';

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectResult(item)}
                  className="w-full text-left bg-[#fdfbf7] border-2 border-[#11100e] p-3 hover:bg-[#f6ebd7] transition relative group cursor-pointer block shadow-[2px_2px_0px_#11100e]"
                >
                  <p className="font-body-news text-xs sm:text-[13px] font-bold text-[#11100e] leading-snug line-clamp-3 mb-2">
                    &ldquo;{item.claim_analyzed}&rdquo;
                  </p>

                  <div className="flex items-center justify-between font-typewriter text-[11px] text-[#44403c] font-medium pt-2 border-t border-[#11100e]/20">
                    <span>
                      {item.sources?.length || 4} citations •{' '}
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : '05:14 PM'}
                    </span>

                    {/* Rubber Stamp */}
                    <span className={`rubber-stamp ${stampClass} text-[11px] ml-1 shrink-0`}>
                      {verdictUpper}
                    </span>
                  </div>
                </button>
              );
            })
          : defaultBulletinItems.map((item, idx) => {
              let stampClass = 'rubber-stamp-unverifiable';
              if (item.verdict === 'True') stampClass = 'rubber-stamp-true';
              else if (item.verdict === 'False') stampClass = 'rubber-stamp-false';
              else if (item.verdict === 'Misleading') stampClass = 'rubber-stamp-misleading';

              return (
                <div
                  key={idx}
                  className="bg-[#fdfbf7] border-2 border-[#11100e] p-3 relative shadow-[2px_2px_0px_#11100e]"
                >
                  <p className="font-body-news text-xs sm:text-[13px] font-bold text-[#11100e] leading-snug line-clamp-3 mb-2">
                    &ldquo;{item.claim}&rdquo;
                  </p>

                  <div className="flex items-center justify-between font-typewriter text-[11px] text-[#44403c] font-medium pt-2 border-t border-[#11100e]/20">
                    <span>{item.citations} citations • {item.time}</span>

                    {/* Rubber Stamp */}
                    <span className={`rubber-stamp ${stampClass} text-[11px] ml-1 shrink-0`}>
                      {item.verdict.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
