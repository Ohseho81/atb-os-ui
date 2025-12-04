import { useState, useEffect } from "react";

type Tenant = {
  id: string;
  name: string;
  domain: string;
  status: string;
  plan_id: string;
  created_at: string;
};

export function OrgPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8001/auth/users").then(r => r.json()),
      fetch("http://localhost:8001/auth/stats").then(r => r.json()),
    ])
      .then(([usersRes, statsRes]) => {
        setUsers(usersRes.users || []);
        setTenants([{
          id: "default",
          name: "ATB Default",
          domain: "autus.io",
          status: "active",
          plan_id: "enterprise",
          created_at: new Date().toISOString(),
        }]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 24, paddingTop: 64 }}>Loading...</div>;

  return (
    <div style={{ padding: 24, paddingTop: 64 }}>
      <h1 style={{ marginTop: 0 }}>🏢 Organization</h1>

      {/* Tenant 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {tenants.map(tenant => (
          <div key={tenant.id} style={{
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 20,
            borderLeft: "4px solid #4f46e5",
          }}>
            <h3 style={{ margin: 0 }}>{tenant.name}</h3>
            <p style={{ color: "#666", margin: "8px 0" }}>{tenant.domain}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{
                padding: "4px 8px",
                background: tenant.status === "active" ? "#22c55e" : "#f59e0b",
                color: "#fff",
                borderRadius: 4,
                fontSize: 12,
              }}>
                {tenant.status.toUpperCase()}
              </span>
              <span style={{
                padding: "4px 8px",
                background: "#4f46e5",
                color: "#fff",
                borderRadius: 4,
                fontSize: 12,
              }}>
                {tenant.plan_id}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Users 테이블 */}
      <h2>👥 Users ({users.length})</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 8 }}>
        <thead>
          <tr style={{ background: "#f8fafc", textAlign: "left" }}>
            <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>ID</th>
            <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>Email</th>
            <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>Name</th>
            <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>Role</th>
            <th style={{ padding: 12, borderBottom: "1px solid #eee" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{user.id}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{user.email}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>{user.name}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                <span style={{
                  padding: "2px 8px",
                  background: user.role === "admin" ? "#ef4444" : "#3b82f6",
                  color: "#fff",
                  borderRadius: 4,
                  fontSize: 11,
                }}>
                  {user.role}
                </span>
              </td>
              <td style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                {user.is_active ? "🟢 Active" : "🔴 Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
