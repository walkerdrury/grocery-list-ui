import { useState, FormEvent, useEffect } from 'react';
import { GroceryItem } from '../../context/types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: GroceryItem | null;
  onUpdate: (text: string, quantity?: string) => void;
}

export const EditItemModal = ({ isOpen, onClose, item, onUpdate }: EditItemModalProps) => {
  const [text, setText] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (item) {
      setText(item.text);
      setQuantity(item.quantity || '');
    }
  }, [item]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onUpdate(text.trim(), quantity.trim() || undefined);
      onClose();
    }
  };

  const handleClose = () => {
    setText('');
    setQuantity('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Item">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Item Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., Milk"
          required
          autoFocus
        />
        <Input
          label="Quantity (optional)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g., 2 gallons"
        />
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={handleClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="primary" fullWidth disabled={!text.trim()}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
