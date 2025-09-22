//DEPENDENCIES
import { useAppDispatch, useAppSelector } from ".";

//NATIVE
import type { Credentials } from "../pages/auth/types";
import {
  authRegister,
  authLogin,
  authLogoutThunk,
  uiResetError,
  authInitializeFromStorage,
  errorClearCritical,
} from "./actions";
import { getCriticalError, getIsLogged } from "./selectors";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

export function useRegisterAction() {
  const dispatch = useAppDispatch();
  return function (credentials: {
    username: string;
    email: string;
    password: string;
  }) {
    return dispatch(authRegister(credentials));
  };
}

export function useLoginAction() {
  const dispatch = useAppDispatch();
  return function (credentials: Credentials & { rememberMe?: boolean }) {
    return dispatch(authLogin(credentials));
  };
}

export function useLogoutAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLogoutThunk());
  };
}

export function useUiResetError() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(uiResetError());
  };
}

export function useInitializeAuth() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authInitializeFromStorage());
  };
}

export function useCriticalError() {
  return useAppSelector(getCriticalError);
}

export function useClearCriticalError() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(errorClearCritical());
  };
}
