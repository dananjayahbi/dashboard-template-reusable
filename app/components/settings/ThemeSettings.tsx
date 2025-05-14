'use client';

import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Paper, Grid } from '@mui/material';
import { useThemeContext, ThemeMode, ThemeColor } from '../../contexts/ThemeContext';
import { Check } from '@mui/icons-material';

export default function ThemeSettings() {
  const { mode, setMode, primaryColor, setPrimaryColor } = useThemeContext();

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
        Theme Settings
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Theme Mode
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            name="theme-mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as ThemeMode)}
            row
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            <FormControlLabel value="system" control={<Radio />} label="System" />
          </RadioGroup>
        </FormControl>
      </Box>
      
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Primary Color
        </Typography>        <Grid container spacing={2}>
          {colorOptions.map((option) => (
            <Grid size={{ xs: 4, sm: 2 }} key={option.value}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 48,
                  backgroundColor: option.color,
                  borderRadius: 1,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s',
                  border: primaryColor === option.value ? '2px solid white' : 'none',
                  boxShadow: primaryColor === option.value ? '0 0 0 2px rgba(0,0,0,0.3)' : 'none',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
                onClick={() => setPrimaryColor(option.value)}
              >
                {primaryColor === option.value && (
                  <Check sx={{ color: 'white' }} />
                )}
              </Box>
              <Typography variant="caption" align="center" display="block" sx={{ mt: 0.5 }}>
                {option.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}
