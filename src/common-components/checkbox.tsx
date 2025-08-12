import { Checkbox, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import './checkbox.css';

type Props = {
  selected: boolean;
  onCheckChange: (checked: boolean) => void;
  quantity: number;
  onQtyChange: (qty: number) => void;
};

const CheckboxWithQuantity = ({ selected, onCheckChange, quantity, onQtyChange }: Props) => {
  const increment = () => onQtyChange(quantity + 1);
  const decrement = () => {
    if (quantity > 1) onQtyChange(quantity - 1);
  };

  return (
    <div className="checkbox-quantity-wrapper">
      <div className="quantity-controls">
        <Button icon={<MinusOutlined />} size="small" onClick={decrement} />
        <span className="quantity-value">{quantity}</span>
        <Button icon={<PlusOutlined />} size="small" onClick={increment} />
      </div>
      <Checkbox checked={selected} onChange={(e) => onCheckChange(e.target.checked)} />
    </div>
  );
};

export default CheckboxWithQuantity;