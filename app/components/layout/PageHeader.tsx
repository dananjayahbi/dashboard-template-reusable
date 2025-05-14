'use client';

import { Box, Typography, Breadcrumbs, Link as MuiLink, SxProps, Theme } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: ReactNode;
  sx?: SxProps<Theme>;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  breadcrumbs, 
  action,
  sx = {} 
}: PageHeaderProps) {
  return (
    <Box 
      sx={{ 
        mb: 4,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        ...sx
      }}
    >
      <Box>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ mb: 1 }}
          >
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              
              return isLast ? (
                <Typography key={item.href} color="text.primary">
                  {item.label}
                </Typography>
              ) : (
                <Link key={item.href} href={item.href} passHref legacyBehavior>
                  <MuiLink underline="hover" color="inherit">
                    {item.label}
                  </MuiLink>
                </Link>
              );
            })}
          </Breadcrumbs>
        )}
        
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      
      {action && (
        <Box sx={{ mt: { xs: 2, sm: 0 } }}>
          {action}
        </Box>
      )}
    </Box>
  );
}
