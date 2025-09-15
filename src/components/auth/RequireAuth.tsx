import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import { useAuth } from "../../store/hooks";

interface RequireAuthProps {
  children: ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  const isLogged = useAuth();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default RequireAuth;
