import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Box, Container, Grid, IconButton, Paper, LinearProgress, Link } from '@mui/material';
import { LinkedIn, GitHub, CheckCircleOutline, School as SchoolIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import profileApi from '../../../services/profileApi';
import AboutImage from '../../../assets/about.jpg';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaymentIcon from '@mui/icons-material/Payment';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
    const currentUser = useSelector((state) => state.auth.login?.currentUser);
    const [profile, setProfile] = useState();

    useEffect(() => {
        const getData = async () => {
            const res = await profileApi.getUserProfile();
            setProfile(res);
        };
        getData();
    }, []);

    return (
        <Container>
            <Grid container spacing={4}>
                {/* Left Section */}
                <Grid item xs={12} md={8}>
                    <section id="profile" className="flex flex-col items-center py-12 bg-gray-100 rounded-lg shadow-md">
                        <Avatar alt="Avatar" src={currentUser?.avatar} sx={{ height: 80, width: 80 }} className="shadow-lg" />
                        <Typography sx={{ fontSize: '1.25rem' }} className="mt-4">Hello, I'm</Typography>
                        <Typography sx={{ fontSize: '3rem', fontWeight: 'bold' }} className="font-bold">{profile?.name}</Typography>
                        <Typography sx={{ fontSize: '1.25rem' }} className="text-gray-600">Backend Developer</Typography>
                        <Typography sx={{ fontSize: '1rem', textAlign: 'center', marginTop: '1rem', paddingX: '1rem' }}>I am a backend developer who is always dedicated to my work and ready when a new job comes up.</Typography>
                        <Box className="flex mt-4 space-x-4">
                            <IconButton href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
                                <LinkedIn />
                            </IconButton>
                            <IconButton href="https://www.github.com" target="_blank" aria-label="GitHub">
                                <GitHub />
                            </IconButton>
                        </Box>
                    </section>

                    <section id="about" className="py-12">
                        <Typography sx={{ fontSize: '1.5rem', textAlign: 'center' }}>Get To Know More</Typography>
                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 'bold', textAlign: 'center' }}>About Me</Typography>
                        <Grid container spacing={4} className="mt-8">
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} className="p-4">
                                    <img src={AboutImage} alt="About" className="w-full rounded-lg" />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} className="space-y-6">
                                <Paper elevation={3} className="p-4">
                                    <Box>
                                        <div className="flex items-center mb-2">
                                            <CheckCircleOutline color="info" className="mr-3" />
                                            <Typography sx={{ fontSize: '1.25rem' }}>Education</Typography>
                                        </div>
                                        {profile ? (profile.educations.length ? (
                                            profile.educations.map((edu, index) => (
                                                <Box key={index} mb={2} border="1px solid #ccc" borderRadius={5} p={2}>
                                                    <Typography sx={{ fontSize: '1rem' }}>Đại học/Cao đẳng: {edu.universityCollege}</Typography>
                                                    <Typography sx={{ fontSize: '1.25rem' }}>Bằng cấp: {edu.degree}</Typography>
                                                    <Typography sx={{ fontSize: '1rem' }}>Thời gian hoàn thành: {`${edu.start.year} - ${edu.end.year}`}</Typography>
                                                </Box>
                                            ))
                                        ) : <Typography sx={{ fontSize: '1rem' }}>Hiện chưa có bất kì học vấn nào</Typography>) : <LinearProgress />}
                                    </Box>
                                </Paper>
                                <Paper elevation={3} className="p-4">
                                    <Box>
                                        <div className="flex items-center mb-2">
                                            <SchoolIcon color="info" className="mr-3" />
                                            <Typography sx={{ fontSize: '1.25rem' }}>Experience</Typography>
                                        </div>
                                        {profile ? (profile.experiences.length ? (
                                            profile.experiences.map((exp, index) => (
                                                <Box key={index} mb={2} border="1px solid #ccc" borderRadius={5} p={2}>
                                                    <Typography sx={{ fontSize: '1.25rem' }}>{exp.title}</Typography>
                                                    <Typography sx={{ fontSize: '1rem' }}>Thời gian làm việc: {`${exp.start.year} - ${exp.end.year}`}</Typography>
                                                    <Typography sx={{ fontSize: '1rem', color: 'gray' }}>Mô tả ngắn: {exp.summary}</Typography>
                                                </Box>
                                            ))
                                        ) : <Typography sx={{ fontSize: '1rem' }}>Hiện chưa có bất kì kinh nghiệm nào</Typography>) : <LinearProgress />}
                                    </Box>
                                </Paper>
                                <Paper elevation={3} className="p-4">
                                    <div className="flex items-center mb-2">
                                        <DescriptionIcon color="info" className="mr-3" />
                                        <Typography sx={{ fontSize: '1.25rem' }}>Cơ bản về tôi</Typography>
                                    </div>
                                    <Typography sx={{ fontSize: '1rem', color: 'gray' }}>{profile?.description}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </section>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={4}>
                    <Box className="space-y-6">
                        <Paper elevation={3} className="p-4">
                            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Thông tin xác thực</Typography>
                            <Box className="mt-4 space-y-2">
                                <Grid container>
                                    <Grid item xs={12} md={9}>
                                        <Box className="flex items-center">
                                            <VerifiedUserIcon color='warning' />
                                            <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>Xác thực cá nhân</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Link href="#" underline="hover">
                                            <Typography>Xác thực</Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} md={9}>
                                        <Box className="flex items-center">
                                            <PaymentIcon color='warning' />
                                            <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>Xác thực thanh toán</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Link href="#" underline="hover">
                                            <Typography>Xác thực</Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} md={9}>
                                        <Box className="flex items-center">
                                            <PhoneAndroidIcon color='warning' />
                                            <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>Xác thực số điện thoại</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Link href="#" underline="hover">
                                            <Typography>Xác thực</Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} md={11}>
                                        <Box className="flex items-center">
                                            <EmailIcon color='success' />
                                            <Typography sx={{ fontSize: '1rem', marginLeft: '0.5rem' }}>Xác thực Email</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <CheckCircleIcon color='success' fontSize='medium' />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>

                        <Paper elevation={3} className="p-4">
                            <Grid container>
                                <Grid item xs={12} md={11}>
                                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold', paddingTop: '8px' }}>Kĩ năng nổi bật</Typography>
                                </Grid>
                                <Grid item xs={12} md={1}>
                                    <IconButton
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                transition: 'color 0.3s',
                                            },
                                            '&:hover .MuiSvgIcon-root': {
                                                color: 'blue',
                                            },
                                        }}>
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Box className="mt-4 space-y-2">
                                <Typography sx={{ fontSize: '1rem' }}>JavaScript</Typography>
                                <Typography sx={{ fontSize: '1rem' }}>HTML</Typography>
                                <Typography sx={{ fontSize: '1rem' }}>Shopify</Typography>
                                <Typography sx={{ fontSize: '1rem' }}>React.js</Typography>
                            </Box>
                        </Paper>

                        <Paper elevation={3} className="p-4">
                            <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Chứng chỉ</Typography>
                            <Box className="mt-4">
                                <Typography sx={{ fontSize: '1rem' }}>You don't have any certifications yet.</Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Profile;
