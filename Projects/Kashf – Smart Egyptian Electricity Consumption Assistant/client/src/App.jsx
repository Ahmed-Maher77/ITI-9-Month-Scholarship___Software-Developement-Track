import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import AuthBootstrap from "./auth/AuthBootstrap";
import AppSplash from "./components/AppSplash/AppSplash";
import { router } from "./routes/router";
import { store } from "./store";


const App = () => {
    return (
        <Provider store={store}>
            <AuthBootstrap>
                <AppSplash>
                    <RouterProvider router={router} />
                </AppSplash>
            </AuthBootstrap>
        </Provider>
    );
};

export default App;
