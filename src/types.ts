export type GovernmentEntityId =
  | 'MOITT'
  | 'NITB'
  | 'SECP'
  | 'SBP'
  | 'FBR'
  | 'PSEB'
  | 'IGNITE'
  | 'HEC'
  | 'MOIP_PEC'
  | 'PTA';

export type StakeholderCohortId =
  | 'TEXTILE_COO'
  | 'TECH_FOUNDER'
  | 'RURAL_FARMER'
  | 'FOREIGN_INVESTOR'
  | 'FREELANCE_DEV'
  | 'FINTECH_OPERATOR';

export type TimeHorizon = '1_YEAR' | '3_YEAR' | '5_YEAR';

export type SimulationPhase =
  | 'PHASE_1_INGESTION'
  | 'PHASE_2_POPULATION'
  | 'PHASE_3_SIMULATION'
  | 'PHASE_4_MITIGATION';

export type ImpactType = 'POSITIVE_SYNERGY' | 'REGULATORY_FRICTION' | 'NEUTRAL_OR_MIXED';

export interface RegulatoryEntity {
  id: GovernmentEntityId;
  name: string;
  acronym: string;
  fullName: string;
  mandate: string;
  statutoryPower: string;
  frictionTriggers: string[];
  keyIncentives: string[];
  color: string;
  position3D: [number, number, number];
}

export interface StakeholderCohort {
  id: StakeholderCohortId;
  title: string;
  populationWeight: number; // e.g. 0.40 for 40%
  sampleCount: number; // e.g. 4000
  representativePersona: string;
  governingBodies: GovernmentEntityId[];
  coreConstraints: string[];
  behavioralModel: string;
  color: string;
  position3D: [number, number, number];
}

export interface CausalEdge {
  id: string;
  source: string; // Entity ID or Cohort ID
  target: string;
  label: string;
  impactType: ImpactType;
  frictionScore: number; // -100 to +100
  causalMechanism: string;
  clauseReference?: string;
  pulseSpeed?: number;
}

export interface MacroIndicator {
  name: string;
  baseline: number;
  year1: number;
  year3: number;
  year5: number;
  unit: string;
  isPositiveDirection: boolean;
  description: string;
}

export interface SecondOrderConsequence {
  id: string;
  rank: number;
  title: string;
  severity: 'CRITICAL_RISK' | 'HIGH_FRICTION' | 'OPPORTUNITY' | 'MODERATE_DRAG';
  yearDiscovered: 'Year 1' | 'Year 2-3' | 'Year 4-5';
  causalChain: string[];
  affectedEntities: GovernmentEntityId[];
  affectedCohorts: StakeholderCohortId[];
  economicImpactEstimate: string;
  unintendedMechanism: string;
  mitigatingSubClause: {
    clauseNumber: string;
    title: string;
    originalTextTarget: string;
    proposedLegalText: string;
    legalRationale: string;
    expectedFrictionReductionPct: number;
    projectedEconomicRecovery: string;
  };
}

export interface PolicyDraft {
  id: string;
  title: string;
  category: 'DATA_SOVEREIGNTY' | 'AI_GOVERNANCE' | 'DPI_FINTECH' | 'INDUSTRY_4_0' | 'TAX_AND_EXPORT';
  leadMinistry: GovernmentEntityId;
  summary: string;
  rawText: string;
  clauses: {
    number: string;
    title: string;
    text: string;
    primaryImpactedEntity: GovernmentEntityId;
  }[];
  defaultSliders: {
    dataLocalizationStrictness: number; // 0-100
    foreignAiIpTax: number; // 0-35%
    rndSubsidiesAllocation: number; // 0-100 (PKR B)
    stzaExemptionWindowYears: number; // 1-10
    sovereignCloudComplianceMonths: number; // 6-36
    industry4GrantsPct: number; // 0-100%
  };
}

export interface SimulationResult {
  policyId: string;
  horizon: TimeHorizon;
  timestamp: string;
  syntheticAgentCount: number;
  macroIndicators: MacroIndicator[];
  secondOrderEffects: SecondOrderConsequence[];
  causalEdges: CausalEdge[];
  entityFrictionScores: Record<GovernmentEntityId, number>; // -100 to 100
  cohortSatisfactionScores: Record<StakeholderCohortId, number>; // 0 to 100
  appliedMitigations: string[];
  graphRagCausalNodes: number;
  rustTicksCompleted: number;
  syntheticExecutionTimeMs: number;
  livePipelineData?: LiveMacroPipelineData;
}

export interface LiveWorldBankDataPoint {
  indicatorCode: string;
  indicatorName: string;
  latestValue: number;
  year: number;
  unit: string;
  source: string;
}

export interface LiveMacroPipelineData {
  status: 'ONLINE' | 'DEGRADED' | 'SYNCING';
  lastSynced: string;
  latencyMs: number;
  worldBank: {
    gdpGrowthPct: LiveWorldBankDataPoint;
    fdiNetInflowsMillionUsd: LiveWorldBankDataPoint;
    highTechExportsPct: LiveWorldBankDataPoint;
    ictExportsPct: LiveWorldBankDataPoint;
    rndExpenditurePctGdp: LiveWorldBankDataPoint;
    industryValueAddedPct: LiveWorldBankDataPoint;
    inflationCpiPct: LiveWorldBankDataPoint;
  };
  forexAndSbp: {
    usdPkrRate: number;
    exchangeRateDate: string;
    sbpPolicyRatePct: number;
    annualItExportsBillionUsd: number;
    raastDigitalTurnoverTrillionPkr: number;
    registeredSecpTechEntities: number;
    freelanceRemittanceMillionUsd: number;
  };
  liveGazetteSources: {
    sourceName: string;
    leadAgency: GovernmentEntityId;
    status: 'ACTIVE_GAZETTE' | 'DRAFT_WHITE_PAPER' | 'REGULATORY_FRAMEWORK';
    documentDate: string;
    urlReference: string;
  }[];
  activeConnections: {
    name: string;
    protocol: 'REST_V2' | 'JSON_RPC_2_0' | 'LLM_PIPELINE' | 'PARALLEL_RAYON';
    endpoint: string;
    isHealthy: boolean;
    pingMs: number;
  }[];
}

