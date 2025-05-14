'use client';

import { useState } from 'react';
import { Box, Grid, Paper, Tab, Tabs } from '@mui/material';
import PageHeader from '../../components/layout/PageHeader';
import ThemeSettings from '../../components/settings/ThemeSettings';
import { Settings as SettingsIcon, Palette as PaletteIcon, Security as SecurityIcon } from '@mui/icons-material';

// Interface for tab panel props
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Tab Panel component
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

// Function to get tab accessibility props
function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

export default function SettingsPage() {
  // State for current tab
  const [value, setValue] = useState(0);

  // Handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Customize your dashboard experience"
        breadcrumbs={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/settings', label: 'Settings' },
        ]}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="settings tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab 
                  label="Appearance" 
                  icon={<PaletteIcon />} 
                  iconPosition="start" 
                  {...a11yProps(0)} 
                />
                <Tab 
                  label="General" 
                  icon={<SettingsIcon />} 
                  iconPosition="start" 
                  {...a11yProps(1)} 
                />
                <Tab 
                  label="Security" 
                  icon={<SecurityIcon />} 
                  iconPosition="start" 
                  {...a11yProps(2)} 
                />
              </Tabs>
            </Box>
            
            <TabPanel value={value} index={0}>
              <ThemeSettings />
            </TabPanel>
            
            <TabPanel value={value} index={1}>
              <Paper elevation={0} sx={{ p: 3 }}>
                General settings content will go here
              </Paper>
            </TabPanel>
            
            <TabPanel value={value} index={2}>
              <Paper elevation={0} sx={{ p: 3 }}>
                Security settings content will go here
              </Paper>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
