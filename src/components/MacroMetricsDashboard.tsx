import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  Users, 
  BarChart3,
  Scale
} from 'lucide-react';
import { 
  GovernmentEntityId, 
  MacroIndicator, 
  StakeholderCohortId, 
  TimeHorizon 
} from '../types';
import { GOVERNMENT_ENTITIES, STAKEHOLDER_COHORTS } from '../data/regulatoryWeb';

interface MacroMetricsDashboardProps {
  indicators: MacroIndicator[];
  horizon: TimeHorizon;
  entityFrictionScores: Record<GovernmentEntityId, number>;
  cohortSatisfactionScores: Record<StakeholderCohortId, number>;
  hasMitigations: boolean;
}

export const MacroMetricsDashboard: React.FC<MacroMetricsDashboardProps> = ({
  indicators,
  horizon,
  entityFrictionScores,
  cohortSatisfactionScores,
  hasMitigations,
}) => {
  const getHorizonValue = (indicator: MacroIndicator) => {
    if (horizon === '1_YEAR') return indicator.year1;
    if (horizon === '3_YEAR') return indicator.year3;
    return indicator.year5;
  };

  return (
    <div className="space-y-6 text-[#E0E0E0]">
      {/* Top Macro Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {indicators.map((ind, idx) => {
          const curVal = getHorizonValue(ind);
          const diff = curVal - ind.baseline;
          const isFavorable = ind.isPositiveDirection ? diff >= 0 : diff <= 0;

          return (
            <div
              key={idx}
              className="bg-[#0A0A0A] border border-[#1F1F1F] p-4 rounded-xl shadow-lg flex flex-col justify-between hover:border-[#333333] transition-colors"
            >
              <div>
                <span className="text-[11px] font-mono text-[#888888] uppercase tracking-wider block mb-1">
                  {ind.name}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold font-mono text-[#E0E0E0]">
                    {curVal}
                  </span>
                  <span className="text-xs font-mono text-[#888888]">{ind.unit}</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1F1F1F] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1">
                  {isFavorable ? (
                    <TrendingUp className="w-3.5 h-3.5 text-[#00FF41]" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-[#FF3333]" />
                  )}
                  <span className={isFavorable ? 'text-[#00FF41]' : 'text-[#FF3333]'}>
                    {diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)} vs Base
                  </span>
                </div>

                <span className="text-[10px] text-[#888888]">
                  {horizon.replace('_', ' ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Regulatory Web Friction vs Synthetic Cohort Satisfaction */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: 10 Government Bodies Regulatory Web Status */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#00E5FF]" />
              <h3 className="font-bold text-sm text-[#E0E0E0] tracking-wide font-mono">
                Regulatory Web: 10 Pakistani Sovereign Bodies
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#888888]">
              Friction Index (-100 to +100)
            </span>
          </div>

          <div className="space-y-3">
            {Object.values(GOVERNMENT_ENTITIES).map((entity) => {
              const score = entityFrictionScores[entity.id] ?? 0;
              const isPositive = score >= 0;
              const barWidth = Math.min(100, Math.abs(score));

              return (
                <div key={entity.id} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: entity.color }}
                      />
                      <span className="font-semibold text-[#E0E0E0]">{entity.acronym}</span>
                      <span className="text-[11px] text-[#888888] hidden sm:inline truncate max-w-[220px]">
                        {entity.fullName}
                      </span>
                    </div>

                    <span
                      className={`font-mono font-bold text-xs ${
                        isPositive ? 'text-[#00FF41]' : 'text-[#FF3333]'
                      }`}
                    >
                      {score > 0 ? `+${score}` : score}
                    </span>
                  </div>

                  {/* Meter bar */}
                  <div className="w-full bg-[#050505] h-2 rounded overflow-hidden flex border border-[#1F1F1F]">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isPositive ? 'bg-[#00FF41]' : 'bg-[#FF3333]'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Synthetic Stakeholder Cohort Satisfaction */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#F59E0B]" />
              <h3 className="font-bold text-sm text-[#E0E0E0] tracking-wide font-mono">
                Synthetic Population Cohorts (10,000 Agents)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#888888]">
              Macro Viability (0 - 100%)
            </span>
          </div>

          <div className="space-y-4">
            {Object.values(STAKEHOLDER_COHORTS).map((cohort) => {
              const score = cohortSatisfactionScores[cohort.id] ?? 50;
              const isHealthy = score >= 50;

              return (
                <div
                  key={cohort.id}
                  className="bg-[#0E0E0E] border border-[#1F1F1F] p-3 rounded space-y-2"
                >
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: cohort.color }}
                      />
                      <span className="font-bold text-[#E0E0E0]">{cohort.title}</span>
                      <span className="text-[10px] font-mono text-[#888888] bg-[#050505] px-1.5 py-0.5 rounded border border-[#1F1F1F]">
                        {(cohort.populationWeight * 100).toFixed(0)}% Pop ({cohort.sampleCount} Agents)
                      </span>
                    </div>

                    <span
                      className={`font-mono font-bold text-xs ${
                        isHealthy ? 'text-[#00FF41]' : 'text-[#FF3333]'
                      }`}
                    >
                      {score}% Viability
                    </span>
                  </div>

                  <p className="text-[11px] text-[#888888] italic">
                    {cohort.representativePersona}
                  </p>

                  <div className="w-full bg-[#050505] h-2 rounded overflow-hidden border border-[#1F1F1F]">
                    <div
                      className={`h-full transition-all duration-500 ${
                        score > 70
                          ? 'bg-[#00FF41]'
                          : score > 45
                          ? 'bg-[#F59E0B]'
                          : 'bg-[#FF3333]'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
