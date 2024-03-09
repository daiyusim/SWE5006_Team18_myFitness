import React, { useState, useEffect } from 'react';
import { Link, TableSortLabel, Table, TableBody, TableFooter, TableContainer, TableHead, TableRow, Select, MenuItem, InputAdornment, Divider, Box, Chip, Typography, FormControl, Grid, FormGroup, TextField, Button, FormLabel, FormControlLabel, Container } from '@mui/material';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { BaseRoutes } from '../helper/Routing';

export const WorkoutMain = () => {
    const navigate = useNavigate();


    const handleClose = () => {
        navigate(BaseRoutes.Workout)
    }


    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Grid container>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '0.5rem', fontSize: '1.5rem' }}>Workout Dashboard</Typography>
                <Grid item md={12}>
                    <Divider sx={{ padding: '0.5rem 0.75rem', marginBottom: '0.75rem' }} />

                </Grid>
                <Grid item md={12}>

                </Grid>
            </Grid>

        </Box>
    );
}


export default WorkoutMain;