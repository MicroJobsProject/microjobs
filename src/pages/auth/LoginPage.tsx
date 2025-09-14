//DEPENDENCIES
import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { useAuth } from "../../store/hooks";

const LoginPage = lazy(() => import("../auth/LoginPage"));
/*
const RequireAuth = lazy(() => import("./pages/auth/require-auth"));

const AdvertsPage = lazy(() => import("./pages/advert/adverts-page"));
const AdvertPage = lazy(() => import("./pages/advert/advert-page"));
const NewAdvertPage = lazy(() => import("./pages/advert/new-advert-page"));

const NotFoundPage = lazy(() => import("./pages/HTTP-status-code/not-found"));
const InternalServerError = lazy(() => import("./pages/HTTP-status-code/internal-server-error"));

const Layout = lazy(() => import("./components/layout/layout"));
*/

function HomePage() {
  const handleLogout = () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "40px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <header
          style={{
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "20px",
            marginBottom: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, color: "#1f2937", fontSize: "32px" }}>
            Home
          </h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Cerrar Sesión
          </button>
        </header>

        <main>
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <h2
              style={{
                color: "#22c55e",
                marginBottom: "20px",
                fontSize: "28px",
              }}
            >
              ¡Bienvenido!
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#6b7280",
                marginBottom: "30px",
              }}
            >
              Has iniciado sesión correctamente.
            </p>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "left",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#1f2937" }}>
                Estado del sistema:
              </h3>
              <ul style={{ color: "#6b7280", lineHeight: "1.6" }}>
                <li>✅ Autenticación exitosa</li>
                <li>✅ Estado de sesión activo</li>
                <li>✅ Token de acceso válido</li>
                <li>🕒 Sesión iniciada: {new Date().toLocaleString()}</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  const isAuthenticated = useAuth();

  /*
  // CÓDIGO ORIGINAL - Rutas completas con lazy loading
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/adverts"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<AdvertsPage />} />
          <Route path=":advertId" element={<AdvertPage />} />
          <Route path="new" element={<NewAdvertPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/internal-server-error" element={<InternalServerError />} />
      </Routes>
    </Suspense>
  );
  */

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
