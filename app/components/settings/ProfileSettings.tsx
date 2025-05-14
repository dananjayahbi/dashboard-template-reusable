import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Card,
  CardContent,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationCity as LocationIcon,
  PhotoCamera as CameraIcon,
} from '@mui/icons-material';
import { User } from '@/app/types';

interface ProfileSettingsProps {
  initialData?: Partial<User>;
  onSave?: (userData: Partial<User>) => Promise<void>;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  initialData,
  onSave,
}) => {
  // Default data merged with passed data
  const [userData, setUserData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phoneNumber: initialData?.phoneNumber || '',
    image: initialData?.image || '',
    address: {
      street: initialData?.address?.street || '',
      city: initialData?.address?.city || '',
      state: initialData?.address?.state || '',
      postalCode: initialData?.address?.postalCode || '',
      country: initialData?.address?.country || '',
    },
  });
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (field: string, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    
    // Clear success message when user starts editing
    if (success) setSuccess(false);
  };
  
  const handleAddressChange = (field: string, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [field]: value,
      },
    }));
    
    // Clear success message when user starts editing
    if (success) setSuccess(false);
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // In a real application, you would upload this file to a server
      // For demo purposes, we'll just create a local object URL
      const imageUrl = URL.createObjectURL(file);
      setUserData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    }
  };
  
  const handleSave = async () => {
    if (!onSave) return;
    
    try {
      setSaving(true);
      setError(null);
      
      await onSave(userData);
      
      setSuccess(true);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Profile Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Manage your personal information and account details.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile updated successfully!
        </Alert>
      )}
      
      {/* Profile Photo */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
            <Avatar
              src={userData.image || undefined}
              sx={{ width: 100, height: 100 }}
              alt={`${userData.firstName} ${userData.lastName}`}
            />
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Profile Photo
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Upload a new profile photo. Recommended size: 400x400 pixels.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CameraIcon />}
                >
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
                
                {userData.image && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleChange('image', '')}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      {/* Personal Information */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Personal Information
          </Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                value={userData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                value={userData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email Address"
                value={userData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone Number"
                value={userData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Address */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Address
          </Typography>
          
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Street Address"
                value={userData.address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="City"
                value={userData.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="State/Province"
                value={userData.address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Postal Code"
                value={userData.address.postalCode}
                onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Country"
                value={userData.address.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                margin="normal"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={saving || !onSave}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
