/**
 * Spatial Scene R3F (pmndrs/react-three-fiber suite)
 * Declarative 3D Spatial Canvas, ShaderGradient, LiquidGlass & Postprocessing
 * 
 * Packages used:
 * - @react-three/fiber
 * - @react-three/drei
 * - @react-three/postprocessing
 * - three
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, MeshTransmissionMaterial, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

// Procedural 3D Simplex Fluid Mesh Shader
const NOISE_GLSL = `
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

const FLUID_VERTEX_SHADER = `
  ${NOISE_GLSL}
  uniform float uTime;
  uniform float uSpeed;
  uniform float uFrequency;
  uniform float uAmplitude;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float time = uTime * uSpeed;
    float noise = snoise(vec3(pos.x * uFrequency, pos.y * uFrequency, time)) * uAmplitude;
    pos.z += noise;
    vElevation = noise;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const FLUID_FRAGMENT_SHADER = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uVoidColor;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float elev = clamp((vElevation + 1.2) * 0.42, 0.0, 1.0);
    vec3 col = uVoidColor;
    if (elev < 0.4) {
      col = mix(uVoidColor, uColor1, smoothstep(0.0, 0.4, elev));
    } else if (elev < 0.75) {
      col = mix(uColor1, uColor2, smoothstep(0.4, 0.75, elev));
    } else {
      col = mix(uColor2, uColor3, smoothstep(0.75, 1.0, elev));
    }
    gl_FragColor = vec4(col, 0.88);
  }
`;

/**
 * Declarative 3D ShaderGradient Background
 */
export function ShaderGradientBackground({
  preset = 'cyber',
  speed = 0.8,
  frequency = 0.12,
  amplitude = 1.5,
  ...props
}) {
  const meshRef = useRef();

  const uniforms = useMemo(() => {
    const isCyber = preset === 'cyber';
    return {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uFrequency: { value: frequency },
      uAmplitude: { value: amplitude },
      uColor1: { value: new THREE.Color(isCyber ? 0x00F0FF : 0x8B5CF6) },
      uColor2: { value: new THREE.Color(isCyber ? 0xFF007A : 0x06B6D4) },
      uColor3: { value: new THREE.Color(isCyber ? 0xFFB800 : 0x10B981) },
      uVoidColor: { value: new THREE.Color(0x05050A) }
    };
  }, [preset, speed, frequency, amplitude]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI * 0.28, 0, 0]}
      position={[0, -2, -6]}
      {...props}
    >
      <planeGeometry args={[32, 32, 64, 64]} />
      <shaderMaterial
        vertexShader={FLUID_VERTEX_SHADER}
        fragmentShader={FLUID_FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Declarative Liquid Glass Card Surface with Drei Transmission Material
 */
export function LiquidGlassCard({
  width = 3.6,
  height = 2.4,
  depth = 0.12,
  radius = 0.2,
  color = '#00F0FF',
  roughness = 0.05,
  ior = 1.48,
  transmission = 0.95,
  chromaticAberration = 0.06,
  children,
  ...props
}) {
  return (
    <group {...props}>
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.4}
          roughness={roughness}
          transmission={transmission}
          ior={ior}
          chromaticAberration={chromaticAberration}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.1}
          color={color}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
        />
      </mesh>
      {children}
    </group>
  );
}

/**
 * Interactive 3D Artifact Inspector with spring physics & orbit controls
 */
export function InteractiveArtifactViewer({ geometryType = 'torus-knot', ...props }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  const geometry = useMemo(() => {
    switch (geometryType) {
      case 'icosahedron': return <icosahedronGeometry args={[1.5, 1]} />;
      case 'octahedron': return <octahedronGeometry args={[1.6, 2]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[1.5, 1]} />;
      case 'torus-knot':
      default: return <torusKnotGeometry args={[1.2, 0.38, 128, 32]} />;
    }
  }, [geometryType]);

  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} {...props}>
        {geometry}
        <meshStandardMaterial
          color="#090E1A"
          emissive="#00F0FF"
          emissiveIntensity={0.6}
          roughness={0.18}
          metalness={0.82}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

/**
 * High-Performance Unified Spatial Canvas Container
 */
export function SpatialPortfolioCanvas({
  children,
  preset = 'cyber',
  enablePostprocessing = true,
  camera = { position: [0, 0, 6], fov: 50 },
  ...props
}) {
  return (
    <Canvas
      camera={camera}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      {...props}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" />
      <pointLight position={[-10, -10, -10]} intensity={1.0} color="#FF007A" />

      {/* Procedural 3D Simplex Fluid Mesh Background */}
      <ShaderGradientBackground preset={preset} />

      {/* Main Spatial Content Scene */}
      {children}

      {/* Cinematic Postprocessing */}
      {enablePostprocessing && (
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} height={300} intensity={0.6} />
          <ChromaticAberration offset={[0.0012, 0.0012]} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      )}

      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
    </Canvas>
  );
}
