import { useState } from "react";
import Layout from "../../components/layout";
import TransactionTable from "../../components/layout/transactions/TransactionTable";
import TransactionForm from "../../components/layout/transactions/TransactionForm";
import type { Transaction } from "../../../types";
import { useApp } from "../../context/AppContext";

const Transactions: React.FC = () => {
  const { role } = useApp();
  const [formOpen, setFormOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
    setEditingTx(null);
  };

  return (
    <Layout>
      <div className="flex flex-col flex-1 space-y-5">
        {/* Page header */}
        <div className="flex items-center justify-between shrink-0 animate-fade-in-up">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Transactions
            </h1>
            <p
              className="text-base mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              View, filter, and manage all your transactions
            </p>
          </div>
          {role === "admin" && (
            <button
              onClick={() => {
                setEditingTx(null);
                setFormOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Transaction
            </button>
          )}
        </div>

        <TransactionTable onEdit={handleEdit} />
      </div>

      <TransactionForm
        isOpen={formOpen}
        onClose={handleClose}
        existing={editingTx}
      />
    </Layout>
  );
};

export default Transactions;
