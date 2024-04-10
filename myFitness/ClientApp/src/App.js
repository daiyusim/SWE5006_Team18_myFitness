import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js'
import { LoadingProvider } from './components/shared/LoadingContext';
import MainContainer from './components/MainContainer';
import NavHeader from './components/NavHeader';
import NavFooter from './components/NavFooter';
import Loader from './components/shared/Loader';
import './custom.css'
import { SnackbarProvider } from "notistack";
import { BannerProvider } from './components/Banner/BannerContext';
import Banner from './components/Banner/Banner';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { Grid, Box } from "@mui/material";
const App = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleLogout = () => {
        navigate('/');
        setAuthenticationToken(false);
        setAnchorEl(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('roleType');
    }
    const [authenticationToken, setAuthenticationToken] = useState(false);

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
                            <Grid item md={12} className="nav-header"><NavHeader authenticationToken={authenticationToken}  handleLogout={handleLogout} anchorEl={anchorEl} setAnchorEl={setAnchorEl} /></Grid>
                            <MainContainer item md={12} authenticationToken={authenticationToken} setAuthenticationToken={setAuthenticationToken} />
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