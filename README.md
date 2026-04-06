Smart Financial Dashboard

A premium, production-quality financial dashboard built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Recharts**.

---

## Quick Start

```bash
cd finance
npm install
npm run dev
# Open http://localhost:5173
```

---

## Features

### Dashboard Overview
- **3 Summary Cards** (Total Balance, Income, Expenses) with gradient backgrounds and live data
- **Balance Trend** — Area chart showing monthly income vs expenses with gradient fills
- **Spending Breakdown** — Donut pie chart categorizing all expenses with percentage tooltips
- **Monthly Comparison** — Grouped bar chart with net balance in custom tooltip

### Transactions
- **Full table** with 42 pre-loaded transactions across 6 months
- **Search** — Real-time search across category, description, date, and amount
- **Filter** — Type (income/expense) and category chip-style filters
- **Sort** — Every column is sortable (click header) with asc/desc toggle
- **Pagination** — 10 rows per page with page navigation
- **Color-coded** — Income rows show green amounts, expense rows show red amounts

### 
Role-Based UI
| Feature | Viewer | Admin |
|---------|--------|-------|
| View all data | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |

Switch roles using the **animated toggle switch** in the Navbar.

### Insights
- Highest Spending Category
- Best Saving Month (highest net income)
- Average Monthly Expense
- Savings Rate %
- Top 6 categories ranked with animated progress bars
- Monthly comparison chart
- Financial health banner (green if savings rate ≥ 20%, amber otherwise)

### UX Enhancements
- **Dark Mode** — Full dark theme via CSS variables, toggle in Navbar, persisted to localStorage
- **Data Persistence** — Transactions, role, and dark mode preference saved to localStorage
- **Responsive** — Sidebar collapses on mobile with hamburger menu
- **Animations** — Fade-in, scale-in, stagger delays on all major components
- **Empty States** — Graceful fallback when no data matches filters
- **Form Validation** — Required field checks on the Add/Edit modal




##  Tech Stack

| Tech | Version | Usage |
|------|---------|-------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool |
| Tailwind CSS | v4 | Utility styling |
| Recharts | 3 | Charts & graphs |
| React Router | 7 | Client-side routing |
| MUI Icons | 7 | Icon library |

## State Management

All state lives in a single `AppContext` using React's built-in `useState` + `useCallback`. Persisted to `localStorage` via `useEffect`. No external state library required — the structure is modular and could be migrated to Zustand or Redux with minimal changes.
