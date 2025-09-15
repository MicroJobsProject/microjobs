import { logout } from "../../pages/auth/service";
import { useAuth, useLogoutAction } from "../../store/hooks";

import { useNavigate } from "react-router";

import Button from "../../components/ui/Button";

type AuthButtonProps = {
  className?: string;
};

export default function AuthButton({ className }: AuthButtonProps) {
  const isLogged = useAuth();
  const logoutAction = useLogoutAction();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await logout();
    logoutAction();
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return isLogged ? (
    <Button className={className} onClick={handleLogoutClick}>
      Logout
    </Button>
  ) : (
    <Button className={className} onClick={handleLoginClick}>
      Login
    </Button>
  );
}
