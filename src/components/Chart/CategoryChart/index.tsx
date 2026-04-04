import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useApp } from "../../../context/AppContext";

const CategoryChart = () => {
  const { transactions } = useApp();

  const dataMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      dataMap[t.category] =
        (dataMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.entries(dataMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white p-4 rounded shadow h-80">
      <h2 className="mb-2 font-bold">Spending Breakdown</h2>
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" nameKey="name">
          {data.map((_, i) => (
            <Cell key={i} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default CategoryChart;