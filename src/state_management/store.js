// old cart
//working
// import {configureStore} from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export default store;

import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';

// Configuring persistence
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
