import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigation/MyStack';
import store, {persistor} from './src/state_management/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
