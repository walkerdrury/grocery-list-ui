import { GroceryList, GroceryItem } from '../context/types';

// Example API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Helper function to get auth token (you'll implement this with your auth system)
function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

// API service for grocery lists
export const api = {
  // ==================== LISTS ====================

  // Get all lists for the current user
  async getLists(): Promise<GroceryList[]> {
    const response = await fetch(`${API_BASE_URL}/lists`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<GroceryList[]>(response);
  },

  // Get a single list by ID
  async getList(listId: string): Promise<GroceryList> {
    const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<GroceryList>(response);
  },

  // Create a new list
  async createList(data: { name: string; description?: string; color?: string }): Promise<GroceryList> {
    const response = await fetch(`${API_BASE_URL}/lists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<GroceryList>(response);
  },

  // Update a list
  async updateList(listId: string, updates: Partial<GroceryList>): Promise<GroceryList> {
    const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return handleResponse<GroceryList>(response);
  },

  // Delete a list
  async deleteList(listId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/lists/${listId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    await handleResponse<void>(response);
  },

  // ==================== ITEMS ====================

  // Add an item to a list
  async addItem(listId: string, data: { text: string; quantity?: string }): Promise<GroceryItem> {
    const response = await fetch(`${API_BASE_URL}/lists/${listId}/items`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<GroceryItem>(response);
  },

  // Update an item
  async updateItem(
    listId: string,
    itemId: string,
    updates: Partial<GroceryItem>
  ): Promise<GroceryItem> {
    const response = await fetch(`${API_BASE_URL}/lists/${listId}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return handleResponse<GroceryItem>(response);
  },

  // Toggle item checked status
  async toggleItemChecked(listId: string, itemId: string): Promise<GroceryItem> {
    const response = await fetch(`${API_BASE_URL}/lists/${listId}/items/${itemId}/toggle`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<GroceryItem>(response);
  },

  // Delete an item
  async deleteItem(listId: string, itemId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/lists/${listId}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    await handleResponse<void>(response);
  },

  // Clear all checked items from a list
  async clearCheckedItems(listId: string): Promise<GroceryList> {
    const response = await fetch(`${API_BASE_URL}/lists/${listId}/items/clear-checked`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<GroceryList>(response);
  },
};
