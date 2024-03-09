import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Paper, IconButton, Menu, MenuItem, Box, Chip, Typography, Grid, Button } from '@mui/material';
import { BaseRoutes } from '../helper/Routing';
import { useLocation, useParams, useNavigate } from "react-router-dom";

export const EventManagementMain = () => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);
    const [events, setEvents] = useState(null);

    useEffect(() => {
        fetch("api/event").then(r => r.json()).then(res => {
            console.log(res);
            setEvents(res);
        }).catch(e => console.log("Error fetching events", e));
    }, []);

    const handleAddEvent = () => {
        navigate(BaseRoutes.Event + "/add", { state: { isAdd: true } })
    }

    const handleEditEvent = () => {
        navigate(BaseRoutes.Event + "/" + selectedRow.eventID, { state: { isAdd: false } });
    }
    const AddBtnStyle = {
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#23418B',
        marginLeft: 'auto'
    }

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Grid container>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '0.5rem', fontSize: '1.5rem' }}>All events</Typography>
                <Button variant="contained" sx={AddBtnStyle} startIcon={<AddIcon />} onClick={handleAddEvent}>
                    Add Event
                </Button>
            </Grid>
            <br />
            <Grid container spacing={2}>
          
                   
            </Grid>

        </Box>
    );
}


export default EventManagementMain;