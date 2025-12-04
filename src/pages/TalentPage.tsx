import { useState, useEffect } from "react";

type CityKPI = {
  talent_count: number;
  employer_count: number;
  university_count: number;
  retention_rate: number;
};

type City = {
  id: string;
  name: string;
  country: string;
  status: string;
  kpi: CityKPI;
};

export function TalentPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [totalTalent, setTotalTalent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8001/city/list")
      .then(r => r.json())
      .then(res => {
        setCities(res.cities || []);
        const total = (res.cities || []).reduce((sum: number, c: City) => sum + c.kpi.talent_count, 0);
        setTotalTalent(total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 24, paddingTop: 64 }}>Loading...</div>;

  return (
    <div style={{ padding: 24, paddingTop: 64 }}>
      <h1 style={{ marginTop: 0 }}>👤 Talent Management</h1>

      {/* 요약 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 20, borderLeft: "4px solid #4f46e5" }}>
          <div style={{ fontSize: 12, color: "#888" }}>Total Talent</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{totalTalent}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 20, borderLeft: "4px solid #22c55e" }}>
          <div style={{ fontSize: 12, color: "#888" }}>Active Cities</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{cities.filter(c => c.status === "active" || c.status === "mature").length}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 20, borderLeft: "4px solid #f59e0b" }}>
          <div style={{ fontSize: 12, color: "#888" }}>Total Employers</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{cities.reduce((sum, c) => sum + c.kpi.employer_count, 0)}</div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 20, borderLeft: "4px solid #ef4444" }}>
          <div style={{ fontSize: 12, color: "#888" }}>Universities</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{cities.reduce((sum, c) => sum + c.kpi.university_count, 0)}</div>
        </div>
      </div>

      {/* 도시별 인재 분포 */}
      <h2>📊 Talent by City</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {cities.map(city => (
          <div key={city.id} style={{
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 20,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>{city.name}</h3>
              <span style={{
                padding: "4px 8px",
                background: city.status === "mature" ? "#22c55e" : city.status === "active" ? "#3b82f6" : "#f59e0b",
                color: "#fff",
                borderRadius: 4,
                fontSize: 11,
              }}>
                {city.status}
              </span>
            </div>
            <p style={{ color: "#666", margin: "8px 0" }}>{city.country.toUpperCase()}</p>
            
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>👥 Talent</span>
                <strong>{city.kpi.talent_count}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>🏢 Employers</span>
                <strong>{city.kpi.employer_count}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>📈 Retention</span>
                <strong>{(city.kpi.retention_rate * 100).toFixed(0)}%</strong>
              </div>
            </div>

            {/* 프로그레스 바 */}
            <div style={{ marginTop: 12, background: "#f0f0f0", borderRadius: 4, height: 8 }}>
              <div style={{
                width: `${Math.min(city.kpi.talent_count / 5, 100)}%`,
                background: "#4f46e5",
                height: "100%",
                borderRadius: 4,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
