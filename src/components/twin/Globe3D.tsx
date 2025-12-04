import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

type City = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
  talentCount: number;
};

const CITIES: City[] = [
  { id: "seoul", name: "Seoul", lat: 37.5665, lng: 126.9780, status: "mature", talentCount: 500 },
  { id: "clark", name: "Clark", lat: 15.1850, lng: 120.5467, status: "active", talentCount: 150 },
  { id: "kathmandu", name: "Kathmandu", lat: 27.7172, lng: 85.3240, status: "active", talentCount: 80 },
  { id: "vientiane", name: "Vientiane", lat: 17.9757, lng: 102.6331, status: "onboarding", talentCount: 30 },
  { id: "dubai", name: "Dubai", lat: 25.2048, lng: 55.2708, status: "onboarding", talentCount: 50 },
  { id: "phnom_penh", name: "Phnom Penh", lat: 11.5564, lng: 104.9282, status: "planning", talentCount: 30 },
  { id: "jakarta", name: "Jakarta", lat: -6.2088, lng: 106.8456, status: "planning", talentCount: 20 },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function getStatusColor(status: string): string {
  switch (status) {
    case "mature": return "#22c55e";
    case "active": return "#3b82f6";
    case "onboarding": return "#f59e0b";
    case "planning": return "#6b7280";
    default: return "#888";
  }
}

function CityMarker({ city }: { city: City }) {
  const pos = latLngToVector3(city.lat, city.lng, 2.05);
  const color = getStatusColor(city.status);
  const size = 0.03 + (city.talentCount / 5000);

  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <Html distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div style={{
          background: "rgba(0,0,0,0.8)",
          color: "#fff",
          padding: "4px 8px",
          borderRadius: 4,
          fontSize: 11,
          whiteSpace: "nowrap",
        }}>
          {city.name} ({city.talentCount})
        </div>
      </Html>
    </group>
  );
}

export function Globe3D() {
  const globeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* 지구본 */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1a1a2e"
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* 내부 구체 (바다) */}
      <Sphere args={[1.98, 64, 64]}>
        <meshStandardMaterial color="#0f172a" />
      </Sphere>

      {/* 도시 마커 */}
      {CITIES.map(city => (
        <CityMarker key={city.id} city={city} />
      ))}

      {/* 조명 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
}
