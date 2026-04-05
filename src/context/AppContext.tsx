import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { Transaction, Role, FilterState, SortConfig } from "../../types";
import { transactions as mockData } from "../data/mockData";

interface AppContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (tx: Transaction) => void;
  editTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  filter: FilterState;
  setFilter: (f: FilterState) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortConfig: SortConfig;
  setSortConfig: (s: SortConfig) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = "financeapp_transactions";
const DARK_KEY = "financeapp_dark";
const ROLE_KEY = "financeapp_role";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : mockData;
    } catch {
      return mockData;
    }
  });

  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem(ROLE_KEY) as Role) || "viewer";
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem(DARK_KEY) === "true";
  });

  const [filter, setFilter] = useState<FilterState>({
    type: "all",
    category: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "date",
    direction: "desc",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(DARK_KEY, String(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const setRole = useCallback((r: Role) => {
    setRoleState(r);
    localStorage.setItem(ROLE_KEY, r);
  }, []);

  const addTransaction = useCallback((tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  }, []);

  const editTransaction = useCallback((tx: Transaction) => {
    setTransactions((prev) => prev.map((t) => (t.id === tx.id ? tx : t)));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((d) => !d);
  }, []);

  return (
    <AppContext.Provider
      value={{
        transactions,
        role,
        setRole,
        addTransaction,
        editTransaction,
        deleteTransaction,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery,
        sortConfig,
        setSortConfig,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
