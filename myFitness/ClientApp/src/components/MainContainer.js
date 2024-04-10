import React, { useState, useEffect } from 'react';
import { Grid } from "@mui/material";
import NavMenu from './NavMenu';
import EventManagementMain from './Event/EventManagementMain';
import EventForm from './Event/EventForm';
import WorkoutMain from './Workout/WorkoutMain';
import UserProfile from './Profile/UserProfile';
import AttendanceMain from './Attendance/AttendanceMain';
import Login from './Login';
import { BaseRoutes } from './helper/Routing';
import { Route, Routes } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export const MainContainer = ({ authenticationToken, setAuthenticationToken }) => {

    const handleLogin = async (data) => {
        setAuthenticationToken(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('roleType', data.roleType);
    };

    const checkAuthentication = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticationToken(true);
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async values => {
            try {
                const response = await axios.post('/api/users/login', values);
                handleLogin(response.data);
            } catch (error) {
                console.error('Login error:', error);
            }
        },
    });

    return (
        <Grid container id="main-container" sx={{ marginTop: '0', marginBottom: '3rem' }}> {/* Ensure no top margin */}
            <Grid item md={12}>
                <Grid container sx={{ display: 'block' }}>
                    {
                        authenticationToken === true ? (
                            <Grid item className="nav-menu" sx={{ backgroundColor: 'initial', display: 'inlineBlock', minHeight: '800px' }}>
                                {/* <NavMenu /> */}
                                <Grid item id="content-container" className="case-display">
                                    <Routes>
                                        <Route path={BaseRoutes.Event} element={<EventManagementMain />} />
                                        <Route path={BaseRoutes.Event + "/:id"} element={<EventForm />} />
                                        <Route path={BaseRoutes.Event + "/add"} element={<EventForm />} />
                                        <Route path={BaseRoutes.Profile} element={<UserProfile />} />
                                        <Route path={BaseRoutes.Workout} element={<WorkoutMain />} />
                                        <Route path={BaseRoutes.Attendance} element={<AttendanceMain />} />
                                    </Routes>
                                </Grid>
                            </Grid>
                        ) :

                            <Routes>
                                <Route path="/" element={<Login formik={formik} />} />
                            </Routes>

                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MainContainer;
