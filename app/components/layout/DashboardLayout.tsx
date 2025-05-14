'use client';

import { useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 280;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box 
      sx={{ 
        display: 'grid',
        minHeight: '100vh',
        gridTemplateColumns: { xs: '1fr', md: `${drawerWidth}px 1fr` },
        gridTemplateRows: 'auto 1fr',
        gridTemplateAreas: {
          xs: `
            "header"
            "main"
          `,
          md: `
            "sidebar header"
            "sidebar main"
          `,
        }
      }}
    >
      {/* App header */}
      <Box sx={{ gridArea: 'header', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Header onMenuToggle={handleDrawerToggle} />
      </Box>
      
      {/* Sidebar navigation */}
      <Box sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>
        <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
      </Box>
      
      {/* Mobile sidebar - separate from grid layout */}
      {isMobile && (
        <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
      )}
      
      {/* Main content */}
      <Box
        component="main"
        sx={{
          gridArea: 'main',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          pt: 8, // Provides space for the fixed app bar
          pb: 3,
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: '1200px',
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
