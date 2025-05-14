// Define icons for navigation items
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableViewIcon from '@mui/icons-material/TableView';
import { SvgIconComponent } from '@mui/icons-material';
import { UserRole } from '../types/auth';

// Define the navigation item interface
export interface NavItem {
  title: string;
  path: string;
  icon: SvgIconComponent;
  children?: NavItem[];
  roles?: UserRole[]; // Roles that can access this item
}

// Main navigation items
export const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: DashboardIcon,
  },
  {
    title: 'User Management',
    path: '/dashboard/users',
    icon: PeopleIcon,
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: PersonIcon,
  },
  {
    title: 'UI Components',
    path: '/dashboard/components',
    icon: CategoryIcon,
    children: [
      {
        title: 'Data Tables',
        path: '/dashboard/components/tables',
        icon: TableViewIcon,
      },
      {
        title: 'Charts',
        path: '/dashboard/components/charts',
        icon: BarChartIcon,
      },
    ],
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: SettingsIcon,
  },
];

// Function to filter navigation items by user role
export function filterNavItemsByRole(items: NavItem[], userRole: UserRole | null): NavItem[] {
  if (!userRole) {
    return [];
  }

  return items.filter(item => {
    // Allow items without role restrictions or items that match the user's role
    const hasAccess = !item.roles || item.roles.includes(userRole);
    
    // Also filter children if any
    const filteredChildren = item.children 
      ? filterNavItemsByRole(item.children, userRole)
      : undefined;
    
    // Clone the item with filtered children
    if (hasAccess) {
      return {
        ...item,
        children: filteredChildren,
      };
    }
    
    return false;
  });
}
