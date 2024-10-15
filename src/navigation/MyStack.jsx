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
import RequestReturn from '../component/order/RequestReturn';
import EmailSummary from '../component/order/EmailSummary';
import Invoice from '../component/order/Invoice';
import MyAddress from '../component/profile-component/MyAddress';
import MyProducts from '../component/profile-component/MyProducts';
import ServicePeople from '../Screens/ServicePeople';
import AdditionalDetails from '../Screens/AdditionalDetails';
import BusinessDetails from '../Screens/BusinessDetails';
import AddService from '../component/service/AddService';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddShopDetails"
        component={AddShopDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Service People"
        component={ServicePeople}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BusinessDetails"
        component={BusinessDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdditionalDetails"
        component={AdditionalDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddShopAddress"
        component={ShopAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Waiting"
        component={WaitingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OTP"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Otp Success"
        component={OtpSuccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{headerShown: false}}
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
        name="Invoice"
        component={Invoice}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Request Return"
        component={RequestReturn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Email Summary"
        component={EmailSummary}
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
        name="AddService"
        component={AddService}
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
      {/* Profile */}
      <Stack.Screen
        name="My Address"
        component={MyAddress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="My Products"
        component={MyProducts}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
