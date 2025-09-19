//NATIVE
import * as adverts from "../pages/advert/service";
import * as auth from "../pages/auth/service";
import storage from "../utils/storage";

//DEPENDENCIES
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";
import type { createBrowserRouter } from "react-router";
import * as thunk from "redux-thunk";
import type { ThunkDispatch } from "redux-thunk";

import type { Actions } from "./actions";
import * as reducers from "./reducer";

// Combination of reducers-------------------------------------------------------------------------------------------------------
const rootReducer = combineReducers(reducers);
type Router = ReturnType<typeof createBrowserRouter>;

export type ExtraArgument = {
  api: { auth: typeof auth; adverts: typeof adverts };
  router: Router;
  storage: typeof storage;
};

// @ts-expect-error: any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const failureRedirects = (router: Router) => (store) => (next) => (action) => {
  const result = next(action);
  if (!action.type.endsWith("/rejected")) {
    return result;
  }

  if (action.payload.status === 404) {
    router.navigate("/not-found");
  }

  if (action.payload.status === 401) {
    storage.clearAuth();
    router.navigate("/login");
  }

  if (action.payload.code === "ERR_NETWORK") {
    router.navigate("/internal-server-error");
  }

  return result;
};

// @ts-expect-error: any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sessionLogger = (store) => (next) => (action) => {
  const result = next(action);

  if (import.meta.env.DEV && action.type.includes("auth")) {
    console.log("Auth action:", action.type);
    console.log("Session state:", storage.getSessionInfo());
  }

  return result;
};

// Store configuration---------------------------------------------------------------------------------------------------------
export default function configureStore(
  preloadedState: Partial<reducers.State>,
  router: Router,
) {
  const initialState = {
    ...preloadedState,
    auth: storage.hasAuth(),
    ui: {
      pending: false,
      error: null,
      ...preloadedState.ui,
    },
  };

  const middlewares = [
    thunk.withExtraArgument<reducers.State, Actions, ExtraArgument>({
      api: { adverts, auth },
      router,
      storage,
    }),
    failureRedirects(router),
  ];

  if (import.meta.env.DEV) {
    middlewares.push(sessionLogger);
  }

  const store = createStore(
    rootReducer,
    initialState as never,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  return store;
}

// Types for TypeScript--------------------------------------------------------------------------------------------------------
export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;

export type AppDispatch = ThunkDispatch<RootState, ExtraArgument, Actions>;

// Custom and typed hooks------------------------------------------------------------------------------------------------------
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// AppThunk type for asynchronous actions---------------------------------------------------------------------------------------
export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;
