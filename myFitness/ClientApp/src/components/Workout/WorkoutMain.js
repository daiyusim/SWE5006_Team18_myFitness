import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Typography, Box, Grid, Divider, CardContent, Card, Chip } from '@mui/material';

const mockData = [
    { name: 'Workout', value: 30 },
    { name: 'Fitness', value: 20 },
    { name: 'Yoga', value: 50 },
    { name: 'Dance', value: 50 },

];

const COLORS = ['#FF5733', '#FFC300', '#36A2EB', '#4BC0C0', '#9966FF'];

export const WorkoutMain = () => {

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Workout Dashboard</Typography>
                    <Divider />
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Event Statistics</Typography>
                    <Grid container spacing={2}>
                    <Grid item md={6}> 
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Events attended:
                            </Typography>
                            <Box display="flex" justifyContent="space-around" alignItems="center">
                                <PieChart width={400} height={300}>
                                    <Pie
                                        data={mockData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="40%"  // Adjust the center x-coordinate to give more space for the legend on the right
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
                                Events attended:
                            </Typography>
                            <Box display="flex" justifyContent="space-around" alignItems="center">
                                <PieChart width={400} height={300}>
                                    <Pie
                                        data={mockData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="40%"  // Adjust the center x-coordinate to give more space for the legend on the right
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
                    </Grid>
                  
                </Grid>
                <Grid item md={6} xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Upcoming Activities</Typography>
                    {/* Place for upcoming activities */}
                </Grid>
            </Grid>
        </Box>
    );
}

export default WorkoutMain;
