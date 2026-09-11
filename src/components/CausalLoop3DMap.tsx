import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  CausalEdge, 
  GovernmentEntityId, 
  RegulatoryEntity, 
  StakeholderCohort, 
  StakeholderCohortId 
} from '../types';
import { GOVERNMENT_ENTITIES, STAKEHOLDER_COHORTS } from '../data/regulatoryWeb';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  Building2, 
  Users, 
  Info,
  X
} from 'lucide-react';

interface CausalLoop3DMapProps {
  causalEdges: CausalEdge[];
  entityFrictionScores?: Record<GovernmentEntityId, number>;
  cohortSatisfactionScores?: Record<StakeholderCohortId, number>;
  selectedEntityId?: string | null;
  onSelectEntity?: (id: string | null) => void;
  fullScreenMode?: boolean;
}

const EMPTY_ENTITY_SCORES: Record<GovernmentEntityId, number> = {} as Record<GovernmentEntityId, number>;
const EMPTY_COHORT_SCORES: Record<StakeholderCohortId, number> = {} as Record<StakeholderCohortId, number>;
const EMPTY_CAUSAL_EDGES: CausalEdge[] = [];

export const CausalLoop3DMap: React.FC<CausalLoop3DMapProps> = ({
  causalEdges = EMPTY_CAUSAL_EDGES,
  entityFrictionScores = EMPTY_ENTITY_SCORES,
  cohortSatisfactionScores = EMPTY_COHORT_SCORES,
  selectedEntityId,
  onSelectEntity,
  fullScreenMode = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<{
    id: string;
    name: string;
    type: 'GOVERNMENT' | 'STAKEHOLDER';
    frictionScore?: number;
    color: string;
    details: RegulatoryEntity | StakeholderCohort;
  } | null>(null);

  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const effectiveSelectedId = internalSelectedId !== null ? internalSelectedId : (selectedEntityId || null);

  const activeInspector = React.useMemo(() => {
    if (!effectiveSelectedId) return null;
    if (GOVERNMENT_ENTITIES[effectiveSelectedId as GovernmentEntityId]) {
      const ent = GOVERNMENT_ENTITIES[effectiveSelectedId as GovernmentEntityId];
      return {
        id: ent.id,
        name: ent.name,
        type: 'GOVERNMENT' as const,
        frictionScore: entityFrictionScores[ent.id] ?? 0,
        color: ent.color,
        details: ent,
      };
    } else if (STAKEHOLDER_COHORTS[effectiveSelectedId as StakeholderCohortId]) {
      const cohort = STAKEHOLDER_COHORTS[effectiveSelectedId as StakeholderCohortId];
      return {
        id: cohort.id,
        name: cohort.title,
        type: 'STAKEHOLDER' as const,
        frictionScore: cohortSatisfactionScores[cohort.id] ?? 50,
        color: cohort.color,
        details: cohort,
      };
    }
    return null;
  }, [effectiveSelectedId, entityFrictionScores, cohortSatisfactionScores]);

  const [filterMode, setFilterMode] = useState<'ALL' | 'FRICTION_ONLY' | 'SYNERGY_ONLY' | 'GOV_ONLY'>('ALL');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    // Subtle background grid
    const gridHelper = new THREE.GridHelper(24, 24, 0x1f1f1f, 0x0f0f0f);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(10, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf43f5e, 0.8);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    // Groups
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const nodesGroup = new THREE.Group();
    const edgesGroup = new THREE.Group();
    const particlesGroup = new THREE.Group();
    rootGroup.add(edgesGroup);
    rootGroup.add(nodesGroup);
    rootGroup.add(particlesGroup);

    const nodeObjects: { [id: string]: THREE.Mesh } = {};
    const nodeDataMap: { [id: string]: any } = {};

    // 1. Create Government Entity Nodes
    Object.values(GOVERNMENT_ENTITIES).forEach((entity) => {
      const friction = entityFrictionScores[entity.id] ?? 0;
      const isFriction = friction < 0;

      // Outer glow ring
      const ringGeo = new THREE.RingGeometry(0.7, 0.85, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isFriction ? 0xf43f5e : new THREE.Color(entity.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);

      // Core Node Sphere
      const sphereGeo = new THREE.SphereGeometry(0.55, 32, 32);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(entity.color),
        emissive: isFriction ? new THREE.Color(0x881337) : new THREE.Color(entity.color),
        emissiveIntensity: isFriction ? 0.6 : 0.3,
        roughness: 0.2,
        metalness: 0.8,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.position.set(...entity.position3D);

      ringMesh.position.set(...entity.position3D);
      ringMesh.lookAt(camera.position);

      sphereMesh.userData = {
        id: entity.id,
        name: entity.name,
        type: 'GOVERNMENT',
        color: entity.color,
        frictionScore: friction,
        details: entity,
      };

      sphereMesh.add(ringMesh);
      nodesGroup.add(sphereMesh);
      nodeObjects[entity.id] = sphereMesh;
      nodeDataMap[entity.id] = entity.position3D;
    });

    // 2. Create Stakeholder Cohort Nodes
    Object.values(STAKEHOLDER_COHORTS).forEach((cohort) => {
      const sat = cohortSatisfactionScores[cohort.id] ?? 50;
      const isStressed = sat < 40;

      // Octahedron for Stakeholder Agents
      const octaGeo = new THREE.OctahedronGeometry(0.65, 0);
      const octaMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(cohort.color),
        emissive: isStressed ? new THREE.Color(0xbe123c) : new THREE.Color(cohort.color),
        emissiveIntensity: isStressed ? 0.7 : 0.25,
        roughness: 0.3,
        metalness: 0.6,
        wireframe: false,
      });
      const octaMesh = new THREE.Mesh(octaGeo, octaMat);
      octaMesh.position.set(...cohort.position3D);

      octaMesh.userData = {
        id: cohort.id,
        name: cohort.title,
        type: 'STAKEHOLDER',
        color: cohort.color,
        frictionScore: sat,
        details: cohort,
      };

      nodesGroup.add(octaMesh);
      nodeObjects[cohort.id] = octaMesh;
      nodeDataMap[cohort.id] = cohort.position3D;
    });

    // 3. Create Dynamic Pulsing Causal Edges
    const particleStreams: {
      curve: THREE.CatmullRomCurve3;
      particle: THREE.Mesh;
      t: number;
      speed: number;
      color: number;
    }[] = [];

    causalEdges.forEach((edge) => {
      const srcPos = nodeDataMap[edge.source];
      const tgtPos = nodeDataMap[edge.target];

      if (!srcPos || !tgtPos) return;

      const p1 = new THREE.Vector3(...srcPos);
      const p2 = new THREE.Vector3(...tgtPos);

      // Arc curve in 3D space
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const distance = p1.distanceTo(p2);
      mid.y += distance * 0.15; // arch upwards slightly

      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      const points = curve.getPoints(30);
      const tubeGeo = new THREE.TubeGeometry(curve, 30, 0.045, 8, false);

      const isFriction = edge.impactType === 'REGULATORY_FRICTION';
      const edgeColor = isFriction ? 0xf43f5e : 0x10b981; // Red vs Emerald Green

      const tubeMat = new THREE.MeshStandardMaterial({
        color: edgeColor,
        emissive: edgeColor,
        emissiveIntensity: isFriction ? 0.7 : 0.4,
        transparent: true,
        opacity: isFriction ? 0.85 : 0.6,
      });

      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubeMesh.userData = { edgeData: edge };
      edgesGroup.add(tubeMesh);

      // Add animated particle traveling along edge
      const particleGeo = new THREE.SphereGeometry(0.09, 12, 12);
      const particleMat = new THREE.MeshBasicMaterial({
        color: edgeColor,
      });
      const particle = new THREE.Mesh(particleGeo, particleMat);
      particlesGroup.add(particle);

      particleStreams.push({
        curve,
        particle,
        t: Math.random(),
        speed: (edge.pulseSpeed ?? 1.0) * 0.008,
        color: edgeColor,
      });
    });

    // Raycasting for node hover & click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodesGroup.children, true);

      if (intersects.length > 0) {
        let targetObj: THREE.Object3D | null = intersects[0].object;
        while (targetObj && !targetObj.userData?.id && targetObj.parent) {
          targetObj = targetObj.parent;
        }

        if (targetObj?.userData?.id) {
          setHoveredNode(targetObj.userData as any);
          renderer.domElement.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredNode(null);
      renderer.domElement.style.cursor = 'default';
    };

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodesGroup.children, true);

      if (intersects.length > 0) {
        let targetObj: THREE.Object3D | null = intersects[0].object;
        while (targetObj && !targetObj.userData?.id && targetObj.parent) {
          targetObj = targetObj.parent;
        }

        if (targetObj?.userData?.id) {
          const data = targetObj.userData as any;
          setInternalSelectedId(data.id);
          if (onSelectEntity) onSelectEntity(data.id);
        }
      }
    };

    renderer.domElement.addEventListener('mousemove', handlePointerMove);
    renderer.domElement.addEventListener('click', handleClick);

    // Mouse drag rotation controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMoveDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rootGroup.rotation.y += deltaX * 0.005;
      rootGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(8, Math.min(30, camera.position.z + e.deltaY * 0.02));
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMoveDrag);
    renderer.domElement.addEventListener('wheel', handleWheel, { passive: false });

    // Animation Loop
    let animationFrameId: number;
    const animationStartTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - animationStartTime) * 0.001;

      // Auto-rotation if enabled and not dragging
      if (autoRotate && !isDragging) {
        rootGroup.rotation.y += 0.002;
      }

      // Animate edge particles
      particleStreams.forEach((stream) => {
        stream.t += stream.speed;
        if (stream.t > 1) stream.t = 0;
        const pos = stream.curve.getPoint(stream.t);
        stream.particle.position.copy(pos);
      });

      // Subtle breathing scale on active nodes
      nodesGroup.children.forEach((mesh, index) => {
        const pulse = 1 + Math.sin(elapsedTime * 3 + index) * 0.04;
        mesh.scale.set(pulse, pulse, pulse);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMoveDrag);
      renderer.domElement.removeEventListener('mousemove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('wheel', handleWheel);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [causalEdges, entityFrictionScores, cohortSatisfactionScores, autoRotate]);

  return (
    <div className={`relative w-full ${fullScreenMode ? 'h-screen' : 'h-[520px] lg:h-[620px]'} bg-[#050505] rounded-xl overflow-hidden border border-[#1F1F1F] shadow-2xl flex flex-col`}>
      {/* 3D Map Header Controls */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between pointer-events-none gap-2">
        {/* Title HUD */}
        <div className="pointer-events-auto bg-[#0A0A0A]/95 backdrop-blur-md border border-[#1F1F1F] px-3 py-1.5 rounded flex items-center gap-2 shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-ping" />
          <span className="text-xs font-mono font-bold text-[#E0E0E0] uppercase tracking-wider">
            3D Causal Loop Topology
          </span>
          <span className="text-[10px] font-mono text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded border border-[#00E5FF]/30">
            WebGPU / Rayon
          </span>
        </div>

        {/* Legend & Filter Controls */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[#0A0A0A]/95 backdrop-blur-md border border-[#1F1F1F] p-1 rounded text-xs font-mono shadow-lg">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 rounded">
            <span className="w-2 h-2 rounded-full bg-[#00FF41]" />
            <span className="hidden sm:inline">Positive Synergy</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#FF3333]/10 text-[#FF3333] border border-[#FF3333]/30 rounded">
            <span className="w-2 h-2 rounded-full bg-[#FF3333] animate-pulse" />
            <span className="hidden sm:inline">Regulatory Friction</span>
          </div>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded border transition-colors cursor-pointer ${
              autoRotate
                ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]'
                : 'bg-[#141414] border-[#222222] text-[#888888] hover:text-[#E0E0E0]'
            }`}
            title="Toggle 3D auto rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full flex-1 cursor-grab active:cursor-grabbing" />

      {/* Hover Tooltip HUD */}
      {hoveredNode && !activeInspector && (
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none bg-[#0A0A0A]/95 backdrop-blur-md border border-[#1F1F1F] p-3 rounded shadow-2xl max-w-xs font-sans">
          <div className="flex items-center gap-2">
            {hoveredNode.type === 'GOVERNMENT' ? (
              <Building2 className="w-4 h-4 text-[#00E5FF]" />
            ) : (
              <Users className="w-4 h-4 text-[#F59E0B]" />
            )}
            <span className="font-bold text-sm text-[#E0E0E0]">{hoveredNode.name}</span>
          </div>
          <div className="mt-1 text-xs text-[#888888] font-mono">
            {hoveredNode.type === 'GOVERNMENT' ? (
              <span>
                Friction Index:{' '}
                <strong
                  className={
                    (hoveredNode.frictionScore ?? 0) < 0 ? 'text-[#FF3333]' : 'text-[#00FF41]'
                  }
                >
                  {hoveredNode.frictionScore ?? 0 > 0 ? `+${hoveredNode.frictionScore}` : hoveredNode.frictionScore}
                </strong>
              </span>
            ) : (
              <span>
                Satisfaction Index:{' '}
                <strong className="text-[#F59E0B]">{hoveredNode.frictionScore}%</strong>
              </span>
            )}
          </div>
          <div className="mt-1 text-[11px] text-[#888888] line-clamp-2">
            {'mandate' in hoveredNode.details
              ? hoveredNode.details.mandate
              : hoveredNode.details.behavioralModel}
          </div>
          <div className="mt-2 text-[10px] text-[#00E5FF] font-mono">Click node to inspect full mandate & constraints</div>
        </div>
      )}

      {/* Active Inspector Sidebar/Modal HUD */}
      {activeInspector && (
        <div className="absolute top-14 right-4 z-20 bg-[#0A0A0A]/95 backdrop-blur-lg border border-[#1F1F1F] p-4 rounded-xl shadow-2xl max-w-sm w-full text-[#E0E0E0]">
          <div className="flex items-start justify-between border-b border-[#1F1F1F] pb-2">
            <div className="flex items-center gap-2">
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: activeInspector.color }}
              />
              <div>
                <h4 className="font-bold text-sm text-[#E0E0E0]">{activeInspector.name}</h4>
                <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider">
                  {activeInspector.type === 'GOVERNMENT' ? 'Pakistani Sovereign Entity' : 'Synthetic Stakeholder Cohort'}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setInternalSelectedId('');
                if (onSelectEntity) onSelectEntity(null);
              }}
              className="text-[#888888] hover:text-[#E0E0E0] p-1 hover:bg-[#141414] rounded transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-3 text-xs max-h-96 overflow-y-auto pr-1">
            {activeInspector.type === 'GOVERNMENT' ? (
              <>
                <div>
                  <span className="text-[#888888] font-semibold block text-[11px]">Core Mandate:</span>
                  <p className="text-[#CCCCCC] mt-0.5 leading-relaxed">
                    {(activeInspector.details as RegulatoryEntity).mandate}
                  </p>
                </div>

                <div>
                  <span className="text-[#888888] font-semibold block text-[11px]">Statutory Power:</span>
                  <p className="text-[#CCCCCC] mt-0.5 leading-relaxed">
                    {(activeInspector.details as RegulatoryEntity).statutoryPower}
                  </p>
                </div>

                <div>
                  <span className="text-[#FF3333] font-semibold block text-[11px]">Regulatory Friction Triggers:</span>
                  <ul className="list-disc list-inside text-[#CCCCCC] mt-1 space-y-1">
                    {(activeInspector.details as RegulatoryEntity).frictionTriggers.map((t, idx) => (
                      <li key={idx} className="leading-tight">{t}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div>
                  <span className="text-[#888888] font-semibold block text-[11px]">Representative Persona:</span>
                  <p className="text-[#CCCCCC] mt-0.5 italic">
                    {(activeInspector.details as StakeholderCohort).representativePersona}
                  </p>
                </div>

                <div>
                  <span className="text-[#888888] font-semibold block text-[11px]">Behavioral Rule:</span>
                  <p className="text-[#CCCCCC] mt-0.5 leading-relaxed">
                    {(activeInspector.details as StakeholderCohort).behavioralModel}
                  </p>
                </div>

                <div>
                  <span className="text-[#F59E0B] font-semibold block text-[11px]">Core Operational Constraints:</span>
                  <ul className="list-disc list-inside text-[#CCCCCC] mt-1 space-y-1">
                    {(activeInspector.details as StakeholderCohort).coreConstraints.map((c, idx) => (
                      <li key={idx} className="leading-tight">{c}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom Interactive Navigation Helper */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none text-[11px] font-mono text-[#888888] bg-[#0A0A0A]/85 px-2.5 py-1 rounded border border-[#1F1F1F] hidden md:block">
        Left-Click Drag: Rotate 3D | Wheel: Zoom | Click Node: Inspect Mandate
      </div>
    </div>
  );
};
