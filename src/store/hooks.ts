//DEPENDENCIES
import { useAppDispatch, useAppSelector } from ".";

//NATIVE
import type { Credentials } from "../pages/auth/types";
import type { UpdateProfileData } from "../pages/user/types";

import {
  contactSend,
  authRegister,
  authLogin,
  authLogoutThunk,
  authForgotPassword,
  authResetPassword,
  userLoad,
  userUpdate,
  userStatsLoad,
  uiResetError,
  errorClearCritical,
  advertsLoad,
  advertsCategories,
  advertDelete,
  advertsDeleteMultiple,
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

export function useForgotPasswordAction() {
  const dispatch = useAppDispatch();
  return function (email: string) {
    return dispatch(authForgotPassword(email));
  };
}

export function useResetPasswordAction() {
  const dispatch = useAppDispatch();
  return function (token: string, password: string) {
    return dispatch(authResetPassword(token, password));
  };
}

export function useSuccessMessage() {
  return useAppSelector((state) => state.ui.successMessage);
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

export function useAdvertDeleteAction() {
  const dispatch = useAppDispatch();
  return function (advertId: string) {
    return dispatch(advertDelete(advertId));
  };
}

export function useAdvertsDeleteMultipleAction() {
  const dispatch = useAppDispatch();
  return function (advertIds: string[]) {
    return dispatch(advertsDeleteMultiple(advertIds));
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

// CONTACT.........................................
export function useContactSendAction() {
  const dispatch = useAppDispatch();
  return (
    advertId: string,
    data: {
      senderName: string;
      senderEmail: string;
      message: string;
      username?: string;
    },
  ) => dispatch(contactSend(advertId, data));
}
