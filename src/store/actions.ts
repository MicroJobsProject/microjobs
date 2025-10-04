//DEPENDENCIES
import type { AppThunk } from ".";
import type { AxiosError } from "axios";
import axios from "axios";

//NATIVE
import type { Credentials } from "../pages/auth/types";
import type { User, UpdateProfileData, UserStats } from "../pages/user/types";
import type {
  Advert,
  AdvertData,
  AdvertCategory,
  AdvertResponse,
} from "../pages/advert/types";

// ACTION TYPES===============================================================================================================
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

// FORGOT PASSWORD.................................

type AuthForgotPasswordPending = {
  type: "auth/forgotPassword/pending";
};

type AuthForgotPasswordFulfilled = {
  type: "auth/forgotPassword/fulfilled";
  payload: { message: string };
};

type AuthForgotPasswordRejected = {
  type: "auth/forgotPassword/rejected";
  payload: Error;
};

type AuthResetPasswordPending = {
  type: "auth/resetPassword/pending";
};

type AuthResetPasswordFulfilled = {
  type: "auth/resetPassword/fulfilled";
};

type AuthResetPasswordRejected = {
  type: "auth/resetPassword/rejected";
  payload: Error;
};

// USER............................................
type UserLoadPending = {
  type: "user/load/pending";
};

type UserLoadFulfilled = {
  type: "user/load/fulfilled";
  payload: User;
};

type UserLoadRejected = {
  type: "user/load/rejected";
  payload: Error;
};

type UserUpdatePending = {
  type: "user/update/pending";
};

type UserUpdateFulfilled = {
  type: "user/update/fulfilled";
  payload: User;
};

type UserUpdateRejected = {
  type: "user/update/rejected";
  payload: Error;
};

type UserStatsLoadPending = {
  type: "user/stats/pending";
};

type UserStatsLoadFulfilled = {
  type: "user/stats/fulfilled";
  payload: UserStats;
};

type UserStatsLoadRejected = {
  type: "user/stats/rejected";
  payload: Error;
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

//ACTION CREATORS (Synchronized Actions)============================================================================================
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

// FORGOT PASSWORD.................................
export const authForgotPasswordPending = (): AuthForgotPasswordPending => ({
  type: "auth/forgotPassword/pending",
});

export const authForgotPasswordFulfilled = (
  message: string,
): AuthForgotPasswordFulfilled => ({
  type: "auth/forgotPassword/fulfilled",
  payload: { message },
});

export const authForgotPasswordRejected = (
  error: Error,
): AuthForgotPasswordRejected => ({
  type: "auth/forgotPassword/rejected",
  payload: error,
});

export const authResetPasswordPending = (): AuthResetPasswordPending => ({
  type: "auth/resetPassword/pending",
});

export const authResetPasswordFulfilled = (): AuthResetPasswordFulfilled => ({
  type: "auth/resetPassword/fulfilled",
});

export const authResetPasswordRejected = (
  error: Error,
): AuthResetPasswordRejected => ({
  type: "auth/resetPassword/rejected",
  payload: error,
});

// USER............................................
export const userLoadPending = (): UserLoadPending => ({
  type: "user/load/pending",
});

export const userLoadFulfilled = (user: User): UserLoadFulfilled => ({
  type: "user/load/fulfilled",
  payload: user,
});

export const userLoadRejected = (error: Error): UserLoadRejected => ({
  type: "user/load/rejected",
  payload: error,
});

export const userUpdatePending = (): UserUpdatePending => ({
  type: "user/update/pending",
});

export const userUpdateFulfilled = (user: User): UserUpdateFulfilled => ({
  type: "user/update/fulfilled",
  payload: user,
});

export const userUpdateRejected = (error: Error): UserUpdateRejected => ({
  type: "user/update/rejected",
  payload: error,
});

export const userStatsLoadPending = (): UserStatsLoadPending => ({
  type: "user/stats/pending",
});

export const userStatsLoadFulfilled = (
  stats: UserStats,
): UserStatsLoadFulfilled => ({
  type: "user/stats/fulfilled",
  payload: stats,
});

export const userStatsLoadRejected = (error: Error): UserStatsLoadRejected => ({
  type: "user/stats/rejected",
  payload: error,
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
//ADVERTS (create)...................................
export const advertsCreatedFulfilled = (
  advert: Advert,
): AdvertsCreatedFulfilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export const advertsCreatedRejected = (
  error: Error,
): AdvertsCreatedRejected => ({
  type: "adverts/created/rejected",
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

//THUNKS (Asynchronous Actions)================================================================================================
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
      if (axios.isAxiosError(error)) {
        dispatch(authRegisterRejected(error));
      } else if (error instanceof Error) {
        dispatch(authRegisterRejected(error));
      }
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
      } else if (error instanceof Error) {
        dispatch(authLoginRejected(error));
      }
    }
  };
}

export function authLogoutThunk(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, storage }) {
    try {
      await api.auth.logout();
      dispatch(authLogout());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      storage.clearAuth();
      dispatch(authLogout());
    }
  };
}

// FORGOT PASSWORD.................................
export function authForgotPassword(email: string): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    dispatch(authForgotPasswordPending());
    try {
      const response = await api.auth.forgotPassword(email);
      dispatch(authForgotPasswordFulfilled(response.message));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(authForgotPasswordRejected(error));
      } else if (error instanceof Error) {
        dispatch(authForgotPasswordRejected(error));
      }
    }
  };
}

export function authResetPassword(
  token: string,
  password: string,
): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authResetPasswordPending());
    try {
      const response = await api.auth.resetPassword(token, password);

      if (response.accessToken) {
        dispatch(authResetPasswordFulfilled());
        setTimeout(() => {
          dispatch(authLoginFulfilled());
          router.navigate("/", { replace: true });
        }, 2500);
      } else {
        dispatch(authResetPasswordFulfilled());
        router.navigate("/login", { replace: true });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(authResetPasswordRejected(error));
      } else if (error instanceof Error) {
        dispatch(authResetPasswordRejected(error));
      }
    }
  };
}

// USER............................................
export function userLoad(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    dispatch(userLoadPending());
    try {
      const user = await api.profile.getProfile();
      dispatch(userLoadFulfilled(user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(userLoadRejected(error));
      } else if (error instanceof Error) {
        dispatch(userLoadRejected(error));
      }
    }
  };
}

export function userUpdate(
  profileData: UpdateProfileData,
): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    dispatch(userUpdatePending());
    try {
      const user = await api.profile.updateProfile(profileData);
      dispatch(userUpdateFulfilled(user));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(userUpdateRejected(error));
      } else if (error instanceof Error) {
        dispatch(userUpdateRejected(error));
      }
    }
  };
}

export function userStatsLoad(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    dispatch(userStatsLoadPending());
    try {
      const stats = await api.profile.getUserStats();
      dispatch(userStatsLoadFulfilled(stats));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(userStatsLoadRejected(error));
      } else if (error instanceof Error) {
        dispatch(userStatsLoadRejected(error));
      }
    }
  };
}

//ADVERTS (Load)...................................
export function advertsLoad(
  params?: Record<string, string>,
): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    dispatch(advertsLoadPending());
    try {
      const adverts = await api.adverts.getAdverts(params);
      dispatch(advertsLoadFulfilled(adverts));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(advertsLoadRejected(error));
      } else if (error instanceof Error) {
        dispatch(advertsLoadRejected(error));
      }
    }
  };
}

//ADVERTS (Categories)...................................
export function advertsCategories(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    dispatch(advertsCategoriesPending());
    try {
      const categories = await api.adverts.getAdvertsCategories();
      dispatch(advertsCategoriesFulfilled(categories));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(advertsCategoriesRejected(error));
      } else if (error instanceof Error) {
        dispatch(advertsCategoriesRejected(error));
      }
    }
  };
}

//ADVERTS (create)...................................
export function advertsCreate(
  newAdvertData: AdvertData,
): AppThunk<Promise<Advert | undefined>> {
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
      if (axios.isAxiosError(error)) {
        dispatch(advertsCreatedRejected(error));
      } else if (error instanceof Error) {
        dispatch(advertsCreatedRejected(error));
      }
      return undefined;
    }
  };
}

// INITIALIZE AUTH STATE FROM STORAGE (Local or Session)
export function authInitializeFromStorage(): AppThunk<void> {
  return function (dispatch, _getState, { storage }) {
    const hasAuth = storage.hasAuth();
    if (hasAuth) {
      dispatch(authLoginFulfilled());
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
| AuthForgotPasswordPending
| AuthForgotPasswordFulfilled
| AuthForgotPasswordRejected
| AuthResetPasswordPending
| AuthResetPasswordFulfilled
| AuthResetPasswordRejected
| UserLoadPending
| UserLoadFulfilled
| UserLoadRejected
| UserUpdatePending
| UserUpdateFulfilled
| UserUpdateRejected
| UserStatsLoadPending
| UserStatsLoadFulfilled
| UserStatsLoadRejected
| UiResetError
| ErrorSetCritical
| ErrorClearCritical
| AdvertsLoadPending
| AdvertsLoadFulfilled
| AdvertsLoadRejected
| AdvertsCreatedFulfilled
| AdvertsCreatedRejected
| AdvertsCategoriesPending
| AdvertsCategoriesFulfilled
| AdvertsCategoriesRejected
| AdvertsCreatedFulfilled
| AdvertsCreatedRejected;

// prettier-ignore
export type ActionsRejected = 
| AuthRegisterRejected
| AuthLoginRejected
| AuthForgotPasswordRejected
| AuthResetPasswordRejected
| UserLoadRejected
| UserUpdateRejected
| UserStatsLoadRejected
| AdvertsLoadRejected
| AdvertsCreatedRejected
| AdvertsCategoriesRejected
| AdvertsCreatedRejected;

// prettier-ignore
export type ErrorActions =
| UiResetError
| ErrorSetCritical
| ErrorClearCritical;
