import { useState, useEffect } from "react";

type HistoryEntry = {
  old_version: string;
  new_version: string;
  evolved_at: string;
  metrics_snapshot: {
    executions: number;
    success_rate: number;
  };
};

type HistoryData = Record<string, HistoryEntry[]>;

export function AutomationPage() {
  const [history, setHistory] = useState<HistoryData | null>(null);

  useEffect(() => {
    fetch("http://localhost:8001/evolution/history")
      .then((res) => res.json())
      .then((json) => setHistory(json))
      .catch((err) => console.error(err));
  }, []);

  if (!history) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Pack Evolution History</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {Object.entries(history).map(([packId, entries]) => (
          <div key={packId} style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
            <h3 style={{ marginTop: 0, textTransform: "capitalize" }}>{packId}</h3>
            {entries.length === 0 ? (
              <p style={{ color: "#888" }}>No evolution history</p>
            ) : (
              entries.map((entry, i) => (
                <div key={i} style={{ marginBottom: 8, padding: 8, background: "#f5f5f5", borderRadius: 4 }}>
                  <div><strong>{entry.old_version} → {entry.new_version}</strong></div>
                  <div style={{ fontSize: 12, color: "#666" }}>{new Date(entry.evolved_at).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
