'use client';

import { useState, useEffect, useRef } from 'react';
import { UserService } from '@/services/userService';
import { Box, Typography, Paper, TextField, InputAdornment, Button, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Search as SearchIcon, PersonAdd as PersonAddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import UserCard from '@/components/UserCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import Pagination from '@/components/Pagination';
import { User } from '@/types';

// New User Form interface
interface NewUserForm {
  name: string;
  email: string;
  image?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const successMessageTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  
  // Form state for new user
  const [newUserForm, setNewUserForm] = useState<NewUserForm>({
    name: '',
    email: '',
    image: ''
  });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  
  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserForm(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Validate form before submission
  const validateForm = (): boolean => {
    const errors: { name?: string; email?: string } = {};
    
    if (!newUserForm.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!newUserForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUserForm.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleCreateUser = async () => {
    if (!validateForm()) return;
    
    try {
      setFormSubmitting(true);
      setError(null);
      setFormSuccess(null);
      
      const result = await UserService.createUser({
        name: newUserForm.name.trim(),
        email: newUserForm.email.trim(),
        image: newUserForm.image?.trim() || undefined
      });
      
      setFormSubmitting(false);
      setFormSuccess("User created successfully!");
      
      // Reset form
      setNewUserForm({ name: '', email: '', image: '' });
      
      // Refresh user list
      fetchUsers();
      
      // Close modal after a short delay to show success message
      setTimeout(() => {
        setIsNewUserModalOpen(false);
        setFormSuccess(null);
      }, 1500);
      
    } catch (err) {
      setFormSubmitting(false);
      setError(err instanceof Error ? err.message : "Failed to create user");
      console.error('Error creating user:', err);
    }
  };
  
  // Handle user deletion
  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };
    const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      setLoading(true);
      await UserService.deleteUser(userToDelete.id);
      
      // Show success message
      setSuccessMessage(`User ${userToDelete.name} has been deleted successfully.`);
      
      // Clear success message after 5 seconds
      clearTimeout(successMessageTimeout.current);
      successMessageTimeout.current = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      
      // Refresh the user list after deletion
      fetchUsers();
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      setError('Failed to delete user. Please try again later.');
      console.error('Error deleting user:', err);
      setLoading(false);
    }
  };
    const fetchUsers = async (currentPage = page, currentLimit = limit, search = searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await UserService.getUsers(currentPage, currentLimit, search);
      
      // Check if the response contains users
      if (response && response.users) {
        setUsers(response.users);
        setTotal(response.pagination.total);
      } else {
        // If response doesn't have expected structure, set empty array
        setUsers([]);
        setTotal(0);
        console.warn('API returned unexpected response format:', response);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load users. Please try again later.');
      setLoading(false);
      console.error('Error fetching users:', err);
      
      // Set empty state on error
      setUsers([]);
      setTotal(0);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, [page, limit, searchTerm]);
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };
  
  const handleUserClick = (userId: string) => {
    // Future enhancement: Navigate to user detail page
    console.log('Clicked on user ID:', userId);
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Users
          <Typography component="p" variant="body1" color="text.secondary" mt={1}>
            Manage your user profiles
          </Typography>
        </Typography>
        
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          onClick={() => setIsNewUserModalOpen(true)}
          sx={{ 
            borderRadius: '8px',
            textTransform: 'none',
            px: 3
          }}
        >
          New User
        </Button>
      </Box>
      
      <Paper 
        sx={{ 
          p: 2, 
          mb: 3, 
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >        <TextField
          fullWidth
          placeholder="Search users by name or email..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            
            clearTimeout(searchTimeout.current);
            searchTimeout.current = setTimeout(() => {
              // Reset to page 1 when searching
              if (page !== 1) {
                setPage(1);
              } else {
                // If already on page 1, manually trigger a fetch
                fetchUsers(1, limit, value.trim());
              }
            }, 400);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm ? (
              <InputAdornment position="end">
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    fetchUsers(1, limit, '');
                  }}
                  size="small"
                  sx={{ minWidth: 'unset' }}
                >
                  Clear
                </Button>
              </InputAdornment>
            ) : null,
            sx: {
              borderRadius: 2,
            }
          }}
        />
      </Paper>
        {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {successMessage}
        </Alert>
      )}
      
      {loading ? (
        <LoadingSpinner message="Loading users..." />      ) : users.length === 0 ? (
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center', 
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box sx={{ opacity: 0.6, mb: 1 }}>
            <PersonAddIcon sx={{ fontSize: 48 }} />
          </Box>
          <Typography variant="h6" color="text.secondary">
            No users found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {searchTerm ? 'Try adjusting your search criteria' : 'Add a new user to get started'}
          </Typography>
          
          {searchTerm && (
            <Button 
              variant="outlined" 
              onClick={() => setSearchTerm('')}
              sx={{ mt: 1 }}
            >
              Clear Search
            </Button>
          )}
        </Paper>
      ) : (
        <>
          {users.map((user) => (
            <Box key={user.id} sx={{ position: 'relative' }}>
              <UserCard 
                user={user} 
                onClick={() => handleUserClick(user.id)} 
              />              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(user);
                }}
                sx={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  minWidth: 'unset',
                  borderRadius: '8px',
                  py: 0.5,
                  '&:hover': {
                    backgroundColor: 'error.light',
                    color: 'white',
                    borderColor: 'error.light'
                  }
                }}
              >
                Delete
              </Button>
            </Box>
          ))}
          
          <Pagination
            count={total}
            page={page}
            limit={limit}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}
      
      {/* New User Modal */}
      <Dialog 
        open={isNewUserModalOpen} 
        onClose={() => setIsNewUserModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New User</DialogTitle>        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Fill in the details to create a new user.
          </DialogContentText>
          
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              name="name"
              label="Full Name"
              value={newUserForm.name}
              onChange={handleFormChange}
              fullWidth
              required
              error={!!formErrors.name}
              helperText={formErrors.name}
              disabled={formSubmitting}
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonAddIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                )
              }}
            />
            
            <TextField
              name="email"
              label="Email Address"
              type="email"
              value={newUserForm.email}
              onChange={handleFormChange}
              fullWidth
              required
              error={!!formErrors.email}
              helperText={formErrors.email}
              disabled={formSubmitting}
            />
            
            <TextField
              name="image"
              label="Profile Image URL (Optional)"
              value={newUserForm.image}
              onChange={handleFormChange}
              fullWidth
              disabled={formSubmitting}
              placeholder="https://example.com/profile.jpg"
            />
          </Box>
          
          {formSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {formSuccess}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setIsNewUserModalOpen(false)} 
            disabled={formSubmitting}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateUser} 
            variant="contained"
            disabled={formSubmitting}
            sx={{ textTransform: 'none' }}
          >
            {formSubmitting ? 'Creating...' : 'Create User'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete User Confirmation Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setIsDeleteModalOpen(false)}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            variant="contained" 
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  );
}
