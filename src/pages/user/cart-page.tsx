import './cart-page.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeItem, updateQuantity, clearCart } from '../../features/cart/cartslice';
import { ArrowLeftOutlined, PlusOutlined, DeleteOutlined, MinusOutlined } from '@ant-design/icons';
import { message, Button as AntButton } from 'antd';
import CommonButton from '../../common-components/button';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartType = useAppSelector((state) => state.cart.cartType);
  const cartItems = useAppSelector((state) =>
    cartType === 'savoury' ? state.cart.savouryItems : state.cart.foodCourtItems
  );

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasBookmark = cartItems.some((item) => item.isBookmarked);

  useEffect(() => {
    if (cartItems.length === 0) {
      if (cartType === 'savoury') {
        navigate('/savoury-menu');
      } else if (cartType === 'foodcourt') {
        navigate('/fc-menu');
      }
    }
  }, [cartItems.length, cartType, navigate]);

  const handleQtyChange = (id: number, qty: number) => {
    if (cartType) {
      dispatch(updateQuantity({ id, quantity: qty, type: cartType }));
    }
  };

  const handleRemove = (id: number) => {
    if (cartType) {
      dispatch(removeItem({ id, type: cartType }));
    }
  };

  const handlePay = () => {
    message.success('Payment successful!');
    if (cartType) {
      dispatch(clearCart(cartType));
    }
    navigate('/token');
  };

  const handleAddMore = () => {
    const path = cartType === 'savoury' ? '/savoury-menu' : '/fc-menu';
    navigate(path, { state: { fromCart: true } });
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <ArrowLeftOutlined
          className="back-icon"
          onClick={() => {
            const path = cartType === 'savoury' ? '/savoury-menu' : '/fc-menu';
            navigate(path, { state: { fromCart: true } });
          }}
        />
        <h2 className="cart-title">My Cart</h2>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="item-img" />
            <div className="item-details">
              <h3 className="item-name">
                {item.name}
                {item.isBookmarked && <div className="bookmark" />}
              </h3>
              <p className="item-price">₹{item.price}</p>
            </div>

            <div className="item-actions">
              <div className="quantity-controls">
                <AntButton
                  icon={<MinusOutlined />}
                  size="small"
                  onClick={() => handleQtyChange(item.id, Math.max(1, item.quantity - 1))}
                />
                <span className="quantity-value">{item.quantity}</span>
                <AntButton
                  icon={<PlusOutlined />}
                  size="small"
                  onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                />
              </div>
              <DeleteOutlined
                className="delete-icon"
                onClick={() => handleRemove(item.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {hasBookmark && (
        <div className="bookmark-notice">
          <div className="bookmark-icon" />
          <p>It takes few minutes to prepare your order. Once the order is ready we’ll notify you</p>
        </div>
      )}

      <div className="cart-footer">
        <div className="total-pay-row">
          <div className="total-amount">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <div className="add-more" onClick={handleAddMore}>
            <PlusOutlined />
            <span>Add more item</span>
          </div>
        </div>
        <CommonButton
          className='pay-button'
          text="Pay"
          onClick={handlePay}
          type="primary"
        />
      </div>
    </div>
  );
};

export default CartPage;