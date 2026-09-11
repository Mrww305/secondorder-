import React, { useState } from 'react';
import { 
  Sliders, 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  Check, 
  Plus, 
  Scale, 
  Database, 
  Coins, 
  ShieldCheck, 
  Building2, 
  Factory,
  HelpCircle
} from 'lucide-react';
import { PolicyDraft } from '../types';

interface PolicyEditorPanelProps {
  policy: PolicyDraft;
  sliders: PolicyDraft['defaultSliders'];
  onSliderChange: (key: keyof PolicyDraft['defaultSliders'], value: number) => void;
  onApplyPresetSliders: (preset: 'AGGRESSIVE_SOVEREIGNTY' | 'BALANCED_SANDBOX' | 'INDUSTRY_GROWTH') => void;
  onUpdatePolicyText: (newText: string) => void;
  onSimulate: () => void;
  isSimulating: boolean;
}

export const PolicyEditorPanel: React.FC<PolicyEditorPanelProps> = ({
  policy,
  sliders,
  onSliderChange,
  onApplyPresetSliders,
  onUpdatePolicyText,
  onSimulate,
  isSimulating,
}) => {
  const [activeTab, setActiveTab] = useState<'SLIDERS' | 'CLAUSES' | 'RAW_TEXT'>('SLIDERS');
  const [editedText, setEditedText] = useState(policy.rawText);

  // Severe threshold alerts
  const showFlightWarning = sliders.dataLocalizationStrictness > 70 && sliders.foreignAiIpTax > 15;
  const showTextileWarning = sliders.industry4GrantsPct < 30 && sliders.foreignAiIpTax > 10;
  const showCloudWarning = sliders.sovereignCloudComplianceMonths < 12;

  return (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 flex flex-col h-full text-[#E0E0E0]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#00E5FF]" />
          <h3 className="font-bold text-sm text-[#E0E0E0] tracking-wide font-mono">
            Phase 1 & 2: Policy Parameter Sandbox
          </h3>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center gap-1 bg-[#050505] p-1 rounded border border-[#1F1F1F] text-xs">
          <button
            onClick={() => setActiveTab('SLIDERS')}
            className={`px-2.5 py-1 rounded transition-all font-medium cursor-pointer ${
              activeTab === 'SLIDERS'
                ? 'bg-[#00E5FF] text-[#050505] font-bold shadow-[0_0_8px_rgba(0,229,255,0.25)]'
                : 'text-[#888888] hover:text-[#E0E0E0]'
            }`}
          >
            What-If Sliders
          </button>
          <button
            onClick={() => setActiveTab('CLAUSES')}
            className={`px-2.5 py-1 rounded transition-all font-medium cursor-pointer ${
              activeTab === 'CLAUSES'
                ? 'bg-[#00E5FF] text-[#050505] font-bold shadow-[0_0_8px_rgba(0,229,255,0.25)]'
                : 'text-[#888888] hover:text-[#E0E0E0]'
            }`}
          >
            Clauses ({policy.clauses.length})
          </button>
          <button
            onClick={() => setActiveTab('RAW_TEXT')}
            className={`px-2.5 py-1 rounded transition-all font-medium cursor-pointer ${
              activeTab === 'RAW_TEXT'
                ? 'bg-[#00E5FF] text-[#050505] font-bold shadow-[0_0_8px_rgba(0,229,255,0.25)]'
                : 'text-[#888888] hover:text-[#E0E0E0]'
            }`}
          >
            Gazette Draft
          </button>
        </div>
      </div>

      {/* Preset Strategy Buttons */}
      <div className="mt-3 flex items-center justify-between gap-2 text-[11px] font-mono">
        <span className="text-[#888888]">Policy Calibration Presets:</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => onApplyPresetSliders('AGGRESSIVE_SOVEREIGNTY')}
            className="px-2 py-0.5 bg-[#141414] hover:bg-[#1F1F1F] text-[#FF3333] border border-[#FF3333]/30 rounded transition-colors cursor-pointer"
            title="Max strictness, heavy foreign API tax"
          >
            Max Sovereignty
          </button>
          <button
            onClick={() => onApplyPresetSliders('BALANCED_SANDBOX')}
            className="px-2 py-0.5 bg-[#141414] hover:bg-[#1F1F1F] text-[#00E5FF] border border-[#00E5FF]/30 rounded transition-colors cursor-pointer"
            title="Safe-harbor sandbox with moderate subsidies"
          >
            Balanced Sandbox
          </button>
          <button
            onClick={() => onApplyPresetSliders('INDUSTRY_GROWTH')}
            className="px-2 py-0.5 bg-[#141414] hover:bg-[#1F1F1F] text-[#00FF41] border border-[#00FF41]/30 rounded transition-colors cursor-pointer"
            title="High Industry 4.0 grants and STZA tax holidays"
          >
            Ind 4.0 Growth
          </button>
        </div>
      </div>

      {/* Live Policy Friction Alerts */}
      {(showFlightWarning || showTextileWarning || showCloudWarning) && (
        <div className="mt-3 space-y-1.5">
          {showFlightWarning && (
            <div className="flex items-start gap-2 bg-[#FF3333]/10 border border-[#FF3333]/30 p-2 rounded text-xs text-[#FF8888] font-mono shadow-[0_0_8px_rgba(255,51,51,0.1)]">
              <AlertTriangle className="w-4 h-4 text-[#FF3333] shrink-0 mt-0.5" />
              <div>
                <strong>Critical Cascade Detected:</strong> Strict data localization ({sliders.dataLocalizationStrictness}%) + {sliders.foreignAiIpTax}% API tax projected to trigger 28%+ SECP startup inversion flight to UAE by Year 2.
              </div>
            </div>
          )}
          {showTextileWarning && (
            <div className="flex items-start gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 p-2 rounded text-xs text-[#FCD34D] font-mono">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <strong>Supply Chain Friction:</strong> Low Industry 4.0 grants ({sliders.industry4GrantsPct}%) with high tariffs will cause 70% of textile mills to defer smart loom modernization.
              </div>
            </div>
          )}
          {showCloudWarning && (
            <div className="flex items-start gap-2 bg-[#A855F7]/10 border border-[#A855F7]/30 p-2 rounded text-xs text-[#D8B4FE] font-mono">
              <AlertTriangle className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
              <div>
                <strong>NITB Capacity Risk:</strong> A {sliders.sovereignCloudComplianceMonths}-month grace period is shorter than domestic GPU data center commissioning lead time (18-24 months).
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Tab Content */}
      <div className="mt-3 flex-1 overflow-y-auto pr-1 space-y-3">
        {activeTab === 'SLIDERS' && (
          <div className="space-y-3">
            {/* Slider 1: Data Localization Strictness */}
            <div className="bg-[#0E0E0E] p-3 rounded border border-[#1C1C1C]">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-[#E0E0E0] flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#00E5FF]" />
                  Sovereign Data Localization Strictness
                </span>
                <span className="font-mono font-bold text-[#00E5FF] text-sm">
                  {sliders.dataLocalizationStrictness}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={sliders.dataLocalizationStrictness}
                onChange={(e) => onSliderChange('dataLocalizationStrictness', Number(e.target.value))}
                className="w-full h-1.5 bg-[#1F1F1F] rounded appearance-none cursor-pointer accent-[#00E5FF]"
              />
              <div className="flex justify-between text-[10px] text-[#888888] font-mono mt-1">
                <span>0% (Open Cross-Border)</span>
                <span>50% (Hybrid Safe-Harbor)</span>
                <span>100% (Strict On-Prem Only)</span>
              </div>
            </div>

            {/* Slider 2: Foreign AI IP Tax Rate */}
            <div className="bg-[#0E0E0E] p-3 rounded border border-[#1C1C1C]">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-[#E0E0E0] flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-[#FF3333]" />
                  Foreign AI API & Cloud Withholding Tax
                </span>
                <span className="font-mono font-bold text-[#FF3333] text-sm">
                  {sliders.foreignAiIpTax}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={sliders.foreignAiIpTax}
                onChange={(e) => onSliderChange('foreignAiIpTax', Number(e.target.value))}
                className="w-full h-1.5 bg-[#1F1F1F] rounded appearance-none cursor-pointer accent-[#FF3333]"
              />
              <div className="flex justify-between text-[10px] text-[#888888] font-mono mt-1">
                <span>0% (Zero Withholding)</span>
                <span>15% (Standard Corporate)</span>
                <span>35% (Equalization Surcharge)</span>
              </div>
            </div>

            {/* Slider 3: Sovereign Cloud Compliance Window */}
            <div className="bg-[#0E0E0E] p-3 rounded border border-[#1C1C1C]">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-[#E0E0E0] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                  Sovereign Cloud Compliance Window
                </span>
                <span className="font-mono font-bold text-[#00E5FF] text-sm">
                  {sliders.sovereignCloudComplianceMonths} Months
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="36"
                step="3"
                value={sliders.sovereignCloudComplianceMonths}
                onChange={(e) => onSliderChange('sovereignCloudComplianceMonths', Number(e.target.value))}
                className="w-full h-1.5 bg-[#1F1F1F] rounded appearance-none cursor-pointer accent-[#00E5FF]"
              />
              <div className="flex justify-between text-[10px] text-[#888888] font-mono mt-1">
                <span>6 Mo (Immediate Flash Cut)</span>
                <span>18 Mo (Phased Transition)</span>
                <span>36 Mo (Extended Sandbox)</span>
              </div>
            </div>

            {/* Slider 4: Industry 4.0 Modernization Grants */}
            <div className="bg-[#0E0E0E] p-3 rounded border border-[#1C1C1C]">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-[#E0E0E0] flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-[#00FF41]" />
                  Industry 4.0 Industrial Retrofitting Grant
                </span>
                <span className="font-mono font-bold text-[#00FF41] text-sm">
                  {sliders.industry4GrantsPct}% Matching
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={sliders.industry4GrantsPct}
                onChange={(e) => onSliderChange('industry4GrantsPct', Number(e.target.value))}
                className="w-full h-1.5 bg-[#1F1F1F] rounded appearance-none cursor-pointer accent-[#00FF41]"
              />
              <div className="flex justify-between text-[10px] text-[#888888] font-mono mt-1">
                <span>0% (Zero Subsidies)</span>
                <span>50% (Co-Funded CAPEX)</span>
                <span>100% (Fully Subsidized)</span>
              </div>
            </div>

            {/* Slider 5: R&D / STEM Subsidies Allocation */}
            <div className="bg-[#0E0E0E] p-3 rounded border border-[#1C1C1C]">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-[#E0E0E0] flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-[#A855F7]" />
                  National AI R&D Fund (Ignite & HEC)
                </span>
                <span className="font-mono font-bold text-[#A855F7] text-sm">
                  PKR {sliders.rndSubsidiesAllocation} Billion
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={sliders.rndSubsidiesAllocation}
                onChange={(e) => onSliderChange('rndSubsidiesAllocation', Number(e.target.value))}
                className="w-full h-1.5 bg-[#1F1F1F] rounded appearance-none cursor-pointer accent-[#A855F7]"
              />
            </div>

            {/* Slider 6: STZA Special Zone Exemption Window */}
            <div className="bg-[#0E0E0E] p-3 rounded border border-[#1C1C1C]">
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-[#E0E0E0] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                  STZA Special Zone Tax Holiday Window
                </span>
                <span className="font-mono font-bold text-[#F59E0B] text-sm">
                  {sliders.stzaExemptionWindowYears} Years
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={sliders.stzaExemptionWindowYears}
                onChange={(e) => onSliderChange('stzaExemptionWindowYears', Number(e.target.value))}
                className="w-full h-1.5 bg-[#1F1F1F] rounded appearance-none cursor-pointer accent-[#F59E0B]"
              />
            </div>
          </div>
        )}

        {activeTab === 'CLAUSES' && (
          <div className="space-y-3">
            {policy.clauses.map((c, i) => (
              <div
                key={i}
                className="bg-[#0E0E0E] border border-[#1C1C1C] p-3 rounded hover:border-[#00E5FF]/40 transition-colors"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-[#00E5FF]">
                    Clause {c.number}: {c.title}
                  </span>
                  <span className="bg-[#141414] text-[#AAAAAA] px-2 py-0.5 rounded text-[10px] font-mono border border-[#222222]">
                    {c.primaryImpactedEntity}
                  </span>
                </div>
                <p className="text-xs text-[#B0B0B0] leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'RAW_TEXT' && (
          <div className="flex flex-col h-full">
            <textarea
              value={editedText}
              onChange={(e) => {
                setEditedText(e.target.value);
                onUpdatePolicyText(e.target.value);
              }}
              className="w-full h-64 bg-[#050505] border border-[#1F1F1F] rounded p-3 text-xs font-mono text-[#E0E0E0] leading-relaxed focus:outline-none focus:border-[#00E5FF] resize-none"
              placeholder="Paste raw legislative draft text or statutory regulatory order (SRO)..."
            />
            <p className="text-[10px] text-[#888888] font-mono mt-1">
              Changes to gazette draft are parsed by GraphRAG and synchronized into the agent simulation loop.
            </p>
          </div>
        )}
      </div>

      {/* Run Simulation Footer Button */}
      <div className="mt-3 pt-3 border-t border-[#1F1F1F]">
        <button
          onClick={onSimulate}
          disabled={isSimulating}
          className="w-full py-2.5 px-4 bg-[#00E5FF] hover:bg-[#33EAFF] text-[#050505] font-bold rounded text-xs tracking-wider uppercase font-mono flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          {isSimulating ? 'Executing 10,000 Agent Interactions...' : 'Re-Run Parallel Macro Simulation'}
        </button>
      </div>
    </div>
  );
};
