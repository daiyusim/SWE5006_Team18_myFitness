import { Box, Typography, Grid, Modal, Button, Container, IconButton, FormLabel,FormGroup, FormControl, Select, MenuItem, TextField } from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close'; 
import React, { useState, useEffect } from 'react'; 

const ProfileForm = ({ open, isEdit, handleClose, profileInfo }) => { 
    const initialProfileData = {
        id: "",
        userId: "",
        height: 0,
        weight: 0,
        interest: [],
        gender: "",
        goal: [],
    }; 
    const StyleBtn = {
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#23418B',
        marginLeft: 'auto'
    }
    const [profileData, setProfileData] = useState(initialProfileData); 

    const handleSubmit = (event) => { 
        event.preventDefault(); 
        // Handle form submission
    }; 

    const handleChange = (event) => { 
        const { name, value } = event.target; 
        setProfileData({ ...profileData, [name]: value }); 
    }; 

    useEffect(() => { 
        // Fetch profile data
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
                                    {isEdit ? "Edit Profile" : "Add Profile"}
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
                                    <FormGroup>
                                        <FormControl fullWidth>
                                            <FormLabel required>Height (cm)</FormLabel>
                                    <TextField 
                                        variant="outlined" 
                                        sx={sharedInputStyles} 
                                        id="height" 
                                        name="height" 
                                        onChange={handleChange} 
                                        value={profileData.height} 
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
                                        value={profileData.weight} 
                                        type='number'
                                        required
                                    /> 
                                        </FormControl>
                                    </FormGroup>
                                </Grid> 
                                <Grid item md={6} xs={6} xl={6}> 
                                    <FormControl fullWidth variant="outlined" sx={sharedInputStyles}>
                                        <FormLabel id="interest-label" required>Interest</FormLabel>
                                        <Select
                                        sx={{width: '100%'}}
                                            labelId="interest-label"
                                            id="interest"
                                            name="interest"
                                            multiple
                                            value={profileData.interest}
                                            onChange={handleChange}
                                            required
                                        >
                                            <MenuItem value="workout">Workout</MenuItem>
                                            <MenuItem value="fitness">Fitness</MenuItem>
                                            <MenuItem value="yoga">Yoga</MenuItem>
                                            <MenuItem value="dance">Dance</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> 
                                <Grid item md={6} xs={6} xl={6}> 
                                    <FormGroup>
                                        <FormControl fullWidth>
                                            <FormLabel required>Goals</FormLabel>
                                    <TextField 
                                        variant="outlined" 
                                        sx={sharedInputStyles} 
                                        id="goal" 
                                        name="goal" 
                                        onChange={handleChange} 
                                        value={profileData.goal} 
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
