import React from "react";
import { Navigate } from "react-router-dom";
import { isEmpty, isNull, trim } from "lodash";
import { useSelector } from "react-redux";
import { getAppUserIdSelector } from "../components/redux/selector";
import { BaseRoutes } from "../components/helper/Routing";
import ProtectedPage from "../components/ProtectedPage";

const RouteGuard = ({ element, path, isLoginPage, isRegisterPage, ...rest }) => {
  const userId = useSelector(getAppUserIdSelector);
  const loggedIn = !(isNull(userId) || isEmpty(trim(userId)));

  const isLoginOrRegisterPage = isLoginPage || isRegisterPage;
  if (!loggedIn) {
    if (isLoginOrRegisterPage === true) {
      return element;
    } else {
      return <Navigate to={BaseRoutes.Login} />;
    }
  }
  if (isLoginOrRegisterPage) {
    return <Navigate to={"/"} />;
  }
  return <ProtectedPage protectedElement={element} />;
};
export default RouteGuard;
