import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  IconButton, 
  Menu, 
  MenuItem,
  Box,
  Skeleton,
  useTheme,
} from '@mui/material';
import { 
  MoreVert as MoreIcon,
  Refresh as RefreshIcon,
  Fullscreen as FullscreenIcon,
  GetApp as DownloadIcon,
} from '@mui/icons-material';

interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  chart: React.ReactNode;
  height?: number | string;
  isLoading?: boolean;
  onRefresh?: () => void;
  onDownload?: () => void;
  menuOptions?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({
  title,
  subtitle,
  chart,
  height = 300,
  isLoading = false,
  onRefresh,
  onDownload,
  menuOptions = [],
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
    handleMenuClose();
  };
  
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
    handleMenuClose();
  };
  
  const handleFullscreen = () => {
    setFullscreen(!fullscreen);
    handleMenuClose();
  };
  
  return (
    <Card 
      sx={{ 
        height: fullscreen ? '100vh' : '100%',
        position: fullscreen ? 'fixed' : 'relative',
        top: fullscreen ? 0 : 'auto',
        left: fullscreen ? 0 : 'auto',
        right: fullscreen ? 0 : 'auto',
        bottom: fullscreen ? 0 : 'auto',
        zIndex: fullscreen ? theme.zIndex.drawer + 1 : 'auto',
      }}
    >
      <CardHeader
        title={title}
        subheader={subtitle}
        action={
          <>
            {onRefresh && (
              <IconButton aria-label="refresh" onClick={handleRefresh} size="small">
                <RefreshIcon />
              </IconButton>
            )}
            <IconButton
              aria-label="more options"
              aria-controls="chart-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              size="small"
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="chart-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleFullscreen}>
                <FullscreenIcon fontSize="small" sx={{ mr: 1 }} />
                {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </MenuItem>
              {onDownload && (
                <MenuItem onClick={handleDownload}>
                  <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
                  Download
                </MenuItem>
              )}
              {menuOptions.map((option, index) => (
                <MenuItem 
                  key={index} 
                  onClick={() => {
                    option.onClick();
                    handleMenuClose();
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
      />
      <CardContent>
        <Box sx={{ 
          height, 
          position: 'relative',
          minHeight: height,
          width: '100%',
        }}>
          {isLoading ? (
            <Box sx={{ width: '100%', height: '100%' }}>
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </Box>
          ) : chart}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartWidget;
