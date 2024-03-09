import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import './Footer.css'

const NavFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box component="footer">
            <Grid container className="navbar-brand-bottom">
             
                <Grid item md={12} className="link-group-2" >
                    <Grid ite md={12} className="copyright">
                        <Box id="copyright-text">&copy; SWE5006_Team18_{currentYear}</Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default NavFooter; 