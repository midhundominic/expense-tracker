import { useMemo, useState } from "react";
import type { Transaction } from "../../../../types";
import { useApp } from "../../../context/AppContext";
import Badge from "../../ui/Badge";
import SearchBar from "../../ui/SearchBar";
import FilterBar from "../../ui/FilterBar";
import SortableHeader from "../../ui/SortableHeader";
import EmptyState from "../../ui/EmptyState";

const PAGE_SIZE = 10;

interface TransactionTableProps {
  onEdit: (tx: Transaction) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ onEdit }) => {
  const {
    transactions,
    role,
    deleteTransaction,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortConfig,
    setSortConfig,
  } = useApp();

  const [page, setPage] = useState(1);

  const handleSort = (key: keyof Transaction) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...transactions];
    const q = searchQuery.toLowerCase();

    if (q) {
      list = list.filter(
        (t) =>
          t.category.toLowerCase().includes(q) ||
          (t.description ?? "").toLowerCase().includes(q) ||
          t.date.includes(q) ||
          String(t.amount).includes(q)
      );
    }

    if (filter.type !== "all") {
      list = list.filter((t) => t.type === filter.type);
    }

    if (filter.category !== "all") {
      list = list.filter((t) => t.category === filter.category);
    }

    list.sort((a, b) => {
      const av = a[sortConfig.key] ?? "";
      const bv = b[sortConfig.key] ?? "";
      const cmp = String(av).localeCompare(String(bv), undefined, {
        numeric: true,
      });
      return sortConfig.direction === "asc" ? cmp : -cmp;
    });

    return list;
  }, [transactions, searchQuery, filter, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const emptyRows = PAGE_SIZE - paginated.length;

  return (
    <div className="flex flex-col flex-1 space-y-4">
      {/* Toolbar */}
      <div className="glass-card p-4 space-y-3 shrink-0">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex-1 min-w-[250px]">
            <SearchBar
              value={searchQuery}
              onChange={(v) => {
                setSearchQuery(v);
                setPage(1);
              }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {filtered.length} results
          </span>
        </div>

        <FilterBar
          filter={filter}
          onChange={(f) => {
            setFilter(f);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="glass-card flex flex-col flex-1 overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto flex-1">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b bg-indigo-50/40">
                <SortableHeader
                  label="Date"
                  sortKey="date"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Category"
                  sortKey="category"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />

                <th className="px-5 py-4 text-left text-sm font-semibold uppercase">
                  Description
                </th>

                <SortableHeader
                  label="Amount"
                  sortKey="amount"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Type"
                  sortKey="type"
                  sortConfig={sortConfig}
                  onSort={handleSort}
                />

                {role === "admin" && (
                  <th className="px-5 py-4 text-right text-sm font-semibold uppercase whitespace-nowrap">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={role === "admin" ? 6 : 5}>
                    <EmptyState
                      title="No transactions found"
                      description="Try adjusting your search or filter criteria."
                    />
                  </td>
                </tr>
              ) : (
                <>
                  {paginated.map((tx) => (
                    <tr key={tx.id} className="border-b hover:bg-indigo-50/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(tx.date).toLocaleDateString("en-IN")}
                      </td>

                      <td className="px-6 py-4">{tx.category}</td>

                      <td className="px-6 py-4 max-w-[200px] truncate">
                        {tx.description || "—"}
                      </td>

                      <td
                        className="px-6 py-4 font-semibold whitespace-nowrap"
                        style={{
                          color: tx.type === "income" ? "#10b981" : "#f43f5e",
                        }}
                      >
                        {tx.type === "income" ? "+" : "-"}₹
                        {tx.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge type={tx.type} />
                      </td>

                      {role === "admin" && (
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-end flex-wrap">
                            <button
                              onClick={() => onEdit(tx)}
                              className="px-3 py-2 text-sm rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 whitespace-nowrap"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => {
                                if (
                                  window.confirm("Delete this transaction?")
                                ) {
                                  deleteTransaction(tx.id);
                                }
                              }}
                              className="px-3 py-2 text-sm rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 whitespace-nowrap"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}

                  {emptyRows > 0 &&
                    Array.from({ length: emptyRows }).map((_, i) => (
                      <tr key={`empty-${i}`} className="h-[56px]">
                        <td colSpan={role === "admin" ? 6 : 5}></td>
                      </tr>
                    ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t mt-auto">
            <p className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-lg ${
                    page === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
