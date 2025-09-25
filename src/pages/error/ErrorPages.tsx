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

export const CriticalErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const criticalError = useAppSelector(getCriticalError);

  const errorCode = searchParams.get("code") || criticalError?.code || "500";

  const errorMessage = criticalError?.message || getErrorMessage(errorCode);

  const handleGoHome = () => {
    dispatch(errorClearCritical());
    navigate("/");
  };

  const handleGoBack = () => {
    dispatch(errorClearCritical());
    navigate(-1);
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-6 py-12">
      <div className="text-center">
        <div className="mb-8">
          <h2
            className="text-destructive mb-4 font-extrabold"
            style={{ fontSize: "4rem" }}
          >
            Oops! Error: {errorCode}
          </h2>
          <h3 className="text-heading mb-4">Something went wrong</h3>
          <p className="text-paragraph mx-auto max-w-md text-lg">
            {errorMessage}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={handleGoHome} className="btn btn-outlined">
            <img src={backIcon} alt="" className="h-5 w-5" />
            Go Back
          </button>
          <button onClick={handleGoBack} className="btn btn-primary">
            <img src={homeIcon} alt="" className="h-5 w-5" />
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGoHome = () => {
    dispatch(errorClearCritical());
    navigate("/");
  };

  const handleGoBack = () => {
    dispatch(errorClearCritical());
    navigate(-1);
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-6 py-12">
      <div className="text-center">
        <div className="mb-8">
          <h2
            className="text-primary mb-4 font-extrabold"
            style={{ fontSize: "8rem" }}
          >
            404
          </h2>
          <h3 className="text-heading mb-4">This page took a day off!</h3>
          <p className="text-paragraph mx-auto max-w-md text-lg">
            Sorry, the page you were looking for doesn't exist or has been
            moved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={handleGoBack} className="btn btn-outlined">
            <img src={backIcon} alt="" className="h-5 w-5" />
            Go Back
          </button>
          <button onClick={handleGoHome} className="btn btn-primary">
            <img src={homeIcon} alt="" className="h-5 w-5" />
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
