import React, { useState, useEffect } from 'react';
import { Link, TableSortLabel, Table, TableBody, TableFooter, TableContainer, TableHead, TableRow, Select, MenuItem, InputAdornment, Divider, Box, Chip, Typography, FormControl, Grid, FormGroup, TextField, Button, FormLabel, FormControlLabel, Container } from '@mui/material';
import TableCell from '@mui/material/TableCell';



export const UserProfile = () => {

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Grid container>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '0.5rem', fontSize: '1.5rem' }}>Profile</Typography>
                <Grid item md={12}>
                    <Divider sx={{ padding: '0.5rem 0.75rem', marginBottom: '0.75rem' }} />

                </Grid>
                <Grid item md={12}>

                </Grid>
            </Grid>

        </Box>
    );
}


export default UserProfile;