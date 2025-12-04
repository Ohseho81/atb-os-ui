type KPICardsProps = {
  totalPacks: number;
  avgVersion: number;
  successRate: number;
  totalExecutions: number;
};

export function KPICards({ totalPacks, avgVersion, successRate, totalExecutions }: KPICardsProps) {
  const cards = [
    { label: "Total Packs", value: totalPacks, color: "#4f46e5" },
    { label: "Avg Version", value: `v${avgVersion.toFixed(1)}`, color: "#22c55e" },
    { label: "Success Rate", value: `${(successRate * 100).toFixed(0)}%`, color: "#f59e0b" },
    { label: "Executions", value: totalExecutions, color: "#ef4444" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
      {cards.map((card) => (
        <div key={card.label} style={{ 
          background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 20,
          borderLeft: `4px solid ${card.color}` 
        }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{card.label}</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{card.value}</div>
        </div>
      ))}
    </div>
  );
}
