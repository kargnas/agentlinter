"use client";

import { motion } from "framer-motion";
import {
  Share2,
  Github,
  Trophy,
  AlertTriangle,
  AlertCircle,
  Info,
  Check,
  ExternalLink,
  ChevronDown,
  Terminal,
} from "lucide-react";
import { useState } from "react";

/* ─── Logo ─── */
function Logo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="url(#lg)" />
      <path d="M9 10.5L16 7L23 10.5V17L16 25L9 17V10.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M12 13L16 11L20 13V17L16 21L12 17V13Z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="16" cy="15.5" r="1.5" fill="white" />
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Tier ─── */
function getTier(score: number) {
  if (score >= 95) return { grade: "S", color: "#c084fc", bg: "#c084fc20", label: "Exceptional" };
  if (score >= 90) return { grade: "A+", color: "#a78bfa", bg: "#a78bfa20", label: "Outstanding" };
  if (score >= 85) return { grade: "A", color: "#818cf8", bg: "#818cf820", label: "Excellent" };
  if (score >= 80) return { grade: "A-", color: "#60a5fa", bg: "#60a5fa20", label: "Great" };
  if (score >= 75) return { grade: "B+", color: "#34d399", bg: "#34d39920", label: "Good" };
  if (score >= 70) return { grade: "B", color: "#4ade80", bg: "#4ade8020", label: "Decent" };
  if (score >= 65) return { grade: "B-", color: "#fbbf24", bg: "#fbbf2420", label: "Fair" };
  if (score >= 60) return { grade: "C+", color: "#fb923c", bg: "#fb923c20", label: "Needs Work" };
  if (score >= 55) return { grade: "C", color: "#f87171", bg: "#f8717120", label: "Poor" };
  return { grade: "D", color: "#ef4444", bg: "#ef444420", label: "Critical" };
}

/* ─── Histogram ─── */
function Histogram({ userScore }: { userScore: number }) {
  const bins = [
    { range: "0–29", count: 3, min: 0, max: 29 },
    { range: "30–39", count: 5, min: 30, max: 39 },
    { range: "40–49", count: 12, min: 40, max: 49 },
    { range: "50–59", count: 22, min: 50, max: 59 },
    { range: "60–69", count: 35, min: 60, max: 69 },
    { range: "70–79", count: 28, min: 70, max: 79 },
    { range: "80–89", count: 15, min: 80, max: 89 },
    { range: "90–100", count: 6, min: 90, max: 100 },
  ];
  const max = Math.max(...bins.map((b) => b.count));
  const activeBin = bins.findIndex((b) => userScore >= b.min && userScore <= b.max);

  return (
    <div>
      <div className="flex items-end gap-1 h-[80px]">
        {bins.map((bin, i) => {
          const height = (bin.count / max) * 100;
          const isActive = i === activeBin;
          return (
            <div key={bin.range} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[9px] mono" style={{ color: isActive ? "var(--accent)" : "var(--text-dim)" }}>
                {bin.count}
              </span>
              <div
                className="w-full rounded-sm transition-all"
                style={{
                  height: `${height}%`,
                  backgroundColor: isActive ? "var(--accent)" : "rgba(255,255,255,0.06)",
                  minHeight: "3px",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-1 mt-1.5">
        {bins.map((bin, i) => (
          <div
            key={bin.range}
            className="flex-1 text-center text-[9px] mono"
            style={{ color: i === activeBin ? "var(--accent)" : "var(--text-dim)" }}
          >
            {bin.range}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Severity Icon ─── */
function SeverityIcon({ severity }: { severity: string }) {
  if (severity === "error") return <AlertCircle className="w-3.5 h-3.5 text-[var(--red)]" />;
  if (severity === "warning") return <AlertTriangle className="w-3.5 h-3.5 text-[var(--amber)]" />;
  return <Info className="w-3.5 h-3.5 text-[var(--text-dim)]" />;
}

/* ─── Demo Data ─── */
const DEMO_RESULT = {
  workspace: "/Users/gimseojun/clawd",
  totalScore: 100,
  filesScanned: 27,
  timestamp: "2026-02-05T10:47:00Z",
  categories: [
    { name: "Structure", score: 100 },
    { name: "Clarity", score: 100 },
    { name: "Completeness", score: 100 },
    { name: "Security", score: 100 },
    { name: "Consistency", score: 100 },
  ],
  diagnostics: [
    {
      severity: "info",
      category: "structure",
      rule: "structure/heading-hierarchy",
      file: "compound/agentlinter-plan.md",
      line: 71,
      message: "Heading level skipped: h1 → h3. Consider using h2 instead.",
    },
    {
      severity: "info",
      category: "structure",
      rule: "structure/heading-hierarchy",
      file: "compound/moltbook-evolution.md",
      line: 19,
      message: "Heading level skipped: h1 → h3. Consider using h2 instead.",
    },
    {
      severity: "info",
      category: "structure",
      rule: "structure/heading-hierarchy",
      file: "compound/moltbook-learning.md",
      line: 28,
      message: "Heading level skipped: h1 → h3. Consider using h2 instead.",
    },
  ],
  files: [
    "AGENTS.md", "SOUL.md", "IDENTITY.md", "USER.md", "TOOLS.md",
    "SECURITY.md", "FORMATTING.md", "HEARTBEAT.md", "MEMORY.md",
    "compound/progress.md", "compound/queue.md", "compound/patterns.md",
  ],
};

/* ─── Main Report Page ─── */
export default function ReportPage() {
  const data = DEMO_RESULT;
  const tier = getTier(data.totalScore);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const percentile = data.totalScore >= 95 ? 3 : data.totalScore >= 90 ? 8 : data.totalScore >= 85 ? 12 : data.totalScore >= 75 ? 25 : 50;

  const errors = data.diagnostics.filter((d) => d.severity === "error");
  const warnings = data.diagnostics.filter((d) => d.severity === "warning");
  const infos = data.diagnostics.filter((d) => d.severity === "info");

  const shareText = `My agent workspace scored ${data.totalScore}/100 (${tier.grade} tier, top ${percentile}%) on AgentLinter ⚡\n\nHow good is YOUR CLAUDE.md?\n\nagentlinter.com`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Nav */}
      <nav className="border-b border-[var(--border)]">
        <div className="max-w-[680px] mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Logo size={20} />
            <span className="font-semibold text-[14px]">AgentLinter</span>
          </a>
          <a
            href="https://github.com/seojoonkim/agentlinter"
            target="_blank"
            className="text-[13px] text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-[680px] mx-auto px-6 py-10 sm:py-14">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

          {/* Score Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[64px] sm:text-[80px] font-bold text-white leading-none">
                  {data.totalScore}
                </span>
                <div className="flex flex-col gap-1">
                  <div
                    className="px-3 py-1 rounded-lg text-[18px] font-bold mono"
                    style={{ color: tier.color, backgroundColor: tier.bg }}
                  >
                    {tier.grade}
                  </div>
                  <span className="text-[12px]" style={{ color: tier.color }}>{tier.label}</span>
                </div>
              </div>
              <div className="text-[13px] text-[var(--text-secondary)]">
                <span className="mono">{data.filesScanned}</span> files scanned · Top <span className="mono" style={{ color: tier.color }}>{percentile}%</span> of all agents
              </div>
            </div>

            <a
              href={shareUrl}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all hover:brightness-125"
              style={{ backgroundColor: tier.bg, color: tier.color }}
            >
              <Share2 className="w-3.5 h-3.5" />
              Share on X
            </a>
          </div>

          {/* Category Breakdown */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6 mb-6">
            <h2 className="text-[14px] font-semibold mb-5">Category Breakdown</h2>
            <div className="space-y-4">
              {data.categories.map((cat) => {
                const catTier = getTier(cat.score);
                return (
                  <div key={cat.name} className="flex items-center gap-3">
                    <span className="text-[13px] text-[var(--text-secondary)] w-[100px] text-right">
                      {cat.name}
                    </span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: catTier.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </div>
                    <div className="flex items-center gap-2 w-[60px]">
                      <span className="text-[13px] mono font-medium" style={{ color: catTier.color }}>
                        {cat.score}
                      </span>
                      <span
                        className="text-[10px] mono px-1.5 py-0.5 rounded"
                        style={{ color: catTier.color, backgroundColor: catTier.bg }}
                      >
                        {catTier.grade}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Distribution */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold">Score Distribution</h2>
              <span className="text-[12px] mono" style={{ color: tier.color }}>
                You&apos;re here → Top {percentile}%
              </span>
            </div>
            <Histogram userScore={data.totalScore} />
          </div>

          {/* Diagnostics */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[14px] font-semibold">Diagnostics</h2>
              <div className="flex items-center gap-3 text-[12px] mono">
                {errors.length > 0 && (
                  <span className="text-[var(--red)]">{errors.length} error{errors.length > 1 ? "s" : ""}</span>
                )}
                {warnings.length > 0 && (
                  <span className="text-[var(--amber)]">{warnings.length} warn</span>
                )}
                {infos.length > 0 && (
                  <span className="text-[var(--text-dim)]">{infos.length} info</span>
                )}
                {data.diagnostics.length === 0 && (
                  <span className="text-[var(--accent)]">All clear ✓</span>
                )}
              </div>
            </div>

            {data.diagnostics.length === 0 ? (
              <div className="flex items-center gap-3 py-4 text-[var(--accent)]">
                <Check className="w-5 h-5" />
                <span className="text-[14px]">No issues found. Your agent config is clean.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {data.diagnostics.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-t border-[var(--border)] first:border-0 first:pt-0">
                    <SeverityIcon severity={d.severity} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] mono text-[var(--text-secondary)]">
                          {d.file}{d.line ? `:${d.line}` : ""}
                        </span>
                        <span className="text-[10px] mono px-1.5 py-0.5 rounded bg-white/5 text-[var(--text-dim)]">
                          {d.rule}
                        </span>
                      </div>
                      <p className="text-[13px] text-[var(--text)]">{d.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Files Scanned */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-6 mb-8">
            <button
              onClick={() => setShowAllFiles(!showAllFiles)}
              className="flex items-center justify-between w-full"
            >
              <h2 className="text-[14px] font-semibold">Files Scanned ({data.filesScanned})</h2>
              <ChevronDown
                className="w-4 h-4 text-[var(--text-dim)] transition-transform"
                style={{ transform: showAllFiles ? "rotate(180deg)" : "rotate(0)" }}
              />
            </button>
            {showAllFiles && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {data.files.map((f) => (
                  <span key={f} className="text-[12px] mono text-[var(--text-secondary)] py-1">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <a
              href={shareUrl}
              target="_blank"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-[14px] font-semibold transition-all hover:brightness-125"
              style={{ backgroundColor: tier.color, color: "black" }}
            >
              <Share2 className="w-4 h-4" />
              Share Report on X
            </a>
            <div className="text-[13px] text-[var(--text-dim)]">
              Score your own agent →{" "}
              <code className="text-[var(--accent)]">npx agentlinter</code>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-14 pt-6 border-t border-[var(--border)] flex items-center justify-between text-[12px] text-[var(--text-dim)]">
            <div className="flex items-center gap-2">
              <Logo size={14} />
              <span>AgentLinter</span>
            </div>
            <span className="mono">{new Date(data.timestamp).toLocaleDateString()}</span>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
