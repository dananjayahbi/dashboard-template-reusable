'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import {
  Email as EmailIcon,
} from '@mui/icons-material';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implement actual password reset API call
      // For now, simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSuccess(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: (theme) => 
          theme.palette.mode === 'light' 
            ? theme.palette.grey[100] 
            : theme.palette.grey[900]
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4" fontWeight="bold" mb={3}>
            Forgot Password
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {success ? (
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Password reset link has been sent to your email address.
              </Alert>
              <Typography variant="body1" paragraph>
                Please check your email inbox for instructions on how to reset your password. 
                The link will expire after 24 hours.
              </Typography>              <Link 
                href="/auth/signin"
                style={{ textDecoration: 'none' }}
              >
                <MuiLink component="span">
                  Return to sign in
                </MuiLink>
              </Link>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <Typography variant="body1" color="text.secondary" paragraph>
                Enter your email address and we'll send you a link to reset your password.
              </Typography>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>                <Link 
                  href="/auth/signin"
                  style={{ textDecoration: 'none' }}
                >
                  <MuiLink variant="body2" component="span">
                    Back to Sign In
                  </MuiLink>
                </Link>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
