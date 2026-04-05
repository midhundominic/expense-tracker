import RoleSwitch from "../../ui/RoleSwitch";
import { useApp } from "../../../context/AppContext";

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const { role, setRole, darkMode, toggleDarkMode } = useApp();

  const handleRoleToggle = () => {
    setRole(role === "admin" ? "viewer" : "admin");
  };

  return (
    <header
      className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 py-3 border-b"
      style={{
        background: "var(--bg-navbar)",
        borderColor: "var(--border-color)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          style={{ color: "var(--text-secondary)" }}
          title="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div>
          <h1
            className="text-base font-bold leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            Finance Dashboard
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Track your financial activity
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <RoleSwitch role={role} onToggle={handleRoleToggle} />

        <button
          onClick={toggleDarkMode}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="p-2 rounded-xl transition-all duration-200 hover:scale-110"
          style={{
            background: darkMode
              ? "rgba(251,191,36,0.15)"
              : "rgba(99,102,241,0.1)",
            color: darkMode ? "#fbbf24" : "#6366f1",
          }}
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
