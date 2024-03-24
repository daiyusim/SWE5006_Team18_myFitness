import { FormGroup, FormControl, FormLabel, TextField, Typography, Grid, Button,Select, MenuItem } from '@mui/material';
import "./EventForm.css"
import React, { useState, useEffect } from 'react';
import { useLoading } from "../shared/LoadingContext";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { BaseRoutes } from '../helper/Routing';
import dayjs from 'dayjs';
const EventForm = () => {
    const initialFormData = {
        title: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        capacity: '',
        category: '',
        registrationEndDate: ''
    };
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const { id } = useParams();
    const { state } = useLocation();
    const { isAdd, orgInfo } = state;
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        capacity: '',
        category: '',
        registrationEndDate: ''
    });
    const handleClose = () => {
        navigate(BaseRoutes.Event);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === 'startDateTime' || name === 'endDateTime' || name === 'registrationEndDate') {
            event.target.setCustomValidity('');
            event.target.reportValidity();
        }
    };
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        const startDateTime = dayjs(formData.startDateTime);
        const endDateTime = dayjs(formData.endDateTime);
        const registrationDateTime = dayjs(formData.registrationEndDate);
        const startDateTimeInput = document.querySelector('input[name="startDateTime"]'); 
        const endDateTimeInput = document.querySelector('input[name="endDateTime"]'); 
        const registrationDateInput = document.querySelector('input[name="registrationEndDate"]'); 

        if (startDateTime.isAfter(endDateTime)) {
            startDateTimeInput.setCustomValidity('Start date cannot be later than end date');
            event.currentTarget.reportValidity();
            return;
        }
        if (dayjs().isSame(startDateTime, 'day')) {
            startDateTimeInput.setCustomValidity('Date cannot be today');
            event.currentTarget.reportValidity();
            return;
        }
        if (dayjs().isSame(endDateTime, 'day') ) {
            endDateTimeInput.setCustomValidity('Date cannot be today');
            event.currentTarget.reportValidity();
            return;
        }
        if (dayjs().isSame(registrationDateTime, 'day')) {
            registrationDateInput.setCustomValidity('Date cannot be today');
            event.currentTarget.reportValidity();
            return;
        }

        setLoading(true);
        try {
            if (isAdd === true) {
                const response = await fetch('api/event', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        isDeleted: false,
                        createdOn: new Date().toISOString(),
                        status: "Created",
                        createdBy: 0
                    }),
                });

                if (!response.ok) throw new Error('Failed to create event');

                await response.json();
                console.log('Event created successfully');
            } else {
                const response = await fetch(`/api/event/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error('Failed to update event');
                }
                console.log('Event updated successfully');
            }

            setFormData(initialFormData);
            handleClose();
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            handleClose();
            setLoading(false);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/event/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event');
                }
                const eventData = await response.json();

                const formatDateTime = (dateTimeString) => {
                    const date = new Date(dateTimeString);
                    const offset = date.getTimezoneOffset();
                    date.setTime(date.getTime() - offset * 60 * 1000);
                    const formattedDate = date.toISOString().slice(0, 16);

                    return formattedDate;
                };

                setFormData({
                    ...eventData,
                    startDateTime: formatDateTime(eventData.startDateTime),
                    endDateTime: formatDateTime(eventData.endDateTime),
                    registrationEndDate: formatDateTime(eventData.registrationEndDate)
                });
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };
        if (!isAdd) {
            fetchData();
        }
    }, [id, isAdd]);

    const StyleBtn = {
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#23418B',
        marginLeft: 'auto'
    }

    return (
        <Grid sx={{ marginTop: '1rem'}}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {
                            isAdd === true ?
                                <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '0.5rem', fontSize: '1.5rem' }}>New event</Typography>
                                : <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '0.5rem', fontSize: '1.5rem' }}>Edit event</Typography>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormGroup>
                            <FormControl fullWidth>
                                <FormLabel required>Title</FormLabel>
                                <TextField
                                    name="title"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormGroup>
                            <FormControl fullWidth>
                                <FormLabel required>Category</FormLabel>
                                <Select
                                    name="category"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="Workout">Workout</MenuItem>
                                    <MenuItem value="Fitness">Fitness</MenuItem>
                                    <MenuItem value="Yoga">Yoga</MenuItem>
                                    <MenuItem value="Dance">Dance</MenuItem>
                                </Select>
                            </FormControl>
                        </FormGroup>
                    </Grid>
                   
                    <Grid item xs={12} sm={6}>
                        <FormGroup>
                            <FormControl fullWidth>
                                <FormLabel required>Start Date and Time</FormLabel>
                                <TextField
                                    name="startDateTime"
                                    type="datetime-local"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.startDateTime}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormGroup>
                            <FormControl fullWidth>
                                <FormLabel required>End Date and Time</FormLabel>
                                <TextField
                                    name="endDateTime"
                                    type="datetime-local"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.endDateTime}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormGroup>
                            <FormControl fullWidth>
                                <FormLabel required>Capacity</FormLabel>
                                <TextField
                                    name="capacity"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormGroup>
                            <FormControl fullWidth>
                                <FormLabel required>Registration Closing Date and Time</FormLabel>
                                <TextField
                                    name="registrationEndDate"
                                    type="datetime-local"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.registrationEndDate}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormGroup>
                            <FormControl fullWidth>
                                <FormLabel required>Description</FormLabel>
                                <TextField
                                    name="description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    inputProps={{ maxLength: 500 }}
                                />
                            </FormControl>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'right', mt: 2 }}>
                        <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" sx={StyleBtn}>
                            Save
                        </Button>

                    </Grid>
                </Grid>
            </form>

        </Grid>




    )


}

export default EventForm; 