'use client';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'An authentication error occurred';
  
  // Map error codes to user-friendly messages
  if (error === 'CredentialsSignin') {
    errorMessage = 'Invalid email or password. Please try again.';
  } else if (error === 'OAuthAccountNotLinked') {
    errorMessage = 'This email is already associated with another account.';
  } else if (error === 'AccessDenied') {
    errorMessage = 'Access denied. You do not have permission to access this resource.';
  } else if (error === 'Verification') {
    errorMessage = 'The verification link is invalid or has expired.';
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Typography variant="h5" color="error" sx={{ mb: 2 }}>
        Authentication Error
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
        {errorMessage}
      </Typography>
        <Button
        component={Link}
        href="/auth"
        variant="contained"
        color="primary"
      >
        Return to Login
      </Button>
    </Box>
  );
}
