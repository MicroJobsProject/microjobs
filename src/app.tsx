import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import RegisterPage from "./pages/auth/RegisterPage";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RequireAuth = lazy(() => import("./components/auth/RequireAuth"));

const Home = lazy(() => import("./pages/Home"));

const Layout = lazy(() => import("./components/Layout/layout"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Home />} />
        </Route>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
