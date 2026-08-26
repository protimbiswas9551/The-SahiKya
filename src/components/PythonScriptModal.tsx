import React, { useState } from 'react';
import { X, Copy, Check, Download, Terminal, Play, Feather } from 'lucide-react';
import { STREAMLIT_APP_CODE } from '../pythonCode';

interface PythonScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonScriptModal: React.FC<PythonScriptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(STREAMLIT_APP_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([STREAMLIT_APP_CODE], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'app.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[90vh] newsprint-paper border-4 border-[#1c1917] shadow-[8px_8px_0px_#1c1917] flex flex-col overflow-hidden text-[#1c1917]">
        {/* Header */}
        <div className="px-6 py-4 border-b-2 border-[#1c1917] flex items-center justify-between bg-[#f4eee1]">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-[#1c1917] text-[#fdfbf7]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-base sm:text-lg text-[#1c1917] uppercase">
                Python Streamlit Source Code (<code className="font-typewriter text-[#854d0e]">app.py</code>)
              </h2>
              <p className="font-typewriter text-xs text-[#57534e]">
                Stand-alone implementation powered by <code className="font-bold">google-genai</code> and Streamlit.
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

        {/* Setup Banner */}
        <div className="p-4 bg-[#fcf9f2] border-b border-[#1c1917] text-xs text-[#44403c] space-y-2">
          <div className="flex items-center space-x-2 text-[#1c1917] font-typewriter font-bold uppercase">
            <Play className="w-3.5 h-3.5" />
            <span>Local Newsroom Machine Execution:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-typewriter text-[11px]">
            <div className="p-2.5 bg-[#f4eee1] border border-[#1c1917]">
              <span className="text-[#78716c]"># 1. Install dependencies</span>
              <div className="text-[#166534] font-bold mt-0.5">pip install streamlit google-genai</div>
            </div>
            <div className="p-2.5 bg-[#f4eee1] border border-[#1c1917]">
              <span className="text-[#78716c]"># 2. Run Press Application</span>
              <div className="text-[#166534] font-bold mt-0.5">streamlit run app.py</div>
            </div>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-4 overflow-y-auto font-typewriter text-xs bg-[#f4eee1] text-[#1c1917] leading-relaxed select-all">
          <pre className="p-4 bg-[#fcf9f2] border border-[#1c1917] overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
            {STREAMLIT_APP_CODE}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t-2 border-[#1c1917] bg-[#f4eee1] flex items-center justify-between">
          <span className="text-xs text-[#57534e] font-typewriter">
            Gemini 3.7 Flash Model + Google Search Grounding
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-4 py-2 bg-[#fdfbf7] hover:bg-[#efe6d5] border border-[#1c1917] text-xs font-typewriter font-bold text-[#1c1917] transition shadow-[2px_2px_0px_#1c1917] cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#166534]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Script'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-4 py-2 bg-[#1c1917] hover:bg-[#292524] text-[#fdfbf7] text-xs font-typewriter font-bold uppercase shadow-[2px_2px_0px_#78716c] transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download app.py</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

