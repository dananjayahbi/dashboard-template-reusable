import { postService, userService } from '@/lib/db-service';
import { NextRequest, NextResponse } from 'next/server';

// GET all posts with filtering and pagination
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const published = searchParams.get('published');
    const authorId = searchParams.get('authorId') || undefined;
    const searchQuery = searchParams.get('search') || undefined;
    
    const options: {
      published?: boolean;
      authorId?: string;
      searchQuery?: string;
    } = {};
    
    if (published !== null) {
      options.published = published === 'true';
    }
    
    if (authorId) {
      options.authorId = authorId;
    }
    
    if (searchQuery) {
      options.searchQuery = searchQuery;
    }
    
    const result = await postService.getAllPosts(page, limit, options);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to fetch posts',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// POST create a new post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, authorId, published = false } = body;

    if (!title || !authorId) {
      return NextResponse.json(
        { status: 'error', message: 'Title and author ID are required' },
        { status: 400 }
      );
    }

    // Check if author exists
    const author = await userService.getUserById(authorId);

    if (!author) {
      return NextResponse.json(
        { status: 'error', message: 'Author not found' },
        { status: 404 }
      );
    }

    const newPost = await postService.createPost({
      title,
      content,
      published,
      authorId
    });

    return NextResponse.json({ 
      status: 'success',
      message: 'Post created successfully',
      post: newPost
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to create post',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
