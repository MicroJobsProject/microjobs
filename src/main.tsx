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
import "./utils/i18n.ts";

const accessToken = storage.get("auth");

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
