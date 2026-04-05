import Layout from "../../components/layout";
import { SummaryCards } from "../../components/dashboard/summeryCard";
import BalanceChart from "../../components/Chart/BalanceChart";
import CategoryChart from "../../components/Chart/CategoryChart";
import MonthlyBarChart from "../../components/Chart/MonthlyBarChart";

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="animate-fade-in-up">
          <h1
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Overview
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            Your complete financial summary at a glance
          </p>
        </div>

        <div className="animate-fade-in-up stagger-1">
          <SummaryCards />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-fade-in-up stagger-2">
          <BalanceChart />
          <CategoryChart />
        </div>

        <div className="animate-fade-in-up stagger-3">
          <MonthlyBarChart />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
