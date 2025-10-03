export function getErrorMessage(code: string | number): string {
  switch (Number(code)) {
    case 404:
      return "Sorry, the page you are looking for does not exist or has been moved.";
    case 500:
      return "There was an error processing your request. Please try again later. If you need immediate help, let us know.";
    case 503:
      return "Service temporarily unavailable. We are working on it.";
    default:
      return "An unexpected error occurred on the server.";
  }
}

export function getNetworkErrorMessage(): string {
  return "Cannot connect to the server. Please check your internet connection or try again later.";
}
