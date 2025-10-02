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
import * as auth from "../pages/auth/service";
import * as profile from "../pages/user/service";
import * as adverts from "../pages/advert/service";
import storage from "../utils/storage";

const rootReducer = combineReducers(reducers);

// @ts-expect-error: any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sessionLogger = (store) => (next) => (action) => {
  const result = next(action);

  return result;
};

// @ts-expect-error: any
const errorMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (!action.type.endsWith("/rejected")) {
    return result;
  }

  const error = action.payload;
  const status = error?.response?.status || error?.status;

  if (status === 500 || status === 503) {
    store.dispatch({
      type: "error/setCritical",
      payload: error,
    });
  }

  return result;
};

type Router = ReturnType<typeof createBrowserRouter>;

// Extra argument for thunks------------------------------------------------------------------------------------------------------
export type ExtraArgument = {
  api: {
    auth: typeof auth;
    adverts: typeof adverts;
    profile: typeof profile;
  };
  router: Router;
  storage: typeof storage;
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
      api: { adverts, auth, profile },
      router,
      storage,
    }),
    errorMiddleware,
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
export type RootState = ReturnType<typeof rootReducer>;

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
