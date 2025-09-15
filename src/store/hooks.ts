//REACT
import type { Credentials } from "../pages/auth/types";

//REDUX
import { authLogin, authLogout, uiResetError } from "./actions";
import { getIsLogged } from "./selectors";
import { useAppDispatch, useAppSelector } from ".";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

export function useLoginAction() {
  const dispatch = useAppDispatch();
  return function (credentials: Credentials) {
    return dispatch(authLogin(credentials));
  };
}

export function useLogoutAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(authLogout());
  };
}

export function useUiResetError() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(uiResetError());
  };
}
