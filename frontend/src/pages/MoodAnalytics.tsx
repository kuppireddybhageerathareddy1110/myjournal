// src/pages/MoodAnalytics.jsx
import Navbar from "../components/Navbar";
import { useEffect, useMemo, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { getEntries } from "../api/entries";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

// ---- CONFIG: adjust mapping if your text values differ ----
const MOOD_TO_SCORE = {
  // positive -> 5
  "very happy": 5,
  "ecstatic": 5,
  "joyful": 5,
  "happy": 4,
  "content": 4,
  // neutral -> 3
  "neutral": 3,
  "okay": 3,
  // negative -> 2 or 1
  "sad": 2,
  "down": 2,
  "stressed": 2,
  "anxious": 2,
  "angry": 1,
  "very sad": 1,
  // fallback
  "unknown": 3,
};

function moodTextToScore(moodText) {
  if (!moodText) return 3;
  const text = String(moodText).toLowerCase().trim();
  // try exact mapping
  if (MOOD_TO_SCORE.hasOwnProperty(text)) return MOOD_TO_SCORE[text];
  // try contains heuristic
  if (text.includes("happy") || text.includes("joy") || text.includes("excited")) return 4;
  if (text.includes("sad") || text.includes("depress") || text.includes("down")) return 2;
  if (text.includes("stress") || text.includes("anx")) return 2;
  if (text.includes("angry") || text.includes("mad")) return 1;
  if (text.includes("neutral") || text.includes("ok") || text.includes("fine")) return 3;
  return 3;
}

function avg(arr = []) {
  if (!arr.length) return null;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export default function MoodAnalytics() {
  const [entries, setEntries] = useState([]);
  const [range, setRange] = useState("monthly"); // weekly/monthly/yearly - default monthly
  const [viewMonth, setViewMonth] = useState(() => {
    const d = new Date();
    return d.getMonth(); // 0-index
  });
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");
        const res = await getEntries(token);
        // entries returned from backend already include `date` or `created_at`.
        // normalize to have `date` as JS Date and `moodScore`
        const normalized = (res.data || []).map((e) => {
          const dateStr = e.date || e.created_at || e.createdAt || e.createdAt;
          const dt = dateStr ? new Date(dateStr) : new Date();
          const moodScore = moodTextToScore(e.mood);
          return { ...e, _date: dt, moodScore };
        });
        // sort by date asc
        normalized.sort((a, b) => a._date - b._date);
        setEntries(normalized);
      } catch (err) {
        console.error("Failed to load entries", err);
      }
    }
    load();
  }, []);

  // --- Filtered dataset depending on range ---
  const filtered = useMemo(() => {
    const now = new Date();
    if (range === "weekly") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
      return entries.filter((e) => e._date >= weekAgo);
    }
    if (range === "monthly") {
      // show entries from the selected viewMonth/viewYear
      return entries.filter(
        (e) => e._date.getMonth() === viewMonth && e._date.getFullYear() === viewYear
      );
    }
    // yearly
    if (range === "yearly") {
      return entries.filter((e) => e._date.getFullYear() === viewYear);
    }
    return entries;
  }, [entries, range, viewMonth, viewYear]);

  // --- Chart data (line + pie) ---
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 700, easing: "easeOutQuart" },
    plugins: { legend: { display: true } },
  };

  const lineData = useMemo(() => {
    // group by day label
    const labelsMap = {};
    filtered.forEach((e) => {
      const label =
        range === "yearly"
          ? e._date.getMonth() + 1 + "/" + e._date.getFullYear()
          : e._date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
      if (!labelsMap[label]) labelsMap[label] = [];
      labelsMap[label].push(e.moodScore);
    });

    const labels = Object.keys(labelsMap);
    const data = labels.map((l) => {
      const arr = labelsMap[l];
      return Number((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2));
    });

    return {
      labels,
      datasets: [
        {
          label: "Average Mood (1 = low, 5 = high)",
          data,
          borderColor: "#6366f1",
          backgroundColor: "rgba(99,102,241,0.18)",
          tension: 0.35,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [filtered, range]);

  const pieData = useMemo(() => {
    const counts = { happy: 0, sad: 0, stressed: 0, neutral: 0, other: 0 };
    filtered.forEach((e) => {
      const text = (e.mood || "unknown").toLowerCase();
      if (text.includes("happy") || text.includes("joy") || text.includes("excited")) counts.happy++;
      else if (text.includes("sad") || text.includes("down") || text.includes("depress")) counts.sad++;
      else if (text.includes("stressed") || text.includes("anx") || text.includes("stress")) counts.stressed++;
      else if (text.includes("neutral") || text.includes("ok") || text.includes("fine")) counts.neutral++;
      else counts.other++;
    });

    return {
      labels: ["Happy", "Sad", "Stressed", "Neutral", "Other"],
      datasets: [
        {
          data: [counts.happy, counts.sad, counts.stressed, counts.neutral, counts.other],
          backgroundColor: ["#34D399", "#F87171", "#FBBF24", "#9CA3AF", "#A3A3A3"],
          hoverOffset: 6,
        },
      ],
    };
  }, [filtered]);

  // ------------------- Heatmap utilities -------------------
  // create calendar for a month
  function daysInMonth(year, monthIndex) {
    // monthIndex 0-11
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  // Build day -> [scores] map for the selected month/year
  const monthlyScoresByDay = useMemo(() => {
    const map = {};
    entries.forEach((e) => {
      const d = e._date;
      if (d.getFullYear() === viewYear && d.getMonth() === viewMonth) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(e.moodScore);
      }
    });
    return map; // keys: 1..31 => arrays of scores
  }, [entries, viewMonth, viewYear]);

  // month -> [scores] for year-wise heatmap
  const monthlyScoresByMonth = useMemo(() => {
    const map = {};
    entries.forEach((e) => {
      const d = e._date;
      if (d.getFullYear() === viewYear) {
        const m = d.getMonth(); // 0..11
        if (!map[m]) map[m] = [];
        map[m].push(e.moodScore);
      }
    });
    return map; // 0..11 => arrays
  }, [entries, viewYear]);

  // color scale for average mood 1..5
  function colorForScore(avgScore) {
    if (avgScore == null) return "#f3f4f6"; // light gray empty
    // gradient-ish buckets
    if (avgScore <= 1.5) return "#fecaca"; // red
    if (avgScore <= 2.5) return "#fca5a5";
    if (avgScore <= 3.5) return "#fef3c7"; // yellow
    if (avgScore <= 4.2) return "#bbf7d0"; // light green
    return "#34D399"; // bright green
  }

  // calendar layout helpers (Mon-Sun)
  function buildCalendar(year, monthIndex) {
    const first = new Date(year, monthIndex, 1);
    const firstWeekday = (first.getDay() + 6) % 7; // convert Sun=0 to Mon=0
    const totalDays = daysInMonth(year, monthIndex);
    const weeks = [];
    let week = new Array(7).fill(null);
    // fill blanks at start
    let day = 1;
    for (let i = 0; i < firstWeekday; i++) week[i] = null;
    for (let i = firstWeekday; i < 7; i++) {
      week[i] = day++;
    }
    weeks.push(week);
    while (day <= totalDays) {
      week = new Array(7).fill(null);
      for (let i = 0; i < 7 && day <= totalDays; i++) {
        week[i] = day++;
      }
      weeks.push(week);
    }
    return weeks; // array of weeks -> each week is [day|null,...]
  }

  // change month/year handlers
  function prevMonth() {
    const m = viewMonth - 1;
    if (m < 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth(m);
  }
  function nextMonth() {
    const m = viewMonth + 1;
    if (m > 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth(m);
  }

  // years available from entries list
  const availableYears = useMemo(() => {
    const s = new Set(entries.map((e) => e._date.getFullYear()));
    const arr = Array.from(s).sort((a, b) => b - a);
    if (!arr.length) arr.push(new Date().getFullYear());
    return arr;
  }, [entries]);

  // render
  return (
    <>
      <Navbar />

      <div className="page-container">
        <h2 className="page-title">Mood Analytics</h2>

        {/* Controls */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            View:
            <select value={range} onChange={(e) => setRange(e.target.value)} style={{ padding: 8 }}>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>

          {/* Month/Year controls (only useful for monthly/yearly) */}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={prevMonth} className="small-btn">Prev</button>
            <strong>
              {new Date(viewYear, viewMonth).toLocaleString("en-IN", { month: "long", year: "numeric" })}
            </strong>
            <button onClick={nextMonth} className="small-btn">Next</button>

            <select
              value={viewYear}
              onChange={(e) => setViewYear(Number(e.target.value))}
              style={{ padding: 6 }}
            >
              {availableYears.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>

        {/* Charts row */}
        <div className="analytics-row">
          <div className="dashboard-card chart-card">
            <h3>Mood Trend</h3>
            <div className="chart-wrapper" style={{ height: 260 }}>
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>

          <div className="dashboard-card chart-card">
            <h3>Mood Distribution</h3>
            <div className="chart-wrapper" style={{ height: 260 }}>
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Monthly calendar heatmap */}
        <div className="dashboard-card" style={{ marginTop: 18 }}>
          <h3>Monthly Heatmap — {new Date(viewYear, viewMonth).toLocaleString("en-IN", { month: "long", year: "numeric" })}</h3>

          <div className="calendar-legend" style={{ marginBottom: 10 }}>
            <div>Legend:</div>
            <div className="legend-box" style={{ background: colorForScore(1) }} /> Low
            <div className="legend-box" style={{ background: colorForScore(2) }} /> Low-Mid
            <div className="legend-box" style={{ background: colorForScore(3) }} /> Neutral
            <div className="legend-box" style={{ background: colorForScore(4) }} /> Good
            <div className="legend-box" style={{ background: colorForScore(5) }} /> Best
          </div>

          <div className="calendar-grid">
            <div className="weekday-row">
              <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
            </div>

            <div className="weeks">
              {buildCalendar(viewYear, viewMonth).map((week, wi) => (
                <div key={wi} className="week-row">
                  {week.map((day, di) => {
                    const scores = day ? monthlyScoresByDay[day] : null;
                    const avgScore = scores ? Number(avg(scores).toFixed(2)) : null;
                    const bg = colorForScore(avgScore);
                    return (
                      <div key={di} className="day-cell" style={{ background: bg }}>
                        {day ? (
                          <>
                            <div className="day-number">{day}</div>
                            {avgScore != null && <div className="day-avg">{avgScore}</div>}
                          </>
                        ) : <div className="empty-day" />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Year-wise monthly heatmap */}
        <div className="dashboard-card" style={{ marginTop: 18 }}>
          <h3>Yearly Overview — {viewYear}</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            {Array.from({ length: 12 }).map((_, m) => {
              const arr = monthlyScoresByMonth[m];
              const avgScore = arr && arr.length ? Number(avg(arr).toFixed(2)) : null;
              const bg = colorForScore(avgScore);
              return (
                <div key={m} className="month-box">
                  <div className="month-name">{new Date(viewYear, m).toLocaleString("en-IN", { month: "short" })}</div>
                  <div className="month-square" style={{ background: bg }}>
                    {avgScore != null ? avgScore : "-"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </>
  );
}
