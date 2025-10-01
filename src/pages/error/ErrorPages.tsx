//DEPENDENCIES
import React from "react";
import { useSearchParams, useNavigate } from "react-router";

//NATIVE
import { useAppSelector, useAppDispatch } from "../../store/index";
import { errorClearCritical } from "../../store/actions";
import { getCriticalError } from "../../store/selectors";

import { getErrorMessage } from "../../utils/errorMessages";

//STATIC-FILES
import homeIcon from "../../assets/home-light.svg";
import backIcon from "../../assets/arrow-brown.svg";
import { useTranslation } from "react-i18next";

export const CriticalErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const criticalError = useAppSelector(getCriticalError);
  const { t } = useTranslation();

  const errorCode =
    searchParams.get("code") ||
    criticalError?.response?.status?.toString() ||
    "500";

  const errorMessage =
    (criticalError?.response?.data &&
    typeof criticalError.response.data === "object" &&
    "error" in criticalError.response.data
      ? (criticalError.response.data as { error?: string }).error
      : undefined) ||
    criticalError?.message ||
    getErrorMessage(errorCode);

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
          <button onClick={handleGoHome} className="btn btn-outlined">
            <img src={backIcon} alt="" className="h-5 w-5" aria-hidden="true" />
            {t("goBack")}
          </button>
          <button onClick={handleGoBack} className="btn btn-primary">
            <img src={homeIcon} alt="" className="h-5 w-5" aria-hidden="true" />
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
            <img src={backIcon} alt="" className="h-5 w-5" aria-hidden="true" />
            {t("goBack")}
          </button>
          <button onClick={handleGoHome} className="btn btn-primary">
            <img src={homeIcon} alt="" className="h-5 w-5" aria-hidden="true" />
            {t("backToHomepage")}
          </button>
        </div>
      </div>
    </div>
  );
};
