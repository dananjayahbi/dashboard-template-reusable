'use client';

import { useState } from 'react';
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
  Menu,
  MenuItem,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { User } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface UsersTableProps {
  users: User[];
  onDeleteClick: (user: User) => void;
  onEditClick: (user: User) => void;
  onRowClick: (userId: string) => void;
  onStatusChange: (userId: string, newStatus: 'active' | 'inactive') => void;
}

export default function UsersTable({ users, onDeleteClick, onEditClick, onRowClick, onStatusChange }: UsersTableProps) {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', mb: 2, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5 }}>User Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5 }}>Joined</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5 }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5, textAlign: 'center' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold', py: 1.5, textAlign: 'center' }}>Actions</TableCell>
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
              <TableCell sx={{ color: 'text.secondary' }}>{user.email}</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>User</TableCell>
              <TableCell align="center">
                <Tooltip title={`Click to mark as ${user.status === 'active' ? 'inactive' : 'active'}`}>
                  <Chip
                    label={user.status || 'active'}
                    size="small"
                    sx={{
                      backgroundColor: user.status === 'inactive' ? 'error.light' : 'success.light',
                      color: user.status === 'inactive' ? 'error.dark' : 'success.dark',
                      fontWeight: 500,
                      borderRadius: '16px',
                      px: 1,
                      textTransform: 'capitalize',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active');
                    }}
                  />
                </Tooltip>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Tooltip title="Edit User">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(user);
                      }}
                      sx={{
                        '&:hover': { 
                          backgroundColor: 'primary.light',
                          color: 'white'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
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
