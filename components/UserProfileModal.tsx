'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  Stack
} from '@mui/material';
import { Close as CloseIcon, Email as EmailIcon, Person as PersonIcon } from '@mui/icons-material';
import { User } from '@/types';

interface UserProfileModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, open, onClose }) => {
  if (!user) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          overflow: 'visible',
          background: 'linear-gradient(to bottom, #ffffff, #f5f7fb)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px'
          },
          animation: 'fadeIn 0.3s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(-20px)' },
            to: { opacity: 1, transform: 'translateY(0)' }
          }
        }
      }}
    >
      <Box sx={{ position: 'relative', pt: 2, pb: 3, px: 3 }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header with Avatar */}
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
            mt: 2
          }}
        >
          <Avatar 
            src={user.image || undefined} 
            alt={user.name}
            sx={{ 
              width: 100, 
              height: 100, 
              mb: 2,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '4px solid white',
              backgroundColor: user.image ? 'transparent' : 'primary.main',
              fontSize: '2.5rem',
              animation: 'avatarPulse 2s infinite alternate',
              '@keyframes avatarPulse': {
                from: { boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
                to: { boxShadow: '0 4px 25px rgba(99, 102, 241, 0.4)' }
              }
            }}
          >
            {!user.image && user.name.charAt(0)}
          </Avatar>
          <Typography variant="h4" fontWeight="bold" align="center">
            {user.name}
          </Typography>
          
          {/* Status Chip */}          <Box sx={{ mt: 1 }}>
            <Chip
              label={user.status || 'active'}
              size="small"
              sx={{
                position: 'relative',
                backgroundColor: user.status === 'inactive' ? '#ef4444' : '#22c55e',
                color: '#ffffff',
                fontWeight: 600,
                borderRadius: '16px',
                px: 2,
                py: 0.5,
                textTransform: 'capitalize',
                display: 'flex',
                alignItems: 'center',                '& .MuiChip-label': {
                  paddingLeft: '10px',
                  '&::before': {
                    content: '""',
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    marginRight: '8px',
                    verticalAlign: 'middle',
                    ...(user.status === 'active' && {
                      animation: 'pulse 1.5s infinite'
                    })
                  }
                },
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)'
                  },
                  '70%': {
                    boxShadow: '0 0 0 4px rgba(255, 255, 255, 0)'
                  },
                  '100%': {
                    boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)'
                  }
                }
              }}            />
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />        {/* User Details */}
        <Box sx={{ px: 2 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EmailIcon sx={{ mr: 1.5, color: 'primary.main' }} />
              <Typography variant="body1">{user.email}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PersonIcon sx={{ mr: 1.5, color: 'primary.main' }} />
              <Typography variant="body1">User</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Joined
                </Typography>
                <Typography variant="body1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography variant="body1">
                  {new Date(user.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
};

export default UserProfileModal;
