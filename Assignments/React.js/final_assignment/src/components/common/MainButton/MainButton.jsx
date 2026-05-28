import "./MainButton.css";

const MainButton = ({
    children,
    type = "button",
    className = "",
    onClick,
    fullWidth = false,
    variant = "default",
    disabled = false,
}) => (
    <button
        type={type}
        className={`main-app-button main-app-button--${variant}${fullWidth ? " is-full-width" : ""}${className ? ` ${className}` : ""}`}
        onClick={onClick}
        disabled={disabled}
    >
        <span>{children}</span>
    </button>
);

export default MainButton;
