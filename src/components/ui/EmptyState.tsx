interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "Try adjusting your filters or search query.",
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 animate-fade-in">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "rgba(99,102,241,0.1)", color: "var(--accent)" }}
      >
        {icon ?? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        )}
      </div>
      <div className="text-center">
        <p
          className="font-semibold text-base"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
