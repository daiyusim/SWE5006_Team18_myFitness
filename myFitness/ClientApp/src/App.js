import React, { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import { LoadingProvider } from "./components/shared/LoadingContext";
import MainContainer from "./components/MainContainer";
import NavHeader from "./components/NavHeader";
import NavFooter from "./components/NavFooter";
import Loader from "./components/shared/Loader";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

import { useMount } from "ahooks";
import { jwtDecode } from "jwt-decode";
import { isNull, isUndefined } from "lodash";
import "./custom.css";
import { SnackbarProvider } from "notistack";
import { BannerProvider } from "./components/Banner/BannerContext";
import Banner from "./components/Banner/Banner";
import CssBaseline from "@mui/material/CssBaseline";

/*import store from './Store/Store';*/
import { Grid, Box } from "@mui/material";
import { clearUserId, setUserId } from "./components/redux/appSlice.js";
import { useVerifyJWTMutation } from "./api/UserApi.js";
const App = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [
    verifyJWTPost,
    {
      isLoading: isVerifyJWTLoading,
      isSuccess: isVerifyJWTSuccess,
      isError: isVerifyJWTError,
      data: verifyJWTData,
    },
  ] = useVerifyJWTMutation();

  const isCookiesJWTValid = async () => {
    const token = cookies.jwt;
    var res = false;
    if (isNull(token) || isUndefined(token)) {
      return res;
    }
    await verifyJWTPost(token)
      .unwrap()
      .then((payload) => {
        res = payload;
      })
      .catch((error) => console.log(error));
    return res;
  };
  const setUserIDandCookies = async () => {
    if (await isCookiesJWTValid()) {
      const token = cookies.jwt;
      const jwtInfo = jwtDecode(token);
      dispatch(setUserId(jwtInfo.UserId));
      console.log("logged in");
    } else {
      dispatch(clearUserId());
      removeCookie();
    }
  };
  useEffect(() => {
    console.log(cookies);
    setUserIDandCookies();
  }, [cookies]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <BannerProvider>
            <LoadingProvider>
              <Banner />
              <Loader />
              <MainContainer item md={12} />
              <Grid item md={12} sx={{ backgroundColor: "#00272B" }}>
                <Box display="flex" flexDirection="column" position="relative">
                  <NavFooter />
                </Box>
              </Grid>
            </LoadingProvider>
          </BannerProvider>
        </SnackbarProvider>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
