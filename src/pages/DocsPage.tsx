import { useState, useEffect } from "react";

type Pack = {
  id: string;
  name: string;
  version: string;
  category: string;
  flow_stages: string[];
};

export function DocsPage() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8001/pack/store/list")
      .then(r => r.json())
      .then(res => {
        setPacks(res.packs || []);
        if (res.packs?.length > 0) setSelectedPack(res.packs[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 24, paddingTop: 64 }}>Loading...</div>;

  return (
    <div style={{ padding: 24, paddingTop: 64, display: "flex", gap: 24 }}>
      {/* 사이드바 - Pack 목록 */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <h2 style={{ marginTop: 0 }}>📦 Packs ({packs.length})</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {packs.map(pack => (
            <div
              key={pack.id}
              onClick={() => setSelectedPack(pack)}
              style={{
                padding: 12,
                background: selectedPack?.id === pack.id ? "#4f46e5" : "#fff",
                color: selectedPack?.id === pack.id ? "#fff" : "#000",
                border: "1px solid #eee",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: 600 }}>{pack.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{pack.version} • {pack.category}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 메인 - Pack 상세 */}
      <div style={{ flex: 1 }}>
        {selectedPack ? (
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: 24 }}>
            <h1 style={{ marginTop: 0 }}>📦 {selectedPack.name}</h1>
            
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <span style={{ padding: "4px 12px", background: "#4f46e5", color: "#fff", borderRadius: 4 }}>
                {selectedPack.version}
              </span>
              <span style={{ padding: "4px 12px", background: "#22c55e", color: "#fff", borderRadius: 4 }}>
                {selectedPack.category}
              </span>
            </div>

            <h3>📋 Overview</h3>
            <p style={{ color: "#666", lineHeight: 1.6 }}>
              {selectedPack.name} is a core automation pack for managing {selectedPack.flow_stages.join(", ")} workflows.
              This pack integrates with the Autus ecosystem to provide seamless automation.
            </p>

            <h3>🔄 Flow Stages</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {selectedPack.flow_stages.map(stage => (
                <span key={stage} style={{
                  padding: "6px 12px",
                  background: "#f0f0f0",
                  borderRadius: 20,
                  fontSize: 13,
                }}>
                  {stage}
                </span>
              ))}
            </div>

            <h3>⚡ API Endpoints</h3>
            <div style={{ background: "#1a1a2e", color: "#4ade80", padding: 16, borderRadius: 8, fontFamily: "monospace", fontSize: 13 }}>
              <div>POST /pack/execute/{selectedPack.id}</div>
              <div>GET /pack/status/{selectedPack.id}</div>
              <div>GET /pack/history/{selectedPack.id}</div>
            </div>

            <h3>📖 Usage Example</h3>
            <div style={{ background: "#1a1a2e", color: "#fff", padding: 16, borderRadius: 8, fontFamily: "monospace", fontSize: 13 }}>
              <pre style={{ margin: 0 }}>{`curl -X POST http://localhost:8001/pack/execute \\
  -H "Content-Type: application/json" \\
  -d '{"pack_id": "${selectedPack.id}", "locale": "kr"}'`}</pre>
            </div>
          </div>
        ) : (
          <div>Select a pack to view documentation</div>
        )}
      </div>
    </div>
  );
}
