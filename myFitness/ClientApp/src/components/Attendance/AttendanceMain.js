import React, { useState, useEffect } from 'react';
import { Link, TableSortLabel, Table, TableBody, TableFooter, TableContainer, TableHead, TableRow, Select, MenuItem, InputAdornment, Divider, Box, Chip, Typography, FormControl, Grid, FormGroup, TextField, Button, FormLabel, FormControlLabel, Container } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useLoading } from "../shared/LoadingContext";


export const AttendanceMain = () => {
    const [records, setRecords] = useState(null);
    const { setLoading } = useLoading();
    useEffect(() => {
        setLoading(true);
        fetch("api/event")
            .then(r => r.json())
            .then(res => {
                console.log(res);
                const events = res.map(event => ({
                    id: event.id,
                    title: event.title,
                    date: event.startDateTime
                }));
                setRecords(events);
            })
            .catch(e => console.log("Error fetching events", e))
            .finally(() => setLoading(false));
    }, []);

    const handleEventClick = (eventInfo) => {
        console.log('Event ID:', eventInfo.event.id);
        console.log('Event Title:', eventInfo.event.title);
        console.log('Event Date:', eventInfo.event.start);
        console.log('Description:', eventInfo.event.extendedProps.description);
    };
    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Grid container>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: '0.5rem', fontSize: '1.5rem' }}>Attendances</Typography>
                <Grid item md={12}>
                    <Divider sx={{ padding: '0.5rem 0.75rem', marginBottom: '0.75rem' }} />

                </Grid>
                <Grid item md={12} sx={{ maxHeight: '600px', overflow: 'auto' }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        events={records}
                        eventClick={handleEventClick}
                    />
                </Grid>
            </Grid>

        </Box>
    );
}


export default AttendanceMain;