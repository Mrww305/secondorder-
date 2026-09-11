import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Building2, 
  Users, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { SecondOrderConsequence } from '../types';

interface SecondOrderInsightsPanelProps {
  consequences: SecondOrderConsequence[];
  onSelectConsequence: (consequence: SecondOrderConsequence) => void;
  selectedConsequenceId?: string;
  onAutoDraftSubClause: (consequence: SecondOrderConsequence) => void;
  isDrafting: boolean;
}

export const SecondOrderInsightsPanel: React.FC<SecondOrderInsightsPanelProps> = ({
  consequences,
  onSelectConsequence,
  selectedConsequenceId,
  onAutoDraftSubClause,
  isDrafting,
}) => {
  return (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 flex flex-col h-full text-[#E0E0E0]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#FF3333]" />
          <h3 className="font-bold text-sm text-[#E0E0E0] tracking-wide font-mono">
            Phase 4: Second-Order Cascades & Blind Spots
          </h3>
        </div>
        <span className="text-[10px] font-mono bg-[#FF3333]/10 text-[#FF8888] border border-[#FF3333]/30 px-2 py-0.5 rounded shadow-[0_0_8px_rgba(255,51,51,0.1)]">
          Top {consequences.length} Emergent Risks
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-[#888888] mt-2 leading-relaxed">
        Autonomous identification of non-linear macroeconomic feedbacks and unintended regulatory friction points extracted across the 10,000 synthetic agent population.
      </p>

      {/* Consequences List */}
      <div className="mt-3 flex-1 overflow-y-auto pr-1 space-y-3">
        {consequences.map((c) => {
          const isSelected = selectedConsequenceId === c.id;
          const isMitigated = c.severity === 'OPPORTUNITY';

          return (
            <div
              key={c.id}
              onClick={() => onSelectConsequence(c)}
              className={`p-3.5 rounded border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#141414] border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.18)] ring-1 ring-[#00E5FF]/50'
                  : 'bg-[#0E0E0E] border-[#1C1C1C] hover:border-[#333333] hover:bg-[#121212]'
              }`}
            >
              {/* Top Row: Rank & Severity */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#181818] text-[#E0E0E0] flex items-center justify-center font-mono text-[10px] font-bold border border-[#282828]">
                    #{c.rank}
                  </span>
                  <span className="text-[10px] font-mono text-[#888888]">{c.yearDiscovered}</span>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isMitigated
                      ? 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]/30'
                      : c.severity === 'CRITICAL_RISK'
                      ? 'bg-[#FF3333]/10 text-[#FF3333] border-[#FF3333]/30 animate-pulse'
                      : 'bg-[#F59E0B]/10 text-[#FCD34D] border-[#F59E0B]/30'
                  }`}
                >
                  {isMitigated ? 'MITIGATED' : c.severity.replace('_', ' ')}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-semibold text-xs text-[#E0E0E0] mt-2 leading-snug">
                {c.title}
              </h4>

              {/* Causal Chain Breadcrumbs */}
              <div className="mt-2.5 bg-[#050505] p-2 rounded border border-[#1C1C1C] text-[11px] font-mono">
                <div className="text-[10px] text-[#888888] uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#00E5FF]" />
                  Causal Chain Trigger:
                </div>
                <div className="flex flex-wrap items-center gap-1 text-[#E0E0E0] text-[10px]">
                  {c.causalChain.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="bg-[#111111] px-1.5 py-0.5 rounded text-[#00E5FF] border border-[#222222]">
                        {step}
                      </span>
                      {idx < c.causalChain.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-[#555555] shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Affected Entities & Stakeholders */}
              <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[#888888]">
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#888888]" />
                  <span>{c.affectedEntities.join(', ')}</span>
                </div>
                <div className="font-semibold text-[#FF3333]">
                  {c.economicImpactEstimate}
                </div>
              </div>

              {/* Auto-Draft Sub-Clause Button */}
              <div className="mt-3 pt-2 border-t border-[#1C1C1C] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#00E5FF] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {c.mitigatingSubClause ? 'Sub-Clause Ready' : 'LLM Mitigator'}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAutoDraftSubClause(c);
                  }}
                  disabled={isDrafting}
                  className="px-2.5 py-1 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 text-[#00E5FF] rounded text-[11px] font-medium font-mono flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Review Sub-Clause</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
