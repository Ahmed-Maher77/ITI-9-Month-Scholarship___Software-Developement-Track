import "./TooltipText.css";

const TooltipText = ({ text, children, className = "" }) => (
    <span className={`tooltip-text-wrapper ${className}`.trim()} tabIndex={0}>
        {children}
        <p className="tooltip-text-bubble mb-0">{text}</p>
    </span>
);

export default TooltipText;
