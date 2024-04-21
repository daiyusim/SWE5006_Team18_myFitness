import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RouteGuard from "./RouteGuard";
import EventManagementMain from "../components/Event/EventManagementMain";
import { BaseRoutes } from "../components/helper/Routing";
import EventForm from "../components/Event/EventForm";
import UserProfile from "../components/Profile/UserProfile";
import WorkoutMain from "../components/Workout/WorkoutMain";
import AttendanceMain from "../components/Attendance/AttendanceMain";
import Login from "../components/Scenes/Login";
import Register from "../components/Scenes/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={BaseRoutes.Login}
        element={<RouteGuard element={<Login />} isLoginPage={true} />}
      />
      <Route
        path={BaseRoutes.Register}
        element={<RouteGuard element={<Register />} isRegisterPage={true}/>}
      />
      <Route
        path={BaseRoutes.Event}
        element={<RouteGuard element={<EventManagementMain />} />}
      />
      <Route
        path={BaseRoutes.Event + "/:id"}
        element={<RouteGuard element={<EventForm />} />}
      />
      <Route
        path={BaseRoutes.Event + "/add"}
        element={<RouteGuard element={<EventForm />} />}
      />
      <Route
        path={BaseRoutes.Profile}
        element={<RouteGuard element={<UserProfile />} />}
      />
      <Route
        path={BaseRoutes.Workout}
        element={<RouteGuard element={<WorkoutMain />} />}
      />
      <Route
        path={BaseRoutes.Attendance}
        element={<RouteGuard element={<AttendanceMain />} />}
      />
      {/* <Route
        path={BaseRoutes.Register}
        element={<RouteGuard element={<Register />} />}
      /> */}
      ;
      <Route
              path={"*"}
              element={<RouteGuard element={<WorkoutMain />} />}
      />
      ;
    </Routes>
  );
};
export default AppRoutes;
