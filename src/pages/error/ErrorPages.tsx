// DEPENDENCIES
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

// NATIVE
import { useAppSelector } from "../../store";
import { getCriticalError } from "../../store/selectors";
import { useClearCriticalError } from "../../store/hooks";
import { getErrorCodeFromRoute } from "../../utils/error-utils";
import { useTranslation } from "react-i18next";

export function ErrorPages() {
  const navigate = useNavigate();
  const location = useLocation();
  const criticalError = useAppSelector(getCriticalError);
  const clearCriticalError = useClearCriticalError();
  const { t } = useTranslation("error");

  const errorCode = getErrorCodeFromRoute(location.pathname);
  const fromPath = location.state?.from || "/";

  const errorConfig = {
    404: {
      title: t("Not Found!"),
      subtitle: t("This page took a day off"),
      message: t(
        "Sorry, the page you were looking for doesn't exist or has been removed.",
      ),
      showGoBack: true,
    },
    500: {
      title: t("Internal Server Error!"),
      subtitle: t("Oops! Something went wrong on our end"),
      message: t(
        "There was an error processing your request. Please try again later. If you need immediate help, let us know.",
      ),
      showGoBack: false,
    },
    503: {
      title: t("Service Unavailable"),
      subtitle: t("We're temporarily down for maintenance"),
      message: t(
        "Our service is temporarily unavailable. We're working on it and will be back shortly.",
      ),
      showGoBack: false,
    },
    401: {
      title: t("Unauthorized"),
      subtitle: t("Access denied"),
      message: t("You need to be logged in to access this resource."),
      showGoBack: true,
    },
    403: {
      title: t("Forbidden"),
      subtitle: t("You shall not pass!"),
      message: t("You don't have permission to access this resource."),
      showGoBack: true,
    },
  };

  const config =
    errorConfig[errorCode as keyof typeof errorConfig] || errorConfig[500];

  useEffect(() => {
    const validErrorPaths = [
      "/not-found",
      "/server-error",
      "/service-unavailable",
      "/unauthorized",
      "/forbidden",
    ];

    if (!validErrorPaths.includes(location.pathname) && !criticalError) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, criticalError, navigate]);

  const handleGoHome = () => {
    clearCriticalError();
    navigate("/", { replace: true });
  };

  const handleGoBack = () => {
    clearCriticalError();

    const isFromErrorPages =
      fromPath.startsWith("/not-found") ||
      fromPath.startsWith("/server-error") ||
      fromPath.startsWith("/service-unavailable") ||
      fromPath.startsWith("/unauthorized") ||
      fromPath.startsWith("/forbidden");

    if (isFromErrorPages || window.history.length <= 2) {
      navigate("/", { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="wrapper flex min-h-screen items-center justify-center">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="relative">
          <h1 className="text-heading font-heading text-8xl font-extrabold opacity-10 sm:text-9xl">
            {errorCode}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-heading font-heading text-4xl font-extrabold sm:text-5xl">
              {config.title}
            </h2>
          </div>
        </div>

        <h3 className="text-primary text-2xl font-semibold sm:text-3xl">
          {config.subtitle}
        </h3>

        <p className="text-paragraph mx-auto max-w-lg text-lg leading-relaxed sm:text-xl">
          {config.message}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
          {config.showGoBack && (
            <button
              onClick={handleGoBack}
              className="btn btn-outlined w-full min-w-40 sm:w-auto"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_back
              </span>
              {t("Go Back")}
            </button>
          )}
          <button
            onClick={handleGoHome}
            className="btn btn-primary w-full min-w-40 sm:w-auto"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              home
            </span>
            {t("Go Home")}
          </button>
        </div>

        <div className="pt-8">
          <p className="text-paragraph text-sm opacity-60">
            {t("Error Code")}: {errorCode}
          </p>
        </div>
      </div>
    </div>
  );
}
