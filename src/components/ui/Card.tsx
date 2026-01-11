import { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export const Card = ({ children, hover = false, className = '', ...props }: CardProps) => {
  const hoverClass = hover ? 'hover:shadow-md cursor-pointer' : '';

  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 sm:p-6 transition-shadow ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
