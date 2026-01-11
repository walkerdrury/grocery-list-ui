export interface GroceryItem {
  id: string;
  text: string;
  checked: boolean;
  quantity?: string;
  createdAt: number;
  updatedAt: number;
}

export interface GroceryList {
  id: string;
  name: string;
  description?: string;
  items: GroceryItem[];
  color?: string;
  createdAt: number;
  updatedAt: number;
}

export interface GroceryContextValue {
  lists: GroceryList[];
  createList: (name: string, description?: string, color?: string) => void;
  updateList: (listId: string, updates: Partial<GroceryList>) => void;
  deleteList: (listId: string) => void;
  addItem: (listId: string, text: string, quantity?: string) => void;
  updateItem: (listId: string, itemId: string, updates: Partial<GroceryItem>) => void;
  toggleItemChecked: (listId: string, itemId: string) => void;
  deleteItem: (listId: string, itemId: string) => void;
  clearCheckedItems: (listId: string) => void;
}
