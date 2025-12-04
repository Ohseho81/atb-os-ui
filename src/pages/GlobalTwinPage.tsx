import { useState, useEffect } from "react";
import { KPICards } from "../components/KPICards";

type CityData = {
  id: string;
  name: string;
  country: string;
  status: string;
  kpi: {
    talent_count: number;
    employer_count: number;
    university_count: number;
    retention_rate: number;
    visa_approval_rate: number;
    job_match_rate: number;
    nps_score: number;
    revenue: number;
  };
  layer_completion: number;
};

type GlobalKPI = {
  total_cities: number;
  total_countries: number;
  total_talent: number;
  total_employer: number;
  total_revenue: number;
  avg_retention_rate: number;
  avg_nps_score: number;
  active_cities: number;
};

export function GlobalTwinPage() {
  const [cities, setCities] = useState<CityData[]>([]);
  const [globalKPI, setGlobalKPI] = useState<GlobalKPI | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("seoul");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CityOS API 호출
    Promise.all([
      fetch("http://localhost:8001/city/list").then(r => r.json()),
      fetch("http://localhost:8001/city/global/kpi").then(r => r.json())
    ])
      .then(([cityRes, kpiRes]) => {
        setCities(cityRes.cities || []);
        setGlobalKPI(kpiRes);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: 24, paddingTop: 64 }}>Loading CityOS...</div>;

  const selected = cities.find(c => c.id === selectedCity);

  const statusColors: Record<string, string> = {
    mature: "#22c55e",
    active: "#3b82f6",
    scaling: "#8b5cf6",
    onboarding: "#f59e0b",
    planning: "#6b7280",
  };

  return (
    <div style={{ padding: 24, paddingTop: 64 }}>
      {globalKPI && (
        <KPICards
          totalPacks={globalKPI.total_cities}
          avgVersion={globalKPI.avg_retention_rate * 100}
          successRate={globalKPI.avg_nps_score / 100}
          totalExecutions={globalKPI.total_talent}
        />
      )}

      <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
        {/* 도시 맵 */}
        <div style={{ flex: 3, background: "#1a1a2e", borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: "#fff", marginTop: 0 }}>
            🌍 CityOS Global Twin ({cities.length} Cities)
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {cities.map((city) => (
              <div
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: selectedCity === city.id 
                    ? statusColors[city.status] 
                    : `${statusColors[city.status]}aa`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  fontSize: 12,
                  boxShadow: selectedCity === city.id 
                    ? `0 0 20px ${statusColors[city.status]}` 
                    : "none",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14 }}>{city.name}</div>
                <div style={{ opacity: 0.8 }}>{city.country.toUpperCase()}</div>
                <div style={{ 
                  marginTop: 4, 
                  padding: "2px 8px", 
                  background: "rgba(0,0,0,0.3)", 
                  borderRadius: 8,
                  fontSize: 10 
                }}>
                  {city.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 도시 상세 */}
        <div style={{ flex: 1, padding: 24, background: "#fff", borderRadius: 12, border: "1px solid #eee" }}>
          {selected ? (
            <>
              <h2 style={{ marginTop: 0 }}>{selected.name}</h2>
              <div style={{ 
                display: "inline-block",
                padding: "4px 12px", 
                background: statusColors[selected.status], 
                color: "#fff",
                borderRadius: 12,
                fontSize: 12,
                marginBottom: 16
              }}>
                {selected.status.toUpperCase()}
              </div>
              
              <div style={{ marginTop: 16 }}>
                <h4 style={{ marginBottom: 8 }}>📊 KPI</h4>
                <ul style={{ listStyle: "none", padding: 0, fontSize: 14 }}>
                  <li style={{ marginBottom: 8 }}>
                    👥 Talent: <strong>{selected.kpi.talent_count}</strong>
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    🏢 Employers: <strong>{selected.kpi.employer_count}</strong>
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    🎓 Universities: <strong>{selected.kpi.university_count}</strong>
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    📈 Retention: <strong>{(selected.kpi.retention_rate * 100).toFixed(0)}%</strong>
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    🛂 Visa Rate: <strong>{(selected.kpi.visa_approval_rate * 100).toFixed(0)}%</strong>
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    💼 Job Match: <strong>{(selected.kpi.job_match_rate * 100).toFixed(0)}%</strong>
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    ⭐ NPS: <strong>{selected.kpi.nps_score}</strong>
                  </li>
                  <li style={{ marginBottom: 8 }}>
                    💰 Revenue: <strong>${selected.kpi.revenue.toLocaleString()}</strong>
                  </li>
                </ul>
              </div>

              <div style={{ 
                marginTop: 16, 
                padding: 12, 
                background: "#1a1a2e", 
                borderRadius: 8, 
                fontFamily: "monospace", 
                fontSize: 11,
                color: "#4ade80"
              }}>
                [{selected.name.toUpperCase()} | {selected.status.toUpperCase()} | {selected.kpi.talent_count} TALENTS]
              </div>
            </>
          ) : (
            <div>Select a city</div>
          )}
        </div>
      </div>

      {/* 글로벌 요약 */}
      {globalKPI && (
        <div style={{ 
          marginTop: 24, 
          padding: 16, 
          background: "#f8fafc", 
          borderRadius: 8,
          display: "flex",
          justifyContent: "space-around",
          fontSize: 14
        }}>
          <div>🌍 <strong>{globalKPI.total_countries}</strong> Countries</div>
          <div>🏙️ <strong>{globalKPI.active_cities}</strong> Active Cities</div>
          <div>👥 <strong>{globalKPI.total_talent}</strong> Total Talent</div>
          <div>💰 <strong>${globalKPI.total_revenue.toLocaleString()}</strong> Revenue</div>
        </div>
      )}
    </div>
  );
}
