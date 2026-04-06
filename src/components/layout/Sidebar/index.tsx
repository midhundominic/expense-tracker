import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: (
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
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    path: "/transactions",
    label: "Transactions",
    icon: (
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
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    path: "/insights",
    label: "Insights",
    icon: (
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
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { pathname } = useLocation();

  return (
    <>
      {!collapsed && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={onToggle}
        />
      )}

      <aside
        className="fixed lg:static z-30 h-screen flex flex-col transition-all duration-300 ease-in-out"
        style={{
          width: collapsed ? "0px" : "240px",
          minWidth: collapsed ? "0px" : "240px",
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          overflow: "hidden",
          boxShadow: "4px 0 24px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex flex-col h-full" style={{ minWidth: "240px" }}>
          {/* Brand */}
          <div
            className="px-6 py-6 border-b shrink-0"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-base leading-none truncate">
                Smart Financial Dashboard
                </p>
                <p className="text-slate-400 text-sm mt-1 truncate">
                  Smart Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="px-4 py-8 space-y-5 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-150 group"
                  style={{
                    background: isActive
                      ? "rgba(99,102,241,0.2)"
                      : "transparent",
                    borderLeft: isActive
                      ? "4px solid #6366f1"
                      : "4px solid transparent",
                  }}
                >
                  <span
                    style={{ color: isActive ? "#6366f1" : "#94a3b8" }}
                    className="group-hover:text-white transition-colors shrink-0"
                  >
                    {item.icon}
                  </span>
                  <span
                    className="text-base font-medium group-hover:text-white transition-colors truncate"
                    style={{ color: isActive ? "#e2e8f0" : "#94a3b8" }}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div
            className="mt-auto shrink-0 w-full px-4 py-5 border-t"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <p className="text-sm text-slate-500 text-center">
            Smart Financial Dashboard © 2026
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
export { navItems };

export const useSidebar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const toggle = () => setCollapsed((c) => !c);
  return { collapsed, toggle };
};
