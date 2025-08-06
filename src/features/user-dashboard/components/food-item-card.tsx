import { useState, useEffect } from 'react';
import './food-item-card.css';

interface Props {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isSelected: boolean;
  isBookmarked?: boolean;
  onQuantityChange?: (id: number, newQty: number) => void;
  onSelectChange?: (id: number, checked: boolean) => void;
}

const FoodItemCard = ({
  id,
  name,
  price,
  image,
  quantity,
  isSelected,
  isBookmarked = false,
  onQuantityChange,
  onSelectChange
}: Props) => {
  const [qty, setQty] = useState(quantity);

  useEffect(() => {
    setQty(quantity);
  }, [quantity]);

  const handleDecrease = () => {
    if (qty > 1 && isSelected) {
      const newQty = qty - 1;
      setQty(newQty);
      onQuantityChange?.(id, newQty);
    }
  };

  const handleIncrease = () => {
    if (isSelected) {
      const newQty = qty + 1;
      setQty(newQty);
      onQuantityChange?.(id, newQty);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    onSelectChange?.(id, checked);
    if (checked) {
      onQuantityChange?.(id, qty); // sync initial qty
    }
  };

  return (
    <div className={`food-card ${isSelected ? 'selected' : ''}`}>
      <div className="food-image-container">
        {isBookmarked && <div className="bookmark" />}
        <img src={image} alt={name} className="food-image" />
      </div>

      <div className="food-details">
        <div className="food-name">{name}</div>
        <div className="food-price">₹{price}</div>
      </div>

      <div className={`food-quantity ${isSelected ? '' : 'disabled'}`}>
        <button onClick={handleDecrease} disabled={!isSelected}>-</button>
        <span>{qty}</span>
        <button onClick={handleIncrease} disabled={!isSelected}>+</button>
      </div>

      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        className="food-checkbox"
      />
    </div>
  );
};

export default FoodItemCard;
