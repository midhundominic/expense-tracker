import type { Role } from "../../../types";

interface RoleSwitchProps {
  role: Role;
  onToggle: () => void;
}

const RoleSwitch: React.FC<RoleSwitchProps> = ({ role, onToggle }) => {
  const isAdmin = role === "admin";

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
        style={{ color: !isAdmin ? "var(--accent)" : "var(--text-muted)" }}
      >
        Viewer
      </span>

      <button
        onClick={onToggle}
        role="switch"
        aria-checked={isAdmin}
        title={`Switch to ${isAdmin ? "Viewer" : "Admin"}`}
        className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          backgroundColor: isAdmin ? "#f59e0b" : "#6366f1",
          boxShadow: isAdmin
            ? "0 0 12px rgba(245,158,11,0.5)"
            : "0 0 12px rgba(99,102,241,0.5)",
        }}
      >
        <span
          className="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300"
          style={{ transform: `translateX(${isAdmin ? "22px" : "4px"})` }}
        />
      </button>

      <span
        className="text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
        style={{ color: isAdmin ? "#f59e0b" : "var(--text-muted)" }}
      >
        Admin
      </span>

      {/* Badge */}
      <span
        className="px-2 py-0.5 rounded-full text-xs font-bold"
        style={{
          backgroundColor: isAdmin
            ? "rgba(245,158,11,0.15)"
            : "rgba(99,102,241,0.15)",
          color: isAdmin ? "#f59e0b" : "#6366f1",
        }}
      >
        {isAdmin ? "Admin" : "Viewer"}
      </span>
    </div>
  );
};

export default RoleSwitch;
