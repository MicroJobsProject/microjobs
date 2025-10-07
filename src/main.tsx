//DEPENDENCIES
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";

//NATIVE
import configureStore from "./store";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import { authLoginFulfilled } from "./store/actions";
import ErrorBoundary from "./components/error/ErrorBoundary";
import App from "./app";

//STATIC-FILES
import "./styles/index.css";
import "./utils/i18n.ts";
import ThemeProvider from "./utils/theme/theme-provider.tsx";

const router = createBrowserRouter([{ path: "*", element: <App /> }]);

const store = configureStore(
  {
    ui: {
      pending: false,
      error: null,
      successMessage: null,
    },
  },
  router,
);

const accessToken = storage.getAuth();
if (accessToken) {
  setAuthorizationHeader(accessToken);
  store.dispatch(authLoginFulfilled());
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
