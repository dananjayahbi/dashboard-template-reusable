'use client';

import { Box, Typography, Paper } from '@mui/material';
import PageHeader from '../components/layout/PageHeader';

export default function DashboardHome() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to your dashboard"
      />
      
      <Paper 
        elevation={1}
        sx={{ 
          p: { xs: 3, md: 4 },
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: 400,
          borderRadius: 2,
          width: '100%',
          mb: 4
        }}
      >
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Dashboard Template
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a blank dashboard template. Start building your content here.
        </Typography>
      </Paper>
    </>
  );
}
