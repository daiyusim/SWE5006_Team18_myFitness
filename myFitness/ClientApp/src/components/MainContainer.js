import React, { useState } from "react";
import { Grid } from "@mui/material";
import AppRoutes from "../routes/AppRoutes";
import { useSelector } from "react-redux";
import { getAppUserIdSelector } from "./redux/selector";
import { isEmpty, isNull, trim } from "lodash";

export const MainContainer = () => {
  const userId = useSelector(getAppUserIdSelector);
  const loggedIn = !(isNull(userId) || isEmpty(trim(userId)));
  return (
    <Grid
      container
      id="main-container"
      sx={{ marginTop: "0", marginBottom: "3rem" }}
    >
      {" "}
      {/* Ensure no top margin */}
      <Grid item md={12}>
        <Grid container sx={{ display: "block" }}>
          <AppRoutes />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainContainer;
