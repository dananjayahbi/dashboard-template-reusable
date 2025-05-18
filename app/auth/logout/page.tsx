'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function LogoutPage() {  useEffect(() => {
    const performLogout = async () => {
      await signOut({ callbackUrl: '/auth' });
    };
    
    performLogout();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h6">Logging out...</Typography>
    </Box>
  );
}
