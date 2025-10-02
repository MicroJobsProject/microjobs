//DEPENDENCIES
import { useAppDispatch, useAppSelector } from ".";

//NATIVE
import type { Credentials } from "../pages/auth/types";
import type { UpdateProfileData } from "../pages/user/types";

import {
  authRegister,
  authLogin,
  authLogoutThunk,
  userLoad,
  userUpdate,
  userStatsLoad,
  uiResetError,
  errorClearCritical,
  advertsLoad,
  advertsCategories,
} from "./actions";
import {
  getCriticalError,
  getIsLogged,
  getUser,
  getUserLoaded,
  getUserStats,
} from "./selectors";

export function useAuth() {
  return useAppSelector(getIsLogged);
}

// AUTH............................................
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

// USER............................................
export function useUser() {
  return useAppSelector(getUser);
}

export function useUserLoaded() {
  return useAppSelector(getUserLoaded);
}

export function useUserLoadAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(userLoad());
  };
}

export function useUserUpdateAction() {
  const dispatch = useAppDispatch();
  return function (profileData: UpdateProfileData) {
    return dispatch(userUpdate(profileData));
  };
}

export function useUserStats() {
  return useAppSelector(getUserStats);
}

export function useUserStatsLoadAction() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(userStatsLoad());
  };
}

// ADVERTS............................................
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

// UI............................................
export function useUiResetError() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(uiResetError());
  };
}

// ERROR............................................
export function useCriticalError() {
  return useAppSelector(getCriticalError);
}

export function useClearCriticalError() {
  const dispatch = useAppDispatch();
  return function () {
    return dispatch(errorClearCritical());
  };
}
