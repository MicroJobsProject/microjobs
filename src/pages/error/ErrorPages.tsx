//DEPENDENCIES
import React from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

//NATIVE
import { useAppSelector, useAppDispatch } from "../../store/index";
import { errorClearCritical } from "../../store/actions";
import { getCriticalError } from "../../store/selectors";
import {
  getErrorMessage,
  getNetworkErrorMessage,
} from "../../utils/errorMessages";

export const CriticalErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const criticalError = useAppSelector(getCriticalError);
  const { t } = useTranslation();

  const errorCode =
    searchParams.get("code") ||
    criticalError?.response?.status?.toString() ||
    (criticalError?.message === "Network Error" ? "503" : "500");

  const errorMessage =
    criticalError?.message === "Network Error"
      ? getNetworkErrorMessage()
      : getErrorMessage(errorCode);

  const handleGoHome = () => {
    dispatch(errorClearCritical());
    navigate("/");
  };

  const handleGoBack = () => {
    dispatch(errorClearCritical());
    navigate(-1);
  };

  return (
    <div className="px-6 py-12">
      <div className="text-center">
        <div className="mb-8">
          <h2 className="!text-destructive !text-6xl">
            Oops! Error: {errorCode}
          </h2>
          <h3>{t("errorTitle")}</h3>
          <p className="!text-lg">{t(errorMessage)}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={handleGoBack} className="btn btn-outlined">
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            {t("goBack")}
          </button>
          <button onClick={handleGoHome} className="btn btn-primary">
            <span className="material-symbols-outlined" aria-hidden="true">
              home
            </span>
            {t("backToHomepage")}
          </button>
        </div>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleGoHome = () => {
    dispatch(errorClearCritical());
    navigate("/");
  };

  const handleGoBack = () => {
    dispatch(errorClearCritical());
    navigate(-1);
  };

  return (
    <div className="px-6 py-12">
      <div className="text-center">
        <div className="mb-8">
          <h2 className="!text-destructive !text-9xl">404</h2>
          <h3>{t("notFoundSubtitle")}</h3>
          <p className="text-paragraph mx-auto max-w-md text-lg">
            {t("notFoundParagraph")}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={handleGoBack} className="btn btn-outlined">
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
            {t("goBack")}
          </button>
          <button onClick={handleGoHome} className="btn btn-primary">
            <span className="material-symbols-outlined" aria-hidden="true">
              home
            </span>
            {t("backToHomepage")}
          </button>
        </div>
      </div>
    </div>
  );
};
