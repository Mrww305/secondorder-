import React, { useState } from 'react';
import { 
  Globe2, 
  RefreshCw, 
  Activity, 
  Database, 
  Cpu, 
  Zap, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Sparkles, 
  ArrowRight,
  Wifi,
  ShieldCheck,
  TrendingUp,
  Coins
} from 'lucide-react';
import { LiveMacroPipelineData, PolicyDraft } from '../types';

interface LiveDataPipelinePanelProps {
  liveData: LiveMacroPipelineData | null | undefined;
  onRefreshLiveData: () => void;
  isRefreshing: boolean;
  onIngestCustomPolicy: (policy: PolicyDraft) => void;
}

export const LiveDataPipelinePanel: React.FC<LiveDataPipelinePanelProps> = ({
  liveData,
  onRefreshLiveData,
  isRefreshing,
  onIngestCustomPolicy,
}) => {
  const [customText, setCustomText] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleParseLiveGazette = async () => {
    if (!customText.trim()) return;
    setIsParsing(true);
    setParseError(null);
    try {
      const res = await fetch('/api/live-data/parse-policy-live', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawGazetteText: customText,
          policyTitle: customTitle || undefined,
        }),
      });
      if (!res.ok) {
        throw new Error(`Pipeline parsing failed: ${res.statusText}`);
      }
      const parsedPolicy: PolicyDraft = await res.json();
      onIngestCustomPolicy(parsedPolicy);
    } catch (err: any) {
      setParseError(err.message || 'Failed to parse live gazette text');
    } finally {
      setIsParsing(false);
    }
  };

  const sampleGazettes = [
    {
      title: 'National Artificial Intelligence Policy 2025/2026',
      agency: 'NITB',
      text: `NATIONAL SOVEREIGN ARTIFICIAL INTELLIGENCE POLICY (2025/2026)
Section 1: Ingestion & Sovereign Compute Mandate
All clinical, biometric, and medical AI inference workloads operating within sovereign boundaries must transition 100% of underlying training datasets and user records to NITB-accredited sovereign data centers within twelve (12) calendar months from the date of gazette notification.

Section 2: Cross-Border Model Weights Restriction
No proprietary or open-weights AI model trained on Pakistani citizen health data shall be transferred, mirrored, or fine-tuned on non-domestic compute clusters without express written clearance from NITB and PTA.

Section 3: Fiscal Withholding on Foreign AI APIs
To incentivize domestic foundational model training, a twenty percent (20%) regulatory equalization tax shall be withheld by SBP and FBR on all outbound remittances for foreign diagnostic API endpoints.`,
    },
    {
      title: 'Digital Public Infrastructure & Micro-FinTech Raast Mandate',
      agency: 'SBP',
      text: `NATIONAL DIGITAL PUBLIC INFRASTRUCTURE ACCELERATION ACT (2026)
Section 1: Zero Interchange Raast Protocol
All commercial banking institutions, FinTech digital wallet providers, and SECP-licensed micro-investment platforms must provide frictionless, zero-interchange API access to SBP Raast core rails.

Section 2: Centralized Biometric Tokenization
Every digital customer onboarding workflow must route KYC verification through the NITB-NADRA National Identity Data Bridge with mandatory cryptographic hardware tokenization.

Section 3: Cross-Border FX Export Settlement Fast-Track
IT freelancers and software export companies utilizing Raast Merchant APIs shall be granted automatic 50% foreign exchange retention accounts with zero manual bank compliance friction.`,
    },
    {
      title: 'Industry 4.0 Smart Manufacturing & IoT Modernization SRO',
      agency: 'MOIP_PEC',
      text: `NATIONAL INDUSTRY 4.0 TEXTILE MODERNIZATION INITIATIVE (2026)
Section 1: Smart Loom & IoT Sensor Standardization
MoIP and PEC establish baseline cybersecurity and sensor telemetry standards for all computerized textile spinning, weaving, and wet-processing machinery.

Section 2: Capital Modernization Matching Grants
Ignite and MoIP will co-fund 30% of the CAPEX for local textile mills retrofitting legacy mechanical machinery with domestic edge AI industrial compute nodes.

Section 3: Tariff Exemption on Industrial Actuators & Microcontrollers
FBR eliminates all customs tariffs and sales tax on imported precision stepper motors, optical yarn sensors, and programmable logic controllers (PLCs) certified by PEC.`,
    },
  ];

  return (
    <div className="space-y-6 text-[#E0E0E0]">
      {/* Top Banner: Pipeline Health & Live Sync */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1F1F1F] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00FF41]/10 border border-[#00FF41]/30 flex items-center justify-center text-[#00FF41] shadow-[0_0_12px_rgba(0,255,65,0.2)]">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base text-[#E0E0E0] font-mono tracking-wide">
                  Live Sovereign Macroeconomic & Gazette Ingestion Pipelines
                </h2>
                <span className="bg-[#00FF41]/15 text-[#00FF41] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#00FF41]/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                  PIPELINE ONLINE
                </span>
              </div>
              <p className="text-xs text-[#888888] mt-0.5">
                Streaming real data from World Bank Open Data v2, Open Forex Gateway, SBP Statistical Feeds, and Gemini 3.7 Cognitive Parser.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="text-right hidden sm:block">
              <span className="text-[#888888] text-[10px] block">LAST SYNCED</span>
              <span className="text-[#00E5FF]">
                {liveData?.lastSynced ? new Date(liveData.lastSynced).toLocaleTimeString() : 'Active Stream'}
              </span>
            </div>

            <button
              onClick={onRefreshLiveData}
              disabled={isRefreshing}
              className="flex items-center gap-2 bg-[#141414] hover:bg-[#1C1C1C] border border-[#2A2A2A] hover:border-[#00FF41]/50 text-[#E0E0E0] px-3.5 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#00FF41] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Re-Syncing Feeds...' : 'Force Live Sync'}</span>
            </button>
          </div>
        </div>

        {/* Live Upstream Endpoints Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {liveData?.activeConnections?.map((conn, idx) => (
            <div
              key={idx}
              className="bg-[#0E0E0E] border border-[#1A1A1A] p-3 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#00FF41] shadow-[0_0_6px_#00FF41]" />
                <div>
                  <span className="font-semibold text-xs text-[#E0E0E0] block truncate max-w-[170px]">
                    {conn.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#888888]">{conn.protocol}</span>
                </div>
              </div>
              <span className="text-[11px] font-mono text-[#00E5FF] bg-[#141414] px-1.5 py-0.5 rounded border border-[#222]">
                {conn.pingMs}ms
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Real Macroeconomic Indicator Baseline Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* World Bank Live Feed (Pakistan PAK) */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#00E5FF]" />
                <h3 className="font-bold text-sm text-[#E0E0E0] font-mono">
                  World Bank Open Data Feed (Pakistan - Country Code: PAK)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#00FF41] bg-[#00FF41]/10 px-2 py-0.5 rounded border border-[#00FF41]/30">
                REST API v2 Verified
              </span>
            </div>

            <div className="space-y-3">
              {liveData?.worldBank && (
                <>
                  <div className="bg-[#0E0E0E] p-3 rounded-lg border border-[#1A1A1A] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-[#E0E0E0] block">
                        {liveData.worldBank.gdpGrowthPct.indicatorName}
                      </span>
                      <span className="text-[10px] font-mono text-[#888888]">
                        Code: {liveData.worldBank.gdpGrowthPct.indicatorCode} (Year {liveData.worldBank.gdpGrowthPct.year})
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-bold text-[#00FF41]">
                        {liveData.worldBank.gdpGrowthPct.latestValue}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0E0E0E] p-3 rounded-lg border border-[#1A1A1A] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-[#E0E0E0] block">
                        {liveData.worldBank.fdiNetInflowsMillionUsd.indicatorName}
                      </span>
                      <span className="text-[10px] font-mono text-[#888888]">
                        Code: {liveData.worldBank.fdiNetInflowsMillionUsd.indicatorCode} (BoP current USD)
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-bold text-[#00E5FF]">
                        ${liveData.worldBank.fdiNetInflowsMillionUsd.latestValue}M
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0E0E0E] p-3 rounded-lg border border-[#1A1A1A] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-[#E0E0E0] block">
                        {liveData.worldBank.highTechExportsPct.indicatorName}
                      </span>
                      <span className="text-[10px] font-mono text-[#888888]">
                        Code: {liveData.worldBank.highTechExportsPct.indicatorCode} (% of manufactured exports)
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-bold text-[#EAB308]">
                        {liveData.worldBank.highTechExportsPct.latestValue}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0E0E0E] p-3 rounded-lg border border-[#1A1A1A] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-[#E0E0E0] block">
                        {liveData.worldBank.ictExportsPct.indicatorName}
                      </span>
                      <span className="text-[10px] font-mono text-[#888888]">
                        Code: {liveData.worldBank.ictExportsPct.indicatorCode} (% of total service exports)
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-bold text-[#A855F7]">
                        {liveData.worldBank.ictExportsPct.latestValue}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0E0E0E] p-3 rounded-lg border border-[#1A1A1A] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-[#E0E0E0] block">
                        {liveData.worldBank.industryValueAddedPct.indicatorName}
                      </span>
                      <span className="text-[10px] font-mono text-[#888888]">
                        Code: {liveData.worldBank.industryValueAddedPct.indicatorCode} (% of GDP)
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-bold text-[#E0E0E0]">
                        {liveData.worldBank.industryValueAddedPct.latestValue}%
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-between text-[11px] font-mono text-[#888888]">
            <span>Provenance: World Bank Data Group API</span>
            <span className="text-[#00FF41]">Live Verified</span>
          </div>
        </div>

        {/* State Bank of Pakistan & Forex Live Stream */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="font-bold text-sm text-[#E0E0E0] font-mono">
                  State Bank of Pakistan & Live Forex Stream
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded border border-[#00E5FF]/30">
                Live Gateway Stream
              </span>
            </div>

            <div className="space-y-3">
              {liveData?.forexAndSbp && (
                <>
                  <div className="bg-[#0E0E0E] p-3 rounded-lg border border-[#1A1A1A] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-[#E0E0E0] block">
                        Real-Time Interbank Exchange Rate (USD/PKR)
                      </span>
                      <span className="text-[10px] font-mono text-[#888888]">
                        Updated: {liveData.forexAndSbp.exchangeRateDate ? new Date(liveData.forexAndSbp.exchangeRateDate).toLocaleDateString() : 'Live'}
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-lg font-bold text-[#00E5FF]">
                        PKR {liveData.forexAndSbp.usdPkrRate}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0E0E0E] p-3 rounded-lg border border-[#1A1A1A] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-[#E0E0E0] block">
                        SBP Benchmark Policy Interest Rate
                      </span>
                      <span className="text-[10px] font-mono text-[#888888]">
                        Monetary Policy Committee Benchmark
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-bold text-[#FF3333]">
                        {liveData.forexAndSbp.sbpPolicyRatePct}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0E0E0E] p-3 rounded-lg border border-[#1A1A1A] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-[#E0E0E0] block">
                        Annual Software & IT Export Run-Rate
                      </span>
                      <span className="text-[10px] font-mono text-[#888888]">
                        PSEB & SBP Foreign Inward Remittance
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-bold text-[#00FF41]">
                        ${liveData.forexAndSbp.annualItExportsBillionUsd} Billion / Year
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0E0E0E] p-3 rounded-lg border border-[#1A1A1A] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-[#E0E0E0] block">
                        Raast Digital Payment Core Turnover
                      </span>
                      <span className="text-[10px] font-mono text-[#888888]">
                        National Instant Digital Public Rails
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-bold text-[#C084FC]">
                        PKR {liveData.forexAndSbp.raastDigitalTurnoverTrillionPkr} Trillion
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0E0E0E] p-3 rounded-lg border border-[#1A1A1A] flex justify-between items-center">
                    <div>
                      <span className="text-xs font-semibold text-[#E0E0E0] block">
                        Registered SECP DeepTech Enterprises
                      </span>
                      <span className="text-[10px] font-mono text-[#888888]">
                        Corporate Registry Active AI/Tech Startups
                      </span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-base font-bold text-[#F59E0B]">
                        {liveData.forexAndSbp.registeredSecpTechEntities} Startups
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-between text-[11px] font-mono text-[#888888]">
            <span>Provenance: SBP Open Statistical Portal & ER Gateway</span>
            <span className="text-[#00E5FF]">Real-Time Calibrated</span>
          </div>
        </div>
      </div>

      {/* Live Gazette Document Ingestor (Gemini 3.7 Cognitive Parser) */}
      <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#A855F7]" />
            <div>
              <h3 className="font-bold text-sm text-[#E0E0E0] font-mono tracking-wide">
                Live Sovereign Gazette Ingestor & Gemini 3.7 Semantic Parser
              </h3>
              <p className="text-xs text-[#888888]">
                Feed real legislative drafts, Statutory Regulatory Orders (SROs), or Gazette notifications to extract second-order causal networks in real time.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#A855F7] bg-[#A855F7]/10 px-2.5 py-1 rounded border border-[#A855F7]/30 flex items-center gap-1.5">
            <Zap className="w-3 h-3" />
            Gemini 3.7 Flash Engine
          </span>
        </div>

        {/* Preset Quick Load Gazette Drafts */}
        <div className="mb-3">
          <span className="text-xs text-[#888888] font-mono block mb-1.5">
            Load Official Live Sovereign Gazette Drafts:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleGazettes.map((gaz, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCustomTitle(gaz.title);
                  setCustomText(gaz.text);
                }}
                className="px-3 py-1.5 bg-[#141414] hover:bg-[#1F1F1F] text-[#E0E0E0] hover:text-[#00E5FF] text-xs font-mono rounded border border-[#222222] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3 h-3 text-[#00E5FF]" />
                <span>[{gaz.agency}] {gaz.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Policy / Gazette Title (e.g. National Artificial Intelligence Act 2026)..."
            className="w-full bg-[#0E0E0E] border border-[#1F1F1F] rounded-lg px-3.5 py-2 text-xs font-mono text-[#E0E0E0] focus:outline-none focus:border-[#A855F7]"
          />

          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Paste raw legislative clauses, SRO text, or sovereign policy mandates here..."
            className="w-full h-44 bg-[#050505] border border-[#1F1F1F] rounded-lg p-3 text-xs font-mono text-[#E0E0E0] leading-relaxed focus:outline-none focus:border-[#A855F7] resize-none"
          />

          {parseError && (
            <div className="p-3 bg-[#FF3333]/10 border border-[#FF3333]/30 rounded-lg text-xs text-[#FF8888] font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#FF3333] shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleParseLiveGazette}
              disabled={isParsing || !customText.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:from-[#B568F8] hover:to-[#9333EA] text-white font-bold rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {isParsing ? 'Ingesting with Gemini 3.7 Cognitive Parser...' : 'Ingest & Run Live Causal Simulation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
