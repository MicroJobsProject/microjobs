//DEPENDENCIES
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useEffect, useRef } from "react";

//NATIVE
import { useAuth } from "../../store/hooks";

interface RequireAuthProps {
  children: ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  const isLogged = useAuth();
  const location = useLocation();
  const wasLoggedRef = useRef(isLogged);

  useEffect(() => {
    wasLoggedRef.current = isLogged;
  }, [isLogged]);

  if (!isLogged) {
    if (wasLoggedRef.current) {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default RequireAuth;
