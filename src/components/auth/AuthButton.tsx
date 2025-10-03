//DEPENDENCIES
import { useNavigate } from "react-router";

//NATIVE
import Button from "../../components/ui/Button";
import { useAuth, useLogoutAction } from "../../store/hooks";
import { useTranslation } from "react-i18next";

/* type AuthButtonProps = {
  className?: string;
}; */

export default function AuthButton(/* { className }: AuthButtonProps */) {
  const isLogged = useAuth();
  const logoutAction = useLogoutAction();
  const navigate = useNavigate();
  const { t } = useTranslation("header");

  const handleLogoutClick = async () => {
    await logoutAction();
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return isLogged ? (
    <Button className="btn btn-destructive" onClick={handleLogoutClick}>
      {t("logout")}
    </Button>
  ) : (
    <Button className="btn btn-outlined" onClick={handleLoginClick}>
      {t("login")}
    </Button>
  );
}
