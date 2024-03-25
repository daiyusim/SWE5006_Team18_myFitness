import React from 'react';
import './Footer.css'
import { Box, Grid, Typography, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from './Images/logo.png'; 

const NavFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
            <>
<Box component="footer" className="bottom" sx={{
  display: 'flex',
  justifyContent: 'space-between',
  padding: 2,
  marginTop: 'auto',
}}>            <img src={logo} alt="myFitness Logo" style={{ height: '40px' }} />             
              </Box>
              <Box component="footer" className="bottom" sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Box className="legal" sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">© {currentYear} All rights reserved</Typography>
                  {/* <Link href="#" underline="hover">License</Link>
                  <Link href="#" underline="hover">Terms</Link>
                  <Link href="#" underline="hover">Privacy</Link> */}
                </Box>
              </Box>
            </>
    )
}

export default NavFooter;