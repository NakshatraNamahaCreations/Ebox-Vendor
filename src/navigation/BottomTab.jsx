import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import THEMECOLOR from '../utilities/color';
import Home from '../component/home-component/Home';
import MyCart from '../component/cart/MyCart';
import OrderHistory from '../component/order/OrderHistory';
import AddProduct from '../component/product/AddProduct';
import Profile from '../component/profile-component/Profile';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: THEMECOLOR.mainColor,
        headerTintColor: THEMECOLOR.mainColor,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Order History"
        component={OrderHistory}
        options={{
          tabBarLabel: 'Orders',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="shopping-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddProduct}
        options={{
          tabBarLabel: 'Add Product',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="pluscircle" color="#ea5362" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={MyCart}
        options={{
          tabBarLabel: 'Cart',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Feather name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
