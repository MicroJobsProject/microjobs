// main.tsx o index.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router";

import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";

import ErrorBoundary from "./components/error/ErrorBoundary";

import "./styles/index.css";
import App from "./app";

import configureStore from "./store";

const accessToken = storage.get("auth");

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const router = createBrowserRouter([{ path: "*", element: <App /> }]);

const store = configureStore({ auth: !!accessToken }, router);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
