import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js'
import { LoadingProvider } from './components/shared/LoadingContext';
import MainContainer from './components/MainContainer';
import NavHeader from './components/NavHeader';
import NavFooter from './components/NavFooter';
import Loader from './components/shared/Loader';
import { Provider } from 'react-redux';
import './custom.css'
import { SnackbarProvider } from "notistack";
import { BannerProvider } from './components/Banner/BannerContext';
import Banner from './components/Banner/Banner';
import CssBaseline from '@mui/material/CssBaseline';

/*import store from './Store/Store';*/
import { Grid, Box } from "@mui/material";
//import { CookiesProvider, useCookies } from 'react-cookies'
const App = () => {
    //const [cookies, setCookies, removeCookie] = useCookies(['user'])
    function handleLogin(user) {
        var expiryDate = new Date().getDate() + 1
        //setCookies('user', user, {
        //    path: '/',
        //    expires: expiryDate,
        //    httpOnly: true
        //})
    }

    function checkCookies() {
        // get cookies and decode

    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline >
                <SnackbarProvider maxSnack={3}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}>
                    <BannerProvider>
                        <LoadingProvider>
                            <Banner />
                            <Loader />
                            <Grid item md={12} className="nav-header"><NavHeader /></Grid>
                            <MainContainer item md={12} />
                            <Grid item md={12} sx={{ backgroundColor: '#00272B' }}>
                                <Box display="flex" flexDirection="column" position="relative">
                                    <NavFooter /></Box></Grid>
                        </LoadingProvider>
                    </BannerProvider>
                </SnackbarProvider>
            </CssBaseline >
        </ThemeProvider>

    )
}

export default App; 