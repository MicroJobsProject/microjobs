//DEPENDENCIES
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { lazy, Suspense, useEffect } from "react";

//NATIVE
import { useAppSelector } from "./store";
import { getCriticalError } from "./store/selectors";
import RegisterPage from "./pages/auth/RegisterPage";
import { CriticalErrorPage, NotFoundPage } from "./pages/error/ErrorPages";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const ProfilePage = lazy(() => import("./pages/user/ProfilePage"));

const RequireAuth = lazy(() => import("./components/auth/RequireAuth"));
const RequireNoAuth = lazy(() => import("./components/auth/RequireNoAuth"));

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./components/layout/layout"));
const NewAdvertPage = lazy(() => import("./pages/advert/NewAdvert"));

function App() {
  const navigate = useNavigate();
  const criticalError = useAppSelector(getCriticalError);

  useEffect(() => {
    if (criticalError) {
      const errorCode = criticalError.response?.status || 500;
      navigate(`/error?code=${errorCode}`, { replace: true });
    }
  }, [criticalError, navigate]);

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

          <Route
            path="profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />

          <Route path="error" element={<CriticalErrorPage />} />
          <Route path="not-found" element={<NotFoundPage />} />

          <Route index element={<Navigate to="/home" />} />
          <Route path="*" element={<Navigate to="/error?code=404" replace />} />
          <Route
            path="advert/new"
            element={
              <RequireAuth>
                <NewAdvertPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
