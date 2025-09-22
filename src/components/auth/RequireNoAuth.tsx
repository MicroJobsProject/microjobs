//DEPENDENCIES
import type { ReactNode } from "react";
import { Navigate } from "react-router";

//NATIVE
import { useAuth } from "../../store/hooks";

interface RequireNoAuthProps {
  children: ReactNode;
  redirectTo?: string;
}

function RequireNoAuth({ children, redirectTo = "/home" }: RequireNoAuthProps) {
  const isLogged = useAuth();

  if (isLogged) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default RequireNoAuth;
