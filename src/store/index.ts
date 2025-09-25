//DEPENDENCIES
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";
import type { createBrowserRouter } from "react-router";
import * as thunk from "redux-thunk";
import type { ThunkDispatch } from "redux-thunk";

//NATIVE
import type { Actions } from "./actions";
import * as reducers from "./reducer";

import * as adverts from "../pages/advert/service";
import * as auth from "../pages/auth/service";
import storage from "../utils/storage";
import { getErrorMessage } from "../utils/errorMessages";

// Combination of reducers-------------------------------------------------------------------------------------------------------
const rootReducer = combineReducers(reducers);
type Router = ReturnType<typeof createBrowserRouter>;

export type ExtraArgument = {
  api: { auth: typeof auth; adverts: typeof adverts };
  router: Router;
  storage: typeof storage;
};

// @ts-expect-error: any
const errorMiddleware = () => (store) => (next) => (action) => {
  const result = next(action);

  if (!action.type.endsWith("/rejected")) {
    return result;
  }

  const status = action.payload?.response?.status;
  const errorMessage =
    action.payload?.response?.data?.error ||
    action.payload?.message ||
    getErrorMessage(status);

  console.log("Error middleware:", {
    status,
    errorMessage,
    payload: action.payload,
  });

  if (status === 500 || status === 503) {
    const error = {
      id: Date.now().toString(),
      code: status,
      message: errorMessage,
      timestamp: new Date().toISOString(),
    };
    store.dispatch({
      type: "error/setCritical",
      payload: error,
    });
    return result;
  }

  return result;
};

// @ts-expect-error: any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sessionLogger = (store) => (next) => (action) => {
  const result = next(action);

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
    errorMiddleware(),
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
