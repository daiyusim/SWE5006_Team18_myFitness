import React, { useEffect, useState } from 'react';
import { Button, Box, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControlLabel, Checkbox } from '@mui/material';
import { useLoading } from '../shared/LoadingContext';

const AttendanceForm = ({ open, handleClose, id }) => {
    const { setLoading } = useLoading();
    const [checkedUsers, setCheckedUsers] = useState([]);
    const [event, setEvent] = useState(null);
    const styleBtn = {
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#23418B',
    };
    const userList = [
        { userId: '1', userName: 'User 1' },
        { userId: '2', userName: 'User 2' },
        { userId: '3', userName: 'User 3' },
        { userId: '4', userName: 'User 4' },
        { userId: '5', userName: 'User 5' },
        { userId: '6', userName: 'User 6' },
        { userId: '7', userName: 'User 7' },
        { userId: '8', userName: 'User 8' },
        { userId: '9', userName: 'User 9' },
        { userId: '10', userName: 'User 10' },
    ];

    const handleCheckboxChange = (userId) => (event) => {
        if (event.target.checked) {
            setCheckedUsers((prevCheckedUsers) => [...prevCheckedUsers, userId]);
        } else {
            setCheckedUsers((prevCheckedUsers) => prevCheckedUsers.filter((id) => id !== userId));
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/event/${id}`);
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
    }, [id]);

    const handleSubmit = async () => {
        // Implement submission logic here
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
                {event && (
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
                            {event.title} - Attendance Marking
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
                                        {userList.map((user) => (
                                            <TableRow key={user.userId}>
                                                <TableCell>{user.userName}</TableCell>
                                                <TableCell>
                                                    <FormControlLabel
                                                        control={<Checkbox onChange={handleCheckboxChange(user.userId)} />}
                                                        label=""
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
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
