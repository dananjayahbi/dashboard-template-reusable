'use client';

import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, Typography, Tooltip, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';

const drawerWidth = 72;

const SidebarItem = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  minHeight: 48,
  justifyContent: 'center',
  borderRadius: '8px',
  margin: '4px 8px',
  position: 'relative',
  '&:hover': {
    backgroundColor: 'rgba(99, 102, 241, 0.04)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(99, 102, 241, 0.12)',
    },
    '& .MuiListItemIcon-root': {
      color: '#6366f1',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: -8,
      top: '25%',
      height: '50%',
      width: 4,
      backgroundColor: '#6366f1',
      borderRadius: '0 4px 4px 0',
    }
  },
}));

const SidebarIcon = styled(ListItemIcon)({
  justifyContent: 'center',
  minWidth: 'unset',
  color: '#6b7280',
  transition: 'color 0.2s ease-in-out',
});

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
    { id: 'tasks', icon: <AssignmentIcon />, label: 'Tasks' },
    { id: 'calendar', icon: <CalendarMonthIcon />, label: 'Calendar' },
    { id: 'messages', icon: <ChatIcon />, label: 'Messages' },
    { id: 'files', icon: <FolderIcon />, label: 'Files' },
    { id: 'notifications', icon: <NotificationsIcon />, label: 'Notifications' },
    { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
  ];

  return (    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #f3f4f6',
          boxShadow: 'none',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '16px 0',
        },
      }}
    >      <Box>
        <Box
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            p: 1.5,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
            }}
          >
            <Typography variant="h6" color="white" fontWeight="bold" sx={{ fontSize: '1.2rem' }}>
              D
            </Typography>
          </Box>
        </Box>
        
        <List sx={{ mt: 2 }}>
          {menuItems.slice(0, 5).map((item) => (
            <ListItem key={item.id} disablePadding>
              <Tooltip title={item.label} placement="right" arrow>
                <SidebarItem
                  onClick={() => setActiveItem(item.id)}
                  selected={activeItem === item.id}
                >
                  <SidebarIcon>{item.icon}</SidebarIcon>
                </SidebarItem>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>      <Box>
        <List>
          {menuItems.slice(5).map((item) => (
            <ListItem key={item.id} disablePadding>
              <Tooltip title={item.label} placement="right" arrow>
                <SidebarItem
                  onClick={() => setActiveItem(item.id)}
                  selected={activeItem === item.id}
                >
                  <SidebarIcon>{item.icon}</SidebarIcon>
                </SidebarItem>
              </Tooltip>
            </ListItem>
          ))}
        </List>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 2, 
          mb: 2 
        }}>
          <Tooltip title="Profile" placement="right" arrow>
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36, 
                cursor: 'pointer',
                border: '2px solid #f3f4f6' 
              }}
              alt="User Profile"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
          </Tooltip>
        </Box>
      </Box>
    </Drawer>
  );
}
