export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Food"
  | "Transport"
  | "Entertainment"
  | "Utilities"
  | "Healthcare"
  | "Shopping"
  | "Rent"
  | "Other";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: Category;
  type: TransactionType;
  description?: string;
}

export type Role = "admin" | "viewer";

export interface FilterState {
  type: TransactionType | "all";
  category: Category | "all";
}

export interface SortConfig {
  key: keyof Transaction;
  direction: "asc" | "desc";
}
