import React from 'react';
import { History, Trash2 } from 'lucide-react';
import { FactCheckResult } from '../types';

interface HistoryDrawerProps {
  history: FactCheckResult[];
  onSelectResult: (result: FactCheckResult) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  onSelectResult,
  onClearHistory,
}) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="newsprint-paper p-5 sm:p-6 text-[#1c1917] space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b-2 border-[#1c1917]">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-[#1c1917]" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-wider text-[#1c1917]">
            Archived Editions & Past Inquiries ({history.length})
          </h3>
        </div>

        <button
          onClick={onClearHistory}
          className="flex items-center space-x-1 font-typewriter text-xs text-[#78716c] hover:text-[#991b1b] transition cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Purge Archive</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {history.map((item, idx) => {
          const isTrue = item.verdict === 'True';
          const isFalse = item.verdict === 'False';
          const isMisleading = item.verdict === 'Misleading';

          let stampColor = 'border-[#44403c] text-[#44403c] bg-[#f4eee1]';
          if (isTrue) stampColor = 'border-[#166534] text-[#166534] bg-[#f0fdf4]';
          else if (isFalse) stampColor = 'border-[#991b1b] text-[#991b1b] bg-[#fef2f2]';
          else if (isMisleading) stampColor = 'border-[#b45309] text-[#b45309] bg-[#fffbeb]';

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectResult(item)}
              className="newsprint-card p-3 text-left transition hover:bg-[#f4eee1] hover:border-[#1c1917] group flex flex-col justify-between space-y-2 cursor-pointer shadow-[2px_2px_0px_#1c1917]"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9px] font-typewriter font-bold uppercase px-2 py-0.5 border ${stampColor}`}
                >
                  {item.verdict} • {item.truth_percentage}%
                </span>
                <span className="font-typewriter text-xs text-[#78716c] group-hover:text-[#1c1917]">
                  View &rarr;
                </span>
              </div>

              <p className="font-headline text-xs font-semibold text-[#1c1917] line-clamp-2 leading-snug">
                "{item.claim_analyzed}"
              </p>

              <div className="flex items-center justify-between text-[10px] font-typewriter text-[#78716c] pt-1 border-t border-[#78716c]/20">
                <span>{item.sources?.length || 0} citations</span>
                <span>{item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Archived'}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
