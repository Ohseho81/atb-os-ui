import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const commands = [
    { label: "Global Twin", path: "/city", shortcut: "G T" },
    { label: "Organizations", path: "/org", shortcut: "G O" },
    { label: "Talent Pool", path: "/talent", shortcut: "G P" },
    { label: "Documents", path: "/docs", shortcut: "G D" },
    { label: "Automation", path: "/automation", shortcut: "G A" },
    { label: "Settings", path: "/settings", shortcut: "G S" },
  ];

  const filtered = commands.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 100, zIndex: 1000
    }} onClick={() => setOpen(false)}>
      <div style={{ background: "#fff", borderRadius: 12, width: 500, overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
        <input 
          placeholder="Search pages..." 
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ width: "100%", padding: 16, fontSize: 16, border: "none", borderBottom: "1px solid #eee", outline: "none" }} 
          autoFocus 
        />
        <div style={{ maxHeight: 300, overflow: "auto" }}>
          {filtered.map((cmd) => (
            <div 
              key={cmd.path}
              onClick={() => { navigate(cmd.path); setOpen(false); setQuery(""); }}
              style={{ 
                padding: 12, cursor: "pointer", display: "flex", justifyContent: "space-between",
                background: "#fff", borderBottom: "1px solid #f5f5f5"
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f5")}
              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            >
              <span>{cmd.label}</span>
              <span style={{ color: "#888", fontSize: 12 }}>{cmd.shortcut}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
