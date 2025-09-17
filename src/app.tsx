//DEPENDENCIES
import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

//NATIVE
import RegisterPage from "./pages/auth/RegisterPage";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
//const RequireAuth = lazy(() => import("./components/auth/RequireAuth"));
const RequireNoAuth = lazy(() => import("./components/auth/RequireNoAuth"));

const Home = lazy(() => import("./pages/Home"));

const Layout = lazy(() => import("./components/layout/layout"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="login"
            element={
              <RequireNoAuth>
                <LoginPage />
              </RequireNoAuth>
            }
          />
          <Route
            path="register"
            element={
              <RequireNoAuth>
                <RegisterPage />
              </RequireNoAuth>
            }
          />
          <Route path="home" element={<Home />} />

          {/* 
          <Route
            path="profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          */}
          <Route index element={<Navigate to="/home" />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
