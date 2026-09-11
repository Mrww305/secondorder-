import React, { useState } from 'react';
import { 
  FileCode, 
  Layers, 
  Terminal, 
  Cpu, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  ChevronRight,
  Code2,
  FolderTree,
  Network
} from 'lucide-react';
import { ARCHITECTURAL_BLUEPRINT } from '../data/architecturalBlueprint';

export const ArchitectureInspector: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'SECTION_A' | 'SECTION_B' | 'SECTION_C_RUST' | 'SECTION_C_PYTHON' | 'SECTION_C_MCP' | 'SECTION_D'>('SECTION_A');
  const [copied, setCopied] = useState(false);

  const getActiveCode = () => {
    switch (activeSection) {
      case 'SECTION_A':
        return ARCHITECTURAL_BLUEPRINT.sectionA_Mermaid;
      case 'SECTION_B':
        return ARCHITECTURAL_BLUEPRINT.sectionB_MonorepoTree;
      case 'SECTION_C_RUST':
        return ARCHITECTURAL_BLUEPRINT.sectionC_RustCode;
      case 'SECTION_C_PYTHON':
        return ARCHITECTURAL_BLUEPRINT.sectionC_PythonMesaCode;
      case 'SECTION_C_MCP':
        return ARCHITECTURAL_BLUEPRINT.sectionC_McpServerCode;
      case 'SECTION_D':
        return ARCHITECTURAL_BLUEPRINT.sectionD_FrontendScaffolding;
      default:
        return '';
    }
  };

  const getLanguage = () => {
    if (activeSection === 'SECTION_A') return 'mermaid';
    if (activeSection === 'SECTION_B') return 'tree';
    if (activeSection === 'SECTION_C_RUST') return 'rust';
    if (activeSection === 'SECTION_C_PYTHON' || activeSection === 'SECTION_C_MCP') return 'python';
    return 'typescript';
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDossier = () => {
    const fullContent = `# LEGISLATIVE SECOND-ORDER EFFECT SIMULATION SANDBOX
NITB & MoITT Sovereign Architecture Blueprint (2026 Stack)

================================================================================
SECTION A: SYSTEM TOPOLOGY (MERMAID.JS)
================================================================================
\`\`\`mermaid
${ARCHITECTURAL_BLUEPRINT.sectionA_Mermaid}
\`\`\`

================================================================================
SECTION B: MONOREPO DIRECTORY STRUCTURE (TURBOREPO)
================================================================================
${ARCHITECTURAL_BLUEPRINT.sectionB_MonorepoTree}

================================================================================
SECTION C: CORE IMPLEMENTATION (RUST PARALLEL ENGINE)
================================================================================
${ARCHITECTURAL_BLUEPRINT.sectionC_RustCode}

================================================================================
SECTION C: PYTHON 3.13+ MESA MARL BEHAVIORAL FRAMEWORK
================================================================================
${ARCHITECTURAL_BLUEPRINT.sectionC_PythonMesaCode}

================================================================================
SECTION C: MODEL CONTEXT PROTOCOL (MCP) SERVER DAEMON
================================================================================
${ARCHITECTURAL_BLUEPRINT.sectionC_McpServerCode}

================================================================================
SECTION D: FRONTEND SCAFFOLDING (REACT 20 / NEXT.JS 16)
================================================================================
${ARCHITECTURAL_BLUEPRINT.sectionD_FrontendScaffolding}
`;

    const blob = new Blob([fullContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NITB_Sovereign_Simulation_Architecture_2026.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 shadow-2xl text-[#E0E0E0] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#1F1F1F] pb-3 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#E0E0E0] tracking-wide font-mono">
              2026 Production Architectural Blueprint & Code Scaffolding
            </h3>
            <p className="text-[11px] font-mono text-[#00E5FF]">
              Rust Rayon Core | Python 3.13 Mesa MARL | Microsoft GraphRAG | React 20 Concurrent UI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] text-[#E0E0E0] rounded text-xs font-mono transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00FF41]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Code'}</span>
          </button>

          <button
            onClick={handleDownloadDossier}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00E5FF] hover:bg-[#33EAFF] text-[#050505] font-bold rounded text-xs font-mono transition-colors shadow-[0_0_15px_rgba(0,229,255,0.25)] cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Full 2026 Dossier (.md)</span>
          </button>
        </div>
      </div>

      {/* Section Selector Buttons */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        <button
          onClick={() => setActiveSection('SECTION_A')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
            activeSection === 'SECTION_A'
              ? 'bg-[#00E5FF] text-[#050505] font-bold border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'bg-[#050505] text-[#888888] border-[#1F1F1F] hover:text-[#E0E0E0]'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>Section A: System Topology (Mermaid)</span>
        </button>

        <button
          onClick={() => setActiveSection('SECTION_B')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
            activeSection === 'SECTION_B'
              ? 'bg-[#00E5FF] text-[#050505] font-bold border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'bg-[#050505] text-[#888888] border-[#1F1F1F] hover:text-[#E0E0E0]'
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" />
          <span>Section B: Turborepo Monorepo</span>
        </button>

        <button
          onClick={() => setActiveSection('SECTION_C_RUST')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
            activeSection === 'SECTION_C_RUST'
              ? 'bg-[#00E5FF] text-[#050505] font-bold border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'bg-[#050505] text-[#888888] border-[#1F1F1F] hover:text-[#E0E0E0]'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Section C: Rust Engine (Rayon Loop)</span>
        </button>

        <button
          onClick={() => setActiveSection('SECTION_C_PYTHON')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
            activeSection === 'SECTION_C_PYTHON'
              ? 'bg-[#00E5FF] text-[#050505] font-bold border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'bg-[#050505] text-[#888888] border-[#1F1F1F] hover:text-[#E0E0E0]'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Section C: Python 3.13 Mesa MARL</span>
        </button>

        <button
          onClick={() => setActiveSection('SECTION_C_MCP')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
            activeSection === 'SECTION_C_MCP'
              ? 'bg-[#00E5FF] text-[#050505] font-bold border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'bg-[#050505] text-[#888888] border-[#1F1F1F] hover:text-[#E0E0E0]'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Section C: MCP Protocol Server</span>
        </button>

        <button
          onClick={() => setActiveSection('SECTION_D')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all cursor-pointer ${
            activeSection === 'SECTION_D'
              ? 'bg-[#00E5FF] text-[#050505] font-bold border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.3)]'
              : 'bg-[#050505] text-[#888888] border-[#1F1F1F] hover:text-[#E0E0E0]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Section D: React 20 / Next.js 16</span>
        </button>
      </div>

      {/* Code Viewer Panel */}
      <div className="bg-[#050505] rounded-xl border border-[#1F1F1F] p-4 font-mono text-xs overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2 mb-3 text-[#888888] text-[11px]">
          <span className="text-[#00E5FF] uppercase tracking-wider font-semibold">
            {activeSection.replace(/_/g, ' ')}
          </span>
          <span className="bg-[#0E0E0E] px-2 py-0.5 rounded border border-[#1F1F1F] text-[#CCCCCC]">
            Language: {getLanguage()}
          </span>
        </div>

        <pre className="overflow-x-auto max-h-[500px] text-[#CCCCCC] leading-relaxed font-mono whitespace-pre selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
          <code>{getActiveCode()}</code>
        </pre>
      </div>
    </div>
  );
};
