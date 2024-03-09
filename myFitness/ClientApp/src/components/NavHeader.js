import React from 'react';
import { AppBar, Box} from '@mui/material';
import './NavComponents.css';



const NavHeader = () => {
    return (
        <header>
            <AppBar position="static" elevation={0}>
                <Box display="flex" flexDirection="row" alignItems="center" height="100%">
                    {/* Add your header content here */}
                </Box>
            </AppBar>
            <div className="navbar-brand-top">
                <div className="header-container">
                </div>
            </div>
        </header>
    )
}

export default NavHeader; 
