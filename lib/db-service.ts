import { prisma } from './prisma';

// User-related utilities
export const userService = {  // Get all users with optional pagination and search
  getAllUsers: async (page = 1, limit = 10, search = '') => {
    const skip = (page - 1) * limit;
    
    // Build where clause for search
    const where = search 
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        } 
      : {};
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      prisma.user.count({ where })
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  },
  // Get user by ID
  getUserById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id }
    });
  },

  // Get user by email
  getUserByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email }
    });
  },

  // Create a new user
  createUser: async (data: { name: string; email: string; image?: string }) => {
    return prisma.user.create({
      data
    });
  },

  // Update a user
  updateUser: async (id: string, data: { name?: string; email?: string; image?: string }) => {
    return prisma.user.update({
      where: { id },
      data
    });
  },
  // Delete a user
  deleteUser: async (id: string) => {
    return prisma.user.delete({
      where: { id }
    });
  }
};



// Database administrative utilities
export const dbAdmin = {
  // Check database connection
  checkConnection: async () => {
    try {
      await prisma.$queryRaw`db.runCommand({ ping: 1 })`;
      return { status: 'connected' };
    } catch (error) {
      return { 
        status: 'error', 
        message: error instanceof Error ? error.message : String(error)
      };
    }
  },  // Get database statistics
  getStats: async () => {
    const userCount = await prisma.user.count();

    return {
      users: userCount,
      lastChecked: new Date()
    };
  }
};
