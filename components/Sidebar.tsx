'use client';

import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, Typography, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

  // Only dashboard and users at the top
  const topMenuItems = [
    { id: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard', path: '/' },
    { id: 'users', icon: <PeopleIcon />, label: 'Users', path: '/users' },
  ];
  // Settings at the bottom
  const bottomMenuItem = { id: 'settings', icon: <SettingsIcon />, label: 'Settings', path: '/settings' };

  useEffect(() => {
    // Update active item based on current path
    const allItems = [...topMenuItems, bottomMenuItem];
    const currentItem = allItems.find(
      item => item.path === pathname || (pathname.startsWith(item.path) && item.path !== '/')
    );
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [pathname]);
  
  return (
    <Drawer
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
    >
      <Box>
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
          {topMenuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <Tooltip title={item.label} placement="right" arrow>
                <Link href={item.path} style={{ textDecoration: 'none', width: '100%' }}>
                  <SidebarItem
                    onClick={() => setActiveItem(item.id)}
                    selected={activeItem === item.id}
                  >
                    <SidebarIcon>{item.icon}</SidebarIcon>
                  </SidebarItem>
                </Link>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <List>
          <ListItem key={bottomMenuItem.id} disablePadding>
            <Tooltip title={bottomMenuItem.label} placement="right" arrow>
              <Link href={bottomMenuItem.path} style={{ textDecoration: 'none', width: '100%' }}>
                <SidebarItem
                  onClick={() => setActiveItem(bottomMenuItem.id)}
                  selected={activeItem === bottomMenuItem.id}
                >
                  <SidebarIcon>{bottomMenuItem.icon}</SidebarIcon>
                </SidebarItem>
              </Link>
            </Tooltip>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
