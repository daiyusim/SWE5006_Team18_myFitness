import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Typography, Box, Grid, Divider, CardContent, Card, Chip, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, List, ListItem, ListItemText, CardHeader, IconButton, Menu, MenuItem } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useLoading } from "../shared/LoadingContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { BaseRoutes } from '../helper/Routing';
import RegisterEvent from "../Event/RegisterEvent";
import './Workout.css';
import dayjs from 'dayjs';

const categoryColors = {
    All: { backgroundColor: '#FFA500', color: 'white' },
    Workout: { backgroundColor: '#FF5733', color: 'white' },
    Fitness: { backgroundColor: '#36C7B0', color: 'white' },
    Yoga: { backgroundColor: '#FFC300', color: 'black' },
    Dance: { backgroundColor: '#900C3F', color: 'white' },
};

const COLORS = ['#FF5733', '#FFC300', '#36A2EB', '#4BC0C0', '#9966FF'];

export const WorkoutMain = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const { setLoading } = useLoading();
    const [events, setEvents] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [selectedRowEventName, setSelectedRowEventName] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showRegisterDialog, setShowRegisterDialog] = useState(false);
    const fetchDashboardDetails = async () => {
        const UserId = '6602f019cc013fe8b77e6bc5'; // hardcode first, later use persistent userid
        try {
            const response = await fetch(`/api/registration/activities/${UserId}`);
            if (!response.ok) {
                setLoading(false);
                return;
            }
            const data = await response.json();
            setData(data);
         
            const filteredEvents = await fetchAndFilterEvents(data.profile?.interests, UserId);
            setEvents(filteredEvents);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const fetchAndFilterEvents = async (userInterests, UserId) => {
        const weekStartDate = dayjs().startOf('week').valueOf();
        const weekEndDate = dayjs().endOf('week').valueOf();

        try {
            const response = await fetch("api/event");
            if (!response.ok) {
                setLoading(false);
                return [];
            }
            const events = await response.json();
            console.log(events);
            const filteredEvents = events.filter(event => {
                if (!userInterests?.includes(event.category)) {
                    return false;
                }
                const eventCreatedOn = dayjs(event.createdOn).valueOf();
                const isWithinWeek = eventCreatedOn >= weekStartDate && eventCreatedOn <= weekEndDate;
                return isWithinWeek && !event.registrations.some(registration => registration.userId === UserId);
            }).slice(0, 5);

            return filteredEvents;
        } catch (error) {
            console.error("Error fetching or filtering events:", error);
            return [];
        }
    };

    useEffect(() => {
        fetchDashboardDetails();
    }, []);

    const navigateEvent = () => {
        navigate(BaseRoutes.Event);
    }
    const getCategoryColor = (category) => {
        return categoryColors[category] || { backgroundColor: '#FFA500', color: 'white' };
    };

    const handleClick = (event, eventId, eventName) => {
        setSelectedRowId(eventId);
        setSelectedRowEventName(eventName);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleShowRegisterDialog = () => {
        setShowRegisterDialog(true);

    };

    const handleCloseRegisterDialog = () => {
        setShowRegisterDialog(false);
        setSelectedRowId(null)
        setSelectedRowEventName(null)
        handleClose();
        fetchDashboardDetails();
    };
    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Dashboard</Typography>
                    <Divider />
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2, ml: 1 }}>

                    <Grid item md={8} xs={12}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Suggested Events </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 1, mb: 2 }} onClick={navigateEvent}>View More</Button>
                        </div>
                        <Grid container spacing={3}>
                            {events && (events.length === 0 ? (
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="100px"
                                    >
                                        <Typography variant="body1" color="textSecondary">
                                            No suggestions
                                        </Typography>
                                    </Box>
                                </Grid>
                            ) : (
                                events.map(event => (
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
                                                    <IconButton aria-label="more" aria-controls={`event-menu-${event.id}`} aria-haspopup="true" onClick={(e) => handleClick(e, event.id, event.title)}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                            />
                                            <CardContent style={{ overflow: 'auto' }}>
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
                                                    Registration Closing Date: {dayjs(event.registrationEndDate).format('DD/MM/YYYY HH:mm')}
                                             
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
                                                <MenuItem onClick={handleShowRegisterDialog}>Register</MenuItem>
                                            </Menu>
                                        </Card>
                                    </Grid>


                                ))))}
                        </Grid>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: '12px' }}>
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin]}
                                initialView="dayGridMonth"
                                contentWidth="100%"
                                height={450}
                                events={data?.registeredEvent && (data?.registeredEvent?.map(item => ({
                                    id: item.event.id,
                                    title: item.event.title,
                                    date: item.event.startDateTime
                                })))}
                            />
                        </Paper>
                        <Box sx={{ mt: 2, maxHeight: '300px', overflow: 'auto' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Upcoming Activities</Typography>
                            <List>
                                {data?.registeredEvent && (data?.registeredEvent?.map((item, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={<span style={{ fontWeight: 'bold' }}>{item.event.title}</span>}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
                                                        {`${dayjs(item.event.startDateTime).format('DD/MM/YYYY HH:mm')} - ${dayjs(item.event.endDateTime).format('DD/MM/YYYY HH:mm')}`}
                                                    </Typography>
                                                    <br />
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                )))}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
                    <Grid item xs={4}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', bgcolor: data?.attendedEvent?.length > 0 ? '#B9F6CA' : '#E0E0E0', borderRadius: '12px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="h5" sx={{ color: data?.attendedEvent?.length > 0 ? '#1B5E20' : '#757575' }}>{data?.attendedEvent?.length}</Typography>
                            <Typography variant="subtitle1">Attended</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', bgcolor: data?.registeredEvent?.length > 0 ? '#BBDEFB' : '#E0E0E0', borderRadius: '12px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="h5" sx={{ color: data?.registeredEvent?.length > 0 ? '#0D47A1' : '#757575' }}>{data?.registeredEvent?.length}</Typography>
                            <Typography variant="subtitle1">Registered</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: 'center', bgcolor: data?.absentEvent?.length > 0 ? '#FFCDD2' : '#E0E0E0', borderRadius: '12px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="h5" sx={{ color: data?.absentEvent?.length > 0 ? '#B71C1C' : '#757575' }}>{data?.absentEvent?.length}</Typography>
                            <Typography variant="subtitle1" >Absent</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12} sx={{ mt: 2, ml: 3 }}>
             

                        <Grid container spacing={2}>
                            <Grid item md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Event Statistics</Typography>
                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Events attended:
                                        </Typography>
                                        <Box display="flex" justifyContent="space-around" alignItems="center">
                                            <PieChart width={400} height={400}>
                                                <Pie
                                                    data={data?.attendedEventCategory}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="40%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                >
                                                    {data?.attendedEventCategory && (data?.attendedEventCategory.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    )))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend align="right" verticalAlign="middle" layout="vertical" />
                                            </PieChart>

                                        </Box>
                                    </CardContent>
                                </Card></Grid>
                            <Grid item md={6}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>View Attendance Records</Typography>
                                <Box sx={{ maxHeight: 450, overflow: 'auto' }}>
                                <List>
                                    {data?.eventHistory && (data?.eventHistory?.map((item, index) => (
                                        <ListItem key={index} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', padding: '10px' }}>
                                            <ListItemText
                                                primary={<span style={{ fontWeight: 'bold' }}>{item.event.title}</span>}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textSecondary"
                                                            style={{ marginRight: '10px' }}
                                                        >
                                                            {`${dayjs(item.event.startDateTime).format('DD/MM/YYYY HH:mm')} - ${dayjs(item.event.endDateTime).format('DD/MM/YYYY HH:mm')}`}
                                                        </Typography>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color={item.isAttended === true ? "primary" : "error"}
                                                        >
                                                            {item.isAttended === true ? "Attended" : "Absent"}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    )))}
                                </List>
                                </Box>
                                </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                {showRegisterDialog && (<RegisterEvent open={showRegisterDialog} handleClose={handleCloseRegisterDialog} eventId={selectedRowId} />)}
            </Grid>
        </Box>
    );
}

export default WorkoutMain;
