import { useState } from "react";

type Org = {
  id: string;
  name: string;
  type: "university" | "employer";
  country: string;
  talentCount: number;
  rating: number;
};

const mockOrgs: Org[] = [
  { id: "u1", name: "Clark University", type: "university", country: "Philippines", talentCount: 450, rating: 4.5 },
  { id: "u2", name: "Kathmandu Tech", type: "university", country: "Nepal", talentCount: 320, rating: 4.2 },
  { id: "u3", name: "Seoul National", type: "university", country: "Korea", talentCount: 680, rating: 4.8 },
  { id: "e1", name: "Samsung Electronics", type: "employer", country: "Korea", talentCount: 120, rating: 4.6 },
  { id: "e2", name: "Hyundai Motor", type: "employer", country: "Korea", talentCount: 85, rating: 4.4 },
  { id: "e3", name: "LG Energy", type: "employer", country: "Korea", talentCount: 95, rating: 4.3 },
];

export function OrgPage() {
  const [filter, setFilter] = useState<"all" | "university" | "employer">("all");
  const filtered = filter === "all" ? mockOrgs : mockOrgs.filter((o) => o.type === filter);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Organizations</h1>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {(["all", "university", "employer"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "8px 16px", border: "none", borderRadius: 4, cursor: "pointer",
            background: filter === f ? "#4f46e5" : "#e5e5e5",
            color: filter === f ? "#fff" : "#333",
          }}>
            {f === "all" ? "All" : f === "university" ? "Universities" : "Employers"}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {filtered.map((org) => (
          <div key={org.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>{org.name}</h3>
              <span style={{ background: org.type === "university" ? "#dbeafe" : "#dcfce7", padding: "4px 8px", borderRadius: 4, fontSize: 12 }}>
                {org.type}
              </span>
            </div>
            <p style={{ color: "#666", margin: "8px 0" }}>{org.country}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Talents: <strong>{org.talentCount}</strong></span>
              <span>Rating: <strong>{org.rating}</strong> ⭐</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
