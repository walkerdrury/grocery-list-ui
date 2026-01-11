import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GroceryProvider } from './context/GroceryContext';
import { ListsPage } from './pages/ListsPage';
import { ListDetailPage } from './pages/ListDetailPage';

function App() {
  return (
    <GroceryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListsPage />} />
          <Route path="/lists/:listId" element={<ListDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GroceryProvider>
  );
}

export default App;
