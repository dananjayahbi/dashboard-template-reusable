'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar,
  Stack,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Security as SecurityIcon,
  ColorLens as ColorLensIcon,
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  AltRoute as RouteIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  // If user is authenticated, redirect to dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);
  
  const features = [
    {
      title: 'Authentication & Authorization',
      description: 'Secure login system with role-based access control that protects your data and restricts access based on user roles.',
      icon: <SecurityIcon fontSize="large" />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Responsive Dashboard',
      description: 'Fully responsive dashboard that looks great on desktop, tablet, and mobile devices.',
      icon: <DashboardIcon fontSize="large" />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Theme Customization',
      description: 'Customize the look and feel with light and dark mode support and multiple color schemes.',
      icon: <ColorLensIcon fontSize="large" />,
      color: theme.palette.success.main,
    },
    {
      title: 'User Management',
      description: 'Comprehensive user management system with profiles, permissions, and administrative controls.',
      icon: <PeopleIcon fontSize="large" />,
      color: theme.palette.error.main,
    },
    {
      title: 'Admin Controls',
      description: 'Administrative tools for monitoring application performance, managing users, and system settings.',
      icon: <AdminIcon fontSize="large" />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Flexible Navigation',
      description: 'Customizable navigation with role-based menu items and responsive sidebar.',
      icon: <RouteIcon fontSize="large" />,
      color: theme.palette.info.main,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'background.paper',
          pt: 12,
          pb: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 6, md: 0 } }}>
              <Typography
                component="h1"
                variant="h2"
                fontWeight="bold"
                gutterBottom
              >
                Next.js Dashboard Template
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                A fully customizable dashboard template built with Next.js, TypeScript, Material-UI, MongoDB, and Prisma.
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2} 
                sx={{ 
                  mt: 4,
                  justifyContent: { xs: 'center', md: 'flex-start' } 
                }}
              >
                <Button 
                  variant="contained"
                  size="large"
                  onClick={() => router.push('/dashboard')}
                >
                  Go To Dashboard
                </Button>
                <Button 
                  variant="outlined"
                  size="large"
                  onClick={() => router.push('/auth/signin')}
                >
                  Sign In
                </Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              {/* Placeholder for dashboard preview image */}
              <Box
                sx={{
                  width: '100%',
                  height: 300,
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  boxShadow: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: { xs: 'none', md: 'perspective(1000px) rotateY(-10deg)' },
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: { xs: 'none', md: 'perspective(1000px) rotateY(0deg)' },
                  },
                }}
              >
                <Typography variant="body1" color="text.secondary">Dashboard Preview</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Key Features
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Everything you need to build a stunning admin dashboard
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card 
                  elevation={hoveredFeature === index ? 6 : 1} 
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    transform: hoveredFeature === index ? 'translateY(-8px)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <CardContent>
                    <Avatar 
                      sx={{ 
                        bgcolor: feature.color,
                        width: 56,
                        height: 56,
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography gutterBottom variant="h5" component="h3">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Theme Toggle Demo Section */}
      <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                component="h2"
                variant="h3"
                fontWeight="bold"
                gutterBottom
              >
                Light & Dark Mode
              </Typography>
              <Typography variant="body1" paragraph>
                The dashboard comes with both light and dark mode support. Users can toggle between themes based on their preference. The theme setting is persisted across sessions.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button 
                  variant="outlined" 
                  startIcon={<LightModeIcon />}
                  sx={{ borderRadius: 8 }}
                >
                  Light Mode
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<DarkModeIcon />}
                  color="secondary"
                  sx={{ borderRadius: 8 }}
                >
                  Dark Mode
                </Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ mt: { xs: 4, md: 0 }, textAlign: 'center' }}>
              {/* Theme toggle illustration */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: '45%',
                    height: 200,
                    bgcolor: '#ffffff',
                    color: '#000000',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>Light Theme</Typography>
                </Box>
                <Box
                  sx={{
                    width: '45%',
                    height: 200,
                    bgcolor: '#121212',
                    color: '#ffffff',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>Dark Theme</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: theme.palette.primary.main,
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            Start building your application with our customizable dashboard template.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="contained" 
              color="secondary"
              size="large"
              sx={{ px: 4, py: 1.5 }}
              onClick={() => router.push('/auth/signup')}
            >
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }} sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography variant="h6" gutterBottom>
                Dashboard Template
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A fully customizable admin dashboard template built with the latest web technologies.
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <Typography variant="body2" component="div">
                <Box sx={{ mb: 1 }}>Authentication</Box>
                <Box sx={{ mb: 1 }}>User Management</Box>
                <Box sx={{ mb: 1 }}>Theme Settings</Box>
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography variant="h6" gutterBottom>
                Resources
              </Typography>
              <Typography variant="body2" component="div">
                <Box sx={{ mb: 1 }}>Documentation</Box>
                <Box sx={{ mb: 1 }}>API Reference</Box>
                <Box sx={{ mb: 1 }}>Examples</Box>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Typography variant="h6" gutterBottom>
                Connect
              </Typography>
              <Typography variant="body2" component="div">
                <Box sx={{ mb: 1 }}>GitHub</Box>
                <Box sx={{ mb: 1 }}>Twitter</Box>
                <Box sx={{ mb: 1 }}>Contact</Box>
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 6, mb: 4 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Dashboard Template. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
