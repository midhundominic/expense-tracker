import { useMemo } from "react";
import Layout from "../../components/layout";
import { useApp } from "../../context/AppContext";
import MonthlyBarChart from "../../components/Chart/MonthlyBarChart";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const CHART_COLORS = [
  "#6366f1",
  "#10b981",
  "#f43f5e",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
];

interface InsightCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: string;
  index?: number;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  accent,
  index = 0,
}) => (
  <div
    className={`glass-card p-5 animate-fade-in-up stagger-${Math.min(
      index + 1,
      4
    )}`}
  >
    <div className="flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${accent}18`, color: accent }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-xs font-medium mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          {title}
        </p>
        <p className="text-xl font-bold truncate" style={{ color: accent }}>
          {value}
        </p>
        <p
          className="text-xs mt-0.5"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  </div>
);

const Insights: React.FC = () => {
  const { transactions } = useApp();

  const stats = useMemo(() => {
    const catMap: Record<string, number> = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
      });
    const sortedCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const highestCat = sortedCats[0];

    const monthMap: Record<string, { income: number; expense: number }> = {};
    transactions.forEach((t) => {
      const m = MONTHS[new Date(t.date).getMonth()];
      if (!monthMap[m]) monthMap[m] = { income: 0, expense: 0 };
      if (t.type === "income") monthMap[m].income += t.amount;
      else monthMap[m].expense += t.amount;
    });

    const months = Object.values(monthMap);
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);
    const savingsRate =
      totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
    const avgMonthlyExpense =
      months.length > 0
        ? months.reduce((a, b) => a + b.expense, 0) / months.length
        : 0;

    const bestMonth = Object.entries(monthMap).sort(
      (a, b) => b[1].income - b[1].expense - (a[1].income - a[1].expense)
    )[0];

    return {
      highestCat,
      sortedCats,
      savingsRate,
      avgMonthlyExpense,
      bestMonth,
      totalIncome,
      totalExpense,
    };
  }, [transactions]);

  const hasData = transactions.length > 0;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in-up">
          <h1
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Insights
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Smart observations based on your financial data
          </p>
        </div>

        {!hasData ? (
          <div className="glass-card p-12 text-center">
            <p style={{ color: "var(--text-muted)" }}>
              No transactions to analyze yet.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <InsightCard
                index={0}
                title="Highest Spending Category"
                value={stats.highestCat ? stats.highestCat[0] : "—"}
                subtitle={
                  stats.highestCat
                    ? `₹${stats.highestCat[1].toLocaleString("en-IN")} total`
                    : "No expenses yet"
                }
                accent="#f43f5e"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                }
              />
              <InsightCard
                index={1}
                title="Best Saving Month"
                value={stats.bestMonth ? stats.bestMonth[0] : "—"}
                subtitle={
                  stats.bestMonth
                    ? `Net ₹${(
                        stats.bestMonth[1].income - stats.bestMonth[1].expense
                      ).toLocaleString("en-IN")}`
                    : "No data"
                }
                accent="#10b981"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                }
              />
              <InsightCard
                index={2}
                title="Avg Monthly Expense"
                value={`₹${Math.round(stats.avgMonthlyExpense).toLocaleString(
                  "en-IN"
                )}`}
                subtitle="Average across all months"
                accent="#f59e0b"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                }
              />
              <InsightCard
                index={3}
                title="Savings Rate"
                value={`${stats.savingsRate.toFixed(1)}%`}
                subtitle={`₹${(
                  stats.totalIncome - stats.totalExpense
                ).toLocaleString("en-IN")} saved overall`}
                accent="#6366f1"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                }
              />
            </div>

            <div className="glass-card p-5 animate-fade-in-up stagger-2">
              <div className="mb-4">
                <h2
                  className="font-bold text-base"
                  style={{ color: "var(--text-primary)" }}
                >
                  Top Spending Categories
                </h2>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Ranked by total amount spent
                </p>
              </div>
              <div className="space-y-3">
                {stats.sortedCats.slice(0, 6).map(([cat, amt], i) => {
                  const max = stats.sortedCats[0]?.[1] ?? 1;
                  const pct = (amt / max) * 100;
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: CHART_COLORS[i % CHART_COLORS.length],
                            }}
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {cat}
                          </span>
                        </div>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          ₹{amt.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: "var(--border-color)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: CHART_COLORS[i % CHART_COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="animate-fade-in-up stagger-3">
              <MonthlyBarChart />
            </div>

            <div
              className="rounded-2xl p-5 flex items-center gap-4 animate-fade-in-up stagger-4"
              style={{
                background:
                  stats.savingsRate >= 20
                    ? "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))"
                    : "linear-gradient(135deg, rgba(244,63,94,0.15), rgba(244,63,94,0.05))",
                border: `1px solid ${
                  stats.savingsRate >= 20
                    ? "rgba(16,185,129,0.3)"
                    : "rgba(244,63,94,0.3)"
                }`,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    stats.savingsRate >= 20
                      ? "rgba(16,185,129,0.2)"
                      : "rgba(244,63,94,0.2)",
                  color: stats.savingsRate >= 20 ? "#10b981" : "#f43f5e",
                }}
              >
                {stats.savingsRate >= 20 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                )}
              </div>
              <div>
                <p
                  className="font-bold"
                  style={{
                    color: stats.savingsRate >= 20 ? "#10b981" : "#f43f5e",
                  }}
                >
                  {stats.savingsRate >= 20
                    ? "Great financial health! 🎉"
                    : "Watch your expenses ⚠️"}
                </p>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {stats.savingsRate >= 20
                    ? `You're saving ${stats.savingsRate.toFixed(
                        1
                      )}% of your income. Keep it up!`
                    : `Your savings rate is ${stats.savingsRate.toFixed(
                        1
                      )}%. Try to cut back on ${
                        stats.sortedCats[0]?.[0] || "expenses"
                      }.`}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Insights;
