'use client';

import { Box, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  
  const userName = session?.user?.name?.split(' ')[0] || 'Guest';
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Hi, {userName}! 👋
        <Typography component="p" variant="body1" color="text.secondary" mt={1}>
          What are your plans for today?
        </Typography>
      </Typography>
    </Box>
  );
}
