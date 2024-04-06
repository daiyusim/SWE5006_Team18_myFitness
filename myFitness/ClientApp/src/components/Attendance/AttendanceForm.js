import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel, Checkbox } from '@mui/material';
import { useLoading } from '../shared/LoadingContext';
import axios from 'axios';
import { useBanner } from "../Banner/BannerContext";

const AttendanceForm = ({ open, handleClose, id }) => {
    const { setLoading } = useLoading();
    const [attendance, setAttendance] = useState({});
    const [events, setEvent] = useState(null);
    const { showSuccessBanner, showErrorBanner } = useBanner();
    const styleBtn = {
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#23418B',
    };

    const handleCheckboxChange = (userId) => (event) => {
        const isChecked = event.target.checked;
        setAttendance((prevAttendance) => ({
            ...prevAttendance,
            [userId]: isChecked,
        }));
    };
 
    useEffect(() => {
        setLoading(true);
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/event/registrations/${id}`);
                if (!response.ok) {
                    console.error('Failed to fetch event');
                    setLoading(false);
                    return;
                }
                const eventData = await response.json();
                console.log(eventData)
                setEvent(eventData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);


    useEffect(() => {
        if (events && events.registrations) {
            const initialAttendance = {};
            events.registrations.forEach(registration => {
                initialAttendance[registration.userId] = registration ? registration.isAttended : false;
            });
            setAttendance(initialAttendance);
        }
    }, [events]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const attendanceData = events.registrations.map(registration => {
                const isAttended = attendance[registration.userId] || false;
                const status = isAttended ? "Attended" : "Absent";
                return {
                    ...registration,
                    status: status,
                    isAttended: isAttended
                };
            });
            console.log(attendanceData);
            await axios.put('/api/registration', attendanceData);
            showSuccessBanner("Attendance Saved");
            handleClose();
        } catch (error) {
            console.error('Error submitting attendance:', error);
        }
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
                zIndex: 9999,
            }}
        >
            <>
                {events && (
                    <Box
                        sx={{
                            width: '80vh',
                            maxHeight: '70vh',
                            bgcolor: 'background.paper',
                            p: 4,
                            borderRadius: '20px',
                            overflowY: 'auto',
                        }}
                    >
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                            {events.title} - Attendance Marking
                        </Typography>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Participants</strong></TableCell>
                                            <TableCell><strong>Attended</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {events.registrations && events.registrations.length > 0 ? (
                                            events.registrations.map((registration) => (
                                                <TableRow key={registration.userId}>
                                                    <TableCell>{registration.user && registration.user.name}</TableCell>
                                                    <TableCell>
                                                        <FormControlLabel
                                                            control={<Checkbox
                                                                onChange={(event) => handleCheckboxChange(registration.userId)(event)}
                                                                checked={attendance.hasOwnProperty(registration.userId) ? attendance[registration.userId] : registration.isAttended || false}
                                                            />}
                                                            label=""
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={2}>No Registered Participants</TableCell>
                                            </TableRow>
                                        )}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box
                                sx={{
                                    position: 'sticky',
                                    bottom: 0,
                                    zIndex: 1,
                                    p: 2,
                                    borderRadius: '20px',
                                    bgcolor: 'background.paper',
                                    boxShadow: '0px -4px 4px rgba(0, 0, 0, 0.1)',
                                    mt: 3,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="contained" sx={styleBtn}>
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                )}
            </>
        </Modal>
    );
};

export default AttendanceForm;
