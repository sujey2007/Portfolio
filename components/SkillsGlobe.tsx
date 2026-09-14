"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Html } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Ultra } from "next/font/google";

const ultra = Ultra({ subsets: ["latin"], weight: ["400"] });
// Icons — Simple Icons + FontAwesome for full technology coverage
import {
  SiPython,
  SiKotlin,
  SiSolidity,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiFirebase,
  SiMongodb,
  SiPydantic,
  SiIpfs,
  SiDocker,
  SiKubernetes,
  SiHelm,
  SiGithubactions,
  SiPrometheus,
  SiGrafana,
  SiAndroid,
  SiExpo,
  SiGooglegemini,
  SiOllama,
  SiOpenjdk,
} from "react-icons/si";
import {
  FaJava,
  FaAws,
  FaAndroid,
  FaFigma,
  FaCube,
  FaLock,
  FaServer,
  FaPlug,
  FaBrain,
  FaRobot,
  FaEye,
  FaMagic,
  FaChartBar,
  FaCogs,
  FaCode,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";

// -------------------------------------------------------
// Helper: lat/lon -> Vector3
// -------------------------------------------------------
function latLonToVec3(
  lat: number,
  lon: number,
  radius: number,
  target?: THREE.Vector3
): THREE.Vector3 {
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  const cosLat = Math.cos(latRad);
  const x = radius * cosLat * Math.cos(lonRad);
  const y = radius * Math.sin(latRad);
  const z = radius * cosLat * Math.sin(lonRad);
  if (target) {
    target.set(x, y, z);
    return target;
  }
  return new THREE.Vector3(x, y, z);
}

// -------------------------------------------------------
// Data — no category hierarchy, only individual technologies
// Color kept per original domain for subtle glow
// -------------------------------------------------------
type DomainId =
  | "android"
  | "aiml"
  | "web3"
  | "web"
  | "cloud"
  | "devops"
  | "programming";

const DOMAIN_COLOR: Record<DomainId, string> = {
  android: "#22d3ee",
  aiml: "#a78bfa",
  web3: "#34d399",
  web: "#f472b6",
  cloud: "#60a5fa",
  devops: "#fbbf24",
  programming: "#fb7185",
};

type TechDef = {
  label: string;
  domain: DomainId;
  lat: number;
  lon: number;
  priority: number; // 1 = keep on mobile, 2 = hide on mobile if needed
};

function buildTechs(): TechDef[] {
  // Deduplicated — exactly one node per technology (unique ID = label)
  // Even spherical distribution via deterministic Fibonacci sphere (golden angle)
  // Covers entire sphere, no category zones, no empty regions, collision-aware spacing
  const unique: Array<{ id: string; label: string; domain: DomainId; p?: number }> = [
    // CODE
    { id: "java", label: "Java", domain: "programming" },
    { id: "kotlin", label: "Kotlin", domain: "programming" },
    { id: "python", label: "Python", domain: "programming" },
    { id: "solidity", label: "Solidity", domain: "programming" },
    // ANDROID
    { id: "native-android", label: "Native Android", domain: "android", p: 2 },
    { id: "react-native", label: "React Native", domain: "android" },
    { id: "expo", label: "Expo", domain: "android" },
    { id: "uiux", label: "UI/UX Design", domain: "android", p: 2 },
    // WEB
    { id: "reactjs", label: "React.js", domain: "web" },
    { id: "nextjs", label: "Next.js", domain: "web" },
    { id: "fastapi", label: "FastAPI", domain: "web" },
    { id: "pydantic", label: "Pydantic", domain: "web", p: 2 },
    { id: "mongodb", label: "MongoDB Atlas", domain: "web", p: 2 },
    { id: "firebase", label: "Firebase", domain: "web" },
    { id: "rest", label: "REST APIs", domain: "web" },
    // WEB3
    { id: "smartcontracts", label: "Smart Contracts", domain: "web3" },
    { id: "ipfs", label: "IPFS", domain: "web3" },
    { id: "nfts", label: "NFTs", domain: "web3" },
    { id: "dapps", label: "dApps", domain: "web3" },
    { id: "sha256", label: "SHA-256", domain: "web3", p: 2 },
    // AI / ML
    { id: "deeplearning", label: "Deep Learning", domain: "aiml" },
    { id: "generativeai", label: "Generative AI", domain: "aiml" },
    { id: "agenticai", label: "Agentic AI", domain: "aiml" },
    { id: "computervision", label: "Computer Vision", domain: "aiml", p: 2 },
    { id: "gemini", label: "Gemini", domain: "aiml" },
    { id: "ollama", label: "Ollama", domain: "aiml" },
    { id: "bedrock", label: "Amazon Bedrock", domain: "aiml" },
    { id: "genkit", label: "Genkit", domain: "aiml", p: 2 },
    { id: "orchestration", label: "AI Agent Orchestration", domain: "aiml", p: 2 },
    // CLOUD
    { id: "aws", label: "AWS", domain: "cloud" },
    { id: "docker", label: "Docker", domain: "cloud" },
    { id: "kubernetes", label: "Kubernetes", domain: "cloud" },
    { id: "helm", label: "Helm", domain: "cloud" },
    { id: "minikube", label: "Minikube", domain: "cloud", p: 2 },
    // DEVOPS
    { id: "ghactions", label: "GitHub Actions", domain: "devops", p: 2 },
    { id: "gitops", label: "GitOps", domain: "devops", p: 2 },
    { id: "cicd", label: "CI/CD", domain: "devops" },
    { id: "prometheus", label: "Prometheus", domain: "devops", p: 2 },
    { id: "grafana", label: "Grafana", domain: "devops" },
    { id: "metrics", label: "Metrics Server", domain: "devops", p: 2 },
    { id: "powershell", label: "PowerShell", domain: "devops" },
  ];

  // Fibonacci sphere — deterministic, even, no random clusters
  const n = unique.length;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const pts: Array<{ lat: number; lon: number }> = [];
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2; // -1..1
    // Clamp to lat -68..68 for better visible distribution (avoid poles)
    const yClamped = Math.max(-0.927, Math.min(0.927, y * 0.97));
    const radius = Math.sqrt(1 - yClamped * yClamped);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    let lat = (Math.asin(yClamped) * 180) / Math.PI;
    let lon = (Math.atan2(z, x) * 180) / Math.PI;
    // Add tiny deterministic jitter to avoid perfect grid look, but keep even spacing
    const jLat = ((i * 7) % 5 - 2) * 1.1;
    const jLon = ((i * 13) % 7 - 3) * 1.6;
    lat = Math.max(-65, Math.min(65, lat + jLat));
    lon += jLon;
    if (lon > 180) lon -= 360;
    if (lon < -180) lon += 360;
    pts.push({ lat, lon });
  }

  // Interleave to mix categories spatially: shuffle pts? pts are already spatially spread in Fibonacci order (spatially separated consecutive points are far apart due to golden angle)
  // So assigning in order already mixes, but we explicitly shuffle unique to avoid category runs: sort unique by domain then assign spaced pts
  // Simple: keep order as above (already mixed by domain groups), but Fibonacci pts are spatially distributed, so consecutive pts are far apart -> mixed appearance
  return unique.map((u, idx) => {
    const p = pts[idx];
    return { label: u.label, domain: u.domain, lat: p.lat, lon: p.lon, priority: u.p ?? 1 };
  });
}

const TECHS: TechDef[] = buildTechs();

// Icon mapping — real brand logos via react-icons, fallback to generic — subtle glow
function TechIcon({ label, size = 18, color }: { label: string; size?: number; color: string }) {
  const style = { width: size, height: size, color, filter: `drop-shadow(0 0 3px ${color}55)` } as React.CSSProperties;
  const n = label.toLowerCase();
  if (n === "python") return <SiPython style={style} />;
  if (n === "java") return <FaJava style={style} />;
  if (n === "kotlin") return <SiKotlin style={style} />;
  if (n === "solidity") return <SiSolidity style={style} />;
  if (n.includes("react native")) return <SiReact style={style} />;
  if (n === "react.js" || n === "react") return <SiReact style={style} />;
  if (n === "next.js") return <SiNextdotjs style={style} />;
  if (n === "fastapi") return <SiFastapi style={style} />;
  if (n === "firebase") return <SiFirebase style={style} />;
  if (n.includes("mongodb")) return <SiMongodb style={style} />;
  if (n === "pydantic") return <SiPydantic style={style} />;
  if (n === "aws") return <FaAws style={style} />;
  if (n === "docker") return <SiDocker style={style} />;
  if (n.includes("kubernetes")) return <SiKubernetes style={style} />;
  if (n === "helm") return <SiHelm style={style} />;
  if (n.includes("github actions")) return <SiGithubactions style={style} />;
  if (n === "gitops") return <FaGithub style={{ ...style, opacity: 0.95 }} />;
  if (n === "ci/cd") return <FaCogs style={style} />;
  if (n === "minikube") return <SiKubernetes style={style} />;
  if (n === "prometheus") return <SiPrometheus style={style} />;
  if (n === "grafana") return <SiGrafana style={style} />;
  if (n === "powershell") return <FaCode style={style} />;
  if (n.includes("android") && !n.includes("ui")) return <SiAndroid style={style} />;
  if (n === "expo") return <SiExpo style={style} />;
  if (n === "ipfs") return <SiIpfs style={style} />;
  if (n === "gemini") return <SiGooglegemini style={style} />;
  if (n === "ollama") return <SiOllama style={style} />;
  if (n === "solidity" || n.includes("solidity")) return <SiSolidity style={style} />;
  if (n.includes("smart contracts")) return <FaCube style={style} />;
  if (n === "nfts") return <FaCube style={style} />;
  if (n === "dapps") return <FaCube style={style} />;
  if (n === "sha-256") return <FaLock style={style} />;
  if (n.includes("rest apis")) return <FaServer style={style} />;
  if (n.includes("deep learning")) return <FaBrain style={style} />;
  if (n.includes("agentic ai")) return <FaRobot style={style} />;
  if (n.includes("generative ai")) return <FaMagic style={style} />;
  if (n.includes("computer vision")) return <FaEye style={style} />;
  if (n.toLowerCase().includes("bedrock")) return <FaAws style={style} />;
  if (n === "genkit") return <FaGoogle style={style} />;
  if (n.includes("orchestration")) return <FaCogs style={style} />;
  if (n.includes("ui/ux")) return <FaFigma style={style} />;
  if (n === "helm") return <SiHelm style={style} />;
  if (n.includes("metrics server")) return <FaChartBar style={style} />;
  if (n === "native android") return <FaAndroid style={style} />;
  // fallback
  return <FaCode style={style} />;
}

// micro points - purely visual tiny dots
function useMicroPoints(count: number, radius: number) {
  return useMemo(() => {
    const pts: Array<{ lat: number; lon: number; pos: THREE.Vector3 }> = [];
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const lat = 90 - (phi * 180) / Math.PI;
      let lon = (theta * 180) / Math.PI - 180;
      lon += (Math.random() - 0.5) * 2;
      const pos = latLonToVec3(lat, lon, radius);
      pts.push({ lat, lon, pos });
    }
    return pts;
  }, [count, radius]);
}

// -------------------------------------------------------
// Individual Tech Node — small glowing dot + logo + billboarded label
// -------------------------------------------------------
function TechNode({
  lat,
  lon,
  radius,
  label,
  color,
  globeRotationRef,
  isMobile,
  priority,
}: {
  lat: number;
  lon: number;
  radius: number;
  label: string;
  color: string;
  globeRotationRef: React.MutableRefObject<THREE.Euler>;
  isMobile: boolean;
  priority: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const htmlGroupRef = useRef<THREE.Group>(null);
  const htmlWrapRef = useRef<HTMLDivElement>(null);

  const basePos = useMemo(() => latLonToVec3(lat, lon, radius), [lat, lon, radius]);
  const normal = useMemo(() => basePos.clone().normalize(), [basePos]);
  const labelOffset = useMemo(() => normal.clone().multiplyScalar(0.09), [normal]);

  const shouldHideOnMobile = isMobile && priority === 2;

  useEffect(() => {
    if (groupRef.current) groupRef.current.position.copy(basePos);
  }, [basePos]);

  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    const grp = groupRef.current;
    if (!grp) return;
    const euler = globeRotationRef.current;
    _tmpVec.copy(basePos);
    _tmpVec.applyEuler(euler);
    const facing = _tmpVec.z / radius;

    let opacity: number;
    let scale: number;
    if (facing > 0.35) {
      opacity = 0.85 + 0.15 * THREE.MathUtils.clamp((facing - 0.35) / 0.65, 0, 1);
      scale = 1;
    } else if (facing > 0.05) {
      opacity = 0.35 + 0.5 * ((facing - 0.05) / 0.3);
      scale = 0.85;
    } else if (facing > -0.15) {
      opacity = 0.12 + 0.23 * ((facing + 0.15) / 0.2);
      scale = 0.7;
    } else {
      opacity = 0.04 + 0.08 * Math.max(0, (facing + 0.4) / 0.25);
      scale = 0.6;
    }

    const hoverMul = hovered && facing > 0 ? 1.25 : 1;

    if (dotRef.current) {
      const mat = dotRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.clamp(opacity * 0.95, 0, 1);
      mat.emissiveIntensity = 0.75 * (facing > 0 ? 1 : 0.25) * hoverMul;
      dotRef.current.scale.setScalar(0.85 * (facing > 0 ? 1 : 0.65) * hoverMul * scale);
      dotRef.current.visible = !shouldHideOnMobile || facing > -0.2;
    }
    if (glowRef.current) {
      const mat2 = glowRef.current.material as THREE.MeshBasicMaterial;
      mat2.opacity = THREE.MathUtils.clamp(opacity * 0.14 * hoverMul, 0, 0.18);
      glowRef.current.scale.setScalar(1.25);
      glowRef.current.visible = facing > -0.12 && !shouldHideOnMobile;
    }
    if (htmlGroupRef.current) {
      const visible = facing > -0.08 && !(shouldHideOnMobile && opacity < 0.18);
      const finalVisible = visible && facing > -0.18;
      htmlGroupRef.current.visible = finalVisible;
      if (htmlWrapRef.current) {
        const txtOpacity = THREE.MathUtils.clamp(opacity, 0, 1);
        htmlWrapRef.current.style.opacity = String(txtOpacity);
        htmlWrapRef.current.style.transform = `scale(${scale * (hoverMul > 1 ? 1.08 : 1)})`;
      }
    }
    if (!shouldHideOnMobile && htmlGroupRef.current && facing < -0.18) {
      htmlGroupRef.current.visible = false;
    }
  });

  const dotColor = color;
  const iconSize = isMobile ? 10 : 12;
  const textSize = isMobile ? 6 : 7;

  return (
    <group ref={groupRef}>
      <mesh ref={glowRef} renderOrder={2}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial color={dotColor} transparent opacity={0.14} depthWrite={false} depthTest={false} />
      </mesh>
      <mesh
        ref={dotRef}
        renderOrder={3}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshStandardMaterial color={dotColor} emissive={dotColor} emissiveIntensity={0.55} transparent opacity={1} depthWrite={false} />
      </mesh>
      <mesh visible={false} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <group ref={htmlGroupRef} position={labelOffset}>
        <Billboard follow lockX={false} lockY={false} lockZ={false}>
          <Html
            transform
            center
            distanceFactor={7}
            occlude={false}
            style={{ pointerEvents: "none" }}
            zIndexRange={[0, 0]}
          >
            <div
              ref={htmlWrapRef}
              className="flex flex-col items-center gap-[2px] select-none"
              style={{
                opacity: 1,
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  filter: `drop-shadow(0 0 4px ${dotColor}55)`,
                  opacity: 0.96,
                }}
              >
                <TechIcon label={label} size={iconSize} color={dotColor} />
              </div>
              <span
                className="whitespace-nowrap text-center leading-none tracking-[-0.01em]"
                style={{
                  fontSize: textSize,
                  fontWeight: 450,
                  color: "rgba(230,232,238,0.92)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.85)",
                  lineHeight: 1,
                  maxWidth: 84,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {label}
              </span>
            </div>
          </Html>
        </Billboard>
      </group>
    </group>
  );
}

// temp vectors for perf
const _tmpVec = new THREE.Vector3();

// -------------------------------------------------------
// Globe wireframe + atmosphere + micro dots + lat/lon lines
// -------------------------------------------------------
function GlobeBody({
  radius,
  globeRotationRef,
}: {
  radius: number;
  globeRotationRef: React.MutableRefObject<THREE.Euler>;
}) {
  const micro = useMicroPoints(72, radius + 0.01);

  const latLonLines = useMemo(() => {
    const lines: Array<{ positions: Float32Array }> = [];
    const latSteps = [-60, -30, 0, 30, 60];
    const lonStepsDeg = 30;
    for (const lat of latSteps) {
      const seg = 48;
      const pos = new Float32Array(seg * 3);
      for (let i = 0; i < seg; i++) {
        const lon = (i / seg) * 360 - 180;
        const v = latLonToVec3(lat, lon, radius + 0.001);
        pos[i * 3] = v.x;
        pos[i * 3 + 1] = v.y;
        pos[i * 3 + 2] = v.z;
      }
      lines.push({ positions: pos });
    }
    for (let lon = -150; lon <= 180; lon += lonStepsDeg) {
      const seg = 48;
      const pos = new Float32Array(seg * 3);
      for (let i = 0; i < seg; i++) {
        const lat = -90 + (i / (seg - 1)) * 180;
        const clat = Math.max(-86, Math.min(86, lat));
        const v = latLonToVec3(clat, lon, radius + 0.001);
        pos[i * 3] = v.x;
        pos[i * 3 + 1] = v.y;
        pos[i * 3 + 2] = v.z;
      }
      lines.push({ positions: pos });
    }
    return lines;
  }, [radius]);

  const microPositions = useMemo(() => {
    const arr = new Float32Array(micro.length * 3);
    micro.forEach((m, i) => {
      arr[i * 3] = m.pos.x;
      arr[i * 3 + 1] = m.pos.y;
      arr[i * 3 + 2] = m.pos.z;
    });
    return arr;
  }, [micro]);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshStandardMaterial color="#0a0a12" transparent opacity={0.68} roughness={0.85} metalness={0.12} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius + 0.002, 32, 32]} />
        <meshBasicMaterial color="#7dd3e8" wireframe transparent opacity={0.055} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius + 0.003, 24, 24]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.035} depthWrite={false} />
      </mesh>
      {latLonLines.map((l, idx) => {
        const isEquator = idx === 2;
        return (
          <line key={idx}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[l.positions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={isEquator ? "#22d3ee" : idx < 5 ? "#7dd3e8" : "#a78bfa"} transparent opacity={isEquator ? 0.14 : 0.05} depthWrite={false} />
          </line>
        );
      })}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[microPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.013} color="#7dd3e8" transparent opacity={0.42} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[microPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.022} color="#a78bfa" transparent opacity={0.13} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <mesh>
        <sphereGeometry args={[radius * 0.65, 32, 32]} />
        <meshBasicMaterial color="#1e1a3a" transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <mesh position={[0, radius * 0.92, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.0} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------
// Main Globe Group with rotation + drag + auto-rotate — individual tech nodes only
// -------------------------------------------------------
function GlobeGroup({ radius, isMobile }: { radius: number; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const globeRotationRef = useRef<THREE.Euler>(new THREE.Euler(0.12, 0, 0, "YXZ"));
  const dragRef = useRef({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    velX: 0,
    velY: 0,
    autoSpeed: 0.055,
  });
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion.current) dragRef.current.autoSpeed = 0;
  }, []);
  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const d = dragRef.current;
    if (prefersReducedMotion.current) {
      if (!d.isDragging) {
        d.velX *= 0.94;
        d.velY *= 0.94;
        globeRotationRef.current.y += d.velX * delta;
        globeRotationRef.current.x += d.velY * delta;
        globeRotationRef.current.x = THREE.MathUtils.clamp(globeRotationRef.current.x, -0.58, 0.58);
        g.rotation.copy(globeRotationRef.current);
      }
      return;
    }
    if (!d.isDragging) {
      const auto = d.autoSpeed;
      d.velX *= 0.96;
      d.velY *= 0.96;
      globeRotationRef.current.y += d.velX * delta;
      globeRotationRef.current.x += d.velY * delta;
      globeRotationRef.current.y += auto * delta;
      globeRotationRef.current.x = THREE.MathUtils.clamp(globeRotationRef.current.x, -0.55, 0.55);
      globeRotationRef.current.x += Math.sin(performance.now() * 0.00018) * 0.00014 * delta * 60;
      g.rotation.copy(globeRotationRef.current);
    } else {
      g.rotation.copy(globeRotationRef.current);
    }
  });
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement as HTMLCanvasElement;
    let lastMove = 0;
    const onPointerDown = (e: PointerEvent) => {
      dragRef.current.isDragging = true;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      dragRef.current.velX = 0;
      dragRef.current.velY = 0;
      try {
        (canvas as any).setPointerCapture?.(e.pointerId);
      } catch {}
      canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current.isDragging) return;
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      const dt = performance.now() - lastMove || 16;
      lastMove = performance.now();
      const sensX = 0.0052;
      const sensY = 0.0036;
      globeRotationRef.current.y += dx * sensX;
      globeRotationRef.current.x += dy * sensY;
      globeRotationRef.current.x = THREE.MathUtils.clamp(globeRotationRef.current.x, -0.65, 0.65);
      dragRef.current.velX = (dx * sensX) / (dt / 1000);
      dragRef.current.velY = (dy * sensY) / (dt / 1000);
      dragRef.current.velX = THREE.MathUtils.clamp(dragRef.current.velX, -3.5, 3.5);
      dragRef.current.velY = THREE.MathUtils.clamp(dragRef.current.velY, -2.2, 2.2);
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      if (groupRef.current) groupRef.current.rotation.copy(globeRotationRef.current);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!dragRef.current.isDragging) return;
      dragRef.current.isDragging = false;
      canvas.style.cursor = "grab";
      if (prefersReducedMotion.current) {
        dragRef.current.velX *= 0.25;
        dragRef.current.velY *= 0.25;
      }
      try {
        (canvas as any).releasePointerCapture?.(e.pointerId);
      } catch {}
    };
    const onPointerLeave = () => {
      if (dragRef.current.isDragging) {
        dragRef.current.isDragging = false;
        canvas.style.cursor = "grab";
      }
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";
    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [gl]);

  return (
    <group ref={groupRef} rotation={[0.12, 0, 0]}>
      <GlobeBody radius={radius} globeRotationRef={globeRotationRef} />
      {TECHS.map((t, idx) => {
        const color = DOMAIN_COLOR[t.domain];
        return (
          <TechNode
            key={`tech-${idx}-${t.label}-${t.domain}`}
            lat={t.lat}
            lon={t.lon}
            radius={radius + 0.01}
            label={t.label}
            color={color}
            globeRotationRef={globeRotationRef}
            isMobile={isMobile}
            priority={t.priority}
          />
        );
      })}
    </group>
  );
}

// -------------------------------------------------------
// Star field background overlay (CSS)
// -------------------------------------------------------
function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute rounded-full blur-[90px]"
        style={{
          width: "680px",
          height: "680px",
          right: "10%",
          top: "38%",
          transform: "translateY(-50%)",
          background: "radial-gradient(ellipse at center, rgba(120,40,200,0.14) 0%, rgba(100,30,180,0.08) 32%, transparent 72%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[90px]"
        style={{
          width: "720px",
          height: "580px",
          left: "8%",
          bottom: "8%",
          background: "radial-gradient(ellipse at center, rgba(30,160,220,0.10) 0%, rgba(20,120,190,0.05) 36%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.48]"
        style={{
          backgroundImage: `
            radial-gradient(1.1px 1.1px at 11% 14%, rgba(255,255,255,0.85) 50%, transparent 51%),
            radial-gradient(1px 1px at 23% 26%, rgba(255,255,255,0.58) 50%, transparent 51%),
            radial-gradient(1.2px 1.2px at 29% 44%, rgba(255,255,255,0.62) 50%, transparent 51%),
            radial-gradient(1px 1px at 37% 16%, rgba(255,255,255,0.48) 50%, transparent 51%),
            radial-gradient(1px 1px at 49% 20%, rgba(255,255,255,0.52) 50%, transparent 51%),
            radial-gradient(1px 1px at 63% 24%, rgba(255,255,255,0.55) 50%, transparent 51%),
            radial-gradient(1px 1px at 72% 16%, rgba(255,255,255,0.48) 50%, transparent 51%),
            radial-gradient(1px 1px at 84% 20%, rgba(255,255,255,0.5) 50%, transparent 51%),
            radial-gradient(1px 1px at 15% 58%, rgba(255,255,255,0.35) 50%, transparent 51%),
            radial-gradient(0.9px 0.9px at 9% 66%, rgba(255,255,255,0.28) 50%, transparent 51%),
            radial-gradient(1px 1px at 19% 82%, rgba(255,255,255,0.30) 50%, transparent 51%),
            radial-gradient(1px 1px at 42% 84%, rgba(255,255,255,0.22) 50%, transparent 51%),
            radial-gradient(1px 1px at 60% 80%, rgba(255,255,255,0.24) 50%, transparent 51%),
            radial-gradient(1px 1px at 76% 74%, rgba(255,255,255,0.22) 50%, transparent 51%),
            radial-gradient(1.2px 1.2px at 51% 7%, rgba(255,255,255,0.72) 50%, transparent 51%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.018] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

// -------------------------------------------------------
// Main Section Component — individual tech constellation only
// -------------------------------------------------------
export default function SkillsGlobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "top 38%",
          scrub: false,
          once: true,
        },
      });
      tl.fromTo(".skills-title-bg", { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 0)
        .fromTo(".skills-title-fg", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.15)
        .fromTo(".globe-container", { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" }, 0.18)
        .fromTo(".globe-hint", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.85);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const globeRadius = 1.95;

  return (
    <section ref={sectionRef} id="skills" aria-label="Skills — Tech Stack Globe" className="relative overflow-hidden bg-[#050508] py-14 md:py-20 lg:py-24">
      <div className="absolute inset-0">
        <StarField />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-t from-black/55 via-black/18 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-black/30 to-transparent" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10 flex flex-col items-center">
        {/* New Skills Title — giant dark SKILLS + white SKILLS foreground */}
        <div className="relative w-full flex flex-col items-center justify-center pt-2 pb-4 md:pb-6 select-none pointer-events-none">
          <div className="relative flex items-center justify-center w-full">
            {/* Background giant SKILLS */}
            <span
              aria-hidden="true"
              className={`skills-title-bg absolute inset-0 flex items-center justify-center whitespace-nowrap font-black leading-none tracking-[-0.04em] ${ultra.className}`}
              style={{
                fontSize: "clamp(88px, 18vw, 260px)",
                color: "rgba(255,255,255,0.06)",
                lineHeight: 0.9,
              }}
            >
              SKILLS
            </span>
            {/* Foreground white SKILLS */}
            <h2
              className={`skills-title-fg relative text-white font-black leading-none tracking-[-0.02em] text-center ${ultra.className}`}
              style={{ fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 1 }}
            >
              SKILLS
            </h2>
          </div>
        </div>

        <div ref={globeWrapRef} className="globe-container relative w-full flex items-center justify-center select-none mt-8 md:mt-12" style={{ minHeight: isMobile ? "320px" : "500px" }}>
          <div className="relative h-[320px] w-[320px] sm:h-[380px] sm:w-[380px] md:h-[500px] md:w-[500px] lg:h-[520px] lg:w-[520px] xl:h-[540px] xl:w-[540px] max-w-[90vw] max-h-[90vw] md:max-h-none">

            <div className="absolute inset-0">
              {mounted ? (
                <Canvas
                  dpr={isMobile ? [1, 1.2] : [1, 1.4]}
                  performance={{ min: 0.6 }}
                  gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance", stencil: false, depth: true }}
                  camera={{ position: [0, 0, 7.4], fov: 36, near: 0.1, far: 100 }}
                  onCreated={({ gl }) => {
                    gl.setClearColor("#050508", 0);
                  }}
                  style={{ background: "transparent" }}
                >
                  <ambientLight intensity={0.9} />
                  <directionalLight position={[5, 4, 6]} intensity={0.9} color="#ffffff" />
                  <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#a78bfa" />
                  <pointLight position={[0, 3, 3]} intensity={22} distance={10} color="#22d3ee" decay={2} />
                  <pointLight position={[0, -2, -2]} intensity={12} distance={9} color="#a78bfa" decay={2} />
                  <fog attach="fog" args={["#050508", 9, 16]} />
                  <GlobeGroup radius={globeRadius} isMobile={isMobile} />
                </Canvas>
              ) : (
                <div className="h-full w-full animate-pulse rounded-full bg-white/[0.02] border border-white/[0.04]" />
              )}
            </div>
          </div>
        </div>
        <p className="globe-hint mt-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/28">
          <span className="hidden md:inline">Drag to rotate</span>
          <span className="md:hidden">Drag & tap nodes</span>
          <span className="h-1 w-1 rounded-full bg-white/20 md:inline hidden" />
          <span className="hidden md:inline text-white/20">Hover to highlight</span>
          <span className="md:hidden text-white/22">Tap a technology</span>
        </p>
        <div className="sr-only" aria-hidden={false}>
          <h3>Skills</h3>
          <ul>
            {TECHS.map((t) => (
              <li key={`${t.domain}-${t.label}`}>{t.label}</li>
            ))}
          </ul>
        </div>
      </div>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .globe-container { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
