import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { StatusHUD } from "../components/StatusHUD";
import { CommandPalette } from "../components/CommandPalette";

type MainLayoutProps = { children: ReactNode };

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8001/evolution/status")
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(() => {});
  }, []);

  const navItems = [
    { path: "/city", label: "Global Twin", icon: "🌍" },
    { path: "/twin3d", label: "3D Twin", icon: "🌐" },
    { path: "/org", label: "Org", icon: "🏢" },
    { path: "/talent", label: "Talent", icon: "👤" },
    { path: "/docs", label: "Docs", icon: "📄" },
    { path: "/automation", label: "Automation", icon: "⚡" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
    { path: "/marketplace", label: "Marketplace", icon: "🛒" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#fafafa" }}>
      <StatusHUD 
        packs={status?.total_packs || 0} 
        version="v6.0" 
        status="healthy" 
      />
      <CommandPalette />
      
      <aside style={{ width: 220, borderRight: "1px solid #eee", padding: 16, background: "#fff", paddingTop: 56 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>ATB / AUTUS OS</div>
          <div style={{ fontSize: 12, color: "#888" }}>v6.0 · CityOS</div>
        </div>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {navItems.map((item) => (
              <li key={item.path} style={{ marginBottom: 4 }}>
                <Link to={item.path} style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 12px",
                  borderRadius: 8,
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  color: location.pathname === item.path ? "#4f46e5" : "#666",
                  background: location.pathname === item.path ? "#eef2ff" : "transparent"
                }}>
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, overflow: "auto", paddingTop: 40 }}>{children}</main>
    </div>
  );
}
