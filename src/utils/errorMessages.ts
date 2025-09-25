export function getErrorMessage(code: string | number): string {
  switch (Number(code)) {
    case 500:
      return "Internal server error. Please try again later.";
    case 503:
      return "Service temporarily unavailable. We are working on it.";
    default:
      return "An unexpected error occurred on the server.";
  }
}
