import { cn } from "../../utils/cn";

const Button = ({ children, variant = "primary", size = "md", className, ...props }) => {
  const variants = {
    primary: "bg-kashf-blue text-kashf-bg hover:bg-kashf-light-blue",
    secondary: "bg-kashf-surface border border-kashf-border text-neutral-300 hover:border-kashf-blue",
    ghost: "text-neutral-300 hover:text-white hover:bg-kashf-muted",
    danger: "bg-red-500/20 text-white border border-red-500/30 hover:bg-red-500/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-kashf-blue focus:ring-offset-2 focus:ring-offset-kashf-bg disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
