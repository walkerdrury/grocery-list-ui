import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  message: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, message, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-gray-400 mb-4">{icon}</div>
      <p className="text-gray-600 text-lg mb-6">{message}</p>
      {action}
    </div>
  );
};
