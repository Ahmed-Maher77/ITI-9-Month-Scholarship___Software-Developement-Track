import { NavLink } from "react-router-dom";

const ListItem = ({
    href,
    icon,
    label,
    children,
    justifyBetween = false,
    itemClassName = "",
    isCollapsed = false,
    onClick,
}) => {
    const commonClassName = `d-flex gap-35 align-items-center w-100${justifyBetween ? " justify-content-between" : ""}`;

    return (
        <li
            className={`navlink-item px-3 py-2 d-flex gap-3 align-items-center rounded ${itemClassName}${
                isCollapsed ? " is-collapsed-item" : ""
            }`}
        >
            {href ? (
                <NavLink
                    to={href}
                    onClick={onClick}
                    className={commonClassName}
                    title={label}
                >
                    {icon && <i className={icon}></i>}
                    <span>{label}</span>
                    {children}
                </NavLink>
            ) : (
                <button
                    type="button"
                    onClick={onClick}
                    className={`${commonClassName} border-0 bg-transparent p-0 text-start`}
                    title={label}
                >
                    {icon && <i className={icon}></i>}
                    <span>{label}</span>
                    {children}
                </button>
            )}
        </li>
    );
};

export default ListItem;
