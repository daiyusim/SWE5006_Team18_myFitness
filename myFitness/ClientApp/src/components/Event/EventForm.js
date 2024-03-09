import { FormGroup, FormLabel, TextField, Typography, Grid, Button } from '@mui/material';
import "./EventForm.css"
import React, { useState, useEffect } from 'react';
import { useLoading } from "../shared/LoadingContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { BaseRoutes } from '../helper/Routing';

const EventForm = () => {
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const { id } = useParams();
    const { state } = useLocation();
    const { isAdd, orgInfo } = state;
    const [response, setResponse] = useState(null);
    const handleClose = () => {
        navigate(BaseRoutes.Event);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setResponse({
            ...response,
            [name]: value,
        });
    };
   
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        }
  

    return (
        <Grid>
            <form onSubmit={handleSubmit} encType="multipart/form-data">

            </form>

        </Grid>




    )


}

export default EventForm; 