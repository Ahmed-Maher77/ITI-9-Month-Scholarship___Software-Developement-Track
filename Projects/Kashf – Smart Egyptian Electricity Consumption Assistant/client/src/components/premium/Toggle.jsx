import { cn } from "../../utils/cn";

const Toggle = ({ checked, onChange, disabled = false, className, ...props }) => {
  const isRTL = document.documentElement.dir === "rtl";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-kashf-blue focus:ring-offset-2 focus:ring-offset-kashf-bg",
        checked ? "bg-kashf-blue" : "bg-kashf-muted",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200",
          isRTL
            ? checked
              ? "-translate-x-6"   // RTL checked  → thumb on left
              : "-translate-x-1"   // RTL unchecked → thumb on right
            : checked
              ? "translate-x-6"    // LTR checked  → thumb on right
              : "translate-x-1"    // LTR unchecked → thumb on left
        )}
      />
    </button>
  );
};

export default Toggle;

