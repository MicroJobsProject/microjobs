// DEPENDENCIES
import type { AxiosError } from "axios";

export const ErrorCode = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  INTERNAL_SERVER: 500,
  SERVICE_UNAVAILABLE: 503,
  NETWORK_ERROR: 0,
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export const ERROR_ROUTES = {
  [ErrorCode.NOT_FOUND]: "/not-found",
  [ErrorCode.INTERNAL_SERVER]: "/server-error",
  [ErrorCode.SERVICE_UNAVAILABLE]: "/service-unavailable",
  [ErrorCode.NETWORK_ERROR]: "/network-error",
  [ErrorCode.UNAUTHORIZED]: "/unauthorized",
  [ErrorCode.FORBIDDEN]: "/forbidden",
  [ErrorCode.BAD_REQUEST]: "/bad-request",
} as const;

export const ROUTE_TO_ERROR_CODE: Record<string, ErrorCode> = {
  "/not-found": ErrorCode.NOT_FOUND,
  "/server-error": ErrorCode.INTERNAL_SERVER,
  "/service-unavailable": ErrorCode.SERVICE_UNAVAILABLE,
  "/network-error": ErrorCode.NETWORK_ERROR,
  "/unauthorized": ErrorCode.UNAUTHORIZED,
  "/forbidden": ErrorCode.FORBIDDEN,
  "/bad-request": ErrorCode.BAD_REQUEST,
};

export function getErrorCodeFromAxios(error: AxiosError): ErrorCode {
  const status = error.response?.status;
  const isNetworkError = !error.response && error.message === "Network Error";

  if (isNetworkError) {
    return ErrorCode.NETWORK_ERROR;
  }

  switch (status) {
    case 400:
      return ErrorCode.BAD_REQUEST;
    case 401:
      return ErrorCode.UNAUTHORIZED;
    case 403:
      return ErrorCode.FORBIDDEN;
    case 404:
      return ErrorCode.NOT_FOUND;
    case 503:
      return ErrorCode.SERVICE_UNAVAILABLE;
    case 500:
    default:
      return ErrorCode.INTERNAL_SERVER;
  }
}

export function getErrorRoute(code: ErrorCode): string {
  return ERROR_ROUTES[code] || ERROR_ROUTES[ErrorCode.INTERNAL_SERVER];
}

export function getErrorCodeFromRoute(pathname: string): ErrorCode {
  return ROUTE_TO_ERROR_CODE[pathname] || ErrorCode.INTERNAL_SERVER;
}

export function isCriticalError(error: AxiosError): boolean {
  const status = error.response?.status;
  const isNetworkError = !error.response && error.message === "Network Error";

  return isNetworkError || status === 500 || status === 503 || status === 404;
}

export function isValidationError(error: AxiosError): boolean {
  const status = error.response?.status;
  return status === 400 || status === 401 || status === 403;
}

export function getErrorMessage(code: ErrorCode): string {
  switch (code) {
    case ErrorCode.NOT_FOUND:
      return "Sorry, the page you are looking for does not exist or has been moved.";
    case ErrorCode.INTERNAL_SERVER:
      return "There was an error processing your request. Please try again later. If you need immediate help, let us know.";
    case ErrorCode.SERVICE_UNAVAILABLE:
      return "Service temporarily unavailable. We are working on it.";
    case ErrorCode.NETWORK_ERROR:
      return "Cannot connect to the server. Please check your internet connection or try again later.";
    case ErrorCode.UNAUTHORIZED:
      return "You need to be logged in to access this resource.";
    case ErrorCode.FORBIDDEN:
      return "You don't have permission to access this resource.";
    case ErrorCode.BAD_REQUEST:
      return "There was a problem with your request. Please check your input and try again.";
    default:
      return "An unexpected error occurred on the server.";
  }
}

export function getErrorTitle(code: ErrorCode): string {
  switch (code) {
    case ErrorCode.NOT_FOUND:
      return "Page Not Found";
    case ErrorCode.INTERNAL_SERVER:
      return "Internal Server Error";
    case ErrorCode.SERVICE_UNAVAILABLE:
      return "Service Unavailable";
    case ErrorCode.NETWORK_ERROR:
      return "Network Error";
    case ErrorCode.UNAUTHORIZED:
      return "Unauthorized";
    case ErrorCode.FORBIDDEN:
      return "Forbidden";
    case ErrorCode.BAD_REQUEST:
      return "Bad Request";
    default:
      return "Error";
  }
}

export function getApiErrorMessage(error: AxiosError): string {
  const apiError = error.response?.data as
    | { error?: string; field?: string }
    | undefined;
  return apiError?.error || error.message;
}

export function getApiErrorField(error: AxiosError): string | undefined {
  const apiError = error.response?.data as
    | { error?: string; field?: string }
    | undefined;
  return apiError?.field;
}
