// Auth related types
export enum UserRole {
  USER = 'USER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
  role: UserRole;
  createdAt: string;
  isActive?: boolean;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  settings?: UserSettings;
}

// Settings related types
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark';
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface ThemeSettings {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  borderRadius: number;
}

// Activity related types
export interface Activity {
  id: string;
  userId: string;
  action: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'signup';
  description: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

// Notification related types
export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Project related types
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  progress: number; // 0-100
  startDate: string;
  endDate: string;
  teamMembers?: User[];
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Dashboard related types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  recentActivities: Activity[];
}

// Form related types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'date' | 'time' | 'checkbox' | 'radio' | 'textarea';
  required?: boolean;
  options?: { label: string; value: string }[]; // For select, radio fields
  placeholder?: string;
  helperText?: string;
  validation?: (value: any) => boolean;
  validationMessage?: string;
}

export interface FormData {
  [key: string]: any;
}
