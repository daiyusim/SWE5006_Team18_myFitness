import { Box, Typography, Grid, Modal, Button, Container, IconButton, RadioGroup, FormLabel,Radio,FormGroup, FormControl, Select, MenuItem, TextField } from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close'; 
import React, { useState, useEffect } from 'react'; 
import { useLoading } from "../shared/LoadingContext";
import { useBanner } from "../Banner/BannerContext";

const ProfileForm = ({ open, isEdit, handleClose, profileInfo }) => { 
    const { setLoading } = useLoading();
    const { showSuccessBanner, showErrorBanner } = useBanner();
    const initialProfileData = {
        userId: profileInfo.id,
        height: null,
        weight: null,
        interests: [],
        gender: "",
        goals: "",
    }; 
    const StyleBtn = {
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#23418B',
        marginLeft: 'auto'
    }
    const [profileData, setProfileData] = useState(initialProfileData); 

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault(); 
        console.log(profileData)
        try {
            if (isEdit === true) {
                const response = await fetch(`/api/profile/${profileData.userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(profileData),
                });
                if (!response.ok) {
                    showErrorBanner('Failed to update profile');
                    return;
                }
                showSuccessBanner('Profile updated successfully');
            } else {
                const response = await fetch('api/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(profileData),
                });

                if (!response.ok) return showErrorBanner('Failed to create profile');

                await response.json();
                showSuccessBanner('Profile created successfully');
            }
            handleClose();
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            handleClose();
            setLoading(false);
        }

    }; 

    const handleChange = (event) => { 
        const { name, value } = event.target; 
        setProfileData({ ...profileData, [name]: value }); 
    }; 

    useEffect(() => { 
        if (isEdit === true) {
            setLoading(true)
            setProfileData(profileInfo.profile)
        }
        setLoading(false)
    }, []); 

    const sharedInputStyles = { 
        marginTop: '0.5rem', 
        marginBottom: '1rem', 
    }; 

    return ( 
        <Modal open={open} onClose={handleClose} disableBackdropClick> 
            <form onSubmit={handleSubmit}> 
                <Box 
                    sx={{ 
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        bgcolor: 'background.paper', 
                        boxShadow: 24, 
                        p: 2, 
                        borderRadius: 3, 
                        maxHeight: '80vh', // Set max height to prevent overflow
                        overflow: 'auto', // Allow scrolling when content exceeds the box size
                    }} 
                > 
                    <Container sx={{ paddingTop: '10px' }}> 
                        <Grid container className="form-header"> 
                            <Grid item xs={11}> 
                                <Typography variant="h6" id="form-title">
                                    {isEdit ? "Edit Profile" : "Setup Profile"}
                                </Typography> 
                            </Grid> 
                            <Grid item xs={1} className="text-end"> 
                                <IconButton onClick={handleClose}> 
                                    <CloseIcon /> 
                                </IconButton> 
                            </Grid> 
                        </Grid> 
                        <Grid sx={{ 
                            paddingTop: '1rem', 
                            width: "670px", 
                        }}> 
                          
                            <Grid container spacing={2}> 
                                <Grid item md={6} xs={6} xl={6}>
                                    <FormControl component="fieldset" required>
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup
                                            aria-label="gender"
                                            name="gender"
                                            value={profileData?.gender}
                                            onChange={handleChange}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <label style={{ marginRight: '8px' }}>Female</label>
                                                    <Radio value="F" required/>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <label style={{ marginLeft: '8px' }}>Male</label>
                                                    <Radio value="M" required/>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={6} xl={6}>
                                    <FormControl fullWidth variant="outlined" sx={sharedInputStyles}>
                                        <FormLabel id="interest-label" required>Interest</FormLabel>
                                        <Select
                                            sx={{ width: '100%' }}
                                            labelId="interest-label"
                                            id="interests"
                                            name="interests"
                                            multiple
                                            value={profileData?.interests}
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value="Workout">Workout</MenuItem>
                                            <MenuItem value="Fitness">Fitness</MenuItem>
                                            <MenuItem value="Yoga">Yoga</MenuItem>
                                            <MenuItem value="Dance">Dance</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item md={6} xs={6} xl={6}> 
                                    <FormGroup>
                                        <FormControl fullWidth>
                                            <FormLabel required>Height (cm)</FormLabel>
                                    <TextField 
                                        variant="outlined" 
                                        sx={sharedInputStyles} 
                                        id="height" 
                                        name="height" 
                                        onChange={handleChange} 
                                        value={profileData?.height} 
                                        type='number'
                                        required
                                            />
                                        </FormControl>
                                    </FormGroup>
                                </Grid> 
                                <Grid item md={6} xs={6} xl={6}> 
                                    <FormGroup>
                                        <FormControl fullWidth>
                                            <FormLabel required>Weight (kg)</FormLabel>
                                    <TextField 
                                        variant="outlined" 
                                        sx={sharedInputStyles} 
                                        id="weight" 
                                        name="weight" 
                                        onChange={handleChange} 
                                        value={profileData?.weight} 
                                        type='number'
                                        required
                                    /> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid> 
                                
                                <Grid item md={12} xs={12} xl={12}> 
                                    <FormGroup>
                                        <FormControl fullWidth>
                                            <FormLabel required>Goals</FormLabel>
                                    <TextField 
                                        variant="outlined" 
                                        sx={sharedInputStyles} 
                                        id="goals" 
                                        name="goals" 
                                        onChange={handleChange} 
                                        value={profileData?.goals} 
                                        multiline
                                        rows={4} 
                                        required
                                    /> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid>  
                            </Grid> 
                        </Grid> 
                    </Container> 
                    <Container > 
                        <Grid item xs={12} sx={{ textAlign: 'right', mt: 2 }}>
                            <Button sx={{ mr: 2, textTransform: 'none', lineHeight: "24px", fontSize: "16px", fontWeight: "700", color: "#2E5CCC", borderColor: "#CFD5DF", }} variant="outlined" className="cancel-button" onClick={handleClose}> 
                                Cancel 
                            </Button>
                            <Button type="submit" sx={StyleBtn} variant="contained" className="add-button"> 
                                {isEdit ? "Save" : "Add"}
                            </Button> 
                        </Grid> 
                    </Container> 
                </Box> 
            </form> 
        </Modal> 
    ) 
} 

export default ProfileForm;
