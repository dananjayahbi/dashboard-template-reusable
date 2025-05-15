'use client';

import { Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function Home() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Hi, James! 👋
        <Typography component="p" variant="body1" color="text.secondary" mt={1}>
          What are your plans for today?
        </Typography>
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        {/* Quick stat cards */}
        <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #f3f4f6' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="text.secondary" variant="body2">Total Revenue</Typography>
                <Typography variant="h6" fontWeight="bold">$24,780</Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: '#f0fdf4', 
                p: 1, 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <AttachMoneyIcon sx={{ color: '#22c55e' }} />
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #f3f4f6' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="text.secondary" variant="body2">Active Tasks</Typography>
                <Typography variant="h6" fontWeight="bold">15</Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: '#eff6ff', 
                p: 1, 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <AssignmentIcon sx={{ color: '#3b82f6' }} />
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #f3f4f6' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="text.secondary" variant="body2">Team Members</Typography>
                <Typography variant="h6" fontWeight="bold">8</Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: '#f0f9ff', 
                p: 1, 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <PeopleIcon sx={{ color: '#0ea5e9' }} />
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #f3f4f6' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="text.secondary" variant="body2">Growth</Typography>
                <Typography variant="h6" fontWeight="bold">+24%</Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: '#fef2f2', 
                p: 1, 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TrendingUpIcon sx={{ color: '#ef4444' }} />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
