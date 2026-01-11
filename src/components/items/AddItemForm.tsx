import { useState, FormEvent } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface AddItemFormProps {
  onAdd: (text: string, quantity?: string) => void;
}

export const AddItemForm = ({ onAdd }: AddItemFormProps) => {
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), quantity.trim() || undefined);
      setText('');
      setQuantity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex gap-3 flex-col sm:flex-row">
        <div className="flex-1">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add an item..."
            required
          />
        </div>
        <div className="w-full sm:w-32">
          <Input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />
        </div>
        <Button type="submit" disabled={!text.trim()}>
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
            Add
          </span>
        </Button>
      </div>
    </form>
  );
};
