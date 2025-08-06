import './savoury-menu.css'; // You can rename this file to foodcourt-menu.css for clarity
import { useState, useEffect } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addOrUpdateItem,
  removeItem,
  setCartType,
  clearSelectionsOnExit,
} from '../../features/cart/cartslice';

import SpecialCarousel from '../../features/user-dashboard/components/menu-carousel';
import FoodItemCard from '../../features/user-dashboard/components/food-item-card';
import FilterCategory from '../../common-components/filter-category';
import SearchInput from '../../common-components/search-input';

import veg from '../../assets/veg-biriyani.png';
import gobi from '../../assets/gobi.png';
import kabab from '../../assets/kabab.png';
import omelette from '../../assets/omelette.png';
import meals from '../../assets/meals.png';

const specialItems = [
  { id: 101, name: 'Veg Biriyani', image: veg },
  { id: 102, name: 'Gobi Manchurian', image: gobi },
  { id: 103, name: 'Chicken Kabab', image: kabab },
];

const initialItems = [
  { id: 1, name: 'Veg Biriyani', price: 50, image: veg, category: 'Lunch', quantity: 1, isSelected: false, isBookmarked: false },
  { id: 2, name: 'Chicken Kabab', price: 25, image: kabab, category: 'Snacks', quantity: 1, isSelected: false, isBookmarked: true },
  { id: 3, name: 'Omelette', price: 20, image: omelette, category: 'Brunch', quantity: 1, isSelected: false, isBookmarked: true },
  { id: 4, name: 'Meals', price: 35, image: meals, category: 'Lunch', quantity: 1, isSelected: false, isBookmarked: false },
];

const categories = ['All', 'Brunch', 'Lunch', 'Snacks', 'Drinks'];

const FoodCourtMenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const cartItems = useAppSelector((state) => state.cart.foodCourtItems);
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    dispatch(setCartType('foodcourt'));

    const fromCart = location.state?.fromCart === true;
    if (fromCart) {
      setItems((prev) =>
        prev.map((item) => {
          const inCart = cartItems.find((c) => c.id === item.id);
          return inCart
            ? { ...item, quantity: inCart.quantity, isSelected: true }
            : { ...item, quantity: 1, isSelected: false };
        })
      );
    } else {
      setItems(initialItems);
      dispatch(clearSelectionsOnExit('foodcourt'));
    }
  }, []);

  const handleSelectChange = (id: number, checked: boolean) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isSelected: checked,
            quantity: checked ? item.quantity : 1,
          };
        }
        return item;
      })
    );

    const item = items.find((i) => i.id === id);
    if (item) {
      if (checked) {
        dispatch(addOrUpdateItem({ ...item, type: 'foodcourt' }));
      } else {
        dispatch(removeItem({ id: item.id, type: 'foodcourt' }));
      }
    }
  };

  const handleQuantityChange = (id: number, qty: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );

    const item = items.find((i) => i.id === id && i.isSelected);
    if (item) {
      dispatch(addOrUpdateItem({ ...item, quantity: qty, type: 'foodcourt' }));
    }
  };

  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === 'savoury') navigate('/savoury-menu');
      }}
    >
      <Menu.Item key="savoury">Savoury</Menu.Item>
    </Menu>
  );

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
  );

  return (
    <div className="savoury-page">
      <div className="savoury-header">
        <ArrowLeftOutlined className="back-icon" onClick={() => navigate(-1)} />
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <h2 className="savoury-title">Food Court ▾</h2>
        </Dropdown>
      </div>

      <div className="menu-actions">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for food"
        />
        <FilterCategory
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <SpecialCarousel items={specialItems} />

      <div className="food-list">
        {filteredItems.map((item) => (
          <FoodItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            isSelected={item.isSelected ?? false}
            quantity={item.quantity}
            onSelectChange={handleSelectChange}
            onQuantityChange={handleQuantityChange}
            isBookmarked={item.isBookmarked}
          />
        ))}
      </div>

      <button
        className={`view-cart-button ${cartItems.length > 0 ? 'active' : 'disabled'}`}
        disabled={cartItems.length === 0}
        onClick={() =>
          cartItems.length > 0 &&
          navigate('/view-cart', { state: { fromCart: true } })
        }
      >
        View Cart
      </button>
    </div>
  );
};

export default FoodCourtMenuPage;
