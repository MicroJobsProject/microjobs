//DEPENDENCIES
import type { AppThunk } from ".";

//REACT
import type { Credentials } from "../pages/auth/types";

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

//Action Creator (Synchronized Actions)============================================================================================
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

export function authLogin(credentials: Credentials): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginFulfilled());
      console.log(router);
      const to = router.state.location.state?.from ?? "/";
      router.navigate(to, { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(authLoginRejected(error));
      }
      console.log(error);
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
| UiResetError;

// prettier-ignore
export type ActionsRejected = 
| AuthLoginRejected
