//REACT
import type { Credentials } from "../pages/auth/types";

//REDUX
import {
  authRegister,
  authLogin,
  authLogout,
  uiResetError,
  advertsLoad,
  advertsCategories,
} from "./actions";
import { getIsLogged } from "./selectors";
import { useAppDispatch, useAppSelector } from ".";

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

export function useAdvertsLoadAction() {
  const dispatch = useAppDispatch();
  return function (params?: Record<string, string>) {
    return dispatch(advertsLoad(params));
  };
}

export function useAdvertsCategoriesAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(advertsCategories());
  };
}
