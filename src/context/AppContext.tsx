import React, { createContext, useContext, useState } from "react";
import type { Transaction, Role } from "../../types";
import { transactions as mockData } from "../data/mockData";

interface AppContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (tx: Transaction) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockData);
  const [role, setRole] = useState<Role>("viewer");

  const addTransaction = (tx: Transaction) => {
    setTransactions((prev) => [...prev, tx]);
  };

  return (
    <AppContext.Provider
      value={{ transactions, role, setRole, addTransaction }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Context Error");
  return context;
};
