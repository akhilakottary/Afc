import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CartType = 'savoury' | 'foodcourt';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isBookmarked?: boolean;
}

interface CartState {
  savouryItems: CartItem[];
  foodCourtItems: CartItem[];
  cartType: CartType | null;
}

const initialState: CartState = {
  savouryItems: [],
  foodCourtItems: [],
  cartType: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartType(state, action: PayloadAction<CartType>) {
      state.cartType = action.payload;
    },

    addOrUpdateItem(
      state,
      action: PayloadAction<CartItem & { type: CartType }>
    ) {
      const { type, ...item } = action.payload;
      const cartArray = type === 'savoury' ? state.savouryItems : state.foodCourtItems;

      const existing = cartArray.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity = item.quantity;
      } else {
        cartArray.push({ ...item });
      }
    },

    removeItem(state, action: PayloadAction<{ id: number; type: CartType }>) {
      const { id, type } = action.payload;
      if (type === 'savoury') {
        state.savouryItems = state.savouryItems.filter((i) => i.id !== id);
      } else {
        state.foodCourtItems = state.foodCourtItems.filter((i) => i.id !== id);
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number; type: CartType }>
    ) {
      const { id, quantity, type } = action.payload;
      const cartArray = type === 'savoury' ? state.savouryItems : state.foodCourtItems;
      const item = cartArray.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart(state, action: PayloadAction<CartType>) {
      if (action.payload === 'savoury') {
        state.savouryItems = [];
      } else {
        state.foodCourtItems = [];
      }
    },

    clearSelectionsOnExit(state, action: PayloadAction<CartType>) {
      // Clears only when user navigates away (switch menu or go home)
      if (action.payload === 'savoury') {
        state.savouryItems = [];
      } else {
        state.foodCourtItems = [];
      }
    },
  },
});

export const {
  setCartType,
  addOrUpdateItem,
  removeItem,
  updateQuantity,
  clearCart,
  clearSelectionsOnExit,
} = cartSlice.actions;

export default cartSlice.reducer;