'use client';

import { AppBar, Box, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem, Divider, ListItemIcon, ListItemText } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const profileOpen = Boolean(profileAnchorEl);

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchorEl(null);
  };

  const navigateTo = (path: string) => {
    handleClose();
    router.push(path);
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #f3f4f6',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Dashboard
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Avatar 
          sx={{ 
            width: 40, 
            height: 40, 
            cursor: 'pointer',
            ml: 2,
            border: '2px solid #f0f0f0'
          }}
          alt="User Profile"
          src="https://randomuser.me/api/portraits/men/32.jpg"
          onClick={handleProfileMenuClick}
        />
        <Menu
          anchorEl={profileAnchorEl}
          id="profile-menu"
          open={profileOpen}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              width: 200,
              maxWidth: '100%',
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
              mt: 1.5,
              borderRadius: '10px',
              '& .MuiMenuItem-root': {
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ width: 36, height: 36, mr: 1.5 }}
              alt="User Profile"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">John Doe</Typography>
              <Typography variant="caption" color="text.secondary">admin@example.com</Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 1 }} />
          
          <MenuItem onClick={() => navigateTo('/profile')}>
            <ListItemIcon>
              <PersonOutlineIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          
          <MenuItem onClick={() => navigateTo('/settings')}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          
          <Divider sx={{ my: 1 }} />
          
          <MenuItem onClick={() => navigateTo('/')}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
