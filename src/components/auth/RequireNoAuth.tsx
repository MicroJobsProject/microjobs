//DEPENDENCIES
import type { ReactNode } from "react";
import { Navigate } from "react-router";

//NATIVE
import { useAuth } from "../../store/hooks";

interface RequireNoAuthProps {
  children: ReactNode;
}

function RequireNoAuth({ children }: RequireNoAuthProps) {
  const isLogged = useAuth();

  if (isLogged) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default RequireNoAuth;
