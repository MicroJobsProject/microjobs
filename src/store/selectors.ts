//REDUX
import { createSelector } from "reselect";
import type { RootState } from ".";

// AUTH..........................................................
export const getIsLogged = (state: RootState) => state.auth;

// USER............................................................
export const getUser = (state: RootState) => state.user.data;
export const getUserLoaded = (state: RootState) => state.user.loaded;
export const getUserStats = (state: RootState) => state.userStats;

// ADVERTS.......................................................
export const getAdverts = (state: RootState) => state.adverts.data.results;

export const getPagination = createSelector(
  (state: RootState) => state.adverts.data.page,
  (state: RootState) => state.adverts.data.totalPages,
  (page, totalPages) => ({ page, totalPages }),
);

// CATEGORIES...................................................
export const getAdvertsCategories = (state: RootState) => state.categories;

// UI.............................................................
export const getUi = (state: RootState) => state.ui;

// ERROR.........................................................
export const getCriticalError = (state: RootState) => {
  return state.error?.criticalError;
};
