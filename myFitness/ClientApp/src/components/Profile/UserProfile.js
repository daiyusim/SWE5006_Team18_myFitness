import React, { useState, useEffect } from "react";
import {
    Avatar,
    Divider,
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    getInputUtilityClass,
} from "@mui/material";
import { useLoading } from '../shared/LoadingContext';
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import ProfileForm from "./ProfileForm";

export const UserProfile = () => {
    const [isEdit, setIsEdit] = useState(null);
    const [showProfileFrom, setShowProfileForm] = useState(false);
    const [profileInfo, setProfileInfo] = useState(null);
    const { setLoading } = useLoading();

    const handleOpenProfileForm = () => {
        if (profileInfo?.profile) {
            setIsEdit(true);
        }
        setShowProfileForm(true);
    };

    const handleCloseProfileForm = () => {
        setShowProfileForm(false);
        setIsEdit(false);
        fetchProfileDetails();
    };

    useEffect(() => {
        setLoading(true);
        fetchProfileDetails();
    }, []);
    const fetchProfileDetails = async () => {
        const UserId = '65ec5ee7d4ba1c372f054549'; // hardcode first, later use persistent userid
        try {
            const response = await fetch(`/api/users/${UserId}`);
            if (!response.ok) {
                setLoading(false);
                setProfileInfo(null);
                return;
            }
            const data = await response.json();
            console.log(data);
            if (data === null) {
                setProfileInfo(null);
            } else {
                setProfileInfo(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setProfileInfo(null);
            setLoading(false);
        }
    }
    return (
        <Box sx={{ marginTop: "1rem", marginBottom: "2rem" }}>
            <Grid container>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        marginRight: "0.5rem",
                        fontSize: "1.5rem",
                    }}
                >
                    Profile
                </Typography>
                <Grid item md={12}>
                    <Divider
                        sx={{ padding: "0.5rem 0.75rem", marginBottom: "1.75rem" }}
                    />
                </Grid>
                <Grid item md={1.5}></Grid>
                <Grid item md={9}>
                    <Card sx={{ borderRadius: "15px", backgroundColor: "white" }}>
                        <CardContent>
                            <Container className="container py-5">
                                <Grid container justifyContent="center">
                                    <Grid item md={12} xl={4}>
                                        <Box textAlign="center">
                                            <Avatar
                                                sx={{
                                                    bgcolor: "#000080",
                                                    width: 100,
                                                    height: 100,
                                                    margin: "0 auto",
                                                }}
                                            >
                                                <PersonIcon sx={{ fontSize: 60 }} />
                                            </Avatar>
                                            <Typography variant="h4">{profileInfo?.name}</Typography>
                                            <Typography
                                                variant="body2"
                                                className="text-muted mb-4"
                                            >
                                                {profileInfo?.emailAddress}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                size="large"
                                                startIcon={<EditIcon />}
                                                onClick={() => handleOpenProfileForm(true)}
                                                sx={{
                                                    borderRadius: "3rem",
                                                    marginTop: "1rem",
                                                    marginBottom: "1rem",
                                                }}
                                            >
                                                {profileInfo?.profile ? "Edit Profile" : "Setup Profile"}
                                            </Button>
                                            {
                                                profileInfo?.profile && (<Grid container>
                                                    <Grid item md={4}>
                                                        <Typography variant="h5" gutterBottom>
                                                            {profileInfo?.profile?.gender}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            className="small text-muted mb-0"
                                                        >
                                                            Gender
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant="h5" gutterBottom>
                                                            {profileInfo?.profile?.height}cm
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            className="small text-muted mb-0"
                                                        >
                                                            Height CM
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <Typography variant="h5" gutterBottom>
                                                            {profileInfo?.profile?.weight}KG
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            className="small text-muted mb-0"
                                                        >
                                                            Weight
                                                        </Typography>
                                                    </Grid>
                                                </Grid>)
                                            }

                                        </Box>
                                    </Grid>
                                </Grid>
                                {
                                    profileInfo?.profile && (
                                    <Grid container justifyContent="center">
                                    <Grid item md={12} xl={12}>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: "bold", marginTop: "1rem" }}
                                        >
                                            Interests
                                        </Typography>
                                        <Divider className="mt-0 mb-4" />
                                        <Grid container spacing={3}>
                                            <Grid item md={6} xl={6} className="mb-3">
                                                        <Typography variant="h6"> {profileInfo?.profile?.interests.join(', ')}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={12} xl={12}>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: "bold", marginTop: "1rem" }}
                                        >
                                            Goals
                                        </Typography>
                                        <Divider className="mt-0 mb-4" />
                                        <Grid container spacing={3}>
                                            <Grid item md={6} xl={6} className="mb-3">
                                                        <Typography variant="h6"> {profileInfo?.profile?.goals}</Typography>
                                            </Grid>
                                            <Grid item md={6} xl={6} className="mb-3">
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                        </Grid>
                                    )}

                            </Container>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={1.5}></Grid>
            </Grid>
            {showProfileFrom && (
                <Box>
                    {isEdit ? (
                        <ProfileForm open={showProfileFrom} isEdit={isEdit} handleClose={handleCloseProfileForm} profileInfo={profileInfo} />
                    ) : (
                            <ProfileForm open={showProfileFrom} isEdit={isEdit} handleClose={handleCloseProfileForm} profileInfo={profileInfo} />
                    )}
                </Box>
            )}
        </Box>
    );
};

export default UserProfile;
