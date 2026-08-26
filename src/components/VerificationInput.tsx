import React, { useState } from 'react';
import { Search, Globe, Key, Sliders, Atom, Landmark, HeartPulse, CircleDollarSign, ArrowRight } from 'lucide-react';
import { SampleClaim } from '../types';

interface VerificationInputProps {
  onVerify: (data: { text: string; url?: string; customTavilyKey?: string; depth?: 'standard' | 'deep' }) => void;
  isLoading: boolean;
  sampleClaims: SampleClaim[];
}

export const VerificationInput: React.FC<VerificationInputProps> = ({
  onVerify,
  isLoading,
  sampleClaims,
}) => {
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customTavilyKey, setCustomTavilyKey] = useState('');
  const [depth, setDepth] = useState<'standard' | 'deep'>('standard');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !inputUrl.trim()) return;
    onVerify({
      text: inputText || inputUrl,
      url: inputUrl.trim() || undefined,
      customTavilyKey: customTavilyKey.trim() || undefined,
      depth,
    });
  };

  const handleSelectBrief = (claimText: string) => {
    setInputText(claimText);
  };

  // 4 Curated News Briefs matching the reference image with newspaper column datelines
  const latestBriefs = [
    {
      slug: 'DISPATCH № 01',
      dateline: 'GENEVA WIRE',
      category: 'SCIENCE & COSMOS',
      icon: Atom,
      title: 'NASA James Webb Telescope Detects Atmospheric Biosignatures',
      quote: "‘Spectroscopic telemetry confirmed signatures of atmospheric water vapor and methane on habitable zone exoplanet...’",
      claim: 'NASA James Webb Space Telescope detected atmospheric water vapor and potential biosignatures on exoplanet K2-18b.',
    },
    {
      slug: 'WIRE № 02',
      dateline: 'NEW YORK DESK',
      category: 'FINANCIAL GAZETTE',
      icon: CircleDollarSign,
      title: 'Federal Reserve Convenes Emergency Session on Prime Rates',
      quote: "‘Unannounced weekend bulletin claims central banking authority enacted surprise emergency reality rate exemptions...’",
      claim: 'The Federal Reserve announced an emergency policy rate cut exception during unannounced weekend session.',
    },
    {
      slug: 'CHRONICLE № 03',
      dateline: 'MEDICAL RECORD',
      category: 'HEALTH & HYGIENE',
      icon: HeartPulse,
      title: 'Miracle Celery Protocol Purports Permanent Disease Cure',
      quote: "‘Sensational health broadsheets assert raw unpasteurized celery elixir permanently cures all autoimmune syndromes...’",
      claim: 'Drinking raw celery juice every morning permanently cures all autoimmune conditions and eliminates disease.',
    },
    {
      slug: 'TELEGRAPH № 04',
      dateline: 'GLOBAL DIPLOMACY',
      category: 'POLITICAL DESK',
      icon: Landmark,
      title: 'United Nations Drafts Sovereignty Charter for Machine Intelligence',
      quote: "‘Diplomatic rumors report international council convened to grant autonomous sovereign statehood to neural systems...’",
      claim: 'United Nations passed a binding resolution granting artificial intelligence systems full sovereign autonomy.',
    },
  ];

  return (
    <div className="space-y-6 text-[#11100e]">
      {/* Primary Headline and Subtitle in Antique Aged Parchment Paper Sheet */}
      <div className="parchment-sheet-card p-5 sm:p-6 text-[#120e0a] relative overflow-hidden">
        {/* Parchment Scroll Paper Background with 50% Transparency */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: "url('/parchment_scroll_paper.jpg')" }}
        ></div>

        <div className="relative z-10">
          {/* Subtle top dateline / seal banner */}
          <div className="flex items-center justify-between border-b border-[#2e2319]/35 pb-2 mb-3">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-[#241a12] text-sm">❦</span>
              <span className="font-typewriter text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-[#241a12]">
                OFFICIAL BUREAU DISPATCH • INQUIRY DESK
              </span>
            </div>
            <span className="font-typewriter text-[10px] text-[#3d2b1d] uppercase tracking-wider font-bold hidden sm:inline">
              PRESS PROOF N° 849
            </span>
          </div>

          <h2 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl text-[#0a0705] tracking-tight uppercase leading-tight drop-shadow-[0.5px_0.5px_0px_rgba(255,252,240,0.7)]">
            NEWS VERIFICATION &amp; FACT-CHECKING: <br className="hidden sm:inline" />
            AN ENGINE FOR THE TRUTH
          </h2>
          <p className="font-body-news italic text-base sm:text-lg text-[#1a130c] mt-2.5 font-semibold leading-relaxed drop-shadow-[0.5px_0.5px_0px_rgba(255,252,240,0.5)]">
            Cross-examine any news claim, rumor, article excerpt, and peer-checking grounding
          </p>

          {/* Bottom subtle rule with fleuron */}
          <div className="mt-3.5 pt-2 border-t border-[#2e2319]/25 flex items-center justify-between text-[10px] font-typewriter text-[#3d2b1d] uppercase tracking-wider font-semibold">
            <span>DEPARTMENT OF INVESTIGATION</span>
            <span className="font-serif">❧</span>
          </div>
        </div>
      </div>

      {/* Main Input Form with Ledger Grid & Side Options */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* Ruled Ledger Grid Input Area */}
          <div className="md:col-span-8 relative">
            <textarea
              id="input-claim-text"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              placeholder='Enter or paste any headline, rumor or empirical assertion to verify (e.g. "NASA detected water vapor on exoplanet zone")...'
              className="w-full h-full min-h-[145px] p-4 bg-ledger-grid border-2 border-[#11100e] font-body-news text-base text-[#11100e] placeholder-[#57534e] focus:outline-none focus:bg-[#fffffb] resize-none leading-relaxed shadow-[3px_3px_0px_#11100e] font-medium"
            />
          </div>

          {/* Side: Investigation Options Box */}
          <div className="md:col-span-4 flex flex-col justify-between gap-2.5">
            <div
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="bg-[#faf4e6] border-2 border-[#11100e] p-3 flex flex-col items-center justify-between text-center cursor-pointer hover:bg-[#f3e9d3] transition shadow-[3px_3px_0px_#11100e] h-full group"
            >
              <div className="w-full pb-1 border-b-2 border-[#11100e]">
                <span className="font-headline font-black text-xs uppercase tracking-wider text-[#11100e]">
                  INVESTIGATION OPTIONS
                </span>
              </div>

              {/* Vintage Antique Brass Meridian Globe */}
              <div className="my-1.5 relative flex items-center justify-center">
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {/* Brass Semi-Meridian Outer Caliper Ring */}
                  <div className="absolute inset-0 rounded-full border-[3px] border-[#8c6d3b] shadow-[0_2px_8px_rgba(80,50,20,0.3)] pointer-events-none opacity-90"></div>
                  
                  {/* Top and Bottom Brass Axis Mount Pins */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-2 bg-[#705326] border border-[#3e2c13] rounded-t-sm shadow-sm z-10"></div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#705326] border border-[#3e2c13] rounded-b-sm shadow-sm z-10"></div>

                  {/* Antique Sepia Parchment Cartography Globe Ball */}
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#4a351b] shadow-inner relative bg-[#e8d8b8] flex items-center justify-center">
                    <img
                      src="/antique_desk_globe.jpg"
                      alt="Antique Desk Globe"
                      className="w-full h-full object-cover object-center scale-110 group-hover:rotate-12 transition-transform duration-700 ease-out filter contrast-110 sepia-[0.2]"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = '/antique_desk_globe.jpg?t=' + Date.now();
                      }}
                    />
                    {/* Spherical lighting & shade overlay */}
                    <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_-8px_-8px_16px_rgba(40,25,10,0.5),inset_6px_6px_12px_rgba(255,250,230,0.4)] mix-blend-multiply"></div>
                  </div>

                  {/* Bureau Search Badge */}
                  <div className="absolute -bottom-1 -right-1 p-1.5 bg-[#2a1d12] text-[#f7eedc] border border-[#8c6d3b] rounded-full shadow-md z-20">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <span className="font-typewriter text-[11px] text-[#11100e] font-bold tracking-wide">
                {showAdvanced ? '[-] Close Settings' : '[+] Wire Verification'}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Action Bar: Status on Left + RUN VERIFICATION Button on Right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          {/* Left: Gemini & Grounding indicator */}
          <div className="flex items-center space-x-2 font-typewriter text-xs text-[#11100e]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#11100e] inline-block" />
            <span className="font-bold text-[#11100e]">Gemini 3.7 Flash</span>
            <span className="text-[#78716c]">•</span>
            <span className="font-medium text-[#292524]">Live Google Search Grounding</span>
          </div>

          {/* Right: Bold Heavy RUN VERIFICATION Button */}
          <button
            type="submit"
            disabled={isLoading || (!inputText.trim() && !inputUrl.trim())}
            className="w-full sm:w-auto px-7 py-3 bg-[#faf5e8] hover:bg-[#11100e] text-[#11100e] hover:text-[#fdfbf7] border-2 border-[#11100e] font-headline font-black text-sm uppercase tracking-widest transition shadow-[3px_3px_0px_#11100e] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#11100e] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center"
          >
            {isLoading ? 'ANALYZING WIRE DISPATCHES...' : 'RUN VERIFICATION'}
          </button>
        </div>

        {/* Advanced Drawer if Toggled */}
        {showAdvanced && (
          <div className="p-3.5 bg-[#f4eee1] border-2 border-[#1c1917] space-y-3 animate-fadeIn mt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-[10px] font-typewriter font-bold uppercase tracking-wider text-[#1c1917] mb-1">
                  Custom Tavily API Key (Deep Web Search)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#78716c]">
                    <Key className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="password"
                    value={customTavilyKey}
                    onChange={(e) => setCustomTavilyKey(e.target.value)}
                    placeholder="tvly-xxxxxxxx (Gemini Search used by default)"
                    className="w-full pl-8 pr-3 py-1 bg-[#fdfbf7] border border-[#1c1917] font-typewriter text-xs text-[#1c1917]"
                  />
                </div>
              </div>

              <div className="w-full sm:w-48">
                <label className="block text-[10px] font-typewriter font-bold uppercase tracking-wider text-[#1c1917] mb-1">
                  Investigation Depth
                </label>
                <select
                  value={depth}
                  onChange={(e) => setDepth(e.target.value as 'standard' | 'deep')}
                  className="w-full px-2.5 py-1 bg-[#fdfbf7] border border-[#1c1917] font-typewriter text-xs text-[#1c1917]"
                >
                  <option value="standard">Standard Wire Verification</option>
                  <option value="deep">Exhaustive Cross-Registry</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Latest Briefs - 4 Column Broadsheet Grid */}
      <div className="pt-4 border-t-2 border-[#1c1917]">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-[#1c1917] text-base">❦</span>
            <h3 className="font-headline font-black text-lg sm:text-xl text-[#1c1917] uppercase tracking-tight">
              LATEST WIRE BRIEFS &amp; SAMPLE DISPATCHES
            </h3>
          </div>
          <span className="font-typewriter text-[10px] text-[#594534] uppercase tracking-wider font-semibold">
            CLICK ANY COLUMN TO LOAD INTO DESK
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-2 border-[#1c1917] divide-y sm:divide-y-0 sm:divide-x-2 divide-[#1c1917] bg-[#fbf6ea] shadow-[3px_3px_0px_#1c1917]">
          {latestBriefs.map((brief, idx) => {
            const IconComponent = brief.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectBrief(brief.claim)}
                className="p-3.5 text-left bg-[#fbf6eb] hover:bg-[#f3e6cf] transition-all duration-200 group cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                {/* Vintage Newspaper Column Header */}
                <div>
                  {/* Slug and Icon */}
                  <div className="flex items-center justify-between border-b-2 border-[#1c1917] pb-1.5 mb-2">
                    <div className="flex flex-col">
                      <span className="font-typewriter text-[9px] uppercase tracking-widest font-bold text-[#5c4632]">
                        {brief.slug}
                      </span>
                      <span className="font-headline font-black text-[11px] sm:text-xs uppercase tracking-wider text-[#1c1917]">
                        {brief.category}
                      </span>
                    </div>
                    <div className="p-1 rounded-sm bg-[#ede2cc] border border-[#1c1917]/40 group-hover:bg-[#1c1917] group-hover:text-[#fbf6ea] transition-colors">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Dateline & Headline */}
                  <div className="mb-2">
                    <span className="font-typewriter text-[9px] uppercase tracking-wider font-bold text-[#6e1e18] mr-1.5">
                      [{brief.dateline}] —
                    </span>
                    <h4 className="font-headline font-bold text-xs sm:text-[13px] text-[#11100e] leading-snug group-hover:text-[#6e1e18] group-hover:underline decoration-1 underline-offset-2 transition-colors mt-0.5">
                      {brief.title}
                    </h4>
                  </div>

                  {/* Newspaper Excerpt Box */}
                  <div className="bg-[#f4ebd7]/80 p-2 border-l-2 border-[#3d2e20]/60 rounded-xs my-2">
                    <p className="font-body-news italic text-[11px] text-[#2c231a] leading-relaxed line-clamp-3">
                      {brief.quote}
                    </p>
                  </div>
                </div>

                {/* Newspaper Footer Action */}
                <div className="mt-2 pt-1.5 border-t border-[#1c1917]/25 flex items-center justify-between text-[10px] font-typewriter text-[#5c4632] group-hover:text-[#1c1917] font-semibold">
                  <span className="flex items-center space-x-1">
                    <span>☞</span>
                    <span className="uppercase tracking-wider">LOAD WIRE PROOF</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#6e1e18]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
