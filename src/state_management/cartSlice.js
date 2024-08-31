import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [], // Ensure this is an array

  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload.id);
      console.log(existingProduct, 'existingProduct');

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice =
          existingProduct.quantity * existingProduct.productPrice;
      } else {
        const orderId =
          BigInt(Math.floor(Math.random() * 1e16)) * BigInt(1e4) +
          BigInt(Math.floor(Math.random() * 1e4));
        state.push({
          // ...action.payload,
          // totalPrice: action.payload.productPrice,
          // mrpPrice: action.payload.mrpPrice,
          // store: action.payload.store,  //old one. working
          // quantity: 1,
          orderId: orderId.toString().padStart(20, '0'),
          id: action.payload.id,
          productName: action.payload.productName,
          productPrice: action.payload.productPrice,
          mrpPrice: action.payload.mrpPrice, // Explicitly assign mrpPrice here
          store: action.payload.store,
          imageUrl: action.payload.imageUrl,
          totalPrice: action.payload.productPrice,
          productCategory: action.payload.productCategory,
          quantity: 1,
          sellerName: action.payload.sellerName,
          sellerId: action.payload.sellerId,
          //all woring
        });
      }
    },

    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    incrementQuantity: (state, action) => {
      const product = state.find(item => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
        product.totalPrice = product.productPrice * product.quantity;
        // product.totalPrice = product.productPrice * product.quantity;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.find(item => item.id === action.payload.id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        product.totalPrice = product.productPrice * product.quantity;
      }
    },
    clearCart: state => {
      return [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// Clear the persisted state
// persistor.purge();
