import { useState, useEffect } from "react";

type SummaryData = {
  autus_version: string;
  total_packs: number;
  average_version: number;
  highest_version: string;
  versions: Record<string, string>;
};

export function SettingsPage() {
  const [summary, setSummary] = useState<SummaryData | null>(null);

  useEffect(() => {
    fetch("http://localhost:8001/evolution/summary")
      .then((res) => res.json())
      .then((json) => setSummary(json))
      .catch((err) => console.error(err));
  }, []);

  if (!summary) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>System Settings</h1>
      <div style={{ background: "#f5f5f5", padding: 24, borderRadius: 8, maxWidth: 500 }}>
        <h3 style={{ marginTop: 0 }}>Autus OS Status</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: 12 }}>Version: <strong>{summary.autus_version}</strong></li>
          <li style={{ marginBottom: 12 }}>Total Packs: <strong>{summary.total_packs}</strong></li>
          <li style={{ marginBottom: 12 }}>Average Version: <strong>v{summary.average_version.toFixed(1)}</strong></li>
          <li style={{ marginBottom: 12 }}>Highest Version: <strong>{summary.highest_version}</strong></li>
        </ul>
      </div>
    </div>
  );
}
