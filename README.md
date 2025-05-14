# dashboard-template-reusable

A fully customizable dashboard template built with Next.js, TypeScript, Material-UI, MongoDB, and Prisma.

## Features

- **Authentication**: Secure authentication with NextAuth.js and role-based access control
- **Modern UI**: Material UI v7 components with customizable theming
- **Responsive Design**: Works seamlessly on all device sizes
- **Data Visualization**: Interactive charts and graphs
- **Data Management**: CRUD operations with MongoDB and Prisma
- **Role-Based Access Control**: Different permission levels for users, managers, and admins
- **Dark Mode Support**: Toggle between light and dark themes
- **Profile Management**: User profile page with editable fields

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Library**: Material UI v7
- **Authentication**: NextAuth.js v4
- **Database**: MongoDB
- **ORM**: Prisma
- **Charts**: MUI X Charts
- **Data Grid**: MUI X Data Grid

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dashboard-template-reusable.git
   cd dashboard-template-reusable
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then update the values in `.env.local` with your configuration.

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Database Setup

1. Ensure MongoDB is running
2. Set the `DATABASE_URL` in your `.env.local` file
3. Run database migrations:
   ```bash
   npx prisma db push
   ```

## Project Structure

```
├── app/                   # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React context providers
│   ├── dashboard/         # Dashboard pages
│   ├── generated/         # Generated Prisma client
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Helper functions
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets
└── next.config.js         # Next.js configuration
```

## Available Pages

- `/` - Landing page
- `/auth/signin` - Login page
- `/auth/signup` - Registration page
- `/dashboard` - Main dashboard
- `/dashboard/users` - User management
- `/dashboard/settings` - System settings
- `/dashboard/profile` - User profile
- `/dashboard/charts` - Data visualization examples

## Customization

### Theming

You can customize the theme in `app/contexts/ThemeContext.tsx`. The template comes with light and dark mode support and customizable color schemes.

### Navigation

Update the navigation items in `app/utils/navigation.tsx` to add or remove sidebar menu items.

### Roles and Permissions

The template includes three predefined roles:

- `USER`: Basic access level
- `MANAGER`: Intermediate access level
- `ADMIN`: Full access level

You can modify these or add new roles in the `Role` enum in `prisma/schema.prisma`.

## Deployment

You can deploy this dashboard to any platform that supports Next.js, such as Vercel, Netlify, or your own server.

### Deploy on Vercel

The easiest way to deploy the app is to use [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

## License

[MIT](LICENSE)

## Credits

This template was built with:

- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
