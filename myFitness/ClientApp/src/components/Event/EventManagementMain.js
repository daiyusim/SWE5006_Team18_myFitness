import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TextField,Paper, IconButton, Menu, MenuItem, Box, Chip, Typography, Grid, Button, Card, CardHeader, CardContent, Select } from '@mui/material';
import { BaseRoutes } from '../helper/Routing';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLoading } from "../shared/LoadingContext";

export const EventManagementMain = () => {
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const [selectedRow, setSelectedRow] = useState(null);
    const [events, setEvents] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All'); 
    const [searchQuery, setSearchQuery] = useState('');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        setLoading(true);
        fetch("api/event")
            .then(r => r.json())
            .then(res => {
                const formattedEvents = res.map(event => ({
                    ...event,
                    startDateTime: dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm'),
                    endDateTime: dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm'),
                    registrationEndDate: dayjs(event.registrationEndDate).format('DD/MM/YYYY HH:mm'),
                }));
                setEvents(formattedEvents);
            })
            .catch(e => console.log("Error fetching events", e))
            .finally(() => setLoading(false));
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
    const filteredEvents = events && (events
        .filter(event => (selectedCategory === 'All' || event.category === selectedCategory))
        .filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase())));
    return (
        <Box sx={{ marginTop: '1rem', maxHeight: '600px', overflow: 'auto' }}>
            <Grid container>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '0.5rem', fontSize: '1.5rem' }}>All events</Typography>
                <Button variant="contained" sx={AddBtnStyle} onClick={handleAddEvent}>
                    <AddIcon />
                </Button>
            </Grid>
           
            <br />
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Search by Title:</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Filter by Category:</Typography>
                </Grid>
                <Grid item>
                    <Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: '1rem' }}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Workout">Workout</MenuItem>
                        <MenuItem value="Fitness">Fitness</MenuItem>
                        <MenuItem value="Yoga">Yoga</MenuItem>
                        <MenuItem value="Dance">Dance</MenuItem>
                    </Select>
                </Grid>
            </Grid>
         <Grid container spacing={3}>
                {filteredEvents && (filteredEvents.length === 0 ? (
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100px"
                        >
                            <Typography variant="body1" color="textSecondary">
                                No records found
                            </Typography>
                        </Box>
                    </Grid>
                ) : (
                filteredEvents.map(event => (
                    <Grid item key={event.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader
                                title={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="h5" component="h2">
                                            {event.title}
                                        </Typography>
                                        <Typography variant="body2" component="span" style={{ marginLeft: '8px', backgroundColor: '#FFA500', color: 'white', padding: '4px', borderRadius: '4px' }}>
                                            {event.category}
                                        </Typography>
                                    </div>
                                }
                                subheader={`${event.startDateTime} - ${event.endDateTime}`}
                                action={
                                    <IconButton aria-label="more" aria-controls="event-menu" aria-haspopup="true" onClick={handleClick}>
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                            />
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {event.description}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    Registration Closing Date: {event.registrationEndDate}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    Capacity: {event.capacity}
                                </Typography>
                            </CardContent>
                            <Menu
                                id={`event-menu-${event.id}`}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Register</MenuItem>
                            </Menu>
                        </Card>
                    </Grid>
                ))))}
            </Grid>

        </Box>
    );
}


export default EventManagementMain;