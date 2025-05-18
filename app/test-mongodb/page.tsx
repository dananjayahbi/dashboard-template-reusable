'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';

export default function TestMongoDBPage() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function checkDBStatus() {
      try {
        const response = await fetch('/api/mongodb-status');
        const result = await response.json();

        if (response.ok) {
          setStatus('connected');
          setData(result);
        } else {
          setStatus('error');
          setError(result.message || 'Failed to connect to MongoDB');
        }
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    }

    checkDBStatus();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        MongoDB Connection Test
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 2 }}>
        {status === 'loading' && (
          <Typography>Testing MongoDB connection...</Typography>
        )}

        {status === 'error' && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || 'Failed to connect to MongoDB'}
          </Alert>
        )}

        {status === 'connected' && (
          <>
            <Alert severity="success" sx={{ mb: 3 }}>
              Successfully connected to MongoDB!
            </Alert>
            
            <Typography variant="subtitle1" fontWeight="bold">
              Database Details:
            </Typography>
            <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4, overflow: 'auto' }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </>
        )}
      </Paper>
    </Box>
  );
}
