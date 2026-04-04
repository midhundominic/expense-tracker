import Layout from "../../components/layout";
import SummaryCard from "../../components/dashboard/summeryCard";
import BalanceChart from "../../components/Chart/BalanceChart";
import CategoryChart from "../../components/Chart/CategoryChart";
import { useApp } from "../../context/AppContext";

const Dashboard = () => {
    const { transactions } = useApp();
  
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);
  
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);
  
    const balance = income - expenses;
  
    return (
      <Layout>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <SummaryCard title="Balance" value={balance} />
          <SummaryCard title="Income" value={income} />
          <SummaryCard title="Expenses" value={expenses} />
        </div>
  
        <div className="grid md:grid-cols-2 gap-4">
          <BalanceChart />
          <CategoryChart />
        </div>
      </Layout>
    );
  };
  
  export default Dashboard;