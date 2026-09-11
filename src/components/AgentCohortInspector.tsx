import React, { useState } from 'react';
import { 
  Users, 
  Cpu, 
  Building2, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Activity,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';
import { STAKEHOLDER_COHORTS, GOVERNMENT_ENTITIES } from '../data/regulatoryWeb';
import { StakeholderCohortId } from '../types';

interface AgentCohortInspectorProps {
  cohortSatisfactionScores: Record<StakeholderCohortId, number>;
  totalAgents?: number;
}

export const AgentCohortInspector: React.FC<AgentCohortInspectorProps> = ({
  cohortSatisfactionScores,
  totalAgents = 10000,
}) => {
  const [selectedCohortId, setSelectedCohortId] = useState<StakeholderCohortId>('TECH_FOUNDER');
  const [agentSearch, setAgentSearch] = useState('');

  const activeCohort = STAKEHOLDER_COHORTS[selectedCohortId];
  const satisfaction = cohortSatisfactionScores[selectedCohortId] ?? 50;

  // Generate synthetic sample agents for inspection
  const sampleAgents = Array.from({ length: 8 }).map((_, i) => {
    const id = 1000 + i * 137;
    const isRelocated = selectedCohortId === 'TECH_FOUNDER' && satisfaction < 50 && i % 3 === 0;
    const isAutomated = selectedCohortId === 'TEXTILE_COO' && satisfaction > 60 && i % 2 === 0;

    return {
      id: `AGENT-${id}`,
      name: `${activeCohort.representativePersona.split(',')[0]} (Unit #${i + 1})`,
      runwayMonths: Math.max(3, Math.round(18 - (100 - satisfaction) * 0.15 + (i % 4) * 2)),
      complianceCostRatio: Number((0.04 + (100 - satisfaction) * 0.002 + (i % 3) * 0.01).toFixed(3)),
      digitalIndex: Number((0.2 + satisfaction * 0.007 + (i % 2) * 0.05).toFixed(2)),
      status: isRelocated ? 'FLIPPED_TO_UAE' : isAutomated ? 'INDUSTRY_4_ADOPTED' : 'OPERATIONAL_DOMESTIC',
      decisionLog: isRelocated
        ? 'Relocated holding company to ADGM due to FBR withholding & SBP FX delays'
        : isAutomated
        ? 'Installed PEC-certified optical yarn sensors with 30% matching grant'
        : 'Maintaining domestic compliance under standard regulatory sandbox',
    };
  });

  return (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 shadow-2xl text-[#E0E0E0] flex flex-col space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#1F1F1F] pb-3 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#E0E0E0] tracking-wide font-mono">
              Synthetic Population Micro-State Engine (10,000+ Agents)
            </h3>
            <p className="text-[11px] font-mono text-[#888888]">
              Parallel execution in Rust Rayon with Python 3.13 Mesa Multi-Agent Reinforcement Learning (MARL)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-[#050505] border border-[#1F1F1F] px-3 py-1 rounded text-[#00E5FF]">
            Total Pop: <strong>{totalAgents.toLocaleString()} Synthetic Agents</strong>
          </span>
        </div>
      </div>

      {/* Cohort Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {Object.values(STAKEHOLDER_COHORTS).map((cohort) => {
          const isSelected = selectedCohortId === cohort.id;
          const score = cohortSatisfactionScores[cohort.id] ?? 50;

          return (
            <button
              key={cohort.id}
              onClick={() => setSelectedCohortId(cohort.id)}
              className={`p-3 rounded border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#141414] border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.18)] ring-1 ring-[#00E5FF]/50'
                  : 'bg-[#0E0E0E] border-[#1F1F1F] hover:border-[#333333]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cohort.color }}
                  />
                  <span className="text-[10px] font-mono text-[#00E5FF] font-bold">
                    {(cohort.populationWeight * 100).toFixed(0)}% Pop
                  </span>
                </div>
                <h4 className="font-bold text-xs text-[#E0E0E0] line-clamp-1">{cohort.title}</h4>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1F1F1F] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#888888]">{cohort.sampleCount} Agents</span>
                <span className={score >= 50 ? 'text-[#00FF41] font-bold' : 'text-[#FF3333] font-bold'}>
                  {score}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Cohort Detail & Sample Synthetic Agents Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Cohort Profile & Regulatory Governance Web */}
        <div className="bg-[#050505] border border-[#1F1F1F] p-4 rounded-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-[#1F1F1F] pb-2">
            <span
              className="w-3.5 h-3.5 rounded"
              style={{ backgroundColor: activeCohort.color }}
            />
            <h4 className="font-bold text-sm text-[#E0E0E0]">{activeCohort.title}</h4>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#888888] font-semibold block text-[11px] font-mono">
                Representative Persona:
              </span>
              <p className="text-[#CCCCCC] mt-0.5 italic">{activeCohort.representativePersona}</p>
            </div>

            <div>
              <span className="text-[#888888] font-semibold block text-[11px] font-mono">
                Governing Pakistani Entities:
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {activeCohort.governingBodies.map((govId) => {
                  const g = GOVERNMENT_ENTITIES[govId];
                  return (
                    <span
                      key={govId}
                      className="bg-[#0E0E0E] border border-[#222222] px-2 py-0.5 rounded text-[10px] font-mono text-[#00E5FF]"
                    >
                      {g ? g.acronym : govId}
                    </span>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="text-[#888888] font-semibold block text-[11px] font-mono">
                Behavioral Model & Reaction Logic:
              </span>
              <p className="text-[#CCCCCC] mt-0.5 leading-relaxed">
                {activeCohort.behavioralModel}
              </p>
            </div>

            <div>
              <span className="text-[#F59E0B] font-semibold block text-[11px] font-mono">
                Core Constraints:
              </span>
              <ul className="list-disc list-inside text-[#CCCCCC] mt-1 space-y-1 text-[11px]">
                {activeCohort.coreConstraints.map((c, i) => (
                  <li key={i} className="leading-tight">{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Real-Time Synthetic Agent State Telemetry */}
        <div className="lg:col-span-2 bg-[#050505] border border-[#1F1F1F] p-4 rounded-xl flex flex-col space-y-3">
          <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00E5FF]" />
              <h4 className="font-bold text-xs text-[#E0E0E0] uppercase tracking-wider font-mono">
                Sample Live Agent State Vectors (Mesa Simulation Ticks)
              </h4>
            </div>
            <span className="text-[10px] font-mono text-[#888888]">
              Showing 8 of {activeCohort.sampleCount} Agents
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1F1F1F] text-[10px] text-[#888888] uppercase tracking-wider">
                  <th className="py-2 px-2">Agent ID</th>
                  <th className="py-2 px-2">Runway</th>
                  <th className="py-2 px-2">Compliance %</th>
                  <th className="py-2 px-2">Digital Index</th>
                  <th className="py-2 px-2">State Transition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F1F]">
                {sampleAgents.map((ag) => (
                  <tr key={ag.id} className="hover:bg-[#0E0E0E] transition-colors">
                    <td className="py-2.5 px-2 font-bold text-[#00E5FF]">{ag.id}</td>
                    <td className="py-2.5 px-2 text-[#CCCCCC]">{ag.runwayMonths} Mo</td>
                    <td className="py-2.5 px-2 text-[#FF8888]">{(ag.complianceCostRatio * 100).toFixed(1)}%</td>
                    <td className="py-2.5 px-2 text-[#00FF41]">{(ag.digitalIndex * 100).toFixed(0)}%</td>
                    <td className="py-2.5 px-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${
                          ag.status === 'FLIPPED_TO_UAE'
                            ? 'bg-[#FF3333]/10 text-[#FF3333] border-[#FF3333]/30'
                            : ag.status === 'INDUSTRY_4_ADOPTED'
                            ? 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]/30'
                            : 'bg-[#141414] text-[#888888] border-[#222222]'
                        }`}
                      >
                        {ag.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
