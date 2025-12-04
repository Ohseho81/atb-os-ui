import { useState, useEffect } from "react";

type PackData = {
  version: string;
  executions: number;
  success_rate: number;
};

type EvolutionStatus = {
  total_packs: number;
  packs: Record<string, PackData>;
};

export function GlobalTwinPage() {
  const [data, setData] = useState<EvolutionStatus | null>(null);
  const [selectedPack, setSelectedPack] = useState<string>("school");

  useEffect(() => {
    fetch("http://localhost:8001/evolution/status")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div style={{ padding: 24 }}>Loading...</div>;

  const packList = Object.entries(data.packs);
  const selected = data.packs[selectedPack];

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 3, background: "#1a1a2e", padding: 24, overflow: "auto" }}>
        <h3 style={{ color: "#fff", marginTop: 0 }}>Autus Pack Evolution ({data.total_packs} Packs)</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {packList.map(([id, pack]) => (
            <div
              key={id}
              onClick={() => setSelectedPack(id)}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: selectedPack === id ? "#4f46e5" : "#6366f1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s",
                fontSize: 12,
              }}
            >
              <div style={{ fontWeight: 700 }}>{id}</div>
              <div>{pack.version}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: 24, borderLeft: "1px solid #eee" }}>
        <h2 style={{ marginTop: 0, textTransform: "capitalize" }}>{selectedPack} Pack</h2>
        {selected && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: 12 }}>Version: <strong>{selected.version}</strong></li>
            <li style={{ marginBottom: 12 }}>Executions: <strong>{selected.executions}</strong></li>
            <li style={{ marginBottom: 12 }}>Success Rate: <strong>{(selected.success_rate * 100).toFixed(1)}%</strong></li>
          </ul>
        )}
      </div>
    </div>
  );
}
