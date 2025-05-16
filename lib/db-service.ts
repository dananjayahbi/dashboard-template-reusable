import { prisma } from './prisma';

// User-related utilities
export const userService = {
  // Get all users with optional pagination
  getAllUsers: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          _count: {
            select: { posts: true }
          }
        }
      }),
      prisma.user.count()
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
      where: { id },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' }
        }
      }
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

  // Delete a user and all their posts
  deleteUser: async (id: string) => {
    // Use a transaction to delete posts and user atomically
    return prisma.$transaction(async (tx) => {
      // Delete all posts by this user
      await tx.post.deleteMany({
        where: { authorId: id }
      });
      
      // Then delete the user
      return tx.user.delete({
        where: { id }
      });
    });
  }
};

// Post-related utilities
export const postService = {
  // Get all posts with optional pagination and filtering
  getAllPosts: async (page = 1, limit = 10, options?: { 
    published?: boolean;
    authorId?: string;
    searchQuery?: string;
  }) => {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (options?.published !== undefined) {
      where.published = options.published;
    }
    
    if (options?.authorId) {
      where.authorId = options.authorId;
    }
    
    if (options?.searchQuery) {
      where.OR = [
        { title: { contains: options.searchQuery, mode: 'insensitive' } },
        { content: { contains: options.searchQuery, mode: 'insensitive' } }
      ];
    }
    
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      }),
      prisma.post.count({ where })
    ]);

    return {
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  },

  // Get post by ID
  getPostById: async (id: string) => {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    });
  },

  // Create a new post
  createPost: async (data: { 
    title: string; 
    content?: string; 
    published?: boolean;
    authorId: string;
  }) => {
    return prisma.post.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  },

  // Update a post
  updatePost: async (
    id: string, 
    data: { title?: string; content?: string; published?: boolean }
  ) => {
    return prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  },

  // Delete a post
  deletePost: async (id: string) => {
    return prisma.post.delete({
      where: { id }
    });
  },

  // Get post statistics
  getPostStats: async () => {
    const [totalPosts, publishedPosts, unpublishedPosts] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.post.count({ where: { published: false } })
    ]);

    return {
      total: totalPosts,
      published: publishedPosts,
      unpublished: unpublishedPosts,
      publishedPercentage: totalPosts > 0 
        ? Math.round((publishedPosts / totalPosts) * 100) 
        : 0
    };
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
  },

  // Get database statistics
  getStats: async () => {
    const [userCount, postCount] = await Promise.all([
      prisma.user.count(),
      prisma.post.count()
    ]);

    return {
      users: userCount,
      posts: postCount,
      lastChecked: new Date()
    };
  }
};
