//DEPENDENCIES
import type { AxiosError } from "axios";

//NATIVE
import type { User } from "../pages/user/types";
import type { AdvertCategory, AdvertResponse } from "../pages/advert/types";
import { type Actions, type ActionsRejected } from "./actions";

//ERROR STATE TYPE=====================================================================================
export interface ErrorState {
  criticalError: AxiosError | null;
}

export type State = {
  auth: boolean;
  ui: {
    pending: boolean;
    error: Error | null;
  };
  adverts: { loaded: boolean; data: AdvertResponse };
  categories: AdvertCategory[];
  user: {
    data: User | null;
    loaded: boolean;
  };
  userStats: {
    advertCount: number;
    loaded: boolean;
  };
  error: ErrorState;
};

const defaultState: State = {
  auth: false,
  ui: {
    pending: false,
    error: null,
  },
  adverts: {
    loaded: false,
    data: { results: [], total: 0, page: 1, totalAdverts: 0, totalPages: 1 },
  },
  categories: [],
  user: {
    data: null,
    loaded: false,
  },
  userStats: {
    advertCount: 0,
    loaded: false,
  },
  error: { criticalError: null },
};

//REDUCERS===================================================================================================
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

export function user(
  state = defaultState.user,
  action: Actions,
): State["user"] {
  switch (action.type) {
    case "user/load/fulfilled":
    case "user/update/fulfilled":
      return { ...state, loaded: true, data: action.payload };
    case "auth/logout":
      return { data: null, loaded: false };
    default:
      return state;
  }
}

export function userStats(
  state = defaultState.userStats,
  action: Actions,
): State["userStats"] {
  switch (action.type) {
    case "user/stats/fulfilled":
      return { loaded: true, advertCount: action.payload.advertCount };
    case "auth/logout":
      return { advertCount: 0, loaded: false };
    default:
      return state;
  }
}

export function adverts(
  state = defaultState.adverts,
  action: Actions,
): State["adverts"] {
  if (action.type === "adverts/load/fulfilled") {
    return { ...state, loaded: true, data: action.payload };
  }
  return state;
}

export function categories(
  state = defaultState.categories,
  action: Actions,
): State["categories"] {
  if (action.type === "adverts/categories/fulfilled") {
    return action.payload;
  }
  return state;
}

//ERROR HANDLING============================================================================================
const defaultErrorState: ErrorState = {
  criticalError: null,
};

function isRejectedAction(action: Actions): action is ActionsRejected {
  return action.type.endsWith("/rejected");
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  if (
    action.type === "auth/login/pending" ||
    action.type === "auth/register/pending" ||
    action.type === "user/load/pending" ||
    action.type === "user/update/pending" ||
    action.type === "user/stats/pending" ||
    action.type === "adverts/load/pending"
  ) {
    return { pending: true, error: null };
  }
  if (
    action.type === "auth/login/fulfilled" ||
    action.type === "auth/register/fulfilled" ||
    action.type === "user/load/fulfilled" ||
    action.type === "user/update/fulfilled" ||
    action.type === "user/stats/fulfilled" ||
    action.type === "adverts/load/fulfilled"
  ) {
    return { pending: false, error: null };
  }
  if (isRejectedAction(action)) {
    return { pending: false, error: action.payload };
  }
  if (action.type === "ui/reset-error") {
    return { ...state, error: null };
  }
  if (action.type === "error/setCritical") {
    return { pending: false, error: null };
  }
  return state;
}

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
