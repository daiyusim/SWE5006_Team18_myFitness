import { useEffect, useState } from 'react';
import { Button, Box, Typography, Modal, FormGroup, FormControl, FormLabel, FormControlLabel, Checkbox, Grid } from '@mui/material';
import { useLoading } from '../shared/LoadingContext';
import dayjs from 'dayjs';
import MapComponent from '../shared/MapComponent';
import { useBanner } from "../Banner/BannerContext";
import { useSelector } from "react-redux";
import { getAppUserIdSelector } from "../redux/selector";

const RegisterEvent = ({ open, handleClose, eventId }) => {
    const { showSuccessBanner, showErrorBanner } = useBanner();
    const userId = useSelector(getAppUserIdSelector);
    const { setLoading } = useLoading();
    const [event, setEvent] = useState(null);
    const styleBtn = {
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#23418B'
    };

    useEffect(() => {
        setLoading(true);
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/event/${eventId}`);
                if (!response.ok) {
                    showErrorBanner('Failed to fetch event');
                    setLoading(false);
                    return;
                }
                const eventData = await response.json();
                console.log(eventData);
                setEvent(eventData);
                setLoading(false);
            } catch (error) {
                showErrorBanner('Error fetching event:', error);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleRegister = async (event) => {
        event.preventDefault();
        const response = await fetch('api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: eventId,
                createdOn: new Date().toISOString(),
                status: 'Registered',
                userId: userId
            }),
        });

        if (!response.ok) {
            showErrorBanner('Failed to register event');
            return;
        }

        await response.json();
        showSuccessBanner('Event registration successful');
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="register-event-modal-title"
            aria-describedby="register-event-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999, // Set the z-index to ensure the modal appears in front
            }}
        >
            <>
                {event && (
                    <Box
                        sx={{
                            width: '80vh',
                            height: 'fit-content',
                            bgcolor: 'background.paper',
                            p: 4,
                            borderRadius: '20px',
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                            Register for {event.title}
                        </Typography>
                        <Grid item xs={12} sm={6}>
                            {event?.lat && event?.long && (
                                <MapComponent lat={event?.lat} long={event?.long} address={event?.address} />)}
                        </Grid>
                        <Typography sx={{ mt: 2 }}>
                            <b style={{ display: 'inline-block', marginRight: '8px' }}>Event Description:</b>
                            {event.description}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <b style={{ display: 'inline-block', marginRight: '8px' }}>Event Type:</b>
                     
                            {event.category}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <b style={{ display: 'inline-block', marginRight: '8px' }}>Date and Time:</b>
                      
                            {`${dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')} - ${dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm')}`}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            <b style={{ display: 'inline-block', marginRight: '8px' }}>Organizer:</b>
                            
                            {event.createdByName}
                        </Typography>
                        <form onSubmit={handleRegister} encType="multipart/form-data">
                            <FormControl component="fieldset" sx={{ mt: 2 }}>
                                <FormLabel required component="legend">Terms and Conditions</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox required />}
                                        label="I acknowledge that cancellations are allowed up to 3 days prior to the registration closing date"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox required />}
                                        label="I agree to adhere to event rules and refrain from disruptive behavior"
                                    />
                                </FormGroup>
                            </FormControl>
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" sx={styleBtn}>
                                    Register
                                </Button>
                            </Box>
                        </form>
                    </Box>
                )}
            </>
        </Modal>
    );
};

export default RegisterEvent;
