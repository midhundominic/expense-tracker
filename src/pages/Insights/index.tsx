import Layout from "../../components/layout";
import { useApp } from "../../context/AppContext";

const Insights = () => {
  const { transactions } = useApp();

  const categoryMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const highest = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <Layout>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold">Insights</h2>
        <p>
          Highest Spending Category:{" "}
          {highest ? highest[0] : "No Data"}
        </p>
      </div>
    </Layout>
  );
};

export default Insights;