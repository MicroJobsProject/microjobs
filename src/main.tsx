import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { createBrowserRouter } from "react-router";
import "./index.css";
import App from "./app.tsx";
import configureStore from "./store";

/*
// CÓDIGO ORIGINAL
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
*/

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
  },
]);

const store = configureStore({}, router);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
