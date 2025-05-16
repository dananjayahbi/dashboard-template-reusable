import { userService } from '@/lib/db-service';
import { NextRequest, NextResponse } from 'next/server';

// GET a specific user
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const user = await userService.getUserById(id);

    if (!user) {
      return NextResponse.json(
        { status: 'error', message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to fetch user',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// PATCH update a user
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {    const { id } = params;
    const body = await req.json();
    const { name, email, image, status } = body;

    const updateData: { name?: string; email?: string; image?: string; status?: 'active' | 'inactive' } = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (image !== undefined) updateData.image = image;
    if (status !== undefined && (status === 'active' || status === 'inactive')) updateData.status = status;

    // Check if user exists
    const existingUser = await userService.getUserById(id);

    if (!existingUser) {
      return NextResponse.json(
        { status: 'error', message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is unique if we're updating it
    if (email && email !== existingUser.email) {
      const emailExists = await userService.getUserByEmail(email);

      if (emailExists) {
        return NextResponse.json(
          { status: 'error', message: 'Email already in use' },
          { status: 409 }
        );
      }
    }

    // Update the user
    const updatedUser = await userService.updateUser(id, updateData);

    return NextResponse.json({
      status: 'success',
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to update user',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// DELETE a user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if user exists
    const existingUser = await userService.getUserById(id);

    if (!existingUser) {
      return NextResponse.json(
        { status: 'error', message: 'User not found' },
        { status: 404 }
      );
    }    // Delete the user
    await userService.deleteUser(id);

    return NextResponse.json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to delete user',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
