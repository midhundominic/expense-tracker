import type { SortConfig } from "../../../types";
import type { Transaction } from "../../../types";

interface SortableHeaderProps {
  label: string;
  sortKey: keyof Transaction;
  sortConfig: SortConfig;
  onSort: (key: keyof Transaction) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  sortKey,
  sortConfig,
  onSort,
}) => {
  const isActive = sortConfig.key === sortKey;
  const isAsc = sortConfig.direction === "asc";

  return (
    <th
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer select-none group"
      style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
      onClick={() => onSort(sortKey)}
    >
      <span className="inline-flex items-center gap-1.5 group-hover:opacity-80 transition-opacity">
        {label}
        <span className="flex flex-col gap-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ opacity: isActive && isAsc ? 1 : 0.25 }}
          >
            <path d="M12 4l8 14H4z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              opacity: isActive && !isAsc ? 1 : 0.25,
              transform: "rotate(180deg)",
            }}
          >
            <path d="M12 4l8 14H4z" />
          </svg>
        </span>
      </span>
    </th>
  );
};

export default SortableHeader;
