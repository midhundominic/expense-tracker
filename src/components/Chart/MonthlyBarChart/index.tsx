import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useApp } from "../../../context/AppContext";

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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const income = payload.find((p: any) => p.dataKey === "Income")?.value ?? 0;
  const expense = payload.find((p: any) => p.dataKey === "Expense")?.value ?? 0;
  const net = income - expense;
  return (
    <div
      className="px-4 py-3 rounded-xl text-sm shadow-xl border"
      style={{
        background: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
        color: "var(--text-primary)",
      }}
    >
      <p className="font-semibold mb-2">{label}</p>
      <p style={{ color: "#10b981" }}>
        Income: ₹{income.toLocaleString("en-IN")}
      </p>
      <p style={{ color: "#f43f5e" }}>
        Expense: ₹{expense.toLocaleString("en-IN")}
      </p>
      <p
        className="mt-1 pt-1 border-t font-medium"
        style={{
          borderColor: "var(--border-color)",
          color: net >= 0 ? "#10b981" : "#f43f5e",
        }}
      >
        Net: {net >= 0 ? "+" : ""}₹{net.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

const MonthlyBarChart: React.FC = () => {
  const { transactions } = useApp();

  const monthlyMap: Record<string, { Income: number; Expense: number }> = {};
  transactions.forEach((t) => {
    const m = MONTHS[new Date(t.date).getMonth()];
    if (!monthlyMap[m]) monthlyMap[m] = { Income: 0, Expense: 0 };
    if (t.type === "income") monthlyMap[m].Income += t.amount;
    else monthlyMap[m].Expense += t.amount;
  });

  const data = Object.entries(monthlyMap).map(([month, v]) => ({
    month,
    ...v,
  }));

  return (
    <div className="glass-card p-5">
      <div className="mb-4">
        <h2
          className="font-bold text-base"
          style={{ color: "var(--text-primary)" }}
        >
          Monthly Comparison
        </h2>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          Income vs Expenses per month
        </p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          barGap={4}
          barSize={18}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-color)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(99,102,241,0.06)" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }}
          />
          <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expense" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
