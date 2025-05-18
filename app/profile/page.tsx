'use client';

import { Box, Typography, Paper, Container, Avatar, Divider } from '@mui/material';

export default function ProfilePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '1px solid #f3f4f6' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Avatar
            sx={{ width: 100, height: 100, mb: 2 }}
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User Profile"
          />
          <Typography variant="h4" fontWeight="bold">John Doe</Typography>
          <Typography variant="body1" color="text.secondary">john.doe@example.com</Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Profile Information
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2, mt: 2 }}>
            <Typography variant="body1" color="text.secondary">Role:</Typography>
            <Typography variant="body1">Administrator</Typography>
            
            <Typography variant="body1" color="text.secondary">Department:</Typography>
            <Typography variant="body1">Engineering</Typography>
            
            <Typography variant="body1" color="text.secondary">Location:</Typography>
            <Typography variant="body1">New York</Typography>
            
            <Typography variant="body1" color="text.secondary">Joined:</Typography>
            <Typography variant="body1">January 15, 2023</Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
