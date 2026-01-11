import { useNavigate } from 'react-router-dom';
import { GroceryList } from '../../context/types';
import { Card } from '../ui/Card';

interface ListCardProps {
  list: GroceryList;
  onDelete: () => void;
}

const colorMap: Record<string, string> = {
  blue: 'bg-list-blue',
  green: 'bg-list-green',
  purple: 'bg-list-purple',
  pink: 'bg-list-pink',
  orange: 'bg-list-orange',
  yellow: 'bg-list-yellow',
};

export const ListCard = ({ list, onDelete }: ListCardProps) => {
  const navigate = useNavigate();
  const totalItems = list.items.length;
  const checkedItems = list.items.filter((item) => item.checked).length;
  const colorClass = colorMap[list.color || 'blue'];

  const handleClick = () => {
    navigate(`/lists/${list.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${list.name}"?`)) {
      onDelete();
    }
  };

  return (
    <Card hover onClick={handleClick} className="relative">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${colorClass} rounded-l-lg`} />
      <div className="pl-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{list.name}</h3>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
            aria-label="Delete list"
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
        {list.description && (
          <p className="text-gray-600 text-sm mb-3">{list.description}</p>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {checkedItems}/{totalItems} items
          </span>
          {totalItems > 0 && (
            <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2 max-w-[100px]">
              <div
                className={`h-2 ${colorClass} rounded-full transition-all`}
                style={{ width: `${(checkedItems / totalItems) * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
