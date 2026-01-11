import { useState, FormEvent } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface CreateListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string, color: string) => void;
}

const colors = [
  { name: 'blue', class: 'bg-list-blue' },
  { name: 'green', class: 'bg-list-green' },
  { name: 'purple', class: 'bg-list-purple' },
  { name: 'pink', class: 'bg-list-pink' },
  { name: 'orange', class: 'bg-list-orange' },
  { name: 'yellow', class: 'bg-list-yellow' },
];

export const CreateListModal = ({ isOpen, onClose, onCreate }: CreateListModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim(), description.trim(), selectedColor);
      setName('');
      setDescription('');
      setSelectedColor('blue');
      onClose();
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setSelectedColor('blue');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New List">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="List Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Weekly Groceries"
          required
          autoFocus
        />
        <Input
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Items for this week"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                className={`w-10 h-10 rounded-lg ${color.class} transition-transform ${
                  selectedColor === color.name
                    ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                    : 'hover:scale-105'
                }`}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth disabled={!name.trim()}>
            Create List
          </Button>
        </div>
      </form>
    </Modal>
  );
};
