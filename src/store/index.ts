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
import { errorMiddleware } from "./error-middleware";

// ROOT REDUCER...........................................................
const rootReducer = combineReducers(reducers);

// MIDDLEWARES
// @ts-expect-error: any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sessionLogger = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};

// TYPES...................................................................
export type Router = ReturnType<typeof createBrowserRouter>;

export type ExtraArgument = {
  api: {
    auth: typeof auth;
    adverts: typeof adverts;
    profile: typeof profile;
  };
  router: Router;
  storage: typeof storage;
};
export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, ExtraArgument, Actions>;
export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;

// STORE CONFIGURATION..........................................................
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
      successMessage: null,
      ...preloadedState.ui,
    },
    error: {
      criticalError: null,
      ...preloadedState.error,
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

// TYPED HOOKS...................................................................
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
