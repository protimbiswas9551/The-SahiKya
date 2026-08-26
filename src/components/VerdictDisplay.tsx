import React from 'react';
import { FactCheckResult, VerdictType } from '../types';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Shield,
  Layers,
  Download,
  Copy,
  Check,
  Award,
  Feather,
  BookOpen
} from 'lucide-react';

interface VerdictDisplayProps {
  result: FactCheckResult;
  onExportMarkdown: () => void;
  onExportJSON: () => void;
}

export const VerdictDisplay: React.FC<VerdictDisplayProps> = ({
  result,
  onExportMarkdown,
  onExportJSON,
}) => {
  const [copied, setCopied] = React.useState(false);

  const getVerdictTheme = (verdict: VerdictType) => {
    switch (verdict) {
      case 'True':
        return {
          stampClass: 'verdict-stamp-true',
          badgeText: 'OFFICIALLY VERIFIED • AUTHENTIC RECORD',
          stampColor: 'text-[#166534]',
          barColor: 'bg-[#166534]',
          icon: CheckCircle2,
          headline: 'CONFIRMED ACCURATE',
          subtitle: 'Corroborated by primary institutional documentation and Tier-1 wire reporting.',
        };
      case 'False':
        return {
          stampClass: 'verdict-stamp-false',
          badgeText: 'FABRICATED • REFUTED BY EVIDENCE',
          stampColor: 'text-[#991b1b]',
          barColor: 'bg-[#991b1b]',
          icon: XCircle,
          headline: 'REFUTED FALSEHOOD',
          subtitle: 'Directly contradicted by empirical data, official records, and verified eyewitness reporting.',
        };
      case 'Misleading':
        return {
          stampClass: 'verdict-stamp-misleading',
          badgeText: 'DECONTEXTUALIZED • SKEWED FRAMING',
          stampColor: 'text-[#b45309]',
          barColor: 'bg-[#b45309]',
          icon: AlertTriangle,
          headline: 'MISLEADING CONTEXT',
          subtitle: 'Contains a grain of truth but distorts timeline, causation, or key omissions.',
        };
      case 'Unverifiable':
      default:
        return {
          stampClass: 'verdict-stamp-unverifiable',
          badgeText: 'INSUFFICIENT PRIMARY PROOF',
          stampColor: 'text-[#44403c]',
          barColor: 'bg-[#44403c]',
          icon: HelpCircle,
          headline: 'UNVERIFIABLE WIRE',
          subtitle: 'Insufficient primary evidence or conflicting accounts at this time.',
        };
    }
  };

  const theme = getVerdictTheme(result.verdict);
  const VerdictIcon = theme.icon;
  const truthPct = typeof result.truth_percentage === 'number' ? result.truth_percentage.toFixed(1) : '50.0';

  const handleCopySummary = () => {
    const text = `📰 THE DAILY VERIFIER — FACT-CHECK DOSSIER\nVerdict: ${result.verdict.toUpperCase()} (${truthPct}% Confidence)\n\nClaim: "${result.claim_analyzed}"\n\nEditorial Reasoning: ${result.reasoning}\n\nDependency Analysis: ${result.dependency_analysis}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="newsprint-paper p-6 sm:p-8 text-[#1c1917] space-y-6 animate-fadeIn">
      {/* Top Editorial Dateline Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-[#1c1917]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-typewriter text-xs font-bold uppercase tracking-wider text-[#1c1917]">
              Special Investigative Report
            </span>
            {result.bias_rating && (
              <span className="px-2 py-0.5 text-[10px] font-typewriter font-bold bg-[#f4eee1] text-[#1c1917] border border-[#1c1917]">
                Framing: {result.bias_rating}
              </span>
            )}
          </div>
          <p className="font-typewriter text-xs text-[#57534e] mt-0.5">
            Wire Cross-Examination • {result.search_method_used || 'Google Search Grounding Wire'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="btn-copy-summary"
            onClick={handleCopySummary}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#fcf9f2] hover:bg-[#efe6d5] border border-[#1c1917] text-xs font-typewriter font-bold text-[#1c1917] transition shadow-[2px_2px_0px_#1c1917] cursor-pointer"
            title="Copy concise verdict text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#166534]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Dossier'}</span>
          </button>

          <button
            id="btn-export-markdown"
            onClick={onExportMarkdown}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1c1917] hover:bg-[#292524] text-[#fdfbf7] text-xs font-typewriter font-bold transition shadow-[2px_2px_0px_#78716c] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Gazette</span>
          </button>
        </div>
      </div>

      {/* Core Claim Lead Quote */}
      <div className="newsprint-inset p-5 text-center space-y-1">
        <span className="font-typewriter text-[10px] uppercase font-bold tracking-widest text-[#78716c]">
          — THE INVESTIGATED CLAIM UNDER SCRUTINY —
        </span>
        <blockquote className="font-headline text-lg sm:text-2xl font-bold text-[#1c1917] leading-snug italic max-w-4xl mx-auto">
          "{result.claim_analyzed}"
        </blockquote>
      </div>

      {/* Main Rubber Stamp & Confidence Meter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: The Grand Editorial Rubber Stamp */}
        <div 
          key={`verdict-card-${result.claim_analyzed}`}
          className={`lg:col-span-2 p-6 sm:p-7 ${theme.stampClass} flex flex-col justify-between transition-all duration-300 relative overflow-hidden animate-paper-impact`}
        >
          {/* Physical Stamped Stamp Badge watermark / seal in background */}
          <div className="absolute right-4 top-4 pointer-events-none opacity-15 hidden sm:block">
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-current flex items-center justify-center rotate-12">
              <span className="font-stamp text-xs uppercase text-center font-black">
                EDITORIAL VERIFICATION<br />★ 1898 ★<br />SEAL
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-current pb-2 mb-3">
              <span className="font-typewriter text-[11px] font-bold uppercase tracking-widest opacity-90">
                Official Gazette Verdict
              </span>
              
              {/* Dynamic Rubber Stamp Badge with Physical Drop-in & Slight-Shake Animation */}
              <div
                key={`badge-${result.claim_analyzed}-${result.verdict}`}
                className="animate-rubber-stamp stamp-seal-badge bg-white/60 border-2 border-current shadow-sm"
              >
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] tracking-widest font-bold">★</span>
                  <span className="text-xs sm:text-sm font-stamp font-black tracking-wider">
                    {result.verdict.toUpperCase()}
                  </span>
                  <span className="text-[10px] tracking-widest font-bold">★</span>
                </div>
              </div>
            </div>

            <div className="my-3 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-3">
                  <VerdictIcon className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" />
                  <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
                    {theme.headline}
                  </h2>
                </div>
                <p className="font-body-news text-base sm:text-lg opacity-90 leading-relaxed">
                  {theme.subtitle}
                </p>
              </div>

              {/* Large Inked Rubber Stamp Impression */}
              <div className="shrink-0 self-center sm:self-start pt-2">
                <div
                  key={`stamp-seal-${result.claim_analyzed}-${result.verdict}`}
                  className="animate-rubber-stamp stamp-seal-badge border-3 border-current px-4 py-2 text-center bg-white/70 shadow-md transform -rotate-6"
                >
                  <span className="text-[9px] font-typewriter tracking-widest uppercase opacity-85 block mb-0.5">
                    INVESTIGATION STATUS
                  </span>
                  <span className="text-xl sm:text-2xl font-stamp font-black tracking-widest block leading-tight">
                    [{result.verdict.toUpperCase()}]
                  </span>
                  <span className="text-[9px] font-typewriter tracking-widest uppercase opacity-85 block mt-0.5">
                    ACCURACY {truthPct}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-current flex flex-wrap items-center justify-between gap-2 font-typewriter text-xs font-bold">
            <span>VERDICT CLASSIFICATION: {result.verdict.toUpperCase()}</span>
            <span className="px-2 py-0.5 border border-current bg-white/50">
              TRUTH CONFIDENCE: {truthPct}%
            </span>
          </div>
        </div>

        {/* Right Col: The Newspaper Truth Barometer */}
        <div className="newsprint-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between font-typewriter text-xs font-bold text-[#1c1917] pb-2 border-b border-[#1c1917] mb-3">
              <span className="uppercase tracking-wider">TRUTH BAROMETER</span>
              <Award className="w-4 h-4 text-[#1c1917]" />
            </div>

            <div className="text-center my-3">
              <span className="font-headline font-black text-5xl sm:text-6xl text-[#1c1917]">
                {truthPct}
              </span>
              <span className="font-typewriter text-2xl font-bold text-[#78716c] ml-1">%</span>
              <p className="font-typewriter text-[11px] text-[#57534e] mt-1">
                Empirical Probability Rating
              </p>
            </div>

            {/* Vintage Inked Bar */}
            <div className="w-full bg-[#e7e5e4] h-4 border-2 border-[#1c1917] p-0.5">
              <div
                className={`h-full transition-all duration-1000 ${theme.barColor}`}
                style={{ width: `${Math.min(Math.max(Number(truthPct), 3), 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-[#78716c] font-typewriter mt-1.5 font-semibold">
              <span>0% Refuted</span>
              <span>50% Split</span>
              <span>100% Verified</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#78716c]/30 font-body-news text-xs text-[#57534e] italic">
            Calibrated against institutional wire consensus and primary sources.
          </div>
        </div>
      </div>

      {/* Editorial Reasoning Article Column with Drop-Cap */}
      <div className="newsprint-card p-6 sm:p-8 space-y-3">
        <div className="flex items-center space-x-2 pb-2 border-b-2 border-[#1c1917]">
          <Feather className="w-4 h-4 text-[#1c1917]" />
          <h3 className="font-headline font-bold text-sm sm:text-base uppercase tracking-wider text-[#1c1917]">
            Editorial Board Reasoning & Investigative Synthesis
          </h3>
        </div>
        
        <div className="pt-2">
          <p className="news-dropcap font-body-news text-base sm:text-lg text-[#292524] leading-relaxed text-justify">
            {result.reasoning}
          </p>
        </div>
      </div>

      {/* Source Dependency & Editorial Footnote */}
      <div className="newsprint-inset p-4 sm:p-5 flex items-start space-x-3">
        <div className="p-2 border border-[#1c1917] bg-[#fdfbf7] text-[#1c1917] shrink-0 mt-0.5">
          <Layers className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="font-typewriter text-xs font-bold text-[#1c1917] uppercase tracking-wide">
            Source Dependency & Attributive Reliability Note
          </h4>
          <p className="font-body-news text-sm text-[#44403c] leading-relaxed">
            {result.dependency_analysis}
          </p>
        </div>
      </div>
    </div>
  );
};

