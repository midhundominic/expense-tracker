import type { FilterState } from "../../../types";

const ALL_CATEGORIES = [
  "all",
  "Salary",
  "Food",
  "Transport",
  "Shopping",
  "Rent",
  "Other",
] as const;

interface FilterBarProps {
  filter: FilterState;
  onChange: (f: FilterState) => void;
}

const chip = (active: boolean) =>
  [
    "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer whitespace-nowrap",
    active
      ? "border-indigo-500 bg-indigo-500 text-white shadow-sm"
      : "border-transparent text-slate-500 hover:border-slate-300 dark:text-slate-400 dark:hover:border-slate-600",
  ].join(" ");

const FilterBar: React.FC<FilterBarProps> = ({ filter, onChange }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Type filter */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {(["all", "income", "expense"] as const).map((t) => (
          <button
            key={t}
            className={chip(filter.type === t)}
            style={
              filter.type === t
                ? {}
                : {
                    background: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                  }
            }
            onClick={() => onChange({ ...filter, type: t })}
          >
            {t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div
        className="w-px self-stretch"
        style={{ background: "var(--border-color)" }}
      />

      {/* Category filter */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={chip(filter.category === cat)}
            style={
              filter.category === cat
                ? {}
                : {
                    background: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                  }
            }
            onClick={() =>
              onChange({ ...filter, category: cat as FilterState["category"] })
            }
          >
            {cat === "all" ? "All Categories" : cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
