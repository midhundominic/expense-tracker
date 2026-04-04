import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  import { useApp } from "../../../context/AppContext";
  
  const BalanceChart = () => {
    const { transactions } = useApp();
  
    const data = transactions.map((t) => ({
      date: t.date,
      amount: t.amount,
    }));
  
    return (
      <div className="bg-white p-4 rounded shadow h-80">
        <h2 className="mb-2 font-bold">Balance Trend</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default BalanceChart;