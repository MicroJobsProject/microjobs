//DEPENDENCIES
import type { AppThunk } from ".";
import type { AxiosError } from "axios";
import axios from "axios";

//NATIVE
import type { Credentials } from "../pages/auth/types";
import type {
  Advert,
  AdvertData,
  AdvertCategory,
  AdvertResponse,
} from "../pages/advert/types";

//Action Types================================================================================================================
// AUTH............................................
type AuthRegisterPending = {
  type: "auth/register/pending";
};

type AuthRegisterFulfilled = {
  type: "auth/register/fulfilled";
};

type AuthRegisterRejected = {
  type: "auth/register/rejected";
  payload: Error;
};

type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
};

type AuthLogout = {
  type: "auth/logout";
};

// UI..............................................
type UiResetError = {
  type: "ui/reset-error";
};

// ERROR............................................
type ErrorSetCritical = {
  type: "error/setCritical";
  payload: AxiosError;
};

type ErrorClearCritical = {
  type: "error/clearCritical";
};

//ADVERTS (Load)...................................
type AdvertsLoadPending = {
  type: "adverts/load/pending";
};

type AdvertsLoadFulfilled = {
  type: "adverts/load/fulfilled";
  payload: AdvertResponse;
};

type AdvertsLoadRejected = {
  type: "adverts/load/rejected";
  payload: Error;
};

//ADVERTS (create)...................................
type AdvertsCreatedFulfilled = {
  type: "adverts/created/fulfilled";
  payload: Advert;
};

type AdvertsCreatedRejected = {
  type: "adverts/created/rejected";
  payload: Error;
};

//ADVERTS (Categories)...................................

type AdvertsCategoriesPending = {
  type: "adverts/categories/pending";
};

type AdvertsCategoriesFulfilled = {
  type: "adverts/categories/fulfilled";
  payload: AdvertCategory[];
};

type AdvertsCategoriesRejected = {
  type: "adverts/categories/rejected";
  payload: Error;
};

//Action Creators (Synchronized Actions)============================================================================================
// AUTH............................................
export const authRegisterPending = (): AuthRegisterPending => ({
  type: "auth/register/pending",
});

export const authRegisterFulfilled = (): AuthRegisterFulfilled => ({
  type: "auth/register/fulfilled",
});

export const authRegisterRejected = (error: Error): AuthRegisterRejected => ({
  type: "auth/register/rejected",
  payload: error,
});

export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

// UI..............................................
export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

// ERROR............................................
export const errorSetCritical = (error: AxiosError): ErrorSetCritical => ({
  type: "error/setCritical",
  payload: error,
});

export const errorClearCritical = (): ErrorClearCritical => ({
  type: "error/clearCritical",
});

//ADVERTS (Load)...................................
export const advertsLoadPending = (): AdvertsLoadPending => ({
  type: "adverts/load/pending",
});

export const advertsLoadFulfilled = (
  adverts: AdvertResponse,
): AdvertsLoadFulfilled => ({
  type: "adverts/load/fulfilled",
  payload: adverts,
});

export const advertsLoadRejected = (error: Error): AdvertsLoadRejected => ({
  type: "adverts/load/rejected",
  payload: error,
});

//ADVERTS (Categories)...................................
export const advertsCategoriesPending = (): AdvertsCategoriesPending => ({
  type: "adverts/categories/pending",
});

export const advertsCategoriesFulfilled = (
  categories: AdvertCategory[],
): AdvertsCategoriesFulfilled => ({
  type: "adverts/categories/fulfilled",
  payload: categories,
});

export const advertsCategoriesRejected = (
  error: Error,
): AdvertsCategoriesRejected => ({
  type: "adverts/categories/rejected",
  payload: error,
});

//Thunks (Asynchronous Actions)================================================================================================
// AUTH............................................
export function authRegister(credentials: {
  username: string;
  email: string;
  password: string;
}): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authRegisterPending());
    try {
      await api.auth.register(credentials);
      dispatch(authRegisterFulfilled());
      router.navigate("/", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(authRegisterRejected(error));
      }
      throw error;
    }
  };
}

export function authLogin(
  credentials: Credentials & { rememberMe?: boolean },
): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());
    try {
      const { email, password, rememberMe = false } = credentials;

      await api.auth.login({ email, password }, rememberMe);
      dispatch(authLoginFulfilled());
      router.navigate("/", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(authLoginRejected(error));
      }
      /* throw error; */
    }
  };
}

export function authLogoutThunk(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, storage }) {
    try {
      await api.auth.logout();

      dispatch(authLogout());
    } catch (error: unknown) {
      storage.clearAuth();
      dispatch(authLogout());
      throw error;
    }
  };
}

export function authInitializeFromStorage(): AppThunk<void> {
  return function (dispatch, _getState, { storage }) {
    const hasAuth = storage.hasAuth();

    if (hasAuth) {
      dispatch(authLoginFulfilled());
    }
  };
}

//ADVERTS (Load)...................................
export function advertsLoad(
  params?: Record<string, string>,
): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    try {
      dispatch(advertsLoadPending());
      const adverts = await api.adverts.getAdverts(params);
      dispatch(advertsLoadFulfilled(adverts));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(advertsLoadRejected(error));
      }
      throw error;
    }
  };
}

//ADVERTS (Categories)...................................

export function advertsCategories(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    try {
      dispatch(advertsCategoriesPending());
      const categories = await api.adverts.getAdvertsCategories();
      dispatch(advertsCategoriesFulfilled(categories));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(advertsCategoriesRejected(error));
      }
      throw error;
    }
  };
}

//ADVERTS (create)...................................
export function advertsCreate(
  newAdvertData: AdvertData,
): AppThunk<Promise<Advert>> {
  return async function (dispatch, _getState, { api /*router*/ }) {
    try {
      // Manage advertsCreatePending
      const createdAdvert = await api.adverts.createAdvert(newAdvertData);

      //TODO: navigate to advertDetail
      // const advert = await api.adverts.getAdvert(createdAdvert.id.toString());
      // dispatch(advertsCreatedFulfilled(advert));
      // router.navigate(`/adverts/${createdAdvert.id}`);
      return createdAdvert.data; //advert;
    } catch (error) {
      // Manage advertsCreateRejected
      if (error instanceof Error) {
        console.log(error);
        dispatch(advertsCreatedRejected(error));
      }
      throw error;
    }
  };
}
// prettier-ignore
export type Actions = 
| AuthRegisterPending
| AuthRegisterFulfilled
| AuthRegisterRejected
| AuthLoginPending 
| AuthLoginFulfilled 
| AuthLoginRejected 
| AuthLogout
| UiResetError
| ErrorSetCritical
| ErrorClearCritical
| AdvertsLoadPending
| AdvertsLoadFulfilled
| AdvertsLoadRejected
| AdvertsCategoriesPending
| AdvertsCategoriesFulfilled
| AdvertsCategoriesRejected

// prettier-ignore
export type ActionsRejected = 
| AuthLoginRejected
| AdvertsLoadRejected
| AdvertsCategoriesRejected
