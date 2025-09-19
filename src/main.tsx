//DEPENDENCIES
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";

//NATIVE
import configureStore from "./store";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import ErrorBoundary from "./components/error/ErrorBoundary";
import App from "./app";

//STATIC-FILES
import "./styles/index.css";

const accessToken = storage.get("auth");
const isRemembered = storage.isRememberMeActive();

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const router = createBrowserRouter([{ path: "*", element: <App /> }]);

const store = configureStore(
  {
    auth: !!accessToken,
    ui: {
      pending: false,
      error: null,
    },
  },
  router,
);

if (import.meta.env.DEV && accessToken) {
  console.log("App initialized with session:", {
    hasAuth: !!accessToken,
    rememberMe: isRemembered,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
