'use client';

import { useState } from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  IconButton, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Switch,
  Avatar,
  Button,
  TextField,
  Stack,
} from '@mui/material';
import { 
  Settings as SettingsIcon, 
  Palette as PaletteIcon, 
  Security as SecurityIcon,
  KeyboardArrowRight as ArrowIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
  LockPerson as PrivacyIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import PageHeader from '../../components/layout/PageHeader';
import ThemeSettings from '../../components/settings/ThemeSettings';

interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick: () => void;
  active?: boolean;
}

const SettingsSection = ({ title, icon, description, onClick, active }: SettingsSectionProps) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer', 
        borderLeft: active ? 4 : 0, 
        borderColor: active ? 'primary.main' : 'transparent',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Avatar 
          sx={{ 
            bgcolor: active ? 'primary.main' : 'action.selected',
            mr: 2,
            color: active ? 'primary.contrastText' : 'text.primary',
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight={active ? 600 : 400}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
        <ChevronRightIcon color={active ? 'primary' : 'action'} />
      </CardContent>
    </Card>
  );
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string>('appearance');

  // Settings sections data
  const settingsSections = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: <PaletteIcon />,
      description: 'Customize the look and feel of your dashboard'
    },
    {
      id: 'general',
      title: 'General',
      icon: <SettingsIcon />,
      description: 'Basic settings for your dashboard experience'
    },
    {
      id: 'security',
      title: 'Security',
      icon: <SecurityIcon />,
      description: 'Secure your account and manage authentication'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <NotificationsIcon />,
      description: 'Control how and when you receive notifications'
    },
    {
      id: 'language',
      title: 'Language & Region',
      icon: <LanguageIcon />,
      description: 'Set your preferred language and regional settings'
    },
    {
      id: 'data',
      title: 'Data & Storage',
      icon: <StorageIcon />,
      description: 'Manage your data and storage preferences'
    },
    {
      id: 'privacy',
      title: 'Privacy',
      icon: <PrivacyIcon />,
      description: 'Control your privacy settings and data sharing'
    },
  ];

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
      
      <Grid container spacing={4}>
        {/* Settings Navigation */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, px: 1 }}>
            Settings
          </Typography>
          {settingsSections.map((section) => (
            <SettingsSection
              key={section.id}
              title={section.title}
              icon={section.icon}
              description={section.description}
              onClick={() => setActiveSection(section.id)}
              active={activeSection === section.id}
            />
          ))}
        </Grid>
        
        {/* Settings Content */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
            {activeSection === 'appearance' && (
              <>
                <CardHeader 
                  title="Appearance Settings" 
                  subheader="Customize the look and feel of your dashboard"
                />
                <Divider />
                <CardContent>
                  <ThemeSettings />
                </CardContent>
              </>
            )}
            
            {activeSection === 'general' && (
              <>
                <CardHeader 
                  title="General Settings" 
                  subheader="Basic settings for your dashboard experience"
                />
                <Divider />
                <CardContent>
                  <List>
                    <ListItem secondaryAction={<Switch edge="end" defaultChecked />}>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Enable dashboard analytics" 
                        secondary="Collect anonymous usage data to improve your experience"
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    
                    <ListItem secondaryAction={<Switch edge="end" />}>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Compact mode" 
                        secondary="Display more content with reduced spacing"
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    
                    <ListItem secondaryAction={<Switch edge="end" defaultChecked />}>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Auto-save changes" 
                        secondary="Automatically save your changes"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </>
            )}
            
            {activeSection === 'security' && (
              <>
                <CardHeader 
                  title="Security Settings" 
                  subheader="Secure your account and manage authentication"
                />
                <Divider />
                <CardContent>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Change Password
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            type="password"
                            label="Current Password"
                            fullWidth
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type="password"
                            label="New Password"
                            fullWidth
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            type="password"
                            label="Confirm New Password"
                            fullWidth
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="contained" color="primary">
                            Update Password
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    <Divider />
                    
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        Two-Factor Authentication
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </Typography>
                      <Button variant="outlined" color="primary">
                        Enable 2FA
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </>
            )}
            
            {activeSection === 'notifications' && (
              <>
                <CardHeader 
                  title="Notification Settings" 
                  subheader="Control how and when you receive notifications"
                />
                <Divider />
                <CardContent>
                  <List>
                    <ListItem secondaryAction={<Switch edge="end" defaultChecked />}>
                      <ListItemIcon>
                        <NotificationsIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email Notifications" 
                        secondary="Receive notifications via email"
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    
                    <ListItem secondaryAction={<Switch edge="end" defaultChecked />}>
                      <ListItemIcon>
                        <NotificationsIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Push Notifications" 
                        secondary="Receive push notifications in your browser"
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    
                    <ListItem secondaryAction={<Switch edge="end" />}>
                      <ListItemIcon>
                        <NotificationsIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Marketing Communications" 
                        secondary="Receive updates about new features and offers"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </>
            )}
            
            {(activeSection === 'language' || activeSection === 'data' || activeSection === 'privacy') && (
              <>
                <CardHeader 
                  title={`${settingsSections.find(s => s.id === activeSection)?.title} Settings`}
                  subheader="This section is under development"
                />
                <Divider />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8 }}>
                  {settingsSections.find(s => s.id === activeSection)?.icon && (
                    <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'action.selected' }}>
                      {settingsSections.find(s => s.id === activeSection)?.icon}
                    </Avatar>
                  )}
                  <Typography variant="h6">Coming Soon</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center', maxWidth: 400 }}>
                    This settings section is currently under development and will be available soon.
                  </Typography>
                </CardContent>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
