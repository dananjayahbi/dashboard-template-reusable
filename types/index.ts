// User type definitions based on our Prisma schema
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  status: 'active' | 'inactive'; // Make status required, not optional
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Authentication types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// For pagination responses
export interface PaginatedResponse<T> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  [key: string]: any; // For the actual data array (e.g., users, posts)
}

export interface UsersResponse extends PaginatedResponse<User> {
  users: User[];
}

// For API responses
export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  [key: string]: any; // For the actual data
}
