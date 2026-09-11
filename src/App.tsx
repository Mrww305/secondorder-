import React, { useState, useEffect, useTransition } from 'react';
import { Header } from './components/Header';
import { CausalLoop3DMap } from './components/CausalLoop3DMap';
import { PolicyEditorPanel } from './components/PolicyEditorPanel';
import { SecondOrderInsightsPanel } from './components/SecondOrderInsightsPanel';
import { MitigationSubClausePanel } from './components/MitigationSubClausePanel';
import { MacroMetricsDashboard } from './components/MacroMetricsDashboard';
import { ArchitectureInspector } from './components/ArchitectureInspector';
import { McpProtocolTerminal } from './components/McpProtocolTerminal';
import { AgentCohortInspector } from './components/AgentCohortInspector';
import { LiveDataPipelinePanel } from './components/LiveDataPipelinePanel';
import { PRESET_POLICIES } from './data/presetPolicies';
import { 
  LiveMacroPipelineData,
  PolicyDraft, 
  SecondOrderConsequence, 
  SimulationResult, 
  TimeHorizon 
} from './types';
import { 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  AlertCircle, 
  Layers, 
  ArrowRight,
  RotateCw,
  Globe2
} from 'lucide-react';

const EMPTY_CAUSAL_EDGES: any[] = [];
const EMPTY_SECOND_ORDER: any[] = [];
const EMPTY_MACRO_INDICATORS: any[] = [];
const EMPTY_SCORES: any = {};

export default function App() {
  const [activePolicy, setActivePolicy] = useState<PolicyDraft>(PRESET_POLICIES[0]);
  const [sliders, setSliders] = useState<PolicyDraft['defaultSliders']>(PRESET_POLICIES[0].defaultSliders);
  const [horizon, setHorizon] = useState<TimeHorizon>('3_YEAR');
  const [activeTab, setActiveTab] = useState<'WAR_ROOM' | 'TOPOLOGY_3D' | 'MACRO_METRICS' | 'AGENT_COHORTS' | 'ARCHITECTURE' | 'MCP_CONSOLE' | 'LIVE_PIPELINES'>('WAR_ROOM');
  
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [selectedConsequence, setSelectedConsequence] = useState<SecondOrderConsequence | null>(null);
  const [appliedMitigations, setAppliedMitigations] = useState<string[]>([]);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>('NITB');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Live Data Pipeline state
  const [livePipelineData, setLivePipelineData] = useState<LiveMacroPipelineData | null>(null);
  const [isRefreshingLiveFeeds, setIsRefreshingLiveFeeds] = useState(false);

  const fetchLiveMacroFeeds = async (forceRefresh = false) => {
    setIsRefreshingLiveFeeds(true);
    try {
      const url = forceRefresh ? '/api/live-data/macro?refresh=true' : '/api/live-data/macro';
      const res = await fetch(url);
      if (res.ok) {
        const data: LiveMacroPipelineData = await res.json();
        setLivePipelineData(data);
      }
    } catch (e) {
      console.error('Error fetching live macro data:', e);
    } finally {
      setIsRefreshingLiveFeeds(false);
    }
  };

  useEffect(() => {
    fetchLiveMacroFeeds();
  }, []);

  // Sync sliders when active policy changes
  useEffect(() => {
    setSliders(activePolicy.defaultSliders);
    setAppliedMitigations([]);
    setSelectedConsequence(null);
  }, [activePolicy.id]);

  // Run simulation whenever sliders, horizon, policy, or appliedMitigations change
  const executeSimulation = React.useCallback(async () => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          policyId: activePolicy.id,
          policyText: activePolicy.rawText,
          sliders,
          horizon,
          appliedMitigations,
        }),
      });

      if (!res.ok) throw new Error('Simulation network call failed');
      const data: SimulationResult = await res.json();

      startTransition(() => {
        setSimulationResult(data);
        if (data.livePipelineData) {
          setLivePipelineData(data.livePipelineData);
        }
        if (data.secondOrderEffects.length > 0) {
          setSelectedConsequence((prev) => prev ? (data.secondOrderEffects.find(e => e.id === prev.id) || data.secondOrderEffects[0]) : data.secondOrderEffects[0]);
        }
      });
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  }, [activePolicy.id, activePolicy.rawText, sliders, horizon, appliedMitigations]);

  useEffect(() => {
    executeSimulation();
  }, [executeSimulation]);

  const handleSliderChange = (key: keyof PolicyDraft['defaultSliders'], value: number) => {
    setSliders((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyPresetSliders = (preset: 'AGGRESSIVE_SOVEREIGNTY' | 'BALANCED_SANDBOX' | 'INDUSTRY_GROWTH') => {
    if (preset === 'AGGRESSIVE_SOVEREIGNTY') {
      setSliders({
        dataLocalizationStrictness: 95,
        foreignAiIpTax: 30,
        rndSubsidiesAllocation: 10,
        stzaExemptionWindowYears: 2,
        sovereignCloudComplianceMonths: 6,
        industry4GrantsPct: 15,
      });
    } else if (preset === 'BALANCED_SANDBOX') {
      setSliders({
        dataLocalizationStrictness: 55,
        foreignAiIpTax: 8,
        rndSubsidiesAllocation: 35,
        stzaExemptionWindowYears: 5,
        sovereignCloudComplianceMonths: 24,
        industry4GrantsPct: 45,
      });
    } else if (preset === 'INDUSTRY_GROWTH') {
      setSliders({
        dataLocalizationStrictness: 35,
        foreignAiIpTax: 0,
        rndSubsidiesAllocation: 60,
        stzaExemptionWindowYears: 8,
        sovereignCloudComplianceMonths: 36,
        industry4GrantsPct: 75,
      });
    }
  };

  const handleApplyMitigation = (consequenceId: string) => {
    if (!appliedMitigations.includes(consequenceId)) {
      setAppliedMitigations((prev) => [...prev, consequenceId]);
    } else {
      setAppliedMitigations((prev) => prev.filter((id) => id !== consequenceId));
    }
  };

  const handleRegenerateWithAi = async (customPrompt?: string) => {
    if (!selectedConsequence) return;
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/draft-mitigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consequenceTitle: selectedConsequence.title,
          originalClause: selectedConsequence.mitigatingSubClause.originalTextTarget,
          causalChain: selectedConsequence.causalChain,
          targetEntity: selectedConsequence.affectedEntities[0] || 'NITB',
          affectedCohort: selectedConsequence.affectedCohorts[0] || 'TECH_FOUNDER',
          policyContext: customPrompt || activePolicy.summary,
        }),
      });

      const drafted = await res.json();
      setSelectedConsequence((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          mitigatingSubClause: {
            ...prev.mitigatingSubClause,
            ...drafted,
          },
        };
      });
    } catch (err) {
      console.error('Drafting error:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleResetSimulation = () => {
    setSliders(activePolicy.defaultSliders);
    setAppliedMitigations([]);
    setSelectedConsequence(null);
  };

  const handleIngestCustomPolicy = (newPolicy: PolicyDraft) => {
    setActivePolicy(newPolicy);
    setSliders(newPolicy.defaultSliders);
    setAppliedMitigations([]);
    setSelectedConsequence(null);
    setActiveTab('WAR_ROOM');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] flex flex-col font-sans selection:bg-[#00E5FF] selection:text-[#050505] bg-grid-pattern">
      {/* Top Header & Sovereign Navigation */}
      <Header
        activePolicy={activePolicy}
        onSelectPolicy={setActivePolicy}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        horizon={horizon}
        onSelectHorizon={setHorizon}
        isSimulating={isSimulating}
        onResetSimulation={handleResetSimulation}
        mitigationCount={appliedMitigations.length}
        livePipelineData={livePipelineData || undefined}
      />

      {/* Main Content Body */}
      <main className="flex-1 p-3 sm:p-4 lg:p-5 max-w-[1720px] w-full mx-auto flex flex-col">
        {/* VIEW 1: UNIFIED POLICY WAR ROOM */}
        {activeTab === 'WAR_ROOM' && (
          <div className="space-y-4 flex-1 flex flex-col">
            {/* Top Row: Left Parameter Sandbox, Center 3D Topology, Right Second-Order Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
              {/* Left Column (4 cols): Policy What-If Parameter Sandbox */}
              <div className="lg:col-span-4 h-[580px] lg:h-[640px]">
                <PolicyEditorPanel
                  policy={activePolicy}
                  sliders={sliders}
                  onSliderChange={handleSliderChange}
                  onApplyPresetSliders={handleApplyPresetSliders}
                  onUpdatePolicyText={(text) => {
                    setActivePolicy((prev) => ({ ...prev, rawText: text }));
                  }}
                  onSimulate={executeSimulation}
                  isSimulating={isSimulating}
                />
              </div>

              {/* Center Column (5 cols): 3D Causal Loop Topology Map */}
              <div className="lg:col-span-5 h-[580px] lg:h-[640px] flex flex-col">
                <CausalLoop3DMap
                  causalEdges={simulationResult?.causalEdges || EMPTY_CAUSAL_EDGES}
                  entityFrictionScores={simulationResult?.entityFrictionScores || EMPTY_SCORES}
                  cohortSatisfactionScores={simulationResult?.cohortSatisfactionScores || EMPTY_SCORES}
                  selectedEntityId={selectedEntityId}
                  onSelectEntity={setSelectedEntityId}
                />
              </div>

              {/* Right Column (3 cols): Second-Order Extraction */}
              <div className="lg:col-span-3 h-[580px] lg:h-[640px]">
                <SecondOrderInsightsPanel
                  consequences={simulationResult?.secondOrderEffects || EMPTY_SECOND_ORDER}
                  onSelectConsequence={setSelectedConsequence}
                  selectedConsequenceId={selectedConsequence?.id}
                  onAutoDraftSubClause={(c) => setSelectedConsequence(c)}
                  isDrafting={isGeneratingAi}
                />
              </div>
            </div>

            {/* Bottom Row: Pre-Emptive Legal Sub-Clause Mitigator Diff Panel */}
            <div className="min-h-[280px]">
              <MitigationSubClausePanel
                consequence={selectedConsequence}
                onApplyMitigation={handleApplyMitigation}
                isApplied={selectedConsequence ? appliedMitigations.includes(selectedConsequence.id) : false}
                onRegenerateWithAi={handleRegenerateWithAi}
                isGenerating={isGeneratingAi}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: LIVE MACROECONOMIC & GAZETTE PIPELINES */}
        {activeTab === 'LIVE_PIPELINES' && (
          <LiveDataPipelinePanel
            liveData={livePipelineData}
            onRefreshLiveData={() => fetchLiveMacroFeeds(true)}
            isRefreshing={isRefreshingLiveFeeds}
            onIngestCustomPolicy={handleIngestCustomPolicy}
          />
        )}

        {/* VIEW 3: 3D CAUSAL TOPOLOGY EXPANDED */}
        {activeTab === 'TOPOLOGY_3D' && (
          <div className="space-y-4">
            <CausalLoop3DMap
              causalEdges={simulationResult?.causalEdges || EMPTY_CAUSAL_EDGES}
              entityFrictionScores={simulationResult?.entityFrictionScores || EMPTY_SCORES}
              cohortSatisfactionScores={simulationResult?.cohortSatisfactionScores || EMPTY_SCORES}
              selectedEntityId={selectedEntityId}
              onSelectEntity={setSelectedEntityId}
              fullScreenMode={false}
            />
          </div>
        )}

        {/* VIEW 4: MACROECONOMIC INDICATORS */}
        {activeTab === 'MACRO_METRICS' && (
          <MacroMetricsDashboard
            indicators={simulationResult?.macroIndicators || EMPTY_MACRO_INDICATORS}
            horizon={horizon}
            entityFrictionScores={simulationResult?.entityFrictionScores || EMPTY_SCORES}
            cohortSatisfactionScores={simulationResult?.cohortSatisfactionScores || EMPTY_SCORES}
            hasMitigations={appliedMitigations.length > 0}
          />
        )}

        {/* VIEW 5: 10,000 SYNTHETIC AGENT POPULATION */}
        {activeTab === 'AGENT_COHORTS' && (
          <AgentCohortInspector
            cohortSatisfactionScores={simulationResult?.cohortSatisfactionScores || EMPTY_SCORES}
            totalAgents={10000}
          />
        )}

        {/* VIEW 6: ARCHITECTURAL BLUEPRINT & CODE */}
        {activeTab === 'ARCHITECTURE' && (
          <ArchitectureInspector />
        )}

        {/* VIEW 7: MODEL CONTEXT PROTOCOL (MCP) TERMINAL */}
        {activeTab === 'MCP_CONSOLE' && (
          <McpProtocolTerminal />
        )}
      </main>

      {/* Sovereign Footer Bar */}
      <footer className="px-4 py-2.5 bg-[#0A0A0A] border-t border-[#1F1F1F] text-[#888888] text-xs font-mono flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[#AAAAAA]">NITB Macroeconomic Sandbox</span>
          <span className="text-[#1F1F1F]">|</span>
          <span className="text-[#00E5FF]">Rayon Parallel Ticks: {simulationResult?.rustTicksCompleted.toLocaleString() || '180,000'}</span>
          <span className="text-[#1F1F1F]">|</span>
          <span className="text-[#00FF41]">Latency: {simulationResult?.syntheticExecutionTimeMs || 48}ms</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#666666]">MoITT • SECP • SBP • FBR • PSEB • Ignite • HEC • MoIP/PEC • PTA</span>
        </div>
      </footer>
    </div>
  );
}
