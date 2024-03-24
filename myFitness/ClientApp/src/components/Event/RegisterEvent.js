import { useEffect, useState } from 'react';
import { Button, Box, Typography, Modal, FormGroup, FormControl, FormLabel, FormControlLabel, Checkbox } from '@mui/material';
import { useLoading } from '../shared/LoadingContext';
import dayjs from 'dayjs';

const RegisterEvent = ({ open, handleClose, eventId }) => {
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
                    console.error('Failed to fetch event');
                    setLoading(false);
                    return;
                }
                const eventData = await response.json();
                setEvent(eventData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleRegister = async () => {
        const response = await fetch('api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventId: eventId,
                createdOn: new Date().toISOString(),
                status: 'Registered',
                userId: '65ec5ee7d4ba1c372f054549'
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to register event');
        }

        await response.json();
        console.log('Event registration successful');
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
                        <Typography sx={{ mt: 2 }}>
                            Event Description:
                            <br />
                            {event.description}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Event Type:
                            <br />
                            {event.category}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Date and Time:
                            <br />
                            {`${dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')} - ${dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm')}`}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            Organizer:
                            <br />
                            {event.createdBy} (change to username)
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
