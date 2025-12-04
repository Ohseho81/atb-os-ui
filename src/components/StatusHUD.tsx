type StatusHUDProps = {
  packs: number;
  version: string;
  status: "healthy" | "warning" | "error";
};

export function StatusHUD({ packs, version, status }: StatusHUDProps) {
  const colors = { healthy: "#22c55e", warning: "#f59e0b", error: "#ef4444" };
  
  return (
    <div style={{
      position: "fixed", top: 0, left: 220, right: 0, height: 40,
      background: "#1a1a2e", color: "#fff", display: "flex", 
      alignItems: "center", justifyContent: "space-between", padding: "0 24px",
      fontSize: 12, fontFamily: "monospace", zIndex: 100
    }}>
      <div style={{ display: "flex", gap: 24 }}>
        <span>AUTUS {version}</span>
        <span>PACKS: {packs}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          STATUS: <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors[status] }} />
        </span>
      </div>
      <div>
        <span style={{ color: "#888" }}>⌘K to search</span>
      </div>
    </div>
  );
}
