import React from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Layers, 
  Activity, 
  FileCode, 
  Terminal, 
  Sparkles, 
  RotateCcw,
  CheckCircle2, 
  AlertTriangle,
  Globe2
} from 'lucide-react';
import { PRESET_POLICIES } from '../data/presetPolicies';
import { LiveMacroPipelineData, PolicyDraft, TimeHorizon } from '../types';

interface HeaderProps {
  activePolicy: PolicyDraft;
  onSelectPolicy: (policy: PolicyDraft) => void;
  activeTab: 'WAR_ROOM' | 'TOPOLOGY_3D' | 'MACRO_METRICS' | 'AGENT_COHORTS' | 'ARCHITECTURE' | 'MCP_CONSOLE' | 'LIVE_PIPELINES';
  onSelectTab: (tab: 'WAR_ROOM' | 'TOPOLOGY_3D' | 'MACRO_METRICS' | 'AGENT_COHORTS' | 'ARCHITECTURE' | 'MCP_CONSOLE' | 'LIVE_PIPELINES') => void;
  horizon: TimeHorizon;
  onSelectHorizon: (h: TimeHorizon) => void;
  isSimulating: boolean;
  onResetSimulation: () => void;
  mitigationCount: number;
  livePipelineData?: LiveMacroPipelineData;
}

export const Header: React.FC<HeaderProps> = ({
  activePolicy,
  onSelectPolicy,
  activeTab,
  onSelectTab,
  horizon,
  onSelectHorizon,
  isSimulating,
  onResetSimulation,
  mitigationCount,
  livePipelineData,
}) => {
  const usdPkr = livePipelineData?.forexAndSbp?.usdPkrRate || 278.45;
  const wbGdp = livePipelineData?.worldBank?.gdpGrowthPct?.latestValue || 2.38;

  return (
    <header className="bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1F1F1F] sticky top-0 z-50 text-[#E0E0E0]">
      {/* Top Banner: Sovereign Status & Engine Health */}
      <div className="px-4 py-2 bg-gradient-to-r from-[#050505] via-[#0A0A0A] to-[#050505] border-b border-[#1F1F1F] flex flex-wrap items-center justify-between text-xs gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#00FF41]/10 border border-[#00FF41]/30 px-2.5 py-1 rounded text-[#00FF41] font-mono shadow-[0_0_10px_rgba(0,255,65,0.1)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse shadow-[0_0_6px_#00FF41]" />
            <span className="font-semibold tracking-wider">NITB SOVEREIGN POLICY WAR ROOM</span>
            <span className="text-[#1F1F1F]">|</span>
            <span className="text-[#888888]">2026 Distributed Agent OS</span>
          </div>

          {/* Live Data Ticker */}
          <div className="hidden md:flex items-center gap-2 font-mono text-[#888888] bg-[#0E0E0E] px-2.5 py-1 rounded border border-[#1F1F1F]">
            <Globe2 className="w-3.5 h-3.5 text-[#00FF41]" />
            <span>LIVE DATA: <strong className="text-[#00FF41]">PKR {usdPkr}/$</strong> | <strong className="text-[#00E5FF]">WB GDP {wbGdp}%</strong></span>
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[#888888] bg-[#0E0E0E] px-2.5 py-1 rounded border border-[#1F1F1F]">
            <Cpu className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>RUST RAYON ENGINE: <strong className="text-[#00E5FF]">10,000 Agents / 60fps</strong></span>
          </div>

          <div className="hidden xl:flex items-center gap-2 font-mono text-[#888888] bg-[#0E0E0E] px-2.5 py-1 rounded border border-[#1F1F1F]">
            <Terminal className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>MCP PROTOCOL: <strong className="text-[#C084FC]">Active (v2026.1)</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {mitigationCount > 0 ? (
            <div className="flex items-center gap-1.5 bg-[#00FF41]/10 border border-[#00FF41]/40 text-[#00FF41] px-3 py-1 rounded font-mono text-xs shadow-[0_0_8px_rgba(0,255,65,0.15)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF41]" />
              <span>{mitigationCount} Mitigating Sub-Clauses Enacted</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-[#FF3333]/10 border border-[#FF3333]/30 text-[#FF3333] px-3 py-1 rounded font-mono text-xs shadow-[0_0_8px_rgba(255,51,51,0.1)]">
              <AlertTriangle className="w-3.5 h-3.5 text-[#FF3333] animate-pulse" />
              <span>3 Unintended 2nd-Order Friction Points Active</span>
            </div>
          )}

          <button
            onClick={onResetSimulation}
            className="flex items-center gap-1.5 bg-[#141414] hover:bg-[#1C1C1C] text-[#E0E0E0] px-2.5 py-1 rounded text-xs font-medium transition-colors border border-[#262626] hover:border-[#00E5FF]/40 cursor-pointer"
            title="Reset simulation parameters to default"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#888888]" />
            <span>Reset Sliders</span>
          </button>
        </div>
      </div>

      {/* Main Bar: Policy Selector, Time Horizons, Navigation Tabs */}
      <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Policy Selector */}
        <div className="flex items-center gap-3 min-w-[320px] max-w-xl">
          <div className="w-9 h-9 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] shrink-0 shadow-[0_0_10px_rgba(0,229,255,0.15)]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="policy-select" className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-widest flex items-center gap-1">
              Active Legislative Draft Ingestion
              {isSimulating && <span className="text-[#F59E0B] animate-pulse">• Simulating...</span>}
            </label>
            <select
              id="policy-select"
              value={activePolicy.id}
              onChange={(e) => {
                const found = PRESET_POLICIES.find((p) => p.id === e.target.value);
                if (found) onSelectPolicy(found);
              }}
              className="bg-[#0E0E0E] border border-[#222222] text-[#E0E0E0] text-xs sm:text-sm rounded px-2.5 py-1.5 font-medium focus:outline-none focus:border-[#00E5FF] hover:border-[#333333] transition-colors w-full cursor-pointer truncate"
            >
              {PRESET_POLICIES.map((p) => (
                <option key={p.id} value={p.id}>
                  [{p.leadMinistry}] {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Time Horizon Selector */}
        <div className="flex items-center gap-1 bg-[#0E0E0E] p-1 rounded border border-[#1F1F1F] font-mono text-xs">
          <span className="px-2 text-[#888888] text-[11px] uppercase tracking-wider hidden sm:inline">Horizon:</span>
          {(['1_YEAR', '3_YEAR', '5_YEAR'] as TimeHorizon[]).map((h) => {
            const label = h === '1_YEAR' ? '1-Year' : h === '3_YEAR' ? '3-Year' : '5-Year';
            const isActive = horizon === h;
            return (
              <button
                key={h}
                onClick={() => onSelectHorizon(h)}
                className={`px-3 py-1.5 rounded font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#00E5FF] text-[#050505] shadow-[0_0_12px_rgba(0,229,255,0.3)] font-bold'
                    : 'text-[#888888] hover:text-[#E0E0E0] hover:bg-[#161616]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Primary View Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-[#0E0E0E] p-1 rounded border border-[#1F1F1F] text-xs overflow-x-auto">
          <button
            onClick={() => onSelectTab('WAR_ROOM')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'WAR_ROOM'
                ? 'bg-[#181818] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_8px_rgba(0,229,255,0.15)]'
                : 'text-[#888888] hover:text-[#E0E0E0] hover:bg-[#141414]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Policy War Room</span>
          </button>

          <button
            onClick={() => onSelectTab('LIVE_PIPELINES')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'LIVE_PIPELINES'
                ? 'bg-[#181818] text-[#00FF41] border border-[#00FF41]/40 shadow-[0_0_8px_rgba(0,255,65,0.15)]'
                : 'text-[#888888] hover:text-[#E0E0E0] hover:bg-[#141414]'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-[#00FF41]" />
            <span>Live Data Feeds</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-ping" />
          </button>

          <button
            onClick={() => onSelectTab('TOPOLOGY_3D')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'TOPOLOGY_3D'
                ? 'bg-[#181818] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_8px_rgba(0,229,255,0.15)]'
                : 'text-[#888888] hover:text-[#E0E0E0] hover:bg-[#141414]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>3D Causal Graph</span>
          </button>

          <button
            onClick={() => onSelectTab('MACRO_METRICS')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'MACRO_METRICS'
                ? 'bg-[#181818] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_8px_rgba(0,229,255,0.15)]'
                : 'text-[#888888] hover:text-[#E0E0E0] hover:bg-[#141414]'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#00FF41]" />
            <span>Macro Indicators</span>
          </button>

          <button
            onClick={() => onSelectTab('AGENT_COHORTS')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'AGENT_COHORTS'
                ? 'bg-[#181818] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_8px_rgba(0,229,255,0.15)]'
                : 'text-[#888888] hover:text-[#E0E0E0] hover:bg-[#141414]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Synthetic Cohorts (10k)</span>
          </button>

          <button
            onClick={() => onSelectTab('ARCHITECTURE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'ARCHITECTURE'
                ? 'bg-[#181818] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_8px_rgba(0,229,255,0.15)]'
                : 'text-[#888888] hover:text-[#E0E0E0] hover:bg-[#141414]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>Architecture & Code</span>
          </button>

          <button
            onClick={() => onSelectTab('MCP_CONSOLE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'MCP_CONSOLE'
                ? 'bg-[#181818] text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_8px_rgba(0,229,255,0.15)]'
                : 'text-[#888888] hover:text-[#E0E0E0] hover:bg-[#141414]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#FF3333]" />
            <span>MCP Protocol Terminal</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

