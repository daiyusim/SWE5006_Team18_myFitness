import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Typography, Box, Grid, Divider, CardContent, Card, Chip, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useLoading } from "../shared/LoadingContext";
import './Workout.css';

const mockData = [
    { name: 'Workout', value: 30 },
    { name: 'Fitness', value: 20 },
    { name: 'Yoga', value: 50 },
    { name: 'Dance', value: 50 },
];

const lineChartData = [
    { month: 'January', activities: 40 },
    { month: 'February', activities: 32 },
    { month: 'March', activities: 50 },
    { month: 'April', activities: 65 },
    { month: 'May', activities: 55 },
    { month: 'June', activities: 70 },
    { month: 'July', activities: 0 },
    { month: 'Auguest', activities: 0 },
    { month: 'September', activities: 55 },
    { month: 'November', activities: 70 },
    { month: 'December', activities: 70 },
];

const eventDetails = {
    title: "Annual Tech Conference",
    registrationDates: "April 1 - April 30",
    category: "Technology"
};

const COLORS = ['#FF5733', '#FFC300', '#36A2EB', '#4BC0C0', '#9966FF'];

export const WorkoutMain = () => {
    const [records, setRecords] = useState(null);
    const [eventRecord, setEventRecord] = useState(10);
    const { setLoading } = useLoading();
    const fetchEvents = () => {
        setLoading(true);
        fetch("api/event")
            .then(r => r.json())
            .then(res => {
                console.log(res);
                const events = res.map(event => ({
                    id: event.id,
                    title: event.title,
                    date: event.startDateTime,
                    description: event.description
                }));
                setRecords(events);
            })
            .catch(e => console.log("Error fetching events", e))
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        setLoading(true);
        fetchEvents();
    }, []);

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Workout Dashboard</Typography>
                    <Divider />
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2, ml: 1 }}>
                    <Grid item md={8} xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Recent Events Attended</Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 1, mb: 2 }}>Join New Event</Button>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <Box className="card-container" sx={{ width: 500, height: 400, perspective: 1000 }}>
                                    <Box className="card-inner">
                                        <Card className="card-front" sx={{ width: '100%', height: '100%' }}>
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    EVENTS ATTENDED
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card className="card-back" sx={{ width: '100%', height: '100%', position: 'absolute', top: 0 }}>
                                            <CardContent>
                                                <Typography variant="body1">
                                                    Event Details
                                                </Typography>
                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Title</TableCell>
                                                                <TableCell align="right">Registration Dates</TableCell>
                                                                <TableCell align="right">Category</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {eventDetails.title}
                                                                </TableCell>
                                                                <TableCell align="right">{eventDetails.registrationDates}</TableCell>
                                                                <TableCell align="right">{eventDetails.category}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Box className="card-container" sx={{ width: 500, height: 400, perspective: 1000 }}>
                                    <Box className="card-inner">
                                        <Card className="card-front" sx={{ width: '100%', height: '100%' }}>
                                            <CardContent>
                                                <Typography variant="h5" component="div">
                                                    EVENTS NOT ATTENDED
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card className="card-back" sx={{ width: '100%', height: '100%', position: 'absolute', top: 0 }}>
                                            <CardContent>
                                                <Typography variant="body1">
                                                    Event Details
                                                </Typography>
                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 450 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Title</TableCell>
                                                                <TableCell align="right">Registration Dates</TableCell>
                                                                <TableCell align="right">Category</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {eventDetails.title}
                                                                </TableCell>
                                                                <TableCell align="right">{eventDetails.registrationDates}</TableCell>
                                                                <TableCell align="right">{eventDetails.category}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Upcoming Activities</Typography>
                        <Box className="custom-calendar-container">
                            <FullCalendar
                                plugins={[dayGridPlugin, timeGridPlugin]}
                                initialView="dayGridMonth"
                                contentWidth="1198"
                                events={records}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12} sx={{ mt: 2, ml: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Event Statistics</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>
                                Total Events Attended:
                            </Typography>
                            <Chip label={eventRecord} sx={{ marginTop: 'auto', marginBottom: 'auto' }} />
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item md={6}>
                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Events attended:
                                        </Typography>
                                        <Box display="flex" justifyContent="space-around" alignItems="center">
                                            <PieChart width={400} height={400}>
                                                <Pie
                                                    data={mockData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="40%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                    fill="#8884d8"
                                                >
                                                    {mockData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                                <Legend align="right" verticalAlign="middle" layout="vertical" />
                                            </PieChart>

                                        </Box>
                                    </CardContent>
                                </Card></Grid>
                            <Grid item md={6}>
                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Monthly Activity:
                                        </Typography>
                                        <LineChart width={700} height={400} data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="activities" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    );
}

export default WorkoutMain;
