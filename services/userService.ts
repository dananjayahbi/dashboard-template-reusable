'use client';

import { User, UsersResponse, ApiResponse } from '@/types';

/**
 * Service to handle user-related API calls
 */
export const UserService = {
  /**
   * Fetch users with pagination and search
   */
  async getUsers(page = 1, limit = 10, search = ''): Promise<UsersResponse> {
    try {
      let url = `/api/users?page=${page}&limit=${limit}`;
      
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  },
  
  /**
   * Fetch a single user by ID
   */
  async getUserById(id: string): Promise<{ user: User }> {
    try {
      const response = await fetch(`/api/users/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch user with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Create a new user
   */
  async createUser(userData: { name: string; email: string; image?: string }): Promise<ApiResponse<{ user: User }>> {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  },
  
  /**
   * Update a user
   */
  async updateUser(
    id: string, 
    userData: { name?: string; email?: string; image?: string }
  ): Promise<ApiResponse<{ user: User }>> {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error(`Error updating user: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to update user with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<ApiResponse<{}>> {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Failed to delete user with ID ${id}:`, error);
      throw error;
    }
  }
};
