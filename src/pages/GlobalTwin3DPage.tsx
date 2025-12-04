import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Globe3D } from "../components/twin/Globe3D";

export function GlobalTwin3DPage() {
  const [viewMode, setViewMode] = useState<"3d" | "stats">("3d");

  return (
    <div style={{ padding: 24, paddingTop: 64, height: "calc(100vh - 64px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>🌍 Global Twin 3D</h1>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setViewMode("3d")}
            style={{
              padding: "8px 16px",
              background: viewMode === "3d" ? "#4f46e5" : "#fff",
              color: viewMode === "3d" ? "#fff" : "#000",
              border: "1px solid #eee",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            🌐 3D View
          </button>
          <button
            onClick={() => setViewMode("stats")}
            style={{
              padding: "8px 16px",
              background: viewMode === "stats" ? "#4f46e5" : "#fff",
              color: viewMode === "stats" ? "#fff" : "#000",
              border: "1px solid #eee",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            📊 Stats
          </button>
        </div>
      </div>

      {/* 범례 */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, background: "#22c55e", borderRadius: "50%" }} /> Mature
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, background: "#3b82f6", borderRadius: "50%" }} /> Active
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, background: "#f59e0b", borderRadius: "50%" }} /> Onboarding
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, background: "#6b7280", borderRadius: "50%" }} /> Planning
        </span>
      </div>

      {/* 3D Canvas */}
      <div style={{
        height: "calc(100% - 120px)",
        background: "#0a0a0f",
        borderRadius: 16,
        overflow: "hidden",
      }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} />
            <Globe3D />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={10}
              autoRotate={false}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 통계 패널 */}
      {viewMode === "stats" && (
        <div style={{
          position: "absolute",
          right: 40,
          top: 140,
          background: "rgba(255,255,255,0.95)",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: 280,
        }}>
          <h3 style={{ marginTop: 0 }}>📊 Global Stats</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total Cities</span>
              <strong>7</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total Talent</span>
              <strong>860</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Active Cities</span>
              <strong>3</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Avg Retention</span>
              <strong>78%</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
