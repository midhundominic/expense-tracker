import {
  AreaChart,
  Area,
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
  return (
    <div
      className="px-4 py-3 rounded-xl text-sm shadow-xl border"
      style={{
        background: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
        color: "var(--text-primary)",
      }}
    >
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: ₹{p.value.toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
};

const BalanceChart: React.FC = () => {
  const { transactions } = useApp();

  const monthlyMap: Record<string, { income: number; expense: number }> = {};
  transactions.forEach((t) => {
    const m = MONTHS[new Date(t.date).getMonth()];
    if (!monthlyMap[m]) monthlyMap[m] = { income: 0, expense: 0 };
    if (t.type === "income") monthlyMap[m].income += t.amount;
    else monthlyMap[m].expense += t.amount;
  });

  const data = Object.entries(monthlyMap).map(([month, vals]) => ({
    month,
    Income: vals.income,
    Expense: vals.expense,
    Balance: vals.income - vals.expense,
  }));

  return (
    <div className="glass-card p-5">
      <div className="mb-4">
        <h2
          className="font-bold text-base"
          style={{ color: "var(--text-primary)" }}
        >
          Balance Trend
        </h2>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          Monthly income vs expenses
        </p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
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
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }}
          />
          <Area
            type="monotone"
            dataKey="Income"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#incomeGrad)"
            dot={{ r: 4, fill: "#10b981" }}
            activeDot={{ r: 6 }}
          />
          <Area
            type="monotone"
            dataKey="Expense"
            stroke="#f43f5e"
            strokeWidth={2.5}
            fill="url(#expenseGrad)"
            dot={{ r: 4, fill: "#f43f5e" }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
