import React, { useState } from 'react';
import { SourceItem } from '../types';
import { ExternalLink, Globe, ShieldCheck, Newspaper, FileText, CheckCircle, Feather } from 'lucide-react';

interface SourcesGridProps {
  sources: SourceItem[];
}

export const SourcesGrid: React.FC<SourcesGridProps> = ({ sources }) => {
  const [selectedTier, setSelectedTier] = useState<'all' | '1' | '2' | '3'>('all');

  if (!sources || sources.length === 0) {
    return (
      <div className="newsprint-paper p-6 text-center text-[#57534e]">
        <Feather className="w-8 h-8 mx-auto text-[#78716c] mb-2" />
        <p className="font-body-news text-sm italic">
          No external press dispatches were indexed for this specific inquiry.
        </p>
      </div>
    );
  }

  const filteredSources = sources.filter((s) => {
    if (selectedTier === 'all') return true;
    return String(s.domain_tier) === selectedTier;
  });

  const tier1Count = sources.filter((s) => s.domain_tier === 1).length;
  const tier2Count = sources.filter((s) => s.domain_tier === 2).length;
  const tier3Count = sources.filter((s) => s.domain_tier === 3).length;

  const getTierBadge = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1:
        return {
          label: 'Tier 1 • Wire / Primary Agency',
          badgeClass: 'bg-[#1c1917] text-[#fdfbf7] border-[#1c1917]',
          icon: ShieldCheck,
        };
      case 2:
        return {
          label: 'Tier 2 • Verified Editorial Press',
          badgeClass: 'bg-[#f4eee1] text-[#1c1917] border-[#1c1917]',
          icon: Newspaper,
        };
      case 3:
      default:
        return {
          label: 'Tier 3 • Secondary / Regional',
          badgeClass: 'bg-[#e7e5e4] text-[#44403c] border-[#78716c]',
          icon: FileText,
        };
    }
  };

  return (
    <div className="newsprint-paper p-6 text-[#1c1917] space-y-5 animate-fadeIn">
      {/* Header & Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#1c1917]">
        <div>
          <div className="flex items-center space-x-2">
            <Feather className="w-4 h-4 text-[#1c1917]" />
            <h3 className="font-headline font-bold text-sm sm:text-base uppercase tracking-wider text-[#1c1917]">
              Section C: Primary Wire Citations & Bibliography
            </h3>
          </div>
          <p className="font-typewriter text-xs text-[#57534e] mt-0.5">
            Classified by institutional authority and editorial standards
          </p>
        </div>

        {/* Tier filter tabs */}
        <div className="flex items-center space-x-1 p-1 bg-[#f4eee1] border border-[#1c1917] text-xs">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-2.5 py-1 font-typewriter text-[11px] font-bold transition cursor-pointer ${
              selectedTier === 'all' ? 'bg-[#1c1917] text-[#fdfbf7]' : 'text-[#44403c] hover:text-[#1c1917]'
            }`}
          >
            All ({sources.length})
          </button>
          <button
            onClick={() => setSelectedTier('1')}
            className={`px-2.5 py-1 font-typewriter text-[11px] font-bold transition cursor-pointer ${
              selectedTier === '1' ? 'bg-[#1c1917] text-[#fdfbf7]' : 'text-[#44403c] hover:text-[#1c1917]'
            }`}
          >
            Tier 1 ({tier1Count})
          </button>
          <button
            onClick={() => setSelectedTier('2')}
            className={`px-2.5 py-1 font-typewriter text-[11px] font-bold transition cursor-pointer ${
              selectedTier === '2' ? 'bg-[#1c1917] text-[#fdfbf7]' : 'text-[#44403c] hover:text-[#1c1917]'
            }`}
          >
            Tier 2 ({tier2Count})
          </button>
          {tier3Count > 0 && (
            <button
              onClick={() => setSelectedTier('3')}
              className={`px-2.5 py-1 font-typewriter text-[11px] font-bold transition cursor-pointer ${
                selectedTier === '3' ? 'bg-[#1c1917] text-[#fdfbf7]' : 'text-[#44403c] hover:text-[#1c1917]'
              }`}
            >
              Tier 3 ({tier3Count})
            </button>
          )}
        </div>
      </div>

      {/* Grid of Clickable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map((source, idx) => {
          const badge = getTierBadge(source.domain_tier);
          const BadgeIcon = badge.icon;
          let hostname = source.publisher;
          if (!hostname) {
            try {
              hostname = new URL(source.url).hostname.replace('www.', '');
            } catch {
              hostname = 'Web Citation';
            }
          }

          return (
            <a
              key={idx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="newsprint-card p-4 flex flex-col justify-between space-y-3 transition group hover:bg-[#f4eee1] hover:border-[#1c1917]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-[#78716c]/30 pb-2 mb-2">
                  <span className={`inline-flex items-center space-x-1 text-[9px] font-typewriter font-bold px-2 py-0.5 border ${badge.badgeClass}`}>
                    <BadgeIcon className="w-3 h-3" />
                    <span>{badge.label}</span>
                  </span>

                  <span className="text-[10px] font-typewriter text-[#78716c] group-hover:text-[#1c1917] transition flex items-center space-x-1">
                    <span>{hostname}</span>
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                  </span>
                </div>

                <h4 className="font-headline font-bold text-sm text-[#1c1917] group-hover:underline transition line-clamp-2 leading-snug">
                  {source.title || source.url}
                </h4>

                {source.snippet && (
                  <p className="font-body-news text-xs text-[#44403c] mt-2 line-clamp-3 leading-relaxed">
                    "{source.snippet}"
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-[#78716c]/20 flex items-center justify-between text-[10px] font-typewriter text-[#78716c]">
                <span className="truncate max-w-[200px]">{source.url}</span>
                <span className="font-bold text-[#1c1917] group-hover:text-[#854d0e] group-hover:underline flex items-center space-x-0.5">
                  <span>Read Cable &rarr;</span>
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

