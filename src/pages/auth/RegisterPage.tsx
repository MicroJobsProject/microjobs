//DEPENDENCIES
import { useEffect, useState } from "react";

//NATIVE
import { useRegisterAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";
import { isValidEmail } from "../../utils/validation";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Alert from "../../components/ui/Alert";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const register = useRegisterAction();
  const ui = useAppSelector(getUi);
  const uiResetErrorAction = useUiResetError();
  const { t } = useTranslation("register");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) newErrors.username = t("errorUsernameRequired");

    if (!isValidEmail(formData.email)) {
      newErrors.email = t("errorValidEmail");
    }

    if (formData.password.length < 6)
      newErrors.password = t("errorPasswordTooShort");

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = t("errorPasswordNoMatch");

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  useEffect(() => {
    uiResetErrorAction();
  }, []);

  return (
    <>
      <div className="flex h-full w-full lg:grid lg:grid-cols-2">
        {/* Contenedor del formulario */}
        <div className="wrapper flex flex-1 items-center justify-center">
          <div className="bg-container border-border w-full max-w-md rounded-xl border p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Título de la página */}
              <div>
                <h2 className="text-center">{t("signUpTo")}</h2>
                <p>{t("signUpSubtitle")}</p>
              </div>
              {/* Username */}
              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="label">
                  {t("username")}
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder={t("usernamePlaceholder")}
                  value={formData.username}
                  onChange={handleChange}
                  className={clsx("input", errors.username && "input-error")}
                />
                {errors.username && (
                  <p className="text-destructive text-sm">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="label">
                  {t("email")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  className={clsx("input", errors.email && "input-error")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="label">
                  {t("password")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t("passwordPlaceholder")}
                  value={formData.password}
                  onChange={handleChange}
                  className={clsx("input", errors.password && "input-error")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password}</p>
                )}
                <p className="text-sm">{t("passwordHelp")}</p>
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="label">
                  {t("passwordRepeat")}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t("passwordPlaceholder")}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={clsx(
                    "input",
                    errors.confirmPassword && "input-error",
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={ui.pending}
                className="btn btn-primary w-full rounded-lg py-3 text-base font-semibold"
              >
                {ui.pending ? t("createAccountFetching") : t("createAccount")}
              </button>

              {/* Error general */}
            </form>
            {ui.error && (
              <Alert
                text={t(
                  axios.isAxiosError(ui.error)
                    ? ui.error.response?.data?.error || ui.error.message
                    : ui.error.message,
                )}
                variant="error"
                onClick={() => uiResetErrorAction()}
              />
            )}
          </div>
        </div>
        {/* Contenedor de la imagen */}
        <div className="absolute top-0 right-0 -z-10 hidden h-[calc(100vh-64px)] w-1/2 bg-[url('/register-image.jpg')] bg-cover bg-center bg-no-repeat lg:block"></div>
      </div>
    </>
  );
}
