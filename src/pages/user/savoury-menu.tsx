import './savoury-menu.css';
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

import noodlesImage from '../../assets/noodles.png';
import kababImage from '../../assets/kabab.png';
import omeletteImage from '../../assets/omelette.png';
import gobiImage from '../../assets/gobi.png';

const specialItems = [
  { id: 101, name: 'Chicken kabab', image: kababImage },
  { id: 102, name: 'Gobi Rice', image: gobiImage },
  { id: 103, name: 'Noodles', image: noodlesImage },
];

const initialItems = [
  { id: 1, name: 'Chicken Noodles', price: 50, image: noodlesImage, category: 'Lunch', quantity: 1, isSelected: false, isBookmarked: false },
  { id: 2, name: 'Chicken Kabab', price: 25, image: kababImage, category: 'Snacks', quantity: 1, isSelected: false, isBookmarked: false },
  { id: 3, name: 'Omelette', price: 20, image: omeletteImage, category: 'Brunch', quantity: 1, isSelected: false, isBookmarked: false },
  { id: 4, name: 'Gobi Manchurian', price: 40, image: gobiImage, category: 'Snacks', quantity: 1, isSelected: false, isBookmarked: false },
];

const categories = ['All', 'Brunch', 'Lunch', 'Snacks', 'Drinks'];

const SavouryMenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const cartItems = useAppSelector((state) => state.cart.savouryItems);
  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    dispatch(setCartType('savoury'));
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
      dispatch(clearSelectionsOnExit('savoury'));
    }
  }, []);

  const handleSelectChange = (id: number, checked: boolean) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              isSelected: checked,
              quantity: checked ? item.quantity : 1,
            }
          : item
      )
    );

    const item = items.find((i) => i.id === id);
    if (item) {
      checked
        ? dispatch(addOrUpdateItem({ ...item, type: 'savoury' }))
        : dispatch(removeItem({ id: item.id, type: 'savoury' }));
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
      dispatch(addOrUpdateItem({ ...item, quantity: qty, type: 'savoury' }));
    }
  };

  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === 'foodcourt') navigate('/fc-menu');
      }}
    >
      <Menu.Item key="foodcourt">Food Court</Menu.Item>
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
          <h2 className="savoury-title">Savoury ▾</h2>
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
          cartItems.length > 0 && navigate('/view-cart', { state: { fromCart: true } })
        }
      >
        View Cart
      </button>
    </div>
  );
};

export default SavouryMenuPage;
