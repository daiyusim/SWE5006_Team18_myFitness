import React, { useEffect, useState } from 'react';
import { IconButton,Button, Box, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel, Checkbox, Grid } from '@mui/material';
import { useLoading } from '../shared/LoadingContext';
import axios from 'axios';
import { useBanner } from "../Banner/BannerContext";
import { useSelector } from "react-redux";
import { getAppUserIdSelector } from "../redux/selector";
import MapComponent from '../shared/MapComponent';
import dayjs from 'dayjs';
import CloseIcon from '@mui/icons-material/Close';

const AttendanceForm = ({ open, handleClose, id }) => {
    const { setLoading } = useLoading();
    const [attendance, setAttendance] = useState({});
    const [events, setEvent] = useState(null);
    const { showSuccessBanner, showErrorBanner } = useBanner();
    const userId = useSelector(getAppUserIdSelector);
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
                {events?.createdBy === userId && events && (
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
                {events?.createdBy !== userId && events && (
                    <Box
                        sx={{
                            width: '80vh',
                            maxHeight: '70vh',
                            bgcolor: 'background.paper',
                            p: 4,
                            borderRadius: '20px',
                            overflowY: 'auto',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Grid container alignItems="center">
                            <Grid item xs={10}>
                                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', marginBottom: '1rem', display: 'inline' }}>
                                    {events.title} - Attendance (
                                    <Typography
                                        variant="inherit"
                                        sx={{
                                            color:
                                                events.registrations.filter(registration => registration.userId === userId)[0]?.status === 'Registered'
                                                    ? 'blue'
                                                    : events.registrations.filter(registration => registration.userId === userId)[0]?.status === 'Attended'
                                                        ? 'green'
                                                        : 'red',
                                            display: 'inline', 
                                        }}
                                    >
                                        {events.registrations.filter(registration => registration.userId === userId)[0]?.status}
                                    </Typography>
                                    )
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ textAlign: 'right' }}>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        {events.registrations && events.registrations.length > 0 ? (
                            <Grid container spacing={2}>
                                {events.registrations.map((registration) => (
                                    <Grid item xs={12} sm={12} key={registration.userId}>
                                        {registration.userId === userId && (
                                            <>
                                                <Typography sx={{ mt: 2 }}>
                                                    <b>Event Description:</b> {events.description}
                                                </Typography>
                                                <Typography sx={{ mt: 1 }}>
                                                    <b>Event Type:</b> {events.category}
                                                </Typography>
                                                <Typography sx={{ mt: 1 }}>
                                                    <b>Date and Time:</b> {`${dayjs(events.startDateTime).format('DD/MM/YYYY HH:mm')} - ${dayjs(events.endDateTime).format('DD/MM/YYYY HH:mm')}`}
                                                </Typography>
                                                <Typography sx={{ mt: 1 }}>
                                                    <b>Organizer:</b> {events.createdByName}
                                                </Typography>
                                                {events.lat && events.long && (
                                                    <MapComponent lat={events.lat} long={events.long} address={events.address} />
                                                )}
                                            </>
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        ) : null}
                    </Box>
                )}



            </>
        </Modal>
    );
};

export default AttendanceForm;
