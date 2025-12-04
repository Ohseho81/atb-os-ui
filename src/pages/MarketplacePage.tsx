import { useState, useEffect } from "react";

type Pack = {
  id: string;
  name: string;
  version: string;
  category: string;
  flow_stages: string[];
};

export function MarketplacePage() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [installed, setInstalled] = useState<string[]>([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8001/pack/store/list").then(r => r.json()),
      fetch("http://localhost:8001/pack/store/installed").then(r => r.json()),
    ])
      .then(([packsRes, installedRes]) => {
        setPacks(packsRes.packs || []);
        setInstalled(installedRes.installed || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleInstall = async (packId: string) => {
    await fetch("http://localhost:8001/pack/store/install", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pack_id: packId }),
    });
    setInstalled([...installed, packId]);
  };

  const handleUninstall = async (packId: string) => {
    await fetch("http://localhost:8001/pack/store/uninstall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pack_id: packId }),
    });
    setInstalled(installed.filter(id => id !== packId));
  };

  const filteredPacks = category === "all" 
    ? packs 
    : packs.filter(p => p.category === category);

  if (loading) return <div style={{ padding: 24, paddingTop: 64 }}>Loading...</div>;

  return (
    <div style={{ padding: 24, paddingTop: 64 }}>
      <h1 style={{ marginTop: 0 }}>🛒 Pack Marketplace</h1>

      {/* 카테고리 필터 */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["all", "core", "enterprise", "city", "custom"].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "8px 16px",
              background: category === cat ? "#4f46e5" : "#fff",
              color: category === cat ? "#fff" : "#000",
              border: "1px solid #eee",
              borderRadius: 20,
              cursor: "pointer",
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Pack 그리드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {filteredPacks.map(pack => {
          const isInstalled = installed.includes(pack.id);
          return (
            <div key={pack.id} style={{
              background: "#fff",
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{
                width: 48,
                height: 48,
                background: "#4f46e5",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                marginBottom: 12,
              }}>
                📦
              </div>
              
              <h3 style={{ margin: 0, marginBottom: 4 }}>{pack.name}</h3>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
                {pack.version} • {pack.category}
              </div>
              
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
                {pack.flow_stages.slice(0, 2).map(stage => (
                  <span key={stage} style={{
                    padding: "2px 6px",
                    background: "#f0f0f0",
                    borderRadius: 4,
                    fontSize: 10,
                  }}>
                    {stage}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: "auto" }}>
                {isInstalled ? (
                  <button
                    onClick={() => handleUninstall(pack.id)}
                    style={{
                      width: "100%",
                      padding: "8px 0",
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    Uninstall
                  </button>
                ) : (
                  <button
                    onClick={() => handleInstall(pack.id)}
                    style={{
                      width: "100%",
                      padding: "8px 0",
                      background: "#22c55e",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    Install
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
