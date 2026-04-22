import './token-page.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const generateToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 2 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const TokenPage = () => {
  const navigate = useNavigate();
  const cartType = useAppSelector((state) => state.cart.cartType);
  const orderedItems = useAppSelector((state) =>
    cartType === 'savoury' ? state.cart.savouryItems : state.cart.foodCourtItems
  );

  const [tokenNumber, setTokenNumber] = useState('');
  const [paymentTime, setPaymentTime] = useState('');
  const [deliveredStatus, setDeliveredStatus] = useState<{ [key: number]: boolean }>({});

  const total = orderedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasBookmark = orderedItems.some((item) => item.isBookmarked);

  useEffect(() => {
    const token = generateToken();
    const time = dayjs().format('DD MMM YYYY, hh:mm a');

    setTokenNumber(token);
    setPaymentTime(time);

    const today = dayjs().format('YYYY-MM-DD');
    const storedData = JSON.parse(localStorage.getItem('tokensData') || '{}');

    if (!storedData.date || storedData.date !== today) {
      localStorage.setItem(
        'tokensData',
        JSON.stringify({
          date: today,
          tokens: [{ token, time }],
        })
      );
    } else {
      storedData.tokens.push({ token, time });
      localStorage.setItem('tokensData', JSON.stringify(storedData));
    }

    const initialStatus: { [key: number]: boolean } = {};
    orderedItems.forEach((item) => {
      initialStatus[item.id] = false;
    });
    setDeliveredStatus(initialStatus);
  }, [orderedItems]);

  const handleDeliveryCheck = (id: number, checked: boolean) => {
    setDeliveredStatus((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div className="token-page">
      {/* Header */}
      <div className="token-header">
        <ArrowLeftOutlined
          className="back-icon"
          onClick={() => {
            const path = cartType === 'savoury' ? '/savoury-menu' : '/fc-menu';
            navigate(path);
          }}
        />
        <h2 className="token-title">AFC</h2>
      </div>

      <div className="order-status">✅ Your order has been placed</div>

      {/* Ordered Items */}
      <div className="ordered-items">
        {orderedItems.map((item) => (
          <div key={item.id} className="ordered-item">
            <input
              type="checkbox"
              checked={deliveredStatus[item.id] || false}
              onChange={(e) => handleDeliveryCheck(item.id, e.target.checked)}
              className="delivery-checkbox"
            />

            {/* Show bookmark before savoury items */}
            <div className="item-name-wrapper">
              {cartType === 'savoury' && <div className="bookmark" />}
              <span className="item-name">{item.name}</span>
            </div>

            <span className="item-qty">{item.quantity}</span>
            <span className="item-price">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="total-row">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      {/* Bookmark Notice */}
      {hasBookmark && (
        <div className="bookmark-notice">
          <div className="bookmark-icon" />
          <p>It takes few minutes to prepare your order. Once the order is ready we’ll notify you</p>
        </div>
      )}

      {/* Token Number */}
      <div className="token-number">
        <span className="token-value">#{tokenNumber}</span>
      </div>

      {/* Payment Time */}
      <div className="payment-time">{paymentTime}</div>
    </div>
  );
};

export default TokenPage;
