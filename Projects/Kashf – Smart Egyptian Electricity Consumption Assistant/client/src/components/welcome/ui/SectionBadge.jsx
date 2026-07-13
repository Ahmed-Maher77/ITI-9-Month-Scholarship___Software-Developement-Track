const SectionBadge = ({ children, icon = null, className = "" }) => (
    <span
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-kashf-blue/40 bg-kashf-blue/10 text-kashf-blue text-sm font-medium tracking-wide ${className}`}
    >
        {icon}
        {children}
    </span>
);

export default SectionBadge;
