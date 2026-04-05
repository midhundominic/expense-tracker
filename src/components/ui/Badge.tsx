import type { TransactionType } from "../../../types";

interface BadgeProps {
  type: TransactionType;
  label?: string;
}

const Badge: React.FC<BadgeProps> = ({ type, label }) => {
  const isIncome = type === "income";
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide",
        isIncome
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
          : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
      ].join(" ")}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isIncome ? "bg-emerald-500" : "bg-rose-500"
        }`}
      />
      {label ?? (isIncome ? "Income" : "Expense")}
    </span>
  );
};

export default Badge;
