const { PrismaClient } = require('../app/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Seeding the database...');
    
    // Delete existing data (if needed - comment out if you don't want to clear the DB)
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
    
    const diana = await prisma.user.create({
      data: {
        name: 'Diana Lee',
        email: 'diana@example.com',
        image: 'https://randomuser.me/api/portraits/women/2.jpg'
      }
    });
      const ethan = await prisma.user.create({
      data: {
        name: 'Ethan Wright',
        email: 'ethan@example.com',
        image: 'https://randomuser.me/api/portraits/men/3.jpg'
      }
    });
    
    const fiona = await prisma.user.create({
      data: {
        name: 'Fiona Martinez',
        email: 'fiona@example.com',
        image: 'https://randomuser.me/api/portraits/women/3.jpg'
      }
    });
    
    const george = await prisma.user.create({
      data: {
        name: 'George Chen',
        email: 'george@example.com',
        image: 'https://randomuser.me/api/portraits/men/4.jpg'
      }
    });
    
    const hannah = await prisma.user.create({
      data: {
        name: 'Hannah Kim',
        email: 'hannah@example.com',
        image: 'https://randomuser.me/api/portraits/women/4.jpg'
      }
    });
    
    console.log(`Created ${8} users`);
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
