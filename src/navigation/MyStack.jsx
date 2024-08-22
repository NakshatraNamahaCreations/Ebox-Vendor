import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../Screens/SplashScreen';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import BottomTab from './BottomTab';
import OtpScreen from '../Screens/OtpScreen';
import OtpSuccess from '../Screens/OtpSuccess';
import Notification from '../component/notification/Notification';
import Productfilter from '../component/product/Productfilter';
import ShopDetails from '../component/home-component/ShopDetails';
import AllShop from '../component/home-component/AllShop';
import Search from '../component/home-component/Search';
import OrderSummary from '../component/order/OrderSummary';
import AddAddress from '../component/cart/AddAddress';
import OrderConfirmation from '../component/cart/OrderConfirmation';
import OrderSuccessPage from '../component/cart/OrderSuccessPage';
import ProductDetails from '../component/product/ProductDetails';
import AddShopDetails from '../Screens/AddShopDetails';
import WaitingScreen from '../Screens/WaitingScreen';
import ProductReview from '../component/product/ProductReview';
import ShopAddress from '../Screens/ShopAddress';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{title: 'Welcome', headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Login', headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{title: 'Register', headerShown: false}}
      />
      <Stack.Screen
        name="AddShopDetails"
        component={AddShopDetails}
        options={{title: 'ShopDetails', headerShown: false}}
      />
      <Stack.Screen
        name="Waiting"
        component={WaitingScreen}
        options={{title: 'WaitingScreen', headerShown: false}}
      />
      <Stack.Screen
        name="OTP"
        component={OtpScreen}
        options={{title: 'OTP', headerShown: false}}
      />
      <Stack.Screen
        name="Otp Success"
        component={OtpSuccess}
        options={{title: 'Otp Success', headerShown: false}}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{title: 'BottomTab', headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          title: 'Notifications',
          headerShown: true,
          // headerTintColor: 'yellow',
          // headerBackground: 'blur',
        }}
      />
      <Stack.Screen
        name="Product Filter"
        component={Productfilter}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductReview"
        component={ProductReview}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Shop Details"
        component={ShopDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddShopAddress"
        component={ShopAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="All Shop"
        component={AllShop}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Order Summary"
        component={OrderSummary}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Address"
        component={AddAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Order Confirmation"
        component={OrderConfirmation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Success"
        component={OrderSuccessPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
