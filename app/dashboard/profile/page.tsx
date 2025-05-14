'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Tabs,
  Tab,
  Alert,
  Button,
  Stack,
  TextField
} from '@mui/material';
import {
  Person as PersonIcon,
  SecurityOutlined as SecurityIcon,
  NotificationsOutlined as NotificationsIcon
} from '@mui/icons-material';
import PageHeader from '../../components/layout/PageHeader';
import ProfileSettings from '../../components/settings/ProfileSettings';
import { User, UserRole } from '../../types/auth';

// Mock user data
const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  role: UserRole.ADMIN,
  createdAt: '2023-01-15T00:00:00Z',
  image: 'https://mui.com/static/images/avatar/1.jpg',
  bio: 'Software engineer with 10+ years of experience in web development.',
  phoneNumber: '+1 (555) 123-4567',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'USA'
  }
};

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
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Function to get tab accessibility props
function a11yProps(index: number) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

export default function ProfilePage() {
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSaveProfile = async (userData: Partial<User>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message (this will be handled by the ProfileSettings component)
      console.log('Saving profile data:', userData);
      
      // In a real application, you would send this data to your API
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving profile:', error);
      return Promise.reject(error);
    }
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="View and update your profile information"
        breadcrumbs={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/profile', label: 'Profile' },
        ]}
      />

      <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden', mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="profile tabs"
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                fontWeight: 500
              }
            }}
          >
            <Tab 
              label="Personal Info" 
              icon={<PersonIcon />} 
              iconPosition="start" 
              {...a11yProps(0)} 
            />
            <Tab 
              label="Security" 
              icon={<SecurityIcon />} 
              iconPosition="start" 
              {...a11yProps(1)} 
            />
            <Tab 
              label="Notifications" 
              icon={<NotificationsIcon />} 
              iconPosition="start" 
              {...a11yProps(2)} 
            />
          </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
          <ProfileSettings 
            initialData={mockUser} 
            onSave={handleSaveProfile} 
          />
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <Card elevation={0} sx={{ p: 3, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <Stack spacing={3} sx={{ maxWidth: 500, mt: 3 }}>
              <TextField
                type="password"
                label="Current Password"
                fullWidth
                variant="outlined"
              />
              <TextField
                type="password"
                label="New Password"
                fullWidth
                variant="outlined"
              />
              <TextField
                type="password"
                label="Confirm New Password"
                fullWidth
                variant="outlined"
              />
              <Button 
                variant="contained" 
                color="primary"
                sx={{ alignSelf: 'flex-start', mt: 1 }}
              >
                Update Password
              </Button>
            </Stack>
          </Card>
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <Card elevation={0} sx={{ p: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <NotificationsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Manage how you receive notifications and alerts from the dashboard.
            </Typography>
            <Button variant="outlined" disabled>
              Coming Soon
            </Button>
          </Card>
        </TabPanel>
      </Card>
    </>
  );
}
