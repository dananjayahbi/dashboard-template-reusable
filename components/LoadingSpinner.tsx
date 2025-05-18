'use client';

import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        height: '200px'
      }}
    >
      <CircularProgress size={40} sx={{ color: 'primary.main', mb: 2 }} />
      <Typography color="text.secondary" variant="body2">
        {message}
      </Typography>
    </Box>
  );
}
