// DEPENDENCIES
import type { Middleware } from "redux";
import type { AxiosError } from "axios";
import type { RootState } from "./index";

// NATIVE
import type { Actions, ActionsRejected } from "./actions";
import { isCriticalError } from "../utils/error-utils";

function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true
  );
}

export const errorMiddleware: Middleware<Record<string, never>, RootState> =
  (store) => (next) => (action: unknown) => {
    const result = next(action);

    const typedAction = action as Actions;

    if (!typedAction.type?.endsWith("/rejected")) {
      return result;
    }

    const rejectedAction = typedAction as ActionsRejected;

    if (
      rejectedAction.payload &&
      isAxiosError(rejectedAction.payload) &&
      isCriticalError(rejectedAction.payload)
    ) {
      store.dispatch({
        type: "error/setCritical",
        payload: rejectedAction.payload,
      });
    }

    return result;
  };
