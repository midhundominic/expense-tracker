import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useApp } from "../../../context/AppContext";

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f43f5e",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const {
    name,
    value,
    payload: { percent },
  } = payload[0];
  return (
    <div
      className="px-4 py-3 rounded-xl text-sm shadow-xl border"
      style={{
        background: "var(--bg-secondary)",
        borderColor: "var(--border-color)",
        color: "var(--text-primary)",
      }}
    >
      <p className="font-semibold">{name}</p>
      <p style={{ color: "var(--accent)" }}>₹{value.toLocaleString("en-IN")}</p>
      <p style={{ color: "var(--text-muted)" }}>
        {(percent * 100).toFixed(1)}% of expenses
      </p>
    </div>
  );
};

const CategoryChart: React.FC = () => {
  const { transactions } = useApp();

  const dataMap: Record<string, number> = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      dataMap[t.category] = (dataMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.entries(dataMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="glass-card p-5 flex items-center justify-center h-80">
        <p style={{ color: "var(--text-muted)" }}>No expense data</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-5">
      <div className="mb-4">
        <h2
          className="font-bold text-base"
          style={{ color: "var(--text-primary)" }}
        >
          Spending Breakdown
        </h2>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          By category (expenses only)
        </p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
