//DEPENDENCIES
import { useNavigate } from "react-router";

//NATIVE
import Button from "../../components/ui/Button";
import { useAuth, useLogoutAction } from "../../store/hooks";

/* type AuthButtonProps = {
  className?: string;
}; */

export default function AuthButton(/* { className }: AuthButtonProps */) {
  const isLogged = useAuth();
  const logoutAction = useLogoutAction();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await logoutAction();
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return isLogged ? (
    <Button className="btn btn-destructive" onClick={handleLogoutClick}>
      Logout
    </Button>
  ) : (
    <Button className="btn btn-outlined" onClick={handleLoginClick}>
      Login
    </Button>
  );
}
