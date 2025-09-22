//DEPENDENCIES
import React from "react";
import { useSearchParams, useNavigate } from "react-router";

//NATIVE
import { useAppSelector, useAppDispatch } from "../../store/index";
import { errorClearCritical } from "../../store/actions";
import { getCriticalError } from "../../store/selectors";

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

  const handleRetry = () => {
    dispatch(errorClearCritical());
    window.location.reload();
  };

  return (
    <div>
      <h1>Error {errorCode}</h1>
      <h2>Error del Servidor</h2>
      <p>{errorMessage}</p>

      <div>
        <button onClick={handleRetry}>Reintentar</button>
        <button onClick={handleGoHome}>Ir al inicio</button>
      </div>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La página que buscas no existe o ha sido movida.</p>

      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
};

const getErrorMessage = (code: string | number): string => {
  switch (Number(code)) {
    case 500:
      return "Error interno del servidor. Por favor, intenta más tarde.";
    case 503:
      return "Servicio temporalmente no disponible. Estamos trabajando en ello.";
    default:
      return "Ocurrió un error inesperado en el servidor.";
  }
};
