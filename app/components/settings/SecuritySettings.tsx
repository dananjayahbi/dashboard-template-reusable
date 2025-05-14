import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  Alert,
  Divider,
  FormControlLabel,
  Switch,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { validatePassword } from '@/app/utils/validation';

interface SecuritySettingsProps {
  // Optional props if you need to pass in initial settings
  initialSettings?: {
    twoFactorEnabled: boolean;
  };
  onSave?: (settings: any) => Promise<void>;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  initialSettings,
  onSave,
}) => {
  // Default values or values passed from props
  const [settings, setSettings] = useState({
    twoFactorEnabled: initialSettings?.twoFactorEnabled ?? false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [changePasswordError, setChangePasswordError] = useState<string | null>(null);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

  const [sessionDialogOpen, setSessionDialogOpen] = useState(false);
  const [logoutAllConfirmOpen, setLogoutAllConfirmOpen] = useState(false);
  
  const handleToggleTwoFactor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      twoFactorEnabled: event.target.checked,
    });
  };

  const handlePasswordChange = (prop: keyof typeof passwordData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordData({ ...passwordData, [prop]: event.target.value });
    
    // Clear success message when user starts typing again
    if (changePasswordSuccess) {
      setChangePasswordSuccess(false);
    }
  };

  const handleSavePassword = async () => {
    // Reset states
    setChangePasswordError(null);
    
    // Validate password fields
    if (!passwordData.currentPassword) {
      setChangePasswordError('Current password is required');
      return;
    }
    
    if (!passwordData.newPassword) {
      setChangePasswordError('New password is required');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setChangePasswordError('New passwords do not match');
      return;
    }
    
    // Validate password strength
    const passwordValidation = validatePassword(passwordData.newPassword);
    if (!passwordValidation.isValid) {
      setChangePasswordError(passwordValidation.message);
      return;
    }
    
    try {
      setChangePasswordLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Replace with actual API call to change password
      
      // Success
      setChangePasswordSuccess(true);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Failed to change password:', error);
      setChangePasswordError('Failed to update password. Please try again.');
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const handleSaveTwoFactor = async () => {
    if (!onSave) return;
    
    try {
      // Simulate API call
      await onSave(settings);
    } catch (error) {
      console.error('Failed to update security settings:', error);
    }
  };

  const handleLogoutAllSessions = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace with actual API call to logout all sessions
      
      setLogoutAllConfirmOpen(false);
      // Show success message or redirect
    } catch (error) {
      console.error('Failed to logout all sessions:', error);
    }
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Security Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Manage your account security settings and password.
      </Typography>
      
      {/* Password Change Section */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Change Password
          </Typography>
          
          {changePasswordError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {changePasswordError}
            </Alert>
          )}
          
          {changePasswordSuccess && (
            <Alert severity="success" sx={{ mb: 3 }}>
              Password updated successfully!
            </Alert>
          )}
          
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Current Password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange('currentPassword')}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        edge="end"
                      >
                        {showCurrentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={handlePasswordChange('newPassword')}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange('confirmPassword')}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={handleSavePassword}
              loading={changePasswordLoading}
            >
              Update Password
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
      
      {/* Two-Factor Authentication */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Two-Factor Authentication
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Add an extra layer of security to your account by requiring a verification code in addition to your password.
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.twoFactorEnabled}
                onChange={handleToggleTwoFactor}
              />
            }
            label={settings.twoFactorEnabled ? "Enabled" : "Disabled"}
          />
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveTwoFactor}
              disabled={!onSave}
            >
              Save Settings
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      {/* Session Management */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Session Management
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Manage your active sessions and sign out from other devices.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              onClick={() => setSessionDialogOpen(true)}
            >
              View Active Sessions
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              onClick={() => setLogoutAllConfirmOpen(true)}
            >
              Sign Out From All Devices
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      {/* Active Sessions Dialog */}
      <Dialog
        open={sessionDialogOpen}
        onClose={() => setSessionDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Active Sessions</DialogTitle>
        <DialogContent>
          <DialogContentText paragraph>
            These are your currently active sessions. You can sign out individual sessions or all sessions at once.
          </DialogContentText>
          
          {/* Mock session data - would come from the backend in a real app */}
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold">Current Session</Typography>
              <Typography variant="body2">Device: Chrome on Windows</Typography>
              <Typography variant="body2">IP Address: 192.168.1.1</Typography>
              <Typography variant="body2">Last Active: Just now</Typography>
            </CardContent>
          </Card>
          
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" fontWeight="bold">Other Session</Typography>
              <Typography variant="body2">Device: Safari on iPhone</Typography>
              <Typography variant="body2">IP Address: 172.16.254.1</Typography>
              <Typography variant="body2">Last Active: 2 hours ago</Typography>
              <Button 
                variant="outlined" 
                color="error" 
                size="small" 
                sx={{ mt: 1 }}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSessionDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      
      {/* Confirm Logout All Dialog */}
      <Dialog
        open={logoutAllConfirmOpen}
        onClose={() => setLogoutAllConfirmOpen(false)}
      >
        <DialogTitle>Sign Out From All Devices</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out from all devices? You will need to sign in again on each device.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutAllConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleLogoutAllSessions} color="error">
            Sign Out All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SecuritySettings;
