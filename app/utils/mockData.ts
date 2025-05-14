// Sample data for the dashboard
import { UserRole } from '../types/auth';

// Mock user data
export const mockUsers = [
  { 
    id: '1', 
    name: 'John Doe', 
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com', 
    role: UserRole.ADMIN, 
    createdAt: new Date('2023-01-15').toISOString(),
    image: 'https://mui.com/static/images/avatar/1.jpg',
  },
  { 
    id: '2', 
    name: 'Jane Smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com', 
    role: UserRole.MANAGER, 
    createdAt: new Date('2023-02-20').toISOString(),
    image: 'https://mui.com/static/images/avatar/2.jpg',
  },
  { 
    id: '3', 
    name: 'Bob Johnson', 
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com', 
    role: UserRole.USER, 
    createdAt: new Date('2023-03-10').toISOString(),
    image: 'https://mui.com/static/images/avatar/3.jpg',
  },
  { 
    id: '4', 
    name: 'Sarah Brown',
    firstName: 'Sarah',
    lastName: 'Brown',
    email: 'sarah@example.com', 
    role: UserRole.USER, 
    createdAt: new Date('2023-04-05').toISOString(),
    image: 'https://mui.com/static/images/avatar/4.jpg',
  },
  { 
    id: '5', 
    name: 'Michael Wilson',
    firstName: 'Michael',
    lastName: 'Wilson',
    email: 'michael@example.com', 
    role: UserRole.MANAGER, 
    createdAt: new Date('2023-04-15').toISOString(),
    image: 'https://mui.com/static/images/avatar/5.jpg',
  }
];

// Mock activity data
export const mockActivities = [
  {
    id: '1',
    userId: '1',
    action: 'login',
    description: 'User logged into the system',
    createdAt: new Date('2023-05-01T08:30:00Z').toISOString(),
  },
  {
    id: '2',
    userId: '2',
    action: 'create',
    description: 'Created a new project',
    createdAt: new Date('2023-05-01T09:15:00Z').toISOString(),
  },
  {
    id: '3',
    userId: '1',
    action: 'update',
    description: 'Updated user settings',
    createdAt: new Date('2023-05-01T10:45:00Z').toISOString(),
  },
  {
    id: '4',
    userId: '3',
    action: 'delete',
    description: 'Deleted a task',
    createdAt: new Date('2023-05-02T14:20:00Z').toISOString(),
  },
  {
    id: '5',
    userId: '4',
    action: 'signup',
    description: 'User registered a new account',
    createdAt: new Date('2023-05-02T16:30:00Z').toISOString(),
  }
];

// Mock project data
export const mockProjects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign the company website with modern UI/UX',
    status: 'IN_PROGRESS',
    progress: 85,
    startDate: new Date('2023-03-01').toISOString(),
    endDate: new Date('2023-06-30').toISOString(),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Develop a new mobile application for customers',
    status: 'IN_PROGRESS',
    progress: 65,
    startDate: new Date('2023-02-15').toISOString(),
    endDate: new Date('2023-08-31').toISOString(),
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Integrate third-party APIs into the system',
    status: 'IN_PROGRESS',
    progress: 45,
    startDate: new Date('2023-04-10').toISOString(),
    endDate: new Date('2023-07-15').toISOString(),
  },
  {
    id: '4',
    name: 'Database Migration',
    description: 'Migrate data from legacy system to new database',
    status: 'PLANNING',
    progress: 35,
    startDate: new Date('2023-06-01').toISOString(),
    endDate: new Date('2023-09-30').toISOString(),
  },
  {
    id: '5',
    name: 'Documentation',
    description: 'Create comprehensive documentation for the system',
    status: 'COMPLETED',
    progress: 100,
    startDate: new Date('2023-01-10').toISOString(),
    endDate: new Date('2023-04-10').toISOString(),
  }
];

// Sales data for chart
export const mockSalesData = {
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        name: 'This Year',
        data: [18000, 25000, 30000, 35000, 40000, 60000, 70000, 80000, 65000, 75000, 90000, 100000],
      },
      {
        name: 'Last Year',
        data: [15000, 20000, 25000, 30000, 35000, 40000, 45000, 55000, 50000, 60000, 70000, 80000],
      },
    ],
  },
  weekly: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        name: 'This Week',
        data: [5000, 7000, 6500, 8000, 9000, 7500, 4000],
      },
      {
        name: 'Last Week',
        data: [4500, 6500, 5800, 7200, 8500, 6800, 3500],
      },
    ],
  },
};

// User device distribution for donut chart
export const mockUserDeviceData = [
  { id: 0, value: 40, label: 'Desktop', color: '#2196F3' },
  { id: 1, value: 35, label: 'Mobile', color: '#4CAF50' },
  { id: 2, value: 25, label: 'Tablet', color: '#FFC107' },
];

// Product categories for bar chart
export const mockProductCategoryData = {
  labels: ['Electronics', 'Clothing', 'Furniture', 'Books', 'Food'],
  datasets: [
    {
      name: 'Sales',
      data: [12500, 8700, 6500, 4300, 7800],
    },
    {
      name: 'Revenue',
      data: [22500, 17400, 19500, 8600, 15600],
    },
  ],
};
