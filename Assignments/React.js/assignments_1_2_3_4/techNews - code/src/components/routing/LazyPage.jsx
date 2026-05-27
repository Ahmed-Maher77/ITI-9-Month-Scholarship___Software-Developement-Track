import { Suspense } from "react";
import RouteLoader from "./RouteLoader";

function LazyPage({ Component }) {
    return (
        <Suspense fallback={<RouteLoader />}>
            <Component />
        </Suspense>
    );
}

export default LazyPage;
