import { useState } from "react";

type Doc = {
  id: string;
  name: string;
  type: "visa" | "contract" | "certificate" | "medical";
  status: "pending" | "approved" | "rejected";
  talentName: string;
  updatedAt: string;
};

const mockDocs: Doc[] = [
  { id: "d1", name: "E-9 Visa Application", type: "visa", status: "pending", talentName: "Juan Santos", updatedAt: "2024-12-04" },
  { id: "d2", name: "Employment Contract", type: "contract", status: "approved", talentName: "Raj Sharma", updatedAt: "2024-12-03" },
  { id: "d3", name: "Training Certificate", type: "certificate", status: "approved", talentName: "Kim Min-jun", updatedAt: "2024-12-02" },
  { id: "d4", name: "Medical Checkup", type: "medical", status: "pending", talentName: "Maria Garcia", updatedAt: "2024-12-04" },
  { id: "d5", name: "E-9 Visa Application", type: "visa", status: "rejected", talentName: "Suman Thapa", updatedAt: "2024-12-01" },
  { id: "d6", name: "Employment Contract", type: "contract", status: "pending", talentName: "Lee Soo-young", updatedAt: "2024-12-04" },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: "#fef3c7", text: "#92400e" },
  approved: { bg: "#dcfce7", text: "#166534" },
  rejected: { bg: "#fee2e2", text: "#991b1b" },
};

const typeIcons: Record<string, string> = {
  visa: "🛂",
  contract: "📝",
  certificate: "🎓",
  medical: "🏥",
};

export function DocsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const filtered = filter === "all" ? mockDocs : mockDocs.filter((d) => d.status === filter);

  const counts = {
    all: mockDocs.length,
    pending: mockDocs.filter((d) => d.status === "pending").length,
    approved: mockDocs.filter((d) => d.status === "approved").length,
    rejected: mockDocs.filter((d) => d.status === "rejected").length,
  };

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Documents</h1>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "12px 20px", border: "none", borderRadius: 8, cursor: "pointer",
            background: filter === f ? "#4f46e5" : "#f5f5f5",
            color: filter === f ? "#fff" : "#333",
          }}>
            {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((doc) => (
          <div key={doc.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>{typeIcons[doc.type]}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{doc.name}</div>
                <div style={{ color: "#666", fontSize: 14 }}>{doc.talentName}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ color: "#888", fontSize: 14 }}>{doc.updatedAt}</span>
              <span style={{
                background: statusColors[doc.status].bg,
                color: statusColors[doc.status].text,
                padding: "6px 12px", borderRadius: 12, fontSize: 12, fontWeight: 600, textTransform: "capitalize"
              }}>
                {doc.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
