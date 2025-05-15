'use client';

import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Hi, James! 👋
        <Typography component="p" variant="body1" color="text.secondary" mt={1}>
          What are your plans for today?
        </Typography>
      </Typography>
    </Box>
  );
}
