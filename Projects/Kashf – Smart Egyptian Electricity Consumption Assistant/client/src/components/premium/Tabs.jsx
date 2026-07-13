import { cn } from "../../utils/cn";

const Tabs = ({ tabs, activeTab, onTabChange, className }) => {
  return (
    <div className={cn("border-b border-kashf-border", className)}>
      <nav
        className="grid"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
        aria-label="Tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "whitespace-nowrap py-4 px-2 border-b-2 font-medium text-sm transition-colors text-center",
              activeTab === tab.id
                ? "border-kashf-blue text-kashf-blue"
                : "border-transparent text-neutral-400 hover:text-neutral-300 hover:border-neutral-500"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;

