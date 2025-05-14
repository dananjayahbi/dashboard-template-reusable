'use client';

import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Paper, Grid, Card, Switch, Divider } from '@mui/material';
import { useThemeContext, ThemeMode, ThemeColor } from '../../contexts/ThemeContext';
import { Check, DarkMode, LightMode, SettingsBrightness } from '@mui/icons-material';

export default function ThemeSettings() {
  const { mode, setMode, primaryColor, setPrimaryColor, denseMode, setDenseMode } = useThemeContext();

  // Theme color options
  const colorOptions: { value: ThemeColor; label: string; color: string }[] = [
    { value: 'blue', label: 'Blue', color: '#1976d2' },
    { value: 'purple', label: 'Purple', color: '#9c27b0' },
    { value: 'green', label: 'Green', color: '#2e7d32' },
    { value: 'orange', label: 'Orange', color: '#ed6c02' },
    { value: 'red', label: 'Red', color: '#d32f2f' },
    { value: 'cyan', label: 'Cyan', color: '#0288d1' },
  ];

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Appearance Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Customize the appearance of your dashboard by choosing a color theme and display mode.
      </Typography>

      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom fontWeight="500">
          Theme Mode
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Choose how you'd like your dashboard to appear
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={4}>
            <Card 
              sx={{ 
                p: 2, 
                textAlign: 'center', 
                cursor: 'pointer',
                border: mode === 'light' ? '2px solid' : '1px solid',
                borderColor: mode === 'light' ? 'primary.main' : 'divider',
                backgroundColor: mode === 'light' ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: mode === 'light' ? 'primary.main' : 'primary.light',
                  backgroundColor: mode === 'light' ? 'rgba(25, 118, 210, 0.04)' : 'rgba(0, 0, 0, 0.02)',
                }
              }}
              onClick={() => setMode('light')}
            >
              <LightMode sx={{ fontSize: 36, color: mode === 'light' ? 'primary.main' : 'action.active', mb: 1 }} />
              <Typography variant="body1" fontWeight={mode === 'light' ? 500 : 400}>Light Mode</Typography>
            </Card>
          </Grid>
          
          <Grid size={4}>
            <Card 
              sx={{ 
                p: 2, 
                textAlign: 'center', 
                cursor: 'pointer',
                border: mode === 'dark' ? '2px solid' : '1px solid',
                borderColor: mode === 'dark' ? 'primary.main' : 'divider',
                backgroundColor: mode === 'dark' ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: mode === 'dark' ? 'primary.main' : 'primary.light',
                  backgroundColor: mode === 'dark' ? 'rgba(25, 118, 210, 0.04)' : 'rgba(0, 0, 0, 0.02)',
                }
              }}
              onClick={() => setMode('dark')}
            >
              <DarkMode sx={{ fontSize: 36, color: mode === 'dark' ? 'primary.main' : 'action.active', mb: 1 }} />
              <Typography variant="body1" fontWeight={mode === 'dark' ? 500 : 400}>Dark Mode</Typography>
            </Card>
          </Grid>

          <Grid size={4}>
            <Card 
              sx={{ 
                p: 2, 
                textAlign: 'center', 
                cursor: 'pointer',
                border: mode === 'system' ? '2px solid' : '1px solid',
                borderColor: mode === 'system' ? 'primary.main' : 'divider',
                backgroundColor: mode === 'system' ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: mode === 'system' ? 'primary.main' : 'primary.light',
                  backgroundColor: mode === 'system' ? 'rgba(25, 118, 210, 0.04)' : 'rgba(0, 0, 0, 0.02)',
                }
              }}
              onClick={() => setMode('system')}
            >
              <SettingsBrightness sx={{ fontSize: 36, color: mode === 'system' ? 'primary.main' : 'action.active', mb: 1 }} />
              <Typography variant="body1" fontWeight={mode === 'system' ? 500 : 400}>System</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
        <Box>
        <Typography variant="subtitle1" gutterBottom fontWeight="500">
          Primary Color
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Choose a primary color for your dashboard theme
        </Typography>
        
        <Grid container spacing={2}>
          {colorOptions.map((option) => (
            <Grid size={{ xs: 4, sm: 2 }} key={option.value}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setPrimaryColor(option.value)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    backgroundColor: option.color,
                    borderRadius: '50%',
                    position: 'relative',
                    transition: 'all 0.2s',
                    border: primaryColor === option.value ? '2px solid white' : 'none',
                    boxShadow: primaryColor === option.value 
                      ? `0 0 0 4px ${option.color}40, 0 8px 16px 0 rgba(0,0,0,0.1)` 
                      : '0 2px 8px 0 rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  {primaryColor === option.value && (
                    <Check sx={{ color: 'white', fontSize: 24 }} />
                  )}
                </Box>
                <Typography 
                  variant="caption" 
                  align="center" 
                  display="block" 
                  sx={{ 
                    mt: 1,
                    fontWeight: primaryColor === option.value ? 'medium' : 'normal'
                  }}
                >
                  {option.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />      <Box>
        <Typography variant="subtitle1" gutterBottom fontWeight="500">
          Dense Mode
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Increase screen density for compact view
          </Typography>
          <Switch 
            checked={denseMode}
            onChange={(e) => setDenseMode(e.target.checked)}
            color="primary"
          />
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Makes all UI components more compact. Changes will apply immediately.
        </Typography>
      </Box>
    </Paper>
  );
}
