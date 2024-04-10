import { createSelector } from "@reduxjs/toolkit";

export const AppSelector = (state) => {
  return state.App;
};

export const getAppUserIdSelector = createSelector(
  AppSelector,
  (state) => state.userId
);
export const getAppRoleTypeSelector = createSelector(
  AppSelector,
  (state) => state.roleType
);
