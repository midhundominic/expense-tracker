import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InsightsIcon from "@mui/icons-material/Insights";

const Sidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-2 p-2 rounded ${
      pathname === path ? "bg-gray-700" : ""
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 space-y-4">
      <Link to="/" className={linkClass("/")}>
        <DashboardIcon /> Dashboard
      </Link>
      <Link to="/transactions" className={linkClass("/transactions")}>
        <ReceiptIcon /> Transactions
      </Link>
      <Link to="/insights" className={linkClass("/insights")}>
        <InsightsIcon /> Insights
      </Link>
    </div>
  );
};

export default Sidebar;
