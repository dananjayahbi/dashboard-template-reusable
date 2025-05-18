import { userService } from '@/lib/db-service';
import { NextRequest, NextResponse } from 'next/server';

// GET all users with pagination
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const result = await userService.getAllUsers(page, limit, search);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to fetch users',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// POST create a new user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, image } = body;

    if (!name || !email) {
      return NextResponse.json(
        { status: 'error', message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if user with this email already exists
    const existingUser = await userService.getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { status: 'error', message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create the new user
    const newUser = await userService.createUser({
      name,
      email,
      image
    });

    return NextResponse.json({ 
      status: 'success',
      message: 'User created successfully',
      user: newUser
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to create user',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
