import { GroceryList } from '../../context/types';
import { ListCard } from './ListCard';

interface ListGridProps {
  lists: GroceryList[];
  onDeleteList: (listId: string) => void;
}

export const ListGrid = ({ lists, onDeleteList }: ListGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {lists.map((list) => (
        <ListCard
          key={list.id}
          list={list}
          onDelete={() => onDeleteList(list.id)}
        />
      ))}
    </div>
  );
};
