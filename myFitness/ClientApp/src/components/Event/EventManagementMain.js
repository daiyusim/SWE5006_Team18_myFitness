import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { TextField,Paper, IconButton, Menu, MenuItem, Box, Chip, Typography, Grid, Button, Card, CardHeader, CardContent, Select } from '@mui/material';
import { BaseRoutes } from '../helper/Routing';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useLoading } from "../shared/LoadingContext";
import DeleteEvent from "./DeleteEvent";
import RegisterEvent from "./RegisterEvent";
import { getAppUserIdSelector } from "../redux/selector";
import { useSelector } from "react-redux";

const categoryColors = {
    All: { backgroundColor: '#FFA500', color: 'white' },
    Workout: { backgroundColor: '#FF5733', color: 'white' },
    Fitness: { backgroundColor: '#36C7B0', color: 'white' },
    Yoga: { backgroundColor: '#FFC300', color: 'black' },
    Dance: { backgroundColor: '#900C3F', color: 'white' },
};
export const EventManagementMain = () => {
    const navigate = useNavigate();
    const { setLoading } = useLoading();
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [selectedRowEventName, setSelectedRowEventName] = useState(null);
    const [events, setEvents] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showRegisterDialog, setShowRegisterDialog] = useState(false);
    const userId = useSelector(getAppUserIdSelector);
    const handleClick = (event, eventId, eventName) => {
        setSelectedRowId(eventId);
        setSelectedRowEventName(eventName);
        setAnchorEl(event.currentTarget);
    };
    const handleShowDeleteDialog = () => {
        setShowDeleteDialog(true);

    };

    const handleCloseDeleteDialog = () => {
        setShowDeleteDialog(false);
        setSelectedRowId(null)
        setSelectedRowEventName(null)
        handleClose();
        fetchEvents();
    };

    const handleShowRegisterDialog = () => {
        setShowRegisterDialog(true);

    };

    const handleCloseRegisterDialog = () => {
        setShowRegisterDialog(false);
        setSelectedRowId(null)
        setSelectedRowEventName(null)
        handleClose();
        fetchEvents();
    };
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const fetchEvents = () => {
        setLoading(true);
        fetch("api/event")
            .then(r => r.json())
            .then(res => {
                const formattedEvents = res.map(event => ({
                    ...event
                }));

                const filteredEvents = formattedEvents.filter(event => {
                    return !event.registrations.some(registration => registration.userId === userId);
                });
                console.log(filteredEvents)
                setEvents(filteredEvents);
            })
            .catch(e => console.log("Error fetching events", e))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        setLoading(true);
        fetchEvents();
    }, []);

    const handleAddEvent = () => {
        navigate(BaseRoutes.Event + "/add", { state: { isAdd: true } })
    }

    const handleEditEvent = () => {
        navigate(BaseRoutes.Event + "/" + selectedRowId, { state: { isAdd: false } });
    }
    const AddBtnStyle = {
        fontSize: '1rem',
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: '#23418B',
        marginLeft: 'auto'
    }
    const getCategoryColor = (category) => {
        return categoryColors[category] || { backgroundColor: '#FFA500', color: 'white' };
    };

    const filteredEvents = events && (events
        .filter(event => (selectedCategory === 'All' || event.category === selectedCategory))
        .filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase())));
    return (
        <Box sx={{ marginTop: '1rem' }}>
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
                    <Grid item key={event.id} xs={12} sm={6} md={4} style={{ minHeight: '200px' }}>
                        <Card sx={{ borderRadius: "25px", backgroundColor: "white", height: "100%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                            <CardHeader
                                title={
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                                            {event.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            component="span"
                                            style={{
                                                marginLeft: '8px',
                                                padding: '4px',
                                                borderRadius: '4px',
                                                ...getCategoryColor(event.category) // Set category color dynamically
                                            }}
                                        >
                                            {event.category}
                                        </Typography>

                                    </div>
                                }
                                subheader={`${dayjs(event.startDateTime).format('DD/MM/YYYY HH:mm')} - ${dayjs(event.endDateTime).format('DD/MM/YYYY HH:mm') }`}
                                action={
                                    (!dayjs().isAfter(dayjs(event.registrationEndDate, 'DD/MM/YYYY HH:mm'))) && (
                                        <IconButton aria-label="more" aria-controls={`event-menu-${event.id}`} aria-haspopup="true" onClick={(e) => handleClick(e, event.id, event.title)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    )
                                }

                            />
                            <CardContent style={{ overflow: 'auto' }}>
                                <Typography variant="body1" component="p">
                                    {dayjs().isBefore(dayjs(event.registrationEndDate, 'DD/MM/YYYY HH:mm')) ? (
                                        <span style={{ color: 'green' }}>Open for Registration</span>
                                    ) : (
                                        <span style={{ color: 'red' }}>Registration Closed</span>
                                    )}
                                </Typography>
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
                                    Registration Closing Date:  {dayjs(event.registrationEndDate).format('DD/MM/YYYY HH:mm')}
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
                                {event.createdBy !== userId && !dayjs().isAfter(dayjs(event.registrationEndDate, 'DD/MM/YYYY HH:mm')) && (
                                    <MenuItem onClick={handleShowRegisterDialog}>Register</MenuItem>
                                )}
                                {event.createdBy === userId && (<MenuItem onClick={handleEditEvent}>Edit</MenuItem>)}
                                {event.createdBy === userId && event.totalRegistered === 0 && (<MenuItem onClick={handleShowDeleteDialog}>Cancel</MenuItem>)}
                            </Menu>
                        </Card>
                    </Grid>


                ))))}
                        </Grid>
               
              
            {showDeleteDialog && (<DeleteEvent open={showDeleteDialog} handleClose={handleCloseDeleteDialog} eventId={selectedRowId} eventName={selectedRowEventName} />)}

            {showRegisterDialog && (<RegisterEvent open={showRegisterDialog} handleClose={handleCloseRegisterDialog} eventId={selectedRowId} />)}
    </Box>
   

    );
}


export default EventManagementMain;