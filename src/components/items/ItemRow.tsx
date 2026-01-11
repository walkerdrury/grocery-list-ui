import { useState } from 'react';
import { GroceryItem } from '../../context/types';
import { Checkbox } from '../ui/Checkbox';

interface ItemRowProps {
  item: GroceryItem;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ItemRow = ({ item, onToggle, onEdit, onDelete }: ItemRowProps) => {
  const [showActions, setShowActions] = useState(false);

  const handleDelete = () => {
    if (window.confirm(`Delete "${item.text}"?`)) {
      onDelete();
    }
  };

  return (
    <div
      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Checkbox checked={item.checked} onChange={onToggle} />
      <div className="flex-1 min-w-0">
        <span
          className={`text-base ${
            item.checked
              ? 'line-through text-gray-400'
              : 'text-gray-900'
          }`}
        >
          {item.text}
        </span>
        {item.quantity && (
          <span className="ml-2 text-sm text-gray-500">({item.quantity})</span>
        )}
      </div>
      <div className={`flex gap-2 ${showActions ? 'opacity-100' : 'opacity-0 sm:opacity-0'} sm:group-hover:opacity-100 transition-opacity`}>
        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-blue-600 transition-colors"
          aria-label="Edit item"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-600 transition-colors"
          aria-label="Delete item"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};
