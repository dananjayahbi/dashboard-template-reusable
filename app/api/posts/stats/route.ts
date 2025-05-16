import { postService } from '@/lib/db-service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = await postService.getPostStats();
    
    return NextResponse.json({
      status: 'success',
      stats
    });
  } catch (error) {
    console.error('Failed to get post statistics:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to fetch post statistics',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
