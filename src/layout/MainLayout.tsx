import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type MainLayoutProps = { children: ReactNode };

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const navItems = [
    { path: "/city", label: "Global Twin" },
    { path: "/org", label: "Org" },
    { path: "/talent", label: "Talent" },
    { path: "/docs", label: "Docs" },
    { path: "/automation", label: "Automation" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: 220, borderRight: "1px solid #eee", padding: 16, background: "#fafafa" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>ATB / AUTUS OS</div>
          <div style={{ fontSize: 12, color: "#888" }}>v6.0 CityOS</div>
        </div>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {navItems.map((item) => (
              <li key={item.path} style={{ marginBottom: 12 }}>
                <Link to={item.path} style={{
                  textDecoration: "none",
                  fontWeight: location.pathname === item.path ? 700 : 400,
                  color: location.pathname === item.path ? "#000" : "#666"
                }}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
    </div>
  );
}
