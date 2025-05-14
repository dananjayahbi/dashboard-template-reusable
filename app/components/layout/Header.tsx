'use client';

import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Avatar, 
  Box, 
  Menu, 
  MenuItem, 
  Tooltip,
  InputBase,
  Badge,
  Divider,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { alpha } from '@mui/material/styles';
import { useUser } from '../../contexts/UserContext';
import { useThemeContext } from '../../contexts/ThemeContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const theme = useTheme();
  const router = useRouter();
  const { mode, setMode, actualMode } = useThemeContext();
  const { userName, userEmail } = useUser();
  
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleLogout = async () => {
    handleCloseUserMenu();
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  const toggleThemeMode = () => {
    setMode(actualMode === 'light' ? 'dark' : 'light');
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ 
            display: { xs: 'none', sm: 'block' },
            flexGrow: 1
          }}
        >
          Dashboard
        </Typography>
        
        {/* Search bar */}
        <Box sx={{ 
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.common.black, 0.05),
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.1),
          },
          marginRight: theme.spacing(2),
          marginLeft: 0,
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
          },
        }}>
          <Box sx={{ 
            padding: theme.spacing(0, 2), 
            height: '100%', 
            position: 'absolute', 
            pointerEvents: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <SearchIcon />
          </Box>
          <InputBase
            placeholder="Search…"
            sx={{
              color: 'inherit',
              '& .MuiInputBase-input': {
                padding: theme.spacing(1, 1, 1, 0),
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                transition: theme.transitions.create('width'),
                width: '100%',
                [theme.breakpoints.up('md')]: {
                  width: '20ch',
                },
              },
            }}
          />
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Theme mode toggle */}
        <Box sx={{ display: 'flex' }}>
          <IconButton color="inherit" onClick={toggleThemeMode}>
            {actualMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          
          {/* Notifications */}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          {/* User menu */}
          <Box sx={{ ml: 2 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userName || 'User'} src="/static/avatar.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ py: 1, px: 2, minWidth: '200px' }}>
                <Typography variant="subtitle1" fontWeight={600}>{userName || 'User'}</Typography>
                <Typography variant="body2" color="text.secondary">{userEmail || 'email@example.com'}</Typography>
              </Box>
              <Divider />
              
              <MenuItem onClick={handleCloseUserMenu} component={Link} href="/dashboard/profile">
                <PersonIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              
              <MenuItem onClick={handleCloseUserMenu} component={Link} href="/dashboard/settings">
                <SettingsIcon sx={{ mr: 2, fontSize: '1.2rem' }} />
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
              
              <Divider />
              
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 2, fontSize: '1.2rem', color: 'error.main' }} />
                <Typography textAlign="center" color="error">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
