import React from 'react';
import { KeyEvidence } from '../types';
import { CheckCircle2, XCircle, Info, Feather } from 'lucide-react';

interface EvidenceSectionProps {
  evidenceList?: KeyEvidence[];
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({ evidenceList }) => {
  if (!evidenceList || evidenceList.length === 0) return null;

  return (
    <div className="newsprint-paper p-6 text-[#1c1917] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#1c1917]">
        <div className="flex items-center space-x-2">
          <Feather className="w-4 h-4 text-[#1c1917]" />
          <h3 className="font-headline font-bold text-sm sm:text-base uppercase tracking-wider text-[#1c1917]">
            Investigative Exhibits & Key Findings
          </h3>
        </div>
        <span className="font-typewriter text-xs text-[#57534e]">
          Section B • {evidenceList.length} Item{evidenceList.length > 1 ? 's' : ''} Documented
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {evidenceList.map((item, idx) => {
          const isSupporting = item.type === 'supporting';
          const isRefuting = item.type === 'refuting';

          return (
            <div
              key={idx}
              className={`p-4 border-2 transition flex items-start space-x-3 ${
                isSupporting
                  ? 'bg-[#f0fdf4] border-[#166534] text-[#14532d] shadow-[2px_2px_0px_#166534]'
                  : isRefuting
                  ? 'bg-[#fef2f2] border-[#991b1b] text-[#7f1d1d] shadow-[2px_2px_0px_#991b1b]'
                  : 'bg-[#fcf9f2] border-[#44403c] text-[#1c1917] shadow-[2px_2px_0px_#44403c]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isSupporting && <CheckCircle2 className="w-4 h-4 text-[#166534]" />}
                {isRefuting && <XCircle className="w-4 h-4 text-[#991b1b]" />}
                {!isSupporting && !isRefuting && <Info className="w-4 h-4 text-[#44403c]" />}
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2 border-b border-current pb-1">
                  <span className="font-typewriter text-[10px] font-bold uppercase tracking-wider">
                    [EXHIBIT {idx + 1}]: {item.type}
                  </span>
                  {item.source_title && (
                    <span className="font-typewriter text-[10px] truncate max-w-[150px] opacity-80">
                      {item.source_title}
                    </span>
                  )}
                </div>
                <p className="font-body-news text-sm leading-relaxed pt-0.5">
                  {item.point}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

