import { userService } from '@/lib/db-service.fixed';
import { NextRequest, NextResponse } from 'next/server';

// GET a specific user
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params?.id;
    
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
  try {
    // Get ID from params
    const id = params?.id;
    console.log(`Starting update for user ${id}`);
    
    // Get request body
    const body = await req.json();
    const { name, email, image, status } = body;
    
    console.log(`Processing update for user ${id} with data:`, body);

    // Build update data
    const updateData: { name?: string; email?: string; image?: string; status?: 'active' | 'inactive' } = {};
    
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (image !== undefined) updateData.image = image;
    
    // Handle status specifically
    if (status !== undefined) {
      if (status === 'active' || status === 'inactive') {
        updateData.status = status;
        console.log(`Setting status to: ${status}`);
      } else {
        console.error(`Invalid status value: ${status}`);
        return NextResponse.json(
          { status: 'error', message: 'Invalid status value. Must be "active" or "inactive".' },
          { status: 400 }
        );
      }
    }

    // Check if user exists
    const existingUser = await userService.getUserById(id);

    if (!existingUser) {
      console.error(`User not found: ${id}`);
      return NextResponse.json(
        { status: 'error', message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is unique if we're updating it
    if (email && email !== existingUser.email) {
      const emailExists = await userService.getUserByEmail(email);

      if (emailExists) {
        console.error(`Email already in use: ${email}`);
        return NextResponse.json(
          { status: 'error', message: 'Email already in use' },
          { status: 409 }
        );
      }
    }

    // Update the user
    console.log(`Updating user ${id} with data:`, updateData);
    const updatedUser = await userService.updateUser(id, updateData);
    console.log(`User ${id} updated successfully`);

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
    // Access ID directly from params
    const id = params?.id;

    // Check if user exists
    const existingUser = await userService.getUserById(id);

    if (!existingUser) {
      return NextResponse.json(
        { status: 'error', message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Delete the user
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
