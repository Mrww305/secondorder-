import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Scale, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  Copy, 
  Check, 
  FileCode,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SecondOrderConsequence } from '../types';

interface MitigationSubClausePanelProps {
  consequence: SecondOrderConsequence | null;
  onApplyMitigation: (consequenceId: string) => void;
  isApplied: boolean;
  onRegenerateWithAi?: (customPrompt?: string) => Promise<void>;
  isGenerating?: boolean;
}

export const MitigationSubClausePanel: React.FC<MitigationSubClausePanelProps> = ({
  consequence,
  onApplyMitigation,
  isApplied,
  onRegenerateWithAi,
  isGenerating = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showPromptInput, setShowPromptInput] = useState(false);

  if (!consequence) {
    return (
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-6 flex flex-col items-center justify-center text-center h-full text-[#888888]">
        <Scale className="w-10 h-10 text-[#333333] mb-3" />
        <h4 className="font-semibold text-[#E0E0E0] text-sm">Select an Unintended Cascade</h4>
        <p className="text-xs text-[#888888] mt-1 max-w-xs">
          Click any second-order consequence from the right panel to review and inject its AI-drafted mitigating sub-clause.
        </p>
      </div>
    );
  }

  const mit = consequence.mitigatingSubClause;

  const handleApply = () => {
    onApplyMitigation(consequence.id);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#00e5ff', '#00ff41', '#3b82f6', '#34d399'],
    });
  };

  const handleCopy = () => {
    if (mit?.proposedLegalText) {
      navigator.clipboard.writeText(
        `[${mit.clauseNumber}: ${mit.title}]\n${mit.proposedLegalText}\n\nLegal Rationale:\n${mit.legalRationale}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 flex flex-col h-full text-[#E0E0E0]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#00E5FF]" />
          <h3 className="font-bold text-sm text-[#E0E0E0] tracking-wide font-mono">
            Pre-Emptive Legal Sub-Clause Mitigator
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 bg-[#141414] hover:bg-[#1E1E1E] text-[#E0E0E0] rounded border border-[#262626] transition-colors text-xs flex items-center gap-1 font-mono cursor-pointer"
            title="Copy legal text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00FF41]" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="mt-3 flex-1 overflow-y-auto pr-1 space-y-3.5">
        {/* Context Target Banner */}
        <div className="bg-[#050505] p-3 rounded border border-[#1F1F1F] font-mono text-xs">
          <div className="text-[10px] text-[#888888] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Resolving Friction:</span>
            <span className="text-[#FF3333] font-bold">{consequence.severity.replace('_', ' ')}</span>
          </div>
          <p className="text-[#E0E0E0] font-sans font-semibold text-xs leading-snug">
            {consequence.title}
          </p>
        </div>

        {/* Clause Diff Container */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-[#888888] uppercase tracking-wider flex items-center justify-between">
            <span>Target Clause vs Mitigating Sub-Clause</span>
            <span className="text-[#00FF41] font-mono text-[11px]">
              -{mit?.expectedFrictionReductionPct ?? 80}% Projected Friction
            </span>
          </div>

          {/* Original Problematic Clause Target */}
          <div className="bg-[#FF3333]/10 border border-[#FF3333]/30 rounded p-3 text-xs">
            <span className="text-[10px] font-mono text-[#FF3333] font-bold block mb-1">
              ORIGINAL STATUTORY LANGUAGE:
            </span>
            <p className="text-[#FF9999] font-mono text-[11px] leading-relaxed line-through decoration-[#FF3333]/50">
              {mit?.originalTextTarget}
            </p>
          </div>

          {/* Proposed Mitigating Sub-Clause */}
          <div className="bg-[#00FF41]/10 border border-[#00FF41]/30 rounded p-3 text-xs shadow-[0_0_10px_rgba(0,255,65,0.05)]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono text-[#00FF41] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF41]" />
                {mit?.clauseNumber}: {mit?.title}
              </span>
              <span className="text-[10px] font-mono bg-[#00FF41]/20 text-[#00FF41] px-1.5 py-0.5 rounded border border-[#00FF41]/40">
                Safe Harbor Insert
              </span>
            </div>
            <p className="text-[#B9F6CA] font-mono text-[11px] leading-relaxed">
              "{mit?.proposedLegalText}"
            </p>
          </div>
        </div>

        {/* Legal Rationale & Statutory Mechanism */}
        <div className="bg-[#0E0E0E] border border-[#1F1F1F] p-3 rounded text-xs space-y-2">
          <div>
            <span className="text-[#888888] font-semibold block text-[11px] font-mono">
              Statutory Mechanism & Rationale:
            </span>
            <p className="text-[#CCCCCC] mt-1 leading-relaxed">
              {mit?.legalRationale}
            </p>
          </div>

          <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between font-mono text-[11px]">
            <span className="text-[#888888]">Macro Impact Forecast:</span>
            <span className="text-[#00E5FF] font-semibold">{mit?.projectedEconomicRecovery}</span>
          </div>
        </div>

        {/* AI Fine-tuning Prompt box (Optional) */}
        {showPromptInput && (
          <div className="bg-[#050505] border border-[#00E5FF]/40 p-2.5 rounded space-y-2">
            <label className="text-[10px] font-mono text-[#00E5FF] uppercase">
              Custom Legal Constraints for Gemini Drafter:
            </label>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Include 18-month tax rebate for textile IoT sensors..."
              className="w-full bg-[#0E0E0E] border border-[#262626] rounded px-2 py-1 text-xs text-[#E0E0E0] focus:outline-none focus:border-[#00E5FF] font-mono"
            />
            <div className="flex justify-end gap-1.5">
              <button
                onClick={() => setShowPromptInput(false)}
                className="px-2 py-0.5 bg-[#141414] hover:bg-[#1E1E1E] text-[#888888] rounded text-[11px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (onRegenerateWithAi) onRegenerateWithAi(customPrompt);
                  setShowPromptInput(false);
                }}
                disabled={isGenerating}
                className="px-2.5 py-0.5 bg-[#00E5FF] hover:bg-[#33EAFF] text-[#050505] font-bold rounded text-[11px] font-mono cursor-pointer"
              >
                {isGenerating ? 'Drafting...' : 'Generate with Gemini'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="mt-3 pt-3 border-t border-[#1F1F1F] flex items-center gap-2">
        <button
          onClick={() => setShowPromptInput(!showPromptInput)}
          className="p-2.5 bg-[#141414] hover:bg-[#1E1E1E] text-[#E0E0E0] border border-[#262626] rounded text-xs font-mono transition-colors cursor-pointer"
          title="Regenerate with Gemini"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin text-[#00E5FF]' : ''}`} />
        </button>

        <button
          onClick={handleApply}
          className={`flex-1 py-2.5 px-4 rounded font-bold text-xs tracking-wider uppercase font-mono flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
            isApplied
              ? 'bg-[#00FF41] text-[#050505] shadow-[0_0_15px_rgba(0,255,65,0.3)]'
              : 'bg-[#00FF41]/90 hover:bg-[#00FF41] text-[#050505] shadow-[0_0_15px_rgba(0,255,65,0.2)]'
          }`}
        >
          {isApplied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Enacted & Synchronized to Graph</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Enact & Patch Policy Draft</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
