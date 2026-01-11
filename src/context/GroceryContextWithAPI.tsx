import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { GroceryList, GroceryItem, GroceryContextValue } from './types';
import { api } from '../services/api';

const GroceryContext = createContext<GroceryContextValue | undefined>(undefined);

export const GroceryProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all lists on mount
  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedLists = await api.getLists();
      setLists(fetchedLists);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lists');
      console.error('Error fetching lists:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createList = async (name: string, description?: string, color?: string) => {
    try {
      setError(null);
      const newList = await api.createList({ name, description, color });
      setLists((prev) => [...prev, newList]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create list');
      console.error('Error creating list:', err);
      throw err;
    }
  };

  const updateList = async (listId: string, updates: Partial<GroceryList>) => {
    try {
      setError(null);
      const updatedList = await api.updateList(listId, updates);
      setLists((prev) =>
        prev.map((list) => (list.id === listId ? updatedList : list))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update list');
      console.error('Error updating list:', err);
      throw err;
    }
  };

  const deleteList = async (listId: string) => {
    try {
      setError(null);
      await api.deleteList(listId);
      setLists((prev) => prev.filter((list) => list.id !== listId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete list');
      console.error('Error deleting list:', err);
      throw err;
    }
  };

  const addItem = async (listId: string, text: string, quantity?: string) => {
    try {
      setError(null);
      const newItem = await api.addItem(listId, { text, quantity });
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? { ...list, items: [...list.items, newItem], updatedAt: Date.now() }
            : list
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item');
      console.error('Error adding item:', err);
      throw err;
    }
  };

  const updateItem = async (
    listId: string,
    itemId: string,
    updates: Partial<GroceryItem>
  ) => {
    try {
      setError(null);
      const updatedItem = await api.updateItem(listId, itemId, updates);
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) =>
                  item.id === itemId ? updatedItem : item
                ),
                updatedAt: Date.now(),
              }
            : list
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      console.error('Error updating item:', err);
      throw err;
    }
  };

  const toggleItemChecked = async (listId: string, itemId: string) => {
    try {
      setError(null);
      const updatedItem = await api.toggleItemChecked(listId, itemId);
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) =>
                  item.id === itemId ? updatedItem : item
                ),
                updatedAt: Date.now(),
              }
            : list
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle item');
      console.error('Error toggling item:', err);
      throw err;
    }
  };

  const deleteItem = async (listId: string, itemId: string) => {
    try {
      setError(null);
      await api.deleteItem(listId, itemId);
      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.filter((item) => item.id !== itemId),
                updatedAt: Date.now(),
              }
            : list
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      console.error('Error deleting item:', err);
      throw err;
    }
  };

  const clearCheckedItems = async (listId: string) => {
    try {
      setError(null);
      const updatedList = await api.clearCheckedItems(listId);
      setLists((prev) =>
        prev.map((list) => (list.id === listId ? updatedList : list))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear checked items');
      console.error('Error clearing checked items:', err);
      throw err;
    }
  };

  const value: GroceryContextValue = {
    lists,
    createList,
    updateList,
    deleteList,
    addItem,
    updateItem,
    toggleItemChecked,
    deleteItem,
    clearCheckedItems,
  };

  // You can expose loading and error states if needed
  // by extending GroceryContextValue interface

  return (
    <GroceryContext.Provider value={value}>
      {children}
    </GroceryContext.Provider>
  );
};

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (!context) {
    throw new Error('useGrocery must be used within GroceryProvider');
  }
  return context;
};
