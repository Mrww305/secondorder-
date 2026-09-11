import React, { useState } from 'react';
import { 
  Terminal, 
  Play, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  CheckCircle2,
  Cpu,
  Layers,
  FileCode
} from 'lucide-react';

export const McpProtocolTerminal: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<'run_policy_simulation' | 'extract_second_order_effects' | 'draft_mitigating_sub_clauses' | 'fetch_live_macro_indicators'>('run_policy_simulation');
  const [isExecuting, setIsExecuting] = useState(false);
  const [responseLog, setResponseLog] = useState<string | null>(null);
  const [customArgs, setCustomArgs] = useState<string>(
    JSON.stringify(
      {
        policy_title: "Mandatory Sovereign Data Localization for Healthcare AI",
        horizon_years: 5,
        synthetic_agent_count: 10000,
        parameters: {
          data_localization_strictness: 85,
          foreign_ai_ip_tax: 20,
          sovereign_cloud_grace_months: 12
        }
      },
      null,
      2
    )
  );

  const handleToolChange = (tool: 'run_policy_simulation' | 'extract_second_order_effects' | 'draft_mitigating_sub_clauses' | 'fetch_live_macro_indicators') => {
    setSelectedTool(tool);
    if (tool === 'run_policy_simulation') {
      setCustomArgs(JSON.stringify({
        policy_title: "Mandatory Sovereign Data Localization for Healthcare AI",
        horizon_years: 5,
        synthetic_agent_count: 10000,
        parameters: {
          data_localization_strictness: 85,
          foreign_ai_ip_tax: 20,
          sovereign_cloud_grace_months: 12
        }
      }, null, 2));
    } else if (tool === 'extract_second_order_effects') {
      setCustomArgs(JSON.stringify({
        simulation_id: "SIM-NITB-2026-08",
        confidence_threshold: 0.85,
        target_entities: ["NITB", "SECP", "FBR", "SBP"]
      }, null, 2));
    } else if (tool === 'fetch_live_macro_indicators') {
      setCustomArgs(JSON.stringify({
        country_code: "PAK",
        sources: ["WORLD_BANK_V2", "OPEN_FOREX_GATEWAY", "SBP_STATISTICAL"]
      }, null, 2));
    } else {
      setCustomArgs(JSON.stringify({
        unintended_friction_id: "SOC-01",
        target_entity: "NITB",
        impacted_cohort: "TECH_FOUNDER",
        primary_clause_text: "Clause 1.1: All clinical and diagnostic AI training data must be stored exclusively on NITB-certified domestic infrastructure within 12 months."
      }, null, 2));
    }
  };

  const handleExecuteTool = async () => {
    setIsExecuting(true);
    try {
      let parsed = {};
      try {
        parsed = JSON.parse(customArgs);
      } catch (e) {
        parsed = { raw: customArgs };
      }

      const res = await fetch('/api/mcp/invoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolName: selectedTool,
          arguments: parsed,
        }),
      });

      const data = await res.json();
      setResponseLog(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseLog(JSON.stringify({ error: err?.message || 'Invocation failed' }, null, 2));
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 shadow-2xl text-[#E0E0E0] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#1F1F1F] pb-3 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF3333]/10 border border-[#FF3333]/30 flex items-center justify-center text-[#FF3333]">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#E0E0E0] tracking-wide font-mono">
              2026 Model Context Protocol (MCP) Live Tool Terminal
            </h3>
            <p className="text-[11px] font-mono text-[#888888]">
              Direct JSON-RPC tool invocation layer over Rust simulation engine and LLM drafting core
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 px-2 py-1 rounded flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
            MCP Server 2026.1 Ready
          </span>
        </div>
      </div>

      {/* Tool Selector */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        {(['run_policy_simulation', 'extract_second_order_effects', 'draft_mitigating_sub_clauses', 'fetch_live_macro_indicators'] as const).map((t) => (
          <button
            key={t}
            onClick={() => handleToolChange(t)}
            className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
              selectedTool === t
                ? 'bg-[#00E5FF] text-[#050505] font-bold border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                : 'bg-[#050505] text-[#888888] border-[#1F1F1F] hover:text-[#E0E0E0]'
            }`}
          >
            {t}()
          </button>
        ))}
      </div>

      {/* Two Column Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        {/* Left: Input Payload */}
        <div className="bg-[#050505] border border-[#1F1F1F] rounded-xl p-3 flex flex-col font-mono text-xs">
          <div className="flex justify-between items-center text-[11px] text-[#888888] border-b border-[#1F1F1F] pb-2 mb-2">
            <span className="text-[#00E5FF] font-semibold">TOOL INVOCATION ARGUMENTS (JSON)</span>
            <span>mcp://tools/{selectedTool}</span>
          </div>

          <textarea
            value={customArgs}
            onChange={(e) => setCustomArgs(e.target.value)}
            className="flex-1 w-full bg-[#0E0E0E] border border-[#222222] rounded p-3 text-[#E0E0E0] font-mono text-xs resize-none focus:outline-none focus:border-[#00E5FF] min-h-[260px]"
          />

          <button
            onClick={handleExecuteTool}
            disabled={isExecuting}
            className="mt-3 py-2 px-4 bg-[#00E5FF] hover:bg-[#33EAFF] text-[#050505] font-bold rounded text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-all disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isExecuting ? 'Invoking MCP Daemon...' : `Execute mcp.${selectedTool}()`}
          </button>
        </div>

        {/* Right: Output Console */}
        <div className="bg-[#050505] border border-[#1F1F1F] rounded-xl p-3 flex flex-col font-mono text-xs">
          <div className="flex justify-between items-center text-[11px] text-[#888888] border-b border-[#1F1F1F] pb-2 mb-2">
            <span className="text-[#00FF41] font-semibold">RESPONSE STREAM & TELEMETRY</span>
            <span>Protocol: JSON-RPC 2.0</span>
          </div>

          <pre className="flex-1 overflow-x-auto p-3 bg-[#0E0E0E] border border-[#222222] rounded text-[#00FF41] leading-relaxed font-mono min-h-[260px] whitespace-pre">
            {responseLog || `// Click "Execute mcp.${selectedTool}()" to invoke the tool and inspect the live engine output.\n// Supports parallel Rayon task scheduling and LLM mitigation dispatch.`}
          </pre>
        </div>
      </div>
    </div>
  );
};
