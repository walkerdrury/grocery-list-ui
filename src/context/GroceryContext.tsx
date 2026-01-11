import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../utils/generateId';
import { GroceryList, GroceryItem, GroceryContextValue } from './types';

const GroceryContext = createContext<GroceryContextValue | undefined>(undefined);

export const GroceryProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useLocalStorage<GroceryList[]>('grocery-lists', []);

  const createList = (name: string, description?: string, color?: string) => {
    const newList: GroceryList = {
      id: generateId(),
      name,
      description,
      color: color || 'blue',
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setLists((prev) => [...prev, newList]);
  };

  const updateList = (listId: string, updates: Partial<GroceryList>) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, ...updates, updatedAt: Date.now() }
          : list
      )
    );
  };

  const deleteList = (listId: string) => {
    setLists((prev) => prev.filter((list) => list.id !== listId));
  };

  const addItem = (listId: string, text: string, quantity?: string) => {
    const newItem: GroceryItem = {
      id: generateId(),
      text,
      checked: false,
      quantity,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [...list.items, newItem],
              updatedAt: Date.now(),
            }
          : list
      )
    );
  };

  const updateItem = (
    listId: string,
    itemId: string,
    updates: Partial<GroceryItem>
  ) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, ...updates, updatedAt: Date.now() }
                  : item
              ),
              updatedAt: Date.now(),
            }
          : list
      )
    );
  };

  const toggleItemChecked = (listId: string, itemId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId
                  ? { ...item, checked: !item.checked, updatedAt: Date.now() }
                  : item
              ),
              updatedAt: Date.now(),
            }
          : list
      )
    );
  };

  const deleteItem = (listId: string, itemId: string) => {
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
  };

  const clearCheckedItems = (listId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter((item) => !item.checked),
              updatedAt: Date.now(),
            }
          : list
      )
    );
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

  return (
    <GroceryContext.Provider value={value}>{children}</GroceryContext.Provider>
  );
};

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (!context) {
    throw new Error('useGrocery must be used within GroceryProvider');
  }
  return context;
};
