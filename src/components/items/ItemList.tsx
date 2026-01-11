import { GroceryItem } from '../../context/types';
import { ItemRow } from './ItemRow';
import { EmptyState } from '../ui/EmptyState';

interface ItemListProps {
  items: GroceryItem[];
  onToggle: (itemId: string) => void;
  onEdit: (item: GroceryItem) => void;
  onDelete: (itemId: string) => void;
}

export const ItemList = ({ items, onToggle, onEdit, onDelete }: ItemListProps) => {
  const uncheckedItems = items.filter((item) => !item.checked);
  const checkedItems = items.filter((item) => item.checked);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={
          <svg
            className="w-20 h-20"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        }
        message="No items in this list yet. Add your first item!"
      />
    );
  }

  return (
    <div className="space-y-6">
      {uncheckedItems.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            To Buy ({uncheckedItems.length})
          </h3>
          <div className="space-y-1">
            {uncheckedItems.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                onToggle={() => onToggle(item.id)}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {checkedItems.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Completed ({checkedItems.length})
          </h3>
          <div className="space-y-1">
            {checkedItems.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                onToggle={() => onToggle(item.id)}
                onEdit={() => onEdit(item)}
                onDelete={() => onDelete(item.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
