import { useState, useEffect } from "react";
import type { Transaction, Category } from "../../../../types";
import Modal from "../../ui/Modal";
import { useApp } from "../../../context/AppContext";

const CATEGORIES: Category[] = [
  "Salary",
  "Freelance",
  "Investment",
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Healthcare",
  "Shopping",
  "Rent",
  "Other",
];

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  existing?: Transaction | null;
}

const emptyForm = (): Omit<Transaction, "id"> => ({
  date: new Date().toISOString().split("T")[0],
  amount: 0,
  category: "Food",
  type: "expense",
  description: "",
});

const TransactionForm: React.FC<TransactionFormProps> = ({
  isOpen,
  onClose,
  existing,
}) => {
  const { addTransaction, editTransaction } = useApp();
  const [form, setForm] = useState<Omit<Transaction, "id">>(emptyForm());
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existing) {
      const { id: _id, ...rest } = existing;
      setForm(rest);
    } else {
      setForm(emptyForm());
    }
    setErrors({});
  }, [existing, isOpen]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.date) e.date = "Date is required";
    if (!form.amount || form.amount <= 0)
      e.amount = "Amount must be greater than 0";
    if (form.type === "expense" && !form.category)
      e.category = "Category is required";
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    if (existing) {
      editTransaction({ ...(form as Transaction), id: existing.id });
    } else {
      addTransaction({ ...(form as Transaction), id: Date.now().toString() });
    }
    onClose();
  };

  const field =
    "w-full px-4 py-3 rounded-xl text-base border outline-none transition-all duration-150";
  const fieldStyle = {
    background: "var(--bg-primary)",
    borderColor: "var(--border-color)",
    color: "var(--text-primary)",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={existing ? "Edit Transaction" : "Add Transaction"}
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Date */}
        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Date
          </label>
          <input
            type="date"
            className={field}
            style={fieldStyle}
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
          {errors.date && (
            <p className="text-xs text-rose-500 mt-0.5">{errors.date}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Amount (₹)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            className={field}
            style={fieldStyle}
            value={form.amount || ""}
            placeholder="0.00"
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                amount: parseFloat(e.target.value) || 0,
              }))
            }
          />
          {errors.amount && (
            <p className="text-sm text-rose-500 mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["income", "expense"] as const).map((t) => (
              <label
                key={t}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer transition-all text-base font-medium"
                style={{
                  borderColor:
                    form.type === t
                      ? t === "income"
                        ? "#10b981"
                        : "#f43f5e"
                      : "var(--border-color)",
                  background:
                    form.type === t
                      ? t === "income"
                        ? "rgba(16,185,129,0.1)"
                        : "rgba(244,63,94,0.1)"
                      : "var(--bg-primary)",
                  color:
                    form.type === t
                      ? t === "income"
                        ? "#10b981"
                        : "#f43f5e"
                      : "var(--text-muted)",
                }}
              >
                <input
                  type="radio"
                  name="type"
                  value={t}
                  checked={form.type === t}
                  onChange={() => setForm((f) => ({ ...f, type: t }))}
                  className="sr-only"
                />
                {t === "income" ? "↑ Income" : "↓ Expense"}
              </label>
            ))}
          </div>
        </div>

        {/* Category (Hidden for Income) */}
        {form.type === "expense" && (
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Category
            </label>
            <select
              className={field}
              style={fieldStyle}
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value as Category }))
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-rose-500 mt-1">{errors.category}</p>
            )}
          </div>
        )}

        {/* Description */}
        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Description (optional)
          </label>
          <input
            type="text"
            className={field}
            style={fieldStyle}
            value={form.description ?? ""}
            placeholder="Brief note…"
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl text-base font-semibold border transition-all"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-secondary)",
              background: "var(--bg-primary)",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3.5 rounded-xl text-base font-bold text-white transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
            }}
          >
            {existing ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionForm;
