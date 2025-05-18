'use client';

import { Box, Card, CardContent, Typography, Avatar, Chip } from '@mui/material';
import { User } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export default function UserCard({ user, onClick }: UserCardProps) {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.2s',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '4px',
          height: '100%',
          backgroundColor: 'primary.main',
          opacity: 0,
          transition: 'opacity 0.2s',
          borderRadius: '2px 0 0 2px'
        },
        '&:hover::after': {
          opacity: 1
        }
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={user.image || undefined} 
            alt={user.name}
            sx={{ width: 48, height: 48, mr: 2 }}
          >
            {!user.image && user.name.charAt(0)}
          </Avatar>
            <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: '500', mb: 0.5 }}>
              {user.name}
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
        
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ 
            display: 'block', 
            mt: 1,
            fontStyle: 'italic'
          }}
        >
          Joined {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
        </Typography>
      </CardContent>
    </Card>
  );
}
