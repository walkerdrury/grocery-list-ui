import { ReactNode } from 'react';
import { Header } from './Header';
import { Container } from './Container';

interface PageLayoutProps {
  title: string;
  showBack?: boolean;
  action?: ReactNode;
  children: ReactNode;
}

export const PageLayout = ({ title, showBack, action, children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={title} showBack={showBack} action={action} />
      <Container>{children}</Container>
    </div>
  );
};
