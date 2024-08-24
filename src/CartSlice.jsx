import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  items: [],
  addedToCart: {},
  isVisible: false,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.addedToCart[name] = true;
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
      state.addedToCart[action.payload] = false;
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        console.log(itemToUpdate.quantity);
      }
    },
    showCart: (state) => {
      state.isVisible = true;
    },
    hideCart: (state) => {
      state.isVisible = false;
    },
    clearCart:(state)=>{
      state.items=[]
      state.addedToCart={}
    }
  },
});

export const { showCart,clearCart, hideCart, length, addItem, removeItem, updateQuantity } = CartSlice.actions;

export const selectCartLength = (state) =>state.cart.items.length

export default CartSlice.reducer;
