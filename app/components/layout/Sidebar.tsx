'use client';

import { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Collapse, 
  useMediaQuery, 
  useTheme,
  Divider,
  IconButton,
} from '@mui/material';
import { 
  ExpandLess, 
  ExpandMore, 
  ChevronLeft 
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavItem, mainNavItems, filterNavItemsByRole } from '../../utils/navigation';
import { useUser } from '../../contexts/UserContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// Determine drawer width
const drawerWidth = 280;

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const pathname = usePathname();
  const { role } = useUser();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  
  // Filter navigation items based on user role
  const navItems = role ? filterNavItemsByRole(mainNavItems, role) : [];

  // Toggle submenu state
  const handleToggleSubMenu = (path: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };
  // Check if a navigation item is currently active
  const isActive = (path: string) => {
    // Special case for dashboard to avoid highlighting it for all dashboard sub-routes
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Render navigation items recursively
  const renderNavItems = (items: NavItem[], level = 0) => {
    return items.map((item) => {
      const isItemActive = isActive(item.path);
      const hasChildren = item.children && item.children.length > 0;
      const isSubMenuOpen = !!openSubMenus[item.path];

      return (
        <Box key={item.path}>
          <ListItem 
            disablePadding 
            sx={{ 
              display: 'block',
              pl: level > 0 ? 2 : 0,
            }}
          >
            {hasChildren ? (
              <ListItemButton
                onClick={() => handleToggleSubMenu(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  backgroundColor: isItemActive 
                    ? theme.palette.action.selected 
                    : 'transparent',
                  borderRadius: '8px',
                  mx: 1,
                  my: 0.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 2,
                    justifyContent: 'center',
                    color: isItemActive ? theme.palette.primary.main : 'inherit',
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText 
                  primary={item.title} 
                  primaryTypographyProps={{
                    color: isItemActive ? theme.palette.primary.main : 'inherit',
                    fontWeight: isItemActive ? 600 : 400,
                  }}
                />
                {isSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            ) : (
              <Link href={item.path} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton
                  onClick={isMobile ? onClose : undefined}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    backgroundColor: isItemActive 
                      ? theme.palette.action.selected 
                      : 'transparent',
                    borderRadius: '8px',
                    mx: 1,
                    my: 0.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 2,
                      justifyContent: 'center',
                      color: isItemActive ? theme.palette.primary.main : 'inherit',
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title} 
                    primaryTypographyProps={{
                      color: isItemActive ? theme.palette.primary.main : 'inherit',
                      fontWeight: isItemActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </Link>
            )}
          </ListItem>
          {hasChildren && (
            <Collapse in={isSubMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderNavItems(item.children!, level + 1)}
              </List>
            </Collapse>
          )}
        </Box>
      );
    });
  };

  const drawerContent = (
    <>
      {isMobile && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={onClose}>
            <ChevronLeft />
          </IconButton>
        </Box>
      )}
      
      <Box sx={{ p: 2 }}>
        {/* Logo or app name can be placed here */}
        <Box sx={{ 
          fontWeight: 700, 
          fontSize: '1.5rem', 
          textAlign: 'center',
          mb: 2,
          color: theme.palette.primary.main
        }}>
          Dashboard
        </Box>
      </Box>
      
      <Divider />
      
      <List sx={{ pt: 1 }}>
        {renderNavItems(navItems)}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer (temporary) */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRadius: 0,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop drawer (permanent) */
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
}
