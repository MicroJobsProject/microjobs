//REDUX
import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;
export const getUi = (state: RootState) => state.ui;
export const getPagination = (state: RootState) => ({
  page: state.adverts.data.page,
  totalPages: state.adverts.data.totalPages,
});
export const getAdverts = (state: RootState) => state.adverts.data.results;
