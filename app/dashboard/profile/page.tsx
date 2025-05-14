'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Alert,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CameraAlt as CameraIcon,
  SecurityOutlined as SecurityIcon,
  Person as PersonIcon,
  NotificationsOutlined as NotificationsIcon,
} from '@mui/icons-material';
import PageHeader from '../../components/layout/PageHeader';
import { UserRole } from '../../types/auth';

// Interface for tab panel props
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Mock user data
const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  role: UserRole.ADMIN,
  createdAt: '2023-01-15T00:00:00Z',
  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
  bio: 'Software engineer with 10+ years of experience in web development.',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA'
};

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
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
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
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email,
    bio: mockUser.bio,
    phone: mockUser.phone,
    location: mockUser.location,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setProfileData({
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email,
      bio: mockUser.bio,
      phone: mockUser.phone,
      location: mockUser.location,
    });
    setIsEditing(false);
    setMessage(null);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
      
      setIsEditing(false);
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update profile. Please try again.'
      });
    } finally {
      setLoading(false);
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

      {message && (
        <Alert 
          severity={message.type} 
          sx={{ mb: 3 }}
          onClose={() => setMessage(null)}
        >
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                src={mockUser.avatarUrl}
                alt={`${mockUser.firstName} ${mockUser.lastName}`}
                sx={{ width: 120, height: 120, mb: 2, mx: 'auto' }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 0,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  width: 36,
                  height: 36,
                }}
              >
                <CameraIcon fontSize="small" />
              </IconButton>
            </Box>
            
            <Typography variant="h6" gutterBottom>
              {`${mockUser.firstName} ${mockUser.lastName}`}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {mockUser.email}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" gutterBottom>
                <strong>Role:</strong> {mockUser.role}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Member Since:</strong> {new Date(mockUser.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="profile tabs"
                variant="scrollable"
                scrollButtons="auto"
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
              <Box sx={{ p: 1 }}>
                {!isEditing ? (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                    variant="outlined"
                    sx={{ mb: 3, float: 'right' }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ mb: 3, float: 'right', display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                      variant="outlined"
                      color="error"
                    >
                      Cancel
                    </Button>
                    <Button
                      startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                      onClick={handleSave}
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </Box>
                )}
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      multiline
                      rows={3}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Location"
                      name="location"
                      value={profileData.location}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                      disabled={!isEditing}
                    />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
            
            <TabPanel value={value} index={1}>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Change Password
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      label="Current Password"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      label="New Password"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      label="Confirm New Password"
                      fullWidth
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                      Update Password
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </TabPanel>
            
            <TabPanel value={value} index={2}>
              <Typography variant="body1">
                Notification preferences will be implemented soon.
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
