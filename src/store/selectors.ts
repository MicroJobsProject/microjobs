//DEPENDENCIES
import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;
export const getUi = (state: RootState) => state.ui;
export const getCriticalError = (state: RootState) => state.error.criticalError;
