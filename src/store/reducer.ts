//NATIVE
import { type Actions, type ActionsRejected } from "./actions";

export interface ErrorState {
  criticalError: {
    id: string;
    code: number | string;
    message: string;
    timestamp: string;
  } | null;
}

export type State = {
  auth: boolean;
  ui: {
    pending: boolean;
    error: Error | null;
  };
  error: ErrorState;
};

const defaultState: State = {
  auth: false,
  ui: {
    pending: false,
    error: null,
  },
  error: { criticalError: null },
};

export function auth(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login/fulfilled":
    case "auth/register/fulfilled":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

function isRejectedAction(action: Actions): action is ActionsRejected {
  return action.type.endsWith("/rejected");
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  if (
    action.type === "auth/login/pending" ||
    action.type === "auth/register/pending"
  ) {
    return { pending: true, error: null };
  }
  if (
    action.type === "auth/login/fulfilled" ||
    action.type === "auth/register/fulfilled"
  ) {
    return { pending: false, error: null };
  }
  if (isRejectedAction(action)) {
    return { pending: false, error: action.payload };
  }
  if (action.type === "ui/reset-error") {
    return { ...state, error: null };
  }
  return state;
}

export interface ErrorState {
  criticalError: {
    id: string;
    code: number | string;
    message: string;
    timestamp: string;
  } | null;
}

const defaultErrorState: ErrorState = {
  criticalError: null,
};

export function error(state = defaultErrorState, action: Actions): ErrorState {
  switch (action.type) {
    case "error/setCritical":
      return {
        ...state,
        criticalError: action.payload,
      };
    case "error/clearCritical":
      return {
        ...state,
        criticalError: null,
      };
    default:
      return state;
  }
}
