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
  CircularProgress
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { User } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import UserProfileModal from './UserProfileModal';

interface UsersTableProps {
  users: User[];
  onDeleteClick: (user: User) => void;
  onEditClick: (user: User) => void;
  onRowClick: (userId: string) => void;
  onStatusChange: (userId: string, newStatus: 'active' | 'inactive') => Promise<any>;
}

export default function UsersTable({ users, onDeleteClick, onEditClick, onRowClick, onStatusChange }: UsersTableProps) {
  const [processingStatus, setProcessingStatus] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleStatusChange = (userId: string, newStatus: 'active' | 'inactive') => {
    // Set processing state to show loading indicator
    console.log(`UsersTable.handleStatusChange called for user ${userId} to status ${newStatus}`);
    setProcessingStatus(userId);
    
    // Call the parent function to update status
    onStatusChange(userId, newStatus)
      .then((response) => {
        console.log(`Status change succeeded for user ${userId}:`, response);
        // Reset processing state on success
        setProcessingStatus(null);
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Reset processing state on error
        setProcessingStatus(null);
      });
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setProfileModalOpen(true);
  };

  const handleModalClose = () => {
    setProfileModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
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
                <TableCell align="center">                  <Tooltip title={`Click to mark as ${user.status === 'active' ? 'inactive' : 'active'}`}>
                    <Chip
                    label={processingStatus === user.id ? '...' : (user.status || 'active')}
                    size="small"
                    sx={{
                      position: 'relative',
                      backgroundColor: user.status === 'inactive' ? '#ef4444' : '#22c55e',
                      color: '#ffffff',
                      fontWeight: 500,
                      borderRadius: '16px',
                      px: 2,
                      textTransform: 'capitalize',
                      cursor: processingStatus === user.id ? 'wait' : 'pointer',
                      opacity: processingStatus === user.id ? 0.7 : 1,
                      '&:hover': {
                        backgroundColor: user.status === 'inactive' ? '#dc2626' : '#16a34a',
                      },                      '& .MuiChip-label': {
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
                    }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (processingStatus !== user.id) {
                          // Ensure undefined/null status is treated as 'active'
                          const currentStatus = user.status || 'active';
                          console.log('Toggling status for user:', user.id, 'Current status:', currentStatus, 'New status:', currentStatus === 'active' ? 'inactive' : 'active');
                          handleStatusChange(user.id, currentStatus === 'active' ? 'inactive' : 'active');
                        } else {
                          console.log('Status change already in progress for user:', user.id);
                        }
                      }}
                      icon={processingStatus === user.id ? <CircularProgress size={12} color="inherit" /> : undefined}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <Tooltip title="View User">
                      <IconButton
                        size="small"
                        color="info"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewUser(user);
                        }}
                        sx={{
                          '&:hover': { 
                            backgroundColor: 'info.light',
                            color: 'white'
                          }
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
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
      
      {/* User Profile Modal */}
      <UserProfileModal
        user={selectedUser}
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </>
  );
}
