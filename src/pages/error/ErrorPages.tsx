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
      icon: "search_off",
      showGoBack: true,
      bgGradient: "from-primary/10 to-transparent",
    },
    500: {
      title: t("Internal Server Error!"),
      subtitle: t("Oops! Something went wrong on our end"),
      message: t(
        "There was an error processing your request. Please try again later. If you need immediate help, let us know.",
      ),
      icon: "error",
      showGoBack: false,
      bgGradient: "from-destructive/10 to-transparent",
    },
    503: {
      title: t("Service Unavailable"),
      subtitle: t("We're temporarily down for maintenance"),
      message: t(
        "Our service is temporarily unavailable. We're working on it and will be back shortly.",
      ),
      icon: "build_circle",
      showGoBack: false,
      bgGradient: "from-warning/10 to-transparent",
    },
    401: {
      title: t("Unauthorized"),
      subtitle: t("Access denied"),
      message: t("You need to be logged in to access this resource."),
      icon: "lock",
      showGoBack: true,
      bgGradient: "from-primary/10 to-transparent",
    },
    403: {
      title: t("Forbidden"),
      subtitle: t("You shall not pass!"),
      message: t("You don't have permission to access this resource."),
      icon: "block",
      showGoBack: true,
      bgGradient: "from-destructive/10 to-transparent",
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
    <div className="wrapper flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} pointer-events-none opacity-50`}
        ></div>

        <div className="relative">
          <div className="bg-container border-border overflow-hidden rounded-2xl border shadow-lg">
            <div
              className={`h-2 bg-gradient-to-r ${config.bgGradient.replace("to-transparent", "to-primary/50")}`}
            ></div>

            <div className="p-8 text-center sm:p-12">
              <div className="mb-6 inline-block">
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} animate-pulse opacity-30 blur-2xl`}
                  ></div>
                  <span className="material-symbols-outlined text-destructive animate-bounce-slow relative block text-8xl sm:text-9xl">
                    {config.icon}
                  </span>
                </div>
              </div>

              <div className="mb-8 space-y-4">
                <h2 className="text-heading font-heading text-4xl font-extrabold sm:text-5xl">
                  {config.title}
                </h2>
                <h3 className="text-primary text-xl font-semibold sm:text-2xl">
                  {config.subtitle}
                </h3>
                <p className="text-paragraph mx-auto max-w-md text-base leading-relaxed sm:text-lg">
                  {config.message}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                {config.showGoBack && (
                  <button
                    onClick={handleGoBack}
                    className="btn btn-outlined w-full min-w-40 sm:w-auto"
                  >
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      arrow_back
                    </span>
                    {t("Go Back")}
                  </button>
                )}
                <button
                  onClick={handleGoHome}
                  className="btn btn-primary w-full min-w-40 sm:w-auto"
                >
                  <span
                    className="material-symbols-outlined"
                    aria-hidden="true"
                  >
                    home
                  </span>
                  {t("Go Home")}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-paragraph text-sm opacity-60">
              {t("Error Code")}: {errorCode}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
