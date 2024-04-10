import React, { useState } from "react";
import { Grid } from "@mui/material";
import NavMenu from "./NavMenu";
import EventManagementMain from "./Event/EventManagementMain";
import EventForm from "./Event/EventForm";
import WorkoutMain from "./Workout/WorkoutMain";
import UserProfile from "./Profile/UserProfile";
import AttendanceMain from "./Attendance/AttendanceMain";
import Login from "./Login";
import { BaseRoutes } from "./helper/Routing";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";
import { useSelector } from "react-redux";
import { getAppUserIdSelector } from "./redux/selector";
import { isEmpty, isNull, trim } from "lodash";

export const MainContainer = () => {
  const userId = useSelector(getAppUserIdSelector);
  console.log("MainContainer" + userId);
  const loggedIn = !(isNull(userId) || isEmpty(trim(userId)));
  console.log("MainContainer" + loggedIn);
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
