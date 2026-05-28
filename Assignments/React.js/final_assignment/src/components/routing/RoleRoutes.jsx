import { Route } from "react-router-dom";
import RequireRole from "./RequireRole";

function RoleRoutes({ role, allowedRole, routes }) {
    return (
        <Route element={<RequireRole role={role} allowedRole={allowedRole} />}>
            {routes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
        </Route>
    );
}

export default RoleRoutes;
