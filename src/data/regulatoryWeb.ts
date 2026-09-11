import { GovernmentEntityId, RegulatoryEntity, StakeholderCohort, StakeholderCohortId } from '../types';

export const GOVERNMENT_ENTITIES: Record<GovernmentEntityId, RegulatoryEntity> = {
  MOITT: {
    id: 'MOITT',
    name: 'MoITT',
    acronym: 'MoITT',
    fullName: 'Ministry of Information Technology & Telecommunication',
    mandate: 'National digital economy targets, nationwide 5G rollout, sovereign digital backbone, and ICT cross-sector harmonization.',
    statutoryPower: 'Cabinet-level ICT policy formulation, budget allocation for digital infrastructure, and inter-agency coordination.',
    frictionTriggers: [
      'Slow inter-ministerial consensus on data classification',
      'Under-funded broadband universal service funds in rural clusters',
      'Conflicting mandates with PTA on commercial spectrum pricing'
    ],
    keyIncentives: ['Achieving $10B IT export run-rate', 'Broadband penetration >75%', '5G industrial testbed deployments'],
    color: '#06b6d4', // Cyan
    position3D: [0, 4.2, 0],
  },
  NITB: {
    id: 'NITB',
    name: 'NITB',
    acronym: 'NITB',
    fullName: 'National Information Technology Board',
    mandate: 'Digital Public Infrastructure (DPI), sovereign cloud data frameworks, government tech stack modernization, and national digital ID integration.',
    statutoryPower: 'Technical clearance for federal procurement, national API gateway governance, and public sector data hosting compliance.',
    frictionTriggers: [
      'Stringent on-premise sovereign hosting requirements choking early startups',
      'Legacy government department reluctance to adopt unified cloud APIs',
      'Shortage of distributed systems & cryptography engineers'
    ],
    keyIncentives: ['Zero single points of failure in sovereign DPI', '100% paperless federal workflows', 'National Data Exchange Layer (NDEL) adoption'],
    color: '#3b82f6', // Blue
    position3D: [-3.8, 2.5, 1.5],
  },
  SECP: {
    id: 'SECP',
    name: 'SECP',
    acronym: 'SECP',
    fullName: 'Securities and Exchange Commission of Pakistan',
    mandate: 'Startup incorporation, regulatory sandboxes for AI & FinTech, venture capital fund domiciliation, and corporate digital registry.',
    statutoryPower: 'Companies Act enforcement, regulatory sandbox licensing waivers, VC fund registration, and convertible equity issuance rules.',
    frictionTriggers: [
      'Complex winding-up and SAFE note equity conversion hurdles',
      'Strict foreign beneficial ownership disclosure slowing overseas VC investments',
      'High capital adequacy requirements for sandbox graduation'
    ],
    keyIncentives: ['Doubling active VC deals', 'Single-day digital company incorporation', 'AI/FinTech Sandbox throughput'],
    color: '#8b5cf6', // Purple
    position3D: [3.8, 2.5, 1.5],
  },
  SBP: {
    id: 'SBP',
    name: 'SBP',
    acronym: 'SBP',
    fullName: 'State Bank of Pakistan',
    mandate: 'Raast instant digital payment infrastructure, financial inclusion mandates, cross-border remittance/SaaS payment channels, and Digital Bank licensing.',
    statutoryPower: 'Foreign Exchange Regulation Act (FERA), banking supervision, open-banking API standards, and cross-border capital repatriation approvals.',
    frictionTriggers: [
      'Strict outward foreign currency remittance limits for cloud/API licensing',
      'FX retention quotas for tech exporters causing overseas shell company creation',
      'Prolonged approvals for international merchant payment gateways'
    ],
    keyIncentives: ['100% digital retail transaction volume via Raast', 'Foreign FX reserve preservation', 'Formalization of freelance earnings'],
    color: '#10b981', // Emerald
    position3D: [-4.5, -0.5, 2.0],
  },
  FBR: {
    id: 'FBR',
    name: 'FBR',
    acronym: 'FBR',
    fullName: 'Federal Board of Revenue',
    mandate: 'IT export tax exemptions & withholding tax regimes, digital service sales taxation, and automated R&D tax credit verification.',
    statutoryPower: 'Income Tax Ordinance & Sales Tax Act enforcement, point-of-sale integration, and tax audit execution.',
    frictionTriggers: [
      'Sudden retrospective withholding taxes on software exports and freelancing',
      'Lengthy tax refund reconciliation for STZA-registered technology enterprises',
      'Ambiguity regarding taxation of digital tokens, AI compute credits, and SaaS subscriptions'
    ],
    keyIncentives: ['Expanding the national tax net without throttling nascent tech growth', 'Eliminating cash-based informal economies'],
    color: '#ef4444', // Red
    position3D: [4.5, -0.5, 2.0],
  },
  PSEB: {
    id: 'PSEB',
    name: 'PSEB',
    acronym: 'PSEB',
    fullName: 'Pakistan Software Export Board',
    mandate: 'Export target orchestration, freelance ecosystem enablement, international roadshows, and Special Technology Zones (STZA) operational liaison.',
    statutoryPower: 'IT company registration, foreign buyer dispute resolution support, and subsidized international data center bandwidth.',
    frictionTriggers: [
      'Under-representation of regional Tier-2/Tier-3 software houses',
      'Fragmented marketing of Pakistani AI capabilities in North America/GCC',
      'Bureaucratic delays in freelance accreditation and specialized workspace subsidies'
    ],
    keyIncentives: ['Reaching $15B in certified tech exports', 'Upskilling 500k freelancers into high-value AI engineers'],
    color: '#f59e0b', // Amber
    position3D: [-3.2, -3.2, 0],
  },
  IGNITE: {
    id: 'IGNITE',
    name: 'Ignite',
    acronym: 'Ignite',
    fullName: 'National Technology Fund',
    mandate: 'National Incubation Centers (NICs), seed startup grants, deep-tech research financing, and university-industry linkage programs.',
    statutoryPower: 'Grant disbursement criteria, R&D equity-free funding allocation, and DigiSkills program oversight.',
    frictionTriggers: [
      'Long grant milestone reimbursement cycles',
      'Low commercialization rates for university-originated patent grants',
      'Limited follow-on growth equity mechanisms for pre-seed recipients'
    ],
    keyIncentives: ['Fund 200+ high-potential deep-tech startups annually', 'Commercialize 50+ IoT/AI university patents'],
    color: '#ec4899', // Pink
    position3D: [3.2, -3.2, 0],
  },
  HEC: {
    id: 'HEC',
    name: 'HEC',
    acronym: 'HEC',
    fullName: 'Higher Education Commission',
    mandate: 'STEM curriculum overhaul, National Center of AI (NCAI) research grants, faculty AI retraining, and university accreditation.',
    statutoryPower: 'University curriculum directives, research endowment fund allocation, and doctoral degree recognition.',
    frictionTriggers: [
      'Slow syllabus updating cycle (average 3-4 years behind frontier LLMs)',
      'Brain drain of senior computing faculty to overseas universities and startups',
      'Mismatches between theoretical curricula and enterprise Industry 4.0 requirements'
    ],
    keyIncentives: ['Graduating 50,000 production-ready AI & embedded systems engineers/year', 'Establishing world-class compute clusters in universities'],
    color: '#6366f1', // Indigo
    position3D: [-1.8, -4.5, -1.5],
  },
  MOIP_PEC: {
    id: 'MOIP_PEC',
    name: 'MoIP & PEC',
    acronym: 'MoIP & PEC',
    fullName: 'Ministry of Industries & Production & Pakistan Engineering Council',
    mandate: 'Industry 4.0 automation adoption, textile sector modernization, IoT hardware standards, and local electronics manufacturing incentives.',
    statutoryPower: 'Industrial duty concessions (SROs), engineering practice certifications, and industrial cluster automation subsidies.',
    frictionTriggers: [
      'High import duties on advanced robotic actuators and edge AI sensors',
      'Legacy textile mill reluctance to replace mechanical looms with smart IoT looms',
      'PEC resistance to fast-tracking software & AI engineering professional accreditations'
    ],
    keyIncentives: ['30% reduction in textile manufacturing energy waste via IoT', 'Local assembly of industrial automation controllers'],
    color: '#14b8a6', // Teal
    position3D: [1.8, -4.5, -1.5],
  },
  PTA: {
    id: 'PTA',
    name: 'PTA',
    acronym: 'PTA',
    fullName: 'Pakistan Telecommunication Authority',
    mandate: 'Telecom spectrum allocation, submarine cable landing stations, data localization enforcement, and infrastructure QoS regulation.',
    statutoryPower: 'Telecom licensing, frequency spectrum auction rules, critical infrastructure data routing directives, and network security compliance.',
    frictionTriggers: [
      'High spectrum reserve prices discouraging rapid 5G infrastructure rollout',
      'Aggressive content firewalling and IP throttling disrupting remote tech workers and cloud APIs',
      'Strict telecom data retention mandates raising capital expenditure for ISPs'
    ],
    keyIncentives: ['Ensuring 99.999% sovereign network uptime', 'Maximizing spectrum auction revenues without stalling private telecom CAPEX'],
    color: '#e11d48', // Rose
    position3D: [0, 1.0, 3.5],
  },
};

export const STAKEHOLDER_COHORTS: Record<StakeholderCohortId, StakeholderCohort> = {
  TEXTILE_COO: {
    id: 'TEXTILE_COO',
    title: 'Textile Mill COOs & Industrialists',
    populationWeight: 0.40,
    sampleCount: 4000,
    representativePersona: 'Tariq Mansoor, COO at Faisalabad Spinning & Weaving Mills (Exporting to EU/US)',
    governingBodies: ['MOIP_PEC', 'FBR', 'SBP', 'MOITT'],
    coreConstraints: [
      'Legacy machinery capital depreciation cycles (10-15 years)',
      'High electricity and gas tariffs demanding urgent IoT power optimization',
      'FBR import duties on edge-computing industrial sensors',
      'Buyer demands in the EU for Digital Product Passports (DPP) & supply-chain transparency'
    ],
    behavioralModel: 'Capital-constrained, ROI-driven, highly sensitive to import tariff shocks, adopts tech only when compliance or energy savings exceed 18% IRR.',
    color: '#d97706',
    position3D: [5.2, -2.5, -1.0],
  },
  TECH_FOUNDER: {
    id: 'TECH_FOUNDER',
    title: 'Growth-Stage AI & Tech Founders',
    populationWeight: 0.30,
    sampleCount: 3000,
    representativePersona: 'Zara Khan, CEO & Co-founder of MedSovereign AI (Diagnostics across 40+ DHQ hospitals)',
    governingBodies: ['SECP', 'NITB', 'FBR', 'SBP', 'PSEB'],
    coreConstraints: [
      'Cloud compute hosting costs (AWS/GCP/Azure) requiring foreign currency FX outflows',
      'FBR withholding tax on cross-border API token calls and software licenses',
      'SECP regulatory sandbox graduation requirements and foreign VC flip-structure restrictions',
      'NITB health data compliance certs taking 9+ months'
    ],
    behavioralModel: 'High agility, rapid capital reallocation, will relocate corporate headquarters to UAE/Singapore within 90 days if regulatory friction exceeds 25% of operating runway.',
    color: '#8b5cf6',
    position3D: [-5.2, 1.8, -1.0],
  },
  RURAL_FARMER: {
    id: 'RURAL_FARMER',
    title: 'AgriTech Smallholders & Farmers',
    populationWeight: 0.20,
    sampleCount: 2000,
    representativePersona: 'Muhammad Bilal, 12-acre cotton and wheat farmer in Multan / Bahawalpur',
    governingBodies: ['IGNITE', 'HEC', 'PTA', 'MOITT'],
    coreConstraints: [
      'Erratic 4G connectivity and low digital literacy among field labor',
      'Dependence on informal middleman credit (Arthi system) at 35%+ interest',
      'Climate volatility (heatwaves, unseasonal rains) needing predictive micro-weather alerts',
      'Low trust in centralized government cloud apps unless subsidized via localized USSD/Urdu voice'
    ],
    behavioralModel: 'Extreme risk aversion, cash-dependent, adopts digital tools only when validated by local farming peers or backed by verifiable yield improvement guarantees.',
    color: '#16a34a',
    position3D: [-4.2, -4.5, 1.2],
  },
  FOREIGN_INVESTOR: {
    id: 'FOREIGN_INVESTOR',
    title: 'Foreign Institutional & VC Investors',
    populationWeight: 0.10,
    sampleCount: 1000,
    representativePersona: 'Alexander Vance, Managing Partner at SilkRoad Frontier Capital (Singapore/London)',
    governingBodies: ['SBP', 'SECP', 'NITB', 'PTA'],
    coreConstraints: [
      'Currency volatility and sovereign credit rating fluctuations',
      'SBP FX repatriation friction for dividend and exit proceeds',
      'Geopolitical risks regarding data sovereignty, internet throttling, and IP enforceability',
      'Compliance with international AML/CFT and sovereign cloud oversight'
    ],
    behavioralModel: 'Risk-weighted arbitrage; demands 35%+ IRR hurdle rate in frontier markets; immediately freezes capital deployments upon sovereign data localization or capital control shocks.',
    color: '#0284c7',
    position3D: [5.0, 3.2, 0.5],
  },
  FREELANCE_DEV: {
    id: 'FREELANCE_DEV',
    title: 'High-Skilled Freelance Engineers & Agencies',
    populationWeight: 0.25,
    sampleCount: 2500,
    representativePersona: 'Bilal Ahmad, Top-Rated Upwork AI Engineer & Founder of 8-person dev studio in Lahore',
    governingBodies: ['PSEB', 'SBP', 'FBR', 'PTA'],
    coreConstraints: [
      'Internet throttling and VPN disruptions causing client SLA breaches',
      'FBR sudden bank account freezes for alleged export income tax non-filing',
      'High international wire transfer fees (up to 7% loss)',
      'Lack of institutional collateral to secure low-interest equipment loans'
    ],
    behavioralModel: 'Highly mobile talent; maintains offshore digital wallets (Payoneer/Wise/crypto); will route invoices through foreign LLCs if domestic withholding tax rises.',
    color: '#06b6d4',
    position3D: [-1.5, 4.8, -2.0],
  },
  FINTECH_OPERATOR: {
    id: 'FINTECH_OPERATOR',
    title: 'FinTech & Digital Public Infra Operators',
    populationWeight: 0.15,
    sampleCount: 1500,
    representativePersona: 'Amina Tariq, Head of Compliance & Product at Raast-Integrated Micro-Lending Platform',
    governingBodies: ['SBP', 'NITB', 'SECP', 'PTA'],
    coreConstraints: [
      'Interoperability friction between legacy 1-Link switches and Raast APIs',
      'High KYC verification costs on national identity biometric queries',
      'SBP capital adequacy buffers tying up liquid cash',
      'Cybersecurity compliance overhead for Tier-1 cloud architectures'
    ],
    behavioralModel: 'Regulatory-first; operates with tight margins; dependent on open APIs and instant sovereign clearance to scale unbanked customer acquisition.',
    color: '#10b981',
    position3D: [1.5, 4.8, -2.0],
  },
};
