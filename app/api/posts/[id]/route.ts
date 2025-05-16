import { postService } from '@/lib/db-service';
import { NextRequest, NextResponse } from 'next/server';

// GET a specific post
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const post = await postService.getPostById(id);

    if (!post) {
      return NextResponse.json(
        { status: 'error', message: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to fetch post',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// PATCH update a post
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { title, content, published } = body;

    const updateData: { title?: string; content?: string; published?: boolean } = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (published !== undefined) updateData.published = published;

    // Check if post exists
    const existingPost = await postService.getPostById(id);

    if (!existingPost) {
      return NextResponse.json(
        { status: 'error', message: 'Post not found' },
        { status: 404 }
      );
    }

    const updatedPost = await postService.updatePost(id, updateData);

    return NextResponse.json({
      status: 'success',
      message: 'Post updated successfully',
      post: updatedPost
    });
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to update post',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// DELETE a post
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if post exists
    const existingPost = await postService.getPostById(id);

    if (!existingPost) {
      return NextResponse.json(
        { status: 'error', message: 'Post not found' },
        { status: 404 }
      );
    }

    await postService.deletePost(id);

    return NextResponse.json({
      status: 'success',
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to delete post',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
