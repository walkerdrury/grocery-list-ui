import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGrocery } from '../context/GroceryContext';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/Button';
import { AddItemForm } from '../components/items/AddItemForm';
import { ItemList } from '../components/items/ItemList';
import { EditItemModal } from '../components/items/EditItemModal';
import { GroceryItem } from '../context/types';

export const ListDetailPage = () => {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const { lists, addItem, updateItem, toggleItemChecked, deleteItem, clearCheckedItems } =
    useGrocery();
  const [editingItem, setEditingItem] = useState<GroceryItem | null>(null);

  const list = lists.find((l) => l.id === listId);

  if (!list) {
    return (
      <PageLayout title="List Not Found" showBack>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">The list you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Go Back to Lists</Button>
        </div>
      </PageLayout>
    );
  }

  const totalItems = list.items.length;
  const checkedItems = list.items.filter((item) => item.checked).length;
  const hasCheckedItems = checkedItems > 0;

  const handleAddItem = (text: string, quantity?: string) => {
    addItem(list.id, text, quantity);
  };

  const handleUpdateItem = (text: string, quantity?: string) => {
    if (editingItem) {
      updateItem(list.id, editingItem.id, { text, quantity });
      setEditingItem(null);
    }
  };

  const handleClearChecked = () => {
    if (window.confirm('Clear all checked items?')) {
      clearCheckedItems(list.id);
    }
  };

  return (
    <PageLayout
      title={list.name}
      showBack
      action={
        hasCheckedItems ? (
          <Button variant="secondary" size="sm" onClick={handleClearChecked}>
            Clear Checked
          </Button>
        ) : undefined
      }
    >
      {list.description && (
        <p className="text-gray-600 mb-6">{list.description}</p>
      )}

      <div className="mb-4 text-sm text-gray-600">
        {checkedItems}/{totalItems} items completed
      </div>

      <AddItemForm onAdd={handleAddItem} />

      <ItemList
        items={list.items}
        onToggle={(itemId) => toggleItemChecked(list.id, itemId)}
        onEdit={setEditingItem}
        onDelete={(itemId) => deleteItem(list.id, itemId)}
      />

      <EditItemModal
        isOpen={editingItem !== null}
        onClose={() => setEditingItem(null)}
        item={editingItem}
        onUpdate={handleUpdateItem}
      />
    </PageLayout>
  );
};
