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
- `GET /api/users`: Get all users (supports pagination with `?page=1&limit=10`)
- `POST /api/users`: Create a new user
- `GET /api/users/[id]`: Get a specific user by ID
- `PATCH /api/users/[id]`: Update a user
- `DELETE /api/users/[id]`: Delete a user and their posts

### Posts
- `GET /api/posts`: Get all posts (supports pagination, filtering by `published`, `authorId`, and search)
- `POST /api/posts`: Create a new post
- `GET /api/posts/[id]`: Get a specific post by ID
- `PATCH /api/posts/[id]`: Update a post
- `DELETE /api/posts/[id]`: Delete a post
- `GET /api/posts/stats`: Get post statistics

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

The project includes the following models:

### User
- `id`: String (ObjectId)
- `name`: String
- `email`: String (unique)
- `image`: String (optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `posts`: Relation to Posts

### Post
- `id`: String (ObjectId)
- `title`: String
- `content`: String (optional)
- `published`: Boolean (default: false)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `author`: Relation to User
- `authorId`: String (ObjectId)

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
