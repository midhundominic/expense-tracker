import React from "react";

type Variant = "edit" | "delete" | "ghost";
type Size = "sm" | "md" | "lg";

interface IconButtonProps {
  onClick: (e: React.MouseEvent) => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  edit: "text-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-300",
  delete:
    "text-rose-500 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950 dark:hover:text-rose-300",
  ghost:
    "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200",
};

const sizeStyles: Record<Size, string> = {
  sm: "p-1.5 rounded-md [&_svg]:w-3.5 [&_svg]:h-3.5",
  md: "p-2   rounded-lg [&_svg]:w-4   [&_svg]:h-4",
  lg: "p-2.5 rounded-lg [&_svg]:w-5   [&_svg]:h-5",
};

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  variant = "ghost",
  size = "md",
  disabled = false,
  title,
  children,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={[
        "inline-flex items-center justify-center transition-all duration-150 cursor-pointer",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
};

export default IconButton;
