import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  Divider,
  Button,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Grid,
} from '@mui/material';

interface NotificationSettingsProps {
  // Optional props if you need to pass in initial settings
  initialSettings?: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    activityDigest: boolean;
    securityAlerts: boolean;
  };
  onSave?: (settings: any) => Promise<void>;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  initialSettings,
  onSave,
}) => {
  // Default values or values passed from props
  const [settings, setSettings] = useState({
    emailNotifications: initialSettings?.emailNotifications ?? true,
    pushNotifications: initialSettings?.pushNotifications ?? true,
    marketingEmails: initialSettings?.marketingEmails ?? false,
    activityDigest: initialSettings?.activityDigest ?? true,
    securityAlerts: initialSettings?.securityAlerts ?? true,
  });
  
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.checked,
    });
  };
  
  const handleSave = async () => {
    if (!onSave) return;
    
    try {
      setSaving(true);
      setSaveError(null);
      await onSave(settings);
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to save notification settings:', error);
      setSaveError('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Notification Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Manage how you receive notifications and updates from the dashboard.
      </Typography>
      
      {saveError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {saveError}
        </Alert>
      )}
      
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            General Notifications
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  name="emailNotifications"
                />
              }
              label="Email Notifications"
            />
            <Typography variant="caption" color="text.secondary" sx={{ pl: 4, mb: 2 }}>
              Receive notifications via email
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.pushNotifications}
                  onChange={handleChange}
                  name="pushNotifications"
                />
              }
              label="Push Notifications"
            />
            <Typography variant="caption" color="text.secondary" sx={{ pl: 4, mb: 2 }}>
              Receive notifications in your browser
            </Typography>
          </FormGroup>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Email Preferences
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.marketingEmails}
                  onChange={handleChange}
                  name="marketingEmails"
                />
              }
              label="Marketing Emails"
            />
            <Typography variant="caption" color="text.secondary" sx={{ pl: 4, mb: 2 }}>
              Receive marketing emails about new features and updates
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.activityDigest}
                  onChange={handleChange}
                  name="activityDigest"
                />
              }
              label="Weekly Activity Digest"
            />
            <Typography variant="caption" color="text.secondary" sx={{ pl: 4, mb: 2 }}>
              Receive a weekly summary of your dashboard activity
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={settings.securityAlerts}
                  onChange={handleChange}
                  name="securityAlerts"
                />
              }
              label="Security Alerts"
            />
            <Typography variant="caption" color="text.secondary" sx={{ pl: 4, mb: 2 }}>
              Receive alerts about security-related events
            </Typography>
          </FormGroup>
        </CardContent>
      </Card>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={saving || !onSave}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </Box>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success">Notification settings saved successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default NotificationSettings;
