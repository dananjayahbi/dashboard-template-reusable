'use client';

import { useState } from 'react';
import { 
  Box, 
  Button, 
  Paper,
  IconButton,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import { 
  DataGrid, 
  GridColDef, 
  GridRenderCellParams,
  GridActionsCellItem,
  GridToolbar
} from '@mui/x-data-grid';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Search as SearchIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import PageHeader from '../../components/layout/PageHeader';
import { UserRole } from '../../types/auth';

// Mock user data
const mockUsers = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: UserRole.ADMIN, 
    createdAt: new Date('2023-01-15').toISOString() 
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: UserRole.MANAGER, 
    createdAt: new Date('2023-02-20').toISOString() 
  },
  { 
    id: '3', 
    name: 'Bob Johnson', 
    email: 'bob@example.com', 
    role: UserRole.USER, 
    createdAt: new Date('2023-03-10').toISOString() 
  },
  { 
    id: '4', 
    name: 'Sarah Brown', 
    email: 'sarah@example.com', 
    role: UserRole.USER, 
    createdAt: new Date('2023-04-05').toISOString() 
  },
  { 
    id: '5', 
    name: 'Michael Wilson', 
    email: 'michael@example.com', 
    role: UserRole.MANAGER, 
    createdAt: new Date('2023-04-15').toISOString() 
  }
];

// Helper function to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Column definitions for the data grid
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { 
      field: 'role', 
      headerName: 'Role', 
      width: 150,
      renderCell: (params: GridRenderCellParams<any, UserRole>) => {
        const role = params.value;
        let color: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning' = 'default';
        
        switch(role) {
          case UserRole.ADMIN:
            color = 'error';
            break;
          case UserRole.MANAGER:
            color = 'warning';
            break;
          case UserRole.USER:
            color = 'info';
            break;
          default:
            color = 'default';
        }
        
        return <Chip label={role} color={color} size="small" />;
      }
    },
    { 
      field: 'createdAt', 
      headerName: 'Created At', 
      width: 150,
      valueFormatter: (params) => formatDate(params.value)
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Event handlers
  const handleEdit = (id: any) => {
    console.log('Edit user', id);
  };

  const handleDelete = (id: any) => {
    console.log('Delete user', id);
  };

  const handleAddUser = () => {
    console.log('Add user');
  };

  return (
    <>
      <PageHeader
        title="User Management"
        subtitle="Manage your system users"
        breadcrumbs={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/users', label: 'Users' },
        ]}
        action={
          <Button 
            variant="contained" 
            startIcon={<PersonAddIcon />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        }
      />

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </Box>
      </Paper>
    </>
  );
}
