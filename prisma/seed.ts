import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Seeding the database...');
    
    // Delete existing data (if needed - comment out if you don't want to clear the DB)
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
    console.log('Cleared existing data');
    
    // Create users
    const alice = await prisma.user.create({
      data: {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        image: 'https://randomuser.me/api/portraits/women/1.jpg'
      }
    });
    
    const bob = await prisma.user.create({
      data: {
        name: 'Bob Smith',
        email: 'bob@example.com',
        image: 'https://randomuser.me/api/portraits/men/1.jpg'
      }
    });
    
    const charlie = await prisma.user.create({
      data: {
        name: 'Charlie Garcia',
        email: 'charlie@example.com',
        image: 'https://randomuser.me/api/portraits/men/2.jpg'
      }
    });
    
    console.log(`Created ${3} users`);
    
    // Create posts
    const posts = await Promise.all([
      // Alice's posts
      prisma.post.create({
        data: {
          title: 'Introduction to MongoDB',
          content: 'MongoDB is a NoSQL database that stores data in flexible, JSON-like documents...',
          published: true,
          authorId: alice.id
        }
      }),
      prisma.post.create({
        data: {
          title: 'Working with Prisma and MongoDB',
          content: 'Prisma provides a type-safe database client for MongoDB that makes it easy to...',
          published: true,
          authorId: alice.id
        }
      }),
      
      // Bob's posts
      prisma.post.create({
        data: {
          title: 'Next.js API Routes',
          content: 'API Routes provide a solution to build your API directly within Next.js...',
          published: true,
          authorId: bob.id
        }
      }),
      prisma.post.create({
        data: {
          title: 'Draft: Upcoming Features',
          content: 'This is a draft of upcoming features we are considering...',
          published: false,
          authorId: bob.id
        }
      }),
      
      // Charlie's posts
      prisma.post.create({
        data: {
          title: 'Responsive Dashboard Design',
          content: 'Creating responsive dashboards that work on all devices requires...',
          published: true,
          authorId: charlie.id
        }
      })
    ]);
    
    console.log(`Created ${posts.length} posts`);
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
