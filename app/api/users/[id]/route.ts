// filepath: e:\My_GitHub_Repos\dashboard-template-reusable\app\api\users\[id]\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '../../../../lib/prisma';
import { authOptions } from '../../auth/[...nextauth]/route';

interface Params {
  params: {
    id: string;
  };
}

// GET /api/users/[id] - Get a specific user
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // Find user by ID
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password and other sensitive fields
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error: any) {
    console.error(`Error fetching user ${params.id}:`, error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/users/[id] - Update a specific user
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the request body
    const body = await req.json();
    const { firstName, lastName, email, role } = body;
    
    // Find user by ID
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check for email uniqueness if it's being updated
    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });
      
      if (emailExists) {
        return NextResponse.json(
          { message: 'Email is already in use' },
          { status: 409 }
        );
      }
    }
    
    // Prepare update data
    const updateData: any = {};
    
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (firstName && lastName) updateData.name = `${firstName} ${lastName}`;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    
    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error(`Error updating user ${params.id}:`, error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Delete a specific user
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Delete the user
    await prisma.user.delete({
      where: { id },
    });
    
    return NextResponse.json({
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    console.error(`Error deleting user ${params.id}:`, error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
