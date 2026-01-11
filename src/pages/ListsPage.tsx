import { useState } from 'react';
import { useGrocery } from '../context/GroceryContext';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { ListGrid } from '../components/lists/ListGrid';
import { CreateListModal } from '../components/lists/CreateListModal';

export const ListsPage = () => {
  const { lists, createList, deleteList } = useGrocery();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateList = (name: string, description: string, color: string) => {
    createList(name, description, color);
  };

  return (
    <PageLayout
      title="My Grocery Lists"
      action={
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
            New List
          </span>
        </Button>
      }
    >
      {lists.length === 0 ? (
        <EmptyState
          icon={
            <svg
              className="w-24 h-24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          message="No grocery lists yet. Create one to get started!"
          action={
            <Button onClick={() => setIsCreateModalOpen(true)}>
              Create Your First List
            </Button>
          }
        />
      ) : (
        <ListGrid lists={lists} onDeleteList={deleteList} />
      )}

      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateList}
      />
    </PageLayout>
  );
};
