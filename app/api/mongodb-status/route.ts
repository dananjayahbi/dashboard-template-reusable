import { dbAdmin } from '@/lib/db-service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check connectivity
    const connection = await dbAdmin.checkConnection();
    
    if (connection.status === 'connected') {
      // Get database statistics
      const stats = await dbAdmin.getStats();
      
      return NextResponse.json({
        status: 'success',
        message: 'MongoDB connection is working properly',
        connection,
        stats
      });
    } else {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Failed to connect to MongoDB',
          connection
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
