// DEPENDENCIES
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

// NATIVE
import { useAppSelector } from "../../store";
import { getCriticalError } from "../../store/selectors";
import { useClearCriticalError } from "../../store/hooks";
import { getErrorCodeFromRoute } from "../../utils/error-utils";

export function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const criticalError = useAppSelector(getCriticalError);
  const clearCriticalError = useClearCriticalError();

  const errorCode = getErrorCodeFromRoute(location.pathname);
  const fromPath = location.state?.from || "/";

  const errorConfig = {
    404: {
      title: "Not Found!",
      subtitle: "This page took a day off",
      message:
        "Sorry, the page you were looking for doesn't exist or has been removed.",
      icon: "search_off",
      showGoBack: true,
      bgGradient: "from-primary/10 to-transparent",
    },
    500: {
      title: "Internal Server Error!",
      subtitle: "Oops! Something went wrong on our end",
      message:
        "There was an error processing your request. Please try again later. If you need immediate help, let us know.",
      icon: "error",
      showGoBack: false,
      bgGradient: "from-destructive/10 to-transparent",
    },
    503: {
      title: "Service Unavailable",
      subtitle: "We're temporarily down for maintenance",
      message:
        "Our service is temporarily unavailable. We're working on it and will be back shortly.",
      icon: "build_circle",
      showGoBack: false,
      bgGradient: "from-warning/10 to-transparent",
    },
    401: {
      title: "Unauthorized",
      subtitle: "Access denied",
      message: "You need to be logged in to access this resource.",
      icon: "lock",
      showGoBack: true,
      bgGradient: "from-primary/10 to-transparent",
    },
    403: {
      title: "Forbidden",
      subtitle: "You shall not pass!",
      message: "You don't have permission to access this resource.",
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

    const isFromErrorPage =
      fromPath.startsWith("/not-found") ||
      fromPath.startsWith("/server-error") ||
      fromPath.startsWith("/service-unavailable") ||
      fromPath.startsWith("/unauthorized") ||
      fromPath.startsWith("/forbidden");

    if (isFromErrorPage || window.history.length <= 2) {
      navigate("/", { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="wrapper flex min-h-screen items-center justify-center">
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
                    <span className="material-symbols-outlined">
                      arrow_back
                    </span>
                    Go Back
                  </button>
                )}
                <button
                  onClick={handleGoHome}
                  className="btn btn-primary w-full min-w-40 sm:w-auto"
                >
                  <span className="material-symbols-outlined">home</span>
                  Go Home
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-paragraph text-sm opacity-60">
              Error Code: {errorCode}
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
