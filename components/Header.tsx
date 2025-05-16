'use client';

import { AppBar, Box, Toolbar, Typography, Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Header() {
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
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          padding: '4px 12px',
          marginRight: '16px'
        }}>
          <SearchIcon sx={{ color: '#9ca3af', mr: 1 }} />
          <input 
            placeholder="Search..." 
            style={{ 
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              padding: '8px 0',
              fontSize: '14px',
              width: '180px'
            }} 
          />
        </Box>

        <IconButton sx={{ mr: 2 }}>
          <NotificationsNoneIcon />
        </IconButton>

        <Avatar 
          sx={{ 
            width: 36, 
            height: 36, 
            cursor: 'pointer' 
          }}
          alt="User Profile"
          src="https://randomuser.me/api/portraits/men/32.jpg"
        />
      </Toolbar>
    </AppBar>
  );
}
