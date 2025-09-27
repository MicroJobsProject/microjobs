//DEPENDENCIES
import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

//NATIVE
import RegisterPage from "./pages/auth/RegisterPage";
import { CriticalErrorPage, NotFoundPage } from "./pages/error/ErrorPages";

const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
//const RequireAuth = lazy(() => import("./components/auth/RequireAuth"));
const RequireNoAuth = lazy(() => import("./components/auth/RequireNoAuth"));

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("./components/layout/layout"));
const NewAdvertPage = lazy(() => import("./pages/advert/NewAdvert"));

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

          <Route path="error" element={<CriticalErrorPage />} />
          <Route path="not-found" element={<NotFoundPage />} />

          <Route index element={<Navigate to="/home" />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="newAdvert"
            element={
              // <RequireNoAuth>
              <NewAdvertPage />
              // </RequireNoAuth>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
