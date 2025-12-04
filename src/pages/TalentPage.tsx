import { useState } from "react";

type Talent = {
  id: string;
  name: string;
  country: string;
  stage: "selection" | "training" | "visa" | "job" | "retention";
  progress: number;
  risk: number;
};

const mockTalents: Talent[] = [
  { id: "t1", name: "Juan Santos", country: "Philippines", stage: "training", progress: 65, risk: 12 },
  { id: "t2", name: "Raj Sharma", country: "Nepal", stage: "visa", progress: 78, risk: 8 },
  { id: "t3", name: "Kim Min-jun", country: "Korea", stage: "job", progress: 92, risk: 5 },
  { id: "t4", name: "Maria Garcia", country: "Philippines", stage: "selection", progress: 25, risk: 20 },
  { id: "t5", name: "Suman Thapa", country: "Nepal", stage: "training", progress: 45, risk: 15 },
  { id: "t6", name: "Lee Soo-young", country: "Korea", stage: "retention", progress: 100, risk: 3 },
];

const stageColors: Record<string, string> = {
  selection: "#fef3c7",
  training: "#dbeafe",
  visa: "#e0e7ff",
  job: "#dcfce7",
  retention: "#d1fae5",
};

export function TalentPage() {
  const [selected, setSelected] = useState<Talent | null>(null);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 2, padding: 24, overflow: "auto" }}>
        <h1 style={{ marginTop: 0 }}>Talent Pool</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {mockTalents.map((t) => (
            <div key={t.id} onClick={() => setSelected(t)} style={{
              border: selected?.id === t.id ? "2px solid #4f46e5" : "1px solid #eee",
              borderRadius: 8, padding: 16, cursor: "pointer", transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong>{t.name}</strong>
                  <span style={{ marginLeft: 8, color: "#666" }}>{t.country}</span>
                </div>
                <span style={{ background: stageColors[t.stage], padding: "4px 12px", borderRadius: 12, fontSize: 12, textTransform: "capitalize" }}>
                  {t.stage}
                </span>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span>Progress</span>
                  <span>{t.progress}%</span>
                </div>
                <div style={{ background: "#eee", borderRadius: 4, height: 8 }}>
                  <div style={{ background: "#4f46e5", borderRadius: 4, height: 8, width: `${t.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: 24, borderLeft: "1px solid #eee", background: "#fafafa" }}>
        {selected ? (
          <>
            <h2 style={{ marginTop: 0 }}>{selected.name}</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: 12 }}>Country: <strong>{selected.country}</strong></li>
              <li style={{ marginBottom: 12 }}>Stage: <strong style={{ textTransform: "capitalize" }}>{selected.stage}</strong></li>
              <li style={{ marginBottom: 12 }}>Progress: <strong>{selected.progress}%</strong></li>
              <li style={{ marginBottom: 12 }}>Risk: <strong style={{ color: selected.risk > 15 ? "#ef4444" : "#22c55e" }}>{selected.risk}%</strong></li>
            </ul>
            <div style={{ marginTop: 24, padding: 16, background: "#fff", borderRadius: 8, border: "1px solid #eee" }}>
              <h4 style={{ margin: "0 0 8px 0" }}>HUD</h4>
              <code style={{ fontSize: 12 }}>
                [{selected.stage.toUpperCase()} {selected.progress}% | Risk {selected.risk}%]
              </code>
            </div>
          </>
        ) : (
          <p style={{ color: "#888" }}>Select a talent to view details</p>
        )}
      </div>
    </div>
  );
}
