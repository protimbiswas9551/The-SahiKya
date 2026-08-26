import React, { useEffect, useState } from 'react';
import { Search, Globe, CheckCircle2, Radio, Feather, RefreshCw } from 'lucide-react';

interface InvestigationProgressProps {
  claimText: string;
}

export const InvestigationProgress: React.FC<InvestigationProgressProps> = ({ claimText }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Wire Deconstruction', desc: 'Isolating verifiable factual assertions and temporal context', icon: Feather },
    { title: 'Telegraph & Wire Query', desc: 'Querying live news wires, institutional databases, and archives', icon: Globe },
    { title: 'Corroboration & Cross-Check', desc: 'Impartial cross-examination across Tier-1 and secondary reporting', icon: Search },
    { title: 'Editorial Verdict Composition', desc: 'Formulating objective reasoning and printing verdict stamp', icon: Radio },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="newsprint-paper p-6 text-[#1c1917] space-y-5 animate-fadeIn">
      <div className="flex items-center space-x-3 pb-3 border-b-2 border-[#1c1917]">
        <div className="h-8 w-8 bg-[#1c1917] text-[#fdfbf7] flex items-center justify-center">
          <RefreshCw className="w-4 h-4 animate-spin" />
        </div>
        <div>
          <h3 className="font-headline font-bold text-base text-[#1c1917] flex items-center space-x-2">
            <span>PRINTING PRESS INVESTIGATION IN PROGRESS</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#b91c1c] animate-pulse" />
          </h3>
          <p className="font-typewriter text-xs text-[#57534e] truncate max-w-xl">
            Typesetting inquiry: <span className="italic text-[#1c1917]">"{claimText.slice(0, 80)}{claimText.length > 80 ? '...' : ''}"</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;

          return (
            <div
              key={idx}
              className={`p-3.5 border-2 transition-all duration-300 ${
                isCurrent
                  ? 'bg-[#fdfbf7] border-[#1c1917] shadow-[3px_3px_0px_#1c1917]'
                  : isDone
                  ? 'bg-[#f0fdf4] border-[#166534] text-[#14532d]'
                  : 'bg-[#f4eee1] border-[#a8a29e] opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-current">
                <div
                  className={`h-6 w-6 flex items-center justify-center text-xs font-bold ${
                    isDone
                      ? 'bg-[#166534] text-white'
                      : isCurrent
                      ? 'bg-[#1c1917] text-white'
                      : 'bg-[#a8a29e] text-white'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className="font-typewriter text-[10px] font-bold">DESK 0{idx + 1}</span>
              </div>
              <h4 className="font-headline font-bold text-xs text-[#1c1917]">{step.title}</h4>
              <p className="font-body-news text-xs text-[#44403c] mt-1 leading-snug">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

