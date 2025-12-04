import { useEffect, useState } from "react";

const API_URL = "http://localhost:8001";

type Summary = {
  total: number;
  done: number;
  partial: number;
  planned: number;
  completion_rate: number;
};

type MentorScores = Record<string, number>;

type CategoryStat = {
  category: string;
  done: number;
  partial: number;
  planned: number;
  total: number;
  completion: number;
};

type Gap = {
  mentor: string;
  category: string;
  planned: number;
  weight: number;
};

const MENTOR_LABELS: Record<string, string> = {
  PH01_Thiel: "Thiel (구조/독점)",
  PH02_Bezos: "Bezos (자동화/NPS)",
  PH03_Jobs: "Jobs (단순성/UX)",
  PH04_Musk: "Musk (도시 확장)",
  PH05_Google: "Google (그래프/랭킹)",
  PH06_MS: "MS (OS/에코시스템)",
  PH07_Shannon: "Shannon (정보이론)",
};

export function OsHealthPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [mentorScores, setMentorScores] = useState<MentorScores>({});
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [gaps, setGaps] = useState<Gap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [sumRes, mentorRes, catRes, gapRes] = await Promise.all([
          fetch(`${API_URL}/canon/summary`),
          fetch(`${API_URL}/canon/mentor-scores`),
          fetch(`${API_URL}/canon/category-stats`),
          fetch(`${API_URL}/canon/gap-top?n=10`),
        ]);

        const sumData = await sumRes.json();
        const mentorData = await mentorRes.json();
        const catData = await catRes.json();
        const gapData = await gapRes.json();

        setSummary(sumData);
        setMentorScores(mentorData.scores || {});
        setCategoryStats(catData.stats || []);
        setGaps(gapData.gaps || []);
      } catch (err) {
        console.error("Failed to fetch canon data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div style={{ padding: 24, paddingTop: 80 }}>Loading...</div>;
  }

  const maxScore = Math.max(...Object.values(mentorScores), 1);

  return (
    <div style={{ padding: 24, paddingTop: 80 }}>
      <h1 style={{ margin: 0, marginBottom: 24 }}>🏥 OS Health</h1>

      {/* 요약 카드 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 32 }}>
        <div style={cardStyle}>
          <div style={cardLabel}>Total Functions</div>
          <div style={cardValue}>{summary?.total || 0}</div>
        </div>
        <div style={{ ...cardStyle, borderLeft: "4px solid #22c55e" }}>
          <div style={cardLabel}>Done</div>
          <div style={{ ...cardValue, color: "#22c55e" }}>{summary?.done || 0}</div>
        </div>
        <div style={{ ...cardStyle, borderLeft: "4px solid #f59e0b" }}>
          <div style={cardLabel}>Partial</div>
          <div style={{ ...cardValue, color: "#f59e0b" }}>{summary?.partial || 0}</div>
        </div>
        <div style={{ ...cardStyle, borderLeft: "4px solid #ef4444" }}>
          <div style={cardLabel}>Planned</div>
          <div style={{ ...cardValue, color: "#ef4444" }}>{summary?.planned || 0}</div>
        </div>
        <div style={{ ...cardStyle, borderLeft: "4px solid #4f46e5" }}>
          <div style={cardLabel}>Completion</div>
          <div style={{ ...cardValue, color: "#4f46e5" }}>{summary?.completion_rate || 0}%</div>
        </div>
      </div>

      {/* 멘토 스코어 */}
      <h2 style={{ marginBottom: 16 }}>📊 7 Mentors Score</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12, marginBottom: 32 }}>
        {Object.entries(mentorScores).map(([key, score]) => (
          <div key={key} style={{ background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>{MENTOR_LABELS[key] || key}</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{score}</div>
            <div style={{ height: 8, background: "#eee", borderRadius: 4, marginTop: 8 }}>
              <div style={{ height: "100%", width: `${(score / maxScore) * 100}%`, background: getBarColor(score, maxScore), borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>

      {/* 카테고리 통계 */}
      <h2 style={{ marginBottom: 16 }}>📁 Category Stats</h2>
      <div style={{ background: "#fff", borderRadius: 12, padding: 16, marginBottom: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #eee" }}>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Done</th>
              <th style={thStyle}>Partial</th>
              <th style={thStyle}>Planned</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Completion</th>
            </tr>
          </thead>
          <tbody>
            {categoryStats.map((cat) => (
              <tr key={cat.category} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{cat.category}</td>
                <td style={{ ...tdStyle, color: "#22c55e" }}>{cat.done}</td>
                <td style={{ ...tdStyle, color: "#f59e0b" }}>{cat.partial}</td>
                <td style={{ ...tdStyle, color: "#ef4444" }}>{cat.planned}</td>
                <td style={tdStyle}>{cat.total}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 60, height: 8, background: "#eee", borderRadius: 4 }}>
                      <div style={{ height: "100%", width: `${cat.completion}%`, background: "#4f46e5", borderRadius: 4 }} />
                    </div>
                    <span>{cat.completion}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gap Top 10 */}
      <h2 style={{ marginBottom: 16 }}>🎯 Gap Top 10 (Next Development)</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {gaps.map((gap, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ width: 32, height: 32, background: "#ef4444", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{gap.category}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{MENTOR_LABELS[gap.mentor] || gap.mentor}</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ color: "#ef4444", fontWeight: 700 }}>{gap.planned} planned</div>
              <div style={{ fontSize: 12, color: "#666" }}>weight: {gap.weight}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const cardLabel: React.CSSProperties = {
  fontSize: 13,
  color: "#666",
  marginBottom: 8,
};

const cardValue: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 700,
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 8px",
  fontSize: 13,
  color: "#666",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 8px",
};

function getBarColor(score: number, max: number): string {
  const ratio = score / max;
  if (ratio >= 0.8) return "#22c55e";
  if (ratio >= 0.5) return "#f59e0b";
  return "#ef4444";
}
