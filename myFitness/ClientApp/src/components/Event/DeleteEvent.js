import React from 'react';
import { Button, Box, Typography, IconButton, Modal } from '@mui/material';

const DeleteEvent = ({ open, handleClose, eventId, eventName }) => {
    const StyleBtn = {
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#d03530',
        marginLeft: 'auto'
    }
    const handleDelete = async (eventId) => {
        try {
            const response = await fetch(`api/event/${eventId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            const data = await response.json();
            handleClose();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-event-modal-title"
            aria-describedby="delete-event-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999, // Set the z-index to ensure the modal appears in front
            }}
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: '20px',
                }}
            >
                <Typography id="delete-event-modal-title" variant="h6" component="h2">
                    Delete {eventName}
                </Typography>
                <Typography id="delete-event-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete this event?
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained"  onClick={() => handleDelete(eventId)} sx={StyleBtn} >
                        Delete
                    </Button>
                 
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteEvent;