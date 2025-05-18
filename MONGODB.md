# MongoDB with Prisma Integration

This project uses MongoDB (Atlas) as the database with Prisma as the ORM. This README explains how to use and test the MongoDB integration.

## Setup

1. The project is already configured to use MongoDB with Prisma. The connection string is stored in the `.env` file.

2. Make sure your MongoDB Atlas connection string is correctly set in the `.env` file:

```
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority"
```

## Available API Endpoints

### MongoDB Status
- `GET /api/mongodb-status`: Check if MongoDB connection is working and get database statistics

### Users
- `GET /api/users`: Get all users (supports pagination with `?page=1&limit=10` and searching with `?search=query`)
- `POST /api/users`: Create a new user
- `GET /api/users/[id]`: Get a specific user by ID
- `PATCH /api/users/[id]`: Update a user
- `DELETE /api/users/[id]`: Delete a user

## Usage

### Database Seeding

To seed your database with initial data:

```bash
npm run db:seed
```

This will create sample users and posts in your MongoDB database.

### Prisma Studio

To view and manage your database through a web interface:

```bash
npm run prisma:studio
```

This will open Prisma Studio in your browser, typically at http://localhost:5555

### Schema Updates

If you update your Prisma schema (`prisma/schema.prisma`), you need to regenerate the Prisma client:

```bash
npm run prisma:generate
```

## Models

The project includes the following model:

### User
- `id`: String (ObjectId)
- `name`: String
- `email`: String (unique)
- `image`: String (optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## Testing

You can use tools like Postman or cURL to test the API endpoints. For example:

```bash
# Check MongoDB connection
curl http://localhost:3000/api/mongodb-status

# Get all users
curl http://localhost:3000/api/users

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}'
```

## UI Implementation

### User Interface Components

The MongoDB integration is fully exposed through the user interface:

1. **Users Page**
   - Located at `/users`
   - Displays user data from MongoDB in a card-based layout
   - Includes pagination for handling large datasets
   - Features search functionality for filtering users by name or email
   - Provides options to create and delete user records
   - Shows success/error feedback for all operations

2. **User Management Features**
   - **Search**: Real-time filtering of users with clear button
   - **Create New User**: Form modal with validation for adding users
   - **Delete User**: Confirmation dialog with success feedback
   - **Pagination**: Configurable items per page with page navigation

3. **Navigation**
   - The sidebar includes navigation to the Users page
   - Active page state is maintained based on the current route

4. **Components**
   - `UserCard.tsx`: Displays individual user information with post counts
   - `Pagination.tsx`: Handles pagination of MongoDB query results
   - `LoadingSpinner.tsx`: Shows loading state during data fetching

## Enhanced Features

1. **Interactive UI Elements**
   - Enhanced user cards with hover effects and visual feedback
   - Improved button states for better user interaction
   - Success/error feedback messages for all operations

2. **Real-time Search**
   - Debounced search to minimize database queries
   - Clear button for search input
   - Empty state that changes based on search context

3. **Error Handling**
   - Comprehensive client-side validation
   - Graceful error handling for all API operations
   - User-friendly error messages with recovery options
