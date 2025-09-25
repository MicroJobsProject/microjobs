//REDUX
import { createSelector } from "reselect";
import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;
export const getUi = (state: RootState) => state.ui;
export const getPagination = createSelector(
  (state: RootState) => state.adverts.data.page,
  (state: RootState) => state.adverts.data.totalPages,
  (page, totalPages) => ({ page, totalPages }),
);
export const getAdverts = (state: RootState) => state.adverts.data.results;
export const getAdvertsCategories = (state: RootState) => state.categories;
