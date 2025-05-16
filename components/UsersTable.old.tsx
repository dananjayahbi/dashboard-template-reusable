'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Avatar,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Switch,
  Menu,
  MenuItem,
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { User } from '@/types';
import { formatDistanceToNow, differenceInDays } from 'date-fns';

interface UsersTableProps {
  users: User[];
  onDeleteClick: (user: User) => void;
  onRowClick: (userId: string) => void;
  onStatusChange: (user: User, newStatus: 'active' | 'inactive') => void;
}

export default function UsersTable({ users, onDeleteClick, onRowClick }: UsersTableProps) {
  // Function to generate random status for users based on creation date
  const getUserStatus = (user: User) => {
    const daysSinceCreation = differenceInDays(new Date(), new Date(user.createdAt));
    
    // Determine status based on creation date
    if (daysSinceCreation < 7) {
      return { label: 'Active', color: { bg: 'success.light', text: 'success.dark' } };
    } else if (daysSinceCreation < 30) {
      return { label: 'Pending', color: { bg: 'warning.light', text: 'warning.dark' } };
    } else if (daysSinceCreation < 90) {
      return { label: 'On Sale', color: { bg: 'info.light', text: 'info.dark' } };
    } else if (daysSinceCreation < 180) {
      return { label: 'Inactive', color: { bg: 'error.light', text: 'error.dark' } };
    } else {
      return { label: 'Bouncing', color: { bg: 'secondary.light', text: 'secondary.dark' } };
    }
  };
  
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', mb: 2, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5 }}>User Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5 }}>User ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5 }}>Joined</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5 }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5, textAlign: 'center' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5, textAlign: 'center' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow 
              key={user.id}
              hover
              onClick={() => onRowClick(user.id)}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)'
                },
                '& td': { 
                  py: 1.5,
                  borderBottom: '1px solid rgba(224, 224, 224, 1)'
                }
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={user.image || undefined}
                    alt={user.name}
                    sx={{ width: 36, height: 36, mr: 2 }}
                  >
                    {!user.image && user.name.charAt(0)}
                  </Avatar>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>{user.name}</Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>#{user.id.substring(0, 8)}</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>{user.email}</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>User</TableCell>
              <TableCell align="center">
                {(() => {
                  const status = getUserStatus(user);
                  return (
                    <Chip
                      label={status.label}
                      size="small"
                      sx={{
                        backgroundColor: status.color.bg,
                        color: status.color.text,
                        fontWeight: 500,
                        borderRadius: '16px',
                        px: 1,
                      }}
                    />                  );
                })()}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Tooltip title="Delete User">
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteClick(user);
                      }}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'error.light',
                          color: 'white'
                        } 
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
