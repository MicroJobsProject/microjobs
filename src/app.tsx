// DEPENDENCIES
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router";
import { lazy, Suspense, useEffect } from "react";

// NATIVE
import { useAppSelector } from "./store";
import { getCriticalError } from "./store/selectors";
import { useClearCriticalError } from "./store/hooks";
import {
  getErrorRoute,
  getErrorCodeFromAxios,
  ErrorCode,
} from "./utils/error-utils";
import RegisterPage from "./pages/auth/RegisterPage";
import { ErrorPage } from "./pages/error/ErrorPage";
import { NetworkErrorOverlay } from "./pages/error/NetworkErrorOverlay";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const ForgotPasswordPage = lazy(
  () => import("./pages/auth/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPasswordPage"));
const RequireAuth = lazy(() => import("./components/auth/RequireAuth"));
const RequireNoAuth = lazy(() => import("./components/auth/RequireNoAuth"));

const ProfilePage = lazy(() => import("./pages/user/ProfilePage"));
const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./components/layout/layout"));
const NewAdvertPage = lazy(() => import("./pages/advert/NewAdvert"));

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const criticalError = useAppSelector(getCriticalError);
  const clearCriticalError = useClearCriticalError();

  const errorCode = criticalError ? getErrorCodeFromAxios(criticalError) : null;
  const isNetworkError = errorCode === ErrorCode.NETWORK_ERROR;

  useEffect(() => {
    if (criticalError && !isNetworkError) {
      const errorRoute = getErrorRoute(errorCode!);

      navigate(errorRoute, {
        replace: true,
        state: { from: location.pathname },
      });

      const timer = setTimeout(() => {
        clearCriticalError();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [
    criticalError,
    isNetworkError,
    errorCode,
    navigate,
    location.pathname,
    clearCriticalError,
  ]);

  return (
    <>
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
            <Route
              path="forgot-password"
              element={
                <RequireNoAuth>
                  <ForgotPasswordPage />
                </RequireNoAuth>
              }
            />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="home" element={<Home />} />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="advert/new"
              element={
                <RequireAuth>
                  <NewAdvertPage />
                </RequireAuth>
              }
            />

            <Route path="not-found" element={<ErrorPage />} />
            <Route path="server-error" element={<ErrorPage />} />
            <Route path="service-unavailable" element={<ErrorPage />} />
            <Route path="unauthorized" element={<ErrorPage />} />
            <Route path="forbidden" element={<ErrorPage />} />

            <Route index element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Route>
        </Routes>
      </Suspense>

      {isNetworkError && <NetworkErrorOverlay />}
    </>
  );
}

export default App;
