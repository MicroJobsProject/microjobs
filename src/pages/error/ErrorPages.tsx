//DEPENDENCIES
import React from "react";
import { useSearchParams, useNavigate } from "react-router";

//NATIVE
import { useAppSelector, useAppDispatch } from "../../store/index";
import { errorClearCritical } from "../../store/actions";
import { getCriticalError } from "../../store/selectors";

import { getErrorMessage } from "../../utils/errorMessages";

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
    <div>
      <h1>Oops! Error:{errorCode}</h1>
      <h2>Something went wrong</h2>
      <p>{errorMessage}</p>

      <div>
        <button onClick={handleGoBack}>Go Back</button>
        <button onClick={handleGoHome}>Back to Homepage</button>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>
      <h2>This page took a day off!</h2>
      <p>
        Sorry, the page you were looking for doesn't exist or has been moved.
      </p>

      <button onClick={() => navigate(-1)}>Go Back</button>
      <button onClick={() => navigate("/")}>Back to Homepage</button>
    </div>
  );
};
