import { PolicyDraft } from '../types';

export const PRESET_POLICIES: PolicyDraft[] = [
  {
    id: 'POLICY-DATA-SOV-01',
    title: 'Mandatory Sovereign Data Localization for Healthcare & Health-Tech AI (2026)',
    category: 'DATA_SOVEREIGNTY',
    leadMinistry: 'NITB',
    summary: 'Requires all health-tech AI systems, diagnostic platforms, and genomic data providers operating in Pakistan to store, process, and train models exclusively on NITB-certified sovereign domestic cloud data centers within 12 months.',
    rawText: `NATIONAL SOVEREIGN HEALTH DATA & AI GOVERNANCE DIRECTIVE (2026)

Section 1: Ingestion & Cloud Mandate
All clinical, biometric, and medical AI inference workloads operating within sovereign boundaries must transition 100% of underlying training datasets and user records to NITB-accredited sovereign data centers within twelve (12) calendar months from the date of gazette notification.

Section 2: Cross-Border Model Weights Restriction
No proprietary or open-weights AI model trained on Pakistani citizen health data shall be transferred, mirrored, or fine-tuned on non-domestic compute clusters without express written clearance from the National Information Technology Board (NITB) and Pakistan Telecommunication Authority (PTA).

Section 3: Fiscal Withholding on Foreign AI APIs
To incentivize domestic foundational model training, a twenty percent (20%) regulatory equalization tax shall be withheld by SBP and FBR on all outbound remittances for foreign diagnostic API endpoints (e.g., US/EU hosted LLM diagnostic APIs).

Section 4: Compliance Penalties & Licensing
Entities found in non-compliance after the grace period shall face immediate revocation of SECP sandbox status, suspension of PSEB export incentives, and ISP-level domain sinkholing by PTA.`,
    clauses: [
      {
        number: '1.1',
        title: 'Sovereign Cloud Hosting Mandate',
        text: 'All clinical and diagnostic AI training data must be stored exclusively on NITB-certified domestic infrastructure within 12 months.',
        primaryImpactedEntity: 'NITB',
      },
      {
        number: '2.1',
        title: 'Cross-Border Weight Export Ban',
        text: 'Prohibits the export or external synchronization of model weights fine-tuned on Pakistani clinical datasets without inter-agency clearance.',
        primaryImpactedEntity: 'PTA',
      },
      {
        number: '3.1',
        title: '20% Equalization Withholding Tax on Foreign APIs',
        text: 'Imposes a 20% withholding tax on all foreign cloud inference transactions to penalize foreign compute dependencies.',
        primaryImpactedEntity: 'FBR',
      },
      {
        number: '4.1',
        title: 'Strict Sandbox Revocation & ISP Sinkholing',
        text: 'Immediate disqualification from SECP sandbox and STZA benefits for non-compliant technology firms.',
        primaryImpactedEntity: 'SECP',
      },
    ],
    defaultSliders: {
      dataLocalizationStrictness: 85,
      foreignAiIpTax: 20,
      rndSubsidiesAllocation: 15,
      stzaExemptionWindowYears: 3,
      sovereignCloudComplianceMonths: 12,
      industry4GrantsPct: 25,
    },
  },
  {
    id: 'POLICY-DPI-FINTECH-02',
    title: 'National Digital Public Infrastructure (DPI) & Raast Interoperability Directive',
    category: 'DPI_FINTECH',
    leadMinistry: 'SBP',
    summary: 'Mandates zero-fee Raast P2P and P2M digital rails integration across all commercial microfinance institutions, SECP digital asset brokers, and telecom mobile wallets with mandatory biometric tokenization.',
    rawText: `NATIONAL DIGITAL PUBLIC INFRASTRUCTURE ACCELERATION ACT (2026)

Section 1: Zero Interchange Raast Protocol
All commercial banking institutions, FinTech digital wallet providers, and SECP-licensed micro-investment platforms must provide frictionless, zero-interchange API access to SBP Raast core rails.

Section 2: Centralized Biometric Tokenization
Every digital customer onboarding workflow must route KYC verification through the NITB-NADRA National Identity Data Bridge with mandatory cryptographic hardware tokenization.

Section 3: Cross-Border FX Export Settlement Fast-Track
IT freelancers and software export companies utilizing Raast Merchant APIs shall be granted automatic 50% foreign exchange retention accounts with zero manual bank compliance friction.`,
    clauses: [
      {
        number: '1.1',
        title: 'Mandatory Raast Zero-Interchange Rail',
        text: 'Eliminates private switch interchange fees to accelerate digital retail adoption.',
        primaryImpactedEntity: 'SBP',
      },
      {
        number: '2.1',
        title: 'Unified Cryptographic Biometric Gateway',
        text: 'Standardizes KYC via NITB/NADRA sovereign identity APIs.',
        primaryImpactedEntity: 'NITB',
      },
      {
        number: '3.1',
        title: 'Freelance FX Retention Fast-Track',
        text: 'Guarantees 50% FX retention in digital USD accounts for tech exporters.',
        primaryImpactedEntity: 'PSEB',
      },
    ],
    defaultSliders: {
      dataLocalizationStrictness: 50,
      foreignAiIpTax: 5,
      rndSubsidiesAllocation: 35,
      stzaExemptionWindowYears: 5,
      sovereignCloudComplianceMonths: 18,
      industry4GrantsPct: 40,
    },
  },
  {
    id: 'POLICY-IND4-TEXTILE-03',
    title: 'Industry 4.0 Industrial Automation & Textile IoT Standards Framework',
    category: 'INDUSTRY_4_0',
    leadMinistry: 'MOIP_PEC',
    summary: 'Introduces a 15% capital grant on retrofitting spinning and weaving looms with edge AI smart sensors while phasing in mandatory energy efficiency IoT telemetry connected to the national grid.',
    rawText: `NATIONAL INDUSTRY 4.0 TEXTILE MODERNIZATION INITIATIVE (2026)

Section 1: Smart Loom & IoT Sensor Standardization
MoIP and PEC establish baseline cybersecurity and sensor telemetry standards for all computerized textile spinning, weaving, and wet-processing machinery.

Section 2: Capital Modernization Matching Grants
Ignite and MoIP will co-fund 30% of the CAPEX for local textile mills retrofitting legacy mechanical machinery with domestic edge AI industrial compute nodes.

Section 3: Tariff Exemption on Industrial Actuators & Microcontrollers
FBR eliminates all customs tariffs and sales tax on imported precision stepper motors, optical yarn sensors, and programmable logic controllers (PLCs) certified by PEC.`,
    clauses: [
      {
        number: '1.1',
        title: 'PEC Industrial IoT Standard Directives',
        text: 'Mandatory data telemetry on power efficiency for textile export mills.',
        primaryImpactedEntity: 'MOIP_PEC',
      },
      {
        number: '2.1',
        title: '30% Edge AI Capital Matching Grants',
        text: 'Disburses industrial modernization funds through Ignite and STZA.',
        primaryImpactedEntity: 'IGNITE',
      },
      {
        number: '3.1',
        title: 'Zero Tariff on Robotics & Embedded Hardware',
        text: 'FBR customs duty waiver on critical Industry 4.0 automation components.',
        primaryImpactedEntity: 'FBR',
      },
    ],
    defaultSliders: {
      dataLocalizationStrictness: 30,
      foreignAiIpTax: 0,
      rndSubsidiesAllocation: 50,
      stzaExemptionWindowYears: 7,
      sovereignCloudComplianceMonths: 24,
      industry4GrantsPct: 65,
    },
  },
];
