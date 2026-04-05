import { useApp } from "../../context/AppContext";

interface SummaryCardProps {
  title: string;
  value: number;
  type: "balance" | "income" | "expense";
  subtitle?: string;
}

const icons = {
  balance: (
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
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  income: (
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
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  expense: (
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
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
};

const cardTheme = {
  balance: {
    bg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    shadow: "rgba(99,102,241,0.35)",
  },
  income: {
    bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    shadow: "rgba(16,185,129,0.35)",
  },
  expense: {
    bg: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
    shadow: "rgba(244,63,94,0.35)",
  },
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  type,
  subtitle,
}) => {
  const theme = cardTheme[type];

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 text-white animate-fade-in-up"
      style={{
        background: theme.bg,
        boxShadow: `0 8px 32px ${theme.shadow}`,
      }}
    >
      <div
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20"
        style={{ background: "rgba(255,255,255,0.3)" }}
      />
      <div
        className="absolute -bottom-6 -right-2 w-32 h-32 rounded-full opacity-10"
        style={{ background: "rgba(255,255,255,0.5)" }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            {icons[type]}
          </div>
        </div>
        <p className="text-2xl font-bold tracking-tight">
          ₹{value.toLocaleString("en-IN")}
        </p>
        {subtitle && <p className="text-white/60 text-xs mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default SummaryCard;

export const SummaryCards: React.FC = () => {
  const { transactions } = useApp();

  const income = transactions
    .filter((t: any) => t.type === "income")
    .reduce((a: number, b: any) => a + b.amount, 0);
  const expenses = transactions
    .filter((t: any) => t.type === "expense")
    .reduce((a: number, b: any) => a + b.amount, 0);
  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard
        title="Total Balance"
        value={balance}
        type="balance"
        subtitle="Net balance"
      />
      <SummaryCard
        title="Total Income"
        value={income}
        type="income"
        subtitle="All sources"
      />
      <SummaryCard
        title="Total Expenses"
        value={expenses}
        type="expense"
        subtitle="All categories"
      />
    </div>
  );
};
