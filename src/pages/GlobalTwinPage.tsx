import { useState } from "react";

const mockCities = [
  { id: "clark", name: "Clark", kpi: { retention: 0.82, visaApproval: 0.9, nps: 0.88 } },
  { id: "kathmandu", name: "Kathmandu", kpi: { retention: 0.76, visaApproval: 0.84, nps: 0.9 } },
  { id: "seoul", name: "Seoul", kpi: { retention: 0.9, visaApproval: 0.95, nps: 0.92 } },
];

export function GlobalTwinPage() {
  const [selectedCityId, setSelectedCityId] = useState("clark");
  const selectedCity = mockCities.find((c) => c.id === selectedCityId) ?? mockCities[0];

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 3, background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 40 }}>
          {mockCities.map((city) => (
            <div key={city.id} onClick={() => setSelectedCityId(city.id)} style={{
              width: 80 + city.kpi.retention * 40,
              height: 80 + city.kpi.retention * 40,
              borderRadius: "50%",
              background: selectedCityId === city.id ? "#4f46e5" : "#6366f1",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", cursor: "pointer", transition: "all 0.3s"
            }}>
              {city.name}
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: 24, borderLeft: "1px solid #eee" }}>
        <h2 style={{ marginTop: 0 }}>{selectedCity.name}</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: 12 }}>Retention: {(selectedCity.kpi.retention * 100).toFixed(1)}%</li>
          <li style={{ marginBottom: 12 }}>Visa Approval: {(selectedCity.kpi.visaApproval * 100).toFixed(1)}%</li>
          <li style={{ marginBottom: 12 }}>NPS: {(selectedCity.kpi.nps * 100).toFixed(1)}%</li>
        </ul>
      </div>
    </div>
  );
}
