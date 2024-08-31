import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {bookingHistory} from '../../data/global-data';
import THEMECOLOR from '../../utilities/color';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {clearCart} from '../../state_management/cartSlice';
import {apiUrl} from '../../api-services/api-constants';
import moment from 'moment';

export default function OrderConfirmation({route}) {
  const userAddress = route.params.address;
  const vendorData = route.params.vendorData;
  console.log('userAddress in order confirmation page', userAddress);
  // console.log('vendorData in order confirmation page', vendorData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart);
  console.log('cart details in order confirmations page', cart);

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const calculateGST = subtotal => {
    return subtotal * 0.18; // GST at 18%
  };

  const subtotal = calculateSubtotal();
  const gst = calculateGST(subtotal).toFixed(2);
  const total = Number(subtotal) + Number(gst);

  console.log('subtotal', subtotal);
  console.log('gst', gst);
  console.log('total in order confimation page', total);
  const constructingCart = cart.map((item, index) => ({
    ...item,
    AindexValue: index + 1,

    order_id: item.orderId,
    product_id: item.id,
    product_image: item.imageUrl,
    product_name: item.productName,
    product_category: item.productCategory,
    store_or_seller: item.store,
    product_price: item.productPrice,
    applied_quantity: item.quantity,
    totalPrice: item.totalPrice,
    product_mrp: item.mrpPrice,

    ordered_date: moment().format('LLL'),
    delivery_address: userAddress,
    // cart_value: subtotal,
    gst_applied_value: gst,
    paid_amount: total,
    payment_method: 'offline',
    payment_status: 'success',
    order_status: 'Order Placed',
    vendor_id: vendorData._id,
    vendor_name: vendorData.vendor_name,
    seller_name: item.sellerName,
    seller_id: item.sellerId,
  }));

  console.log('constructingCart', constructingCart);

  const proceedToPay = async () => {
    try {
      const config = {
        url: apiUrl.CREATE_ORDER,
        method: 'post',
        baseURL: apiUrl.BASEURL,
        headers: {'Content-Type': 'application/json'},
        data: constructingCart,
        // data: {
        //   product: cart,
        //   delivery_address: userAddress,
        //   cart_value: subtotal,
        //   gst_applied_value: gst,
        //   paid_amount: total,
        //   payment_method: 'offline',
        //   payment_status: 'success',
        //   order_status: 'Order Placed',
        //   vendor_id: vendorData._id,
        //   vendor_name: vendorData.vendor_name,
        // },
      };
      const response = await axios(config);
      if (response.status === 200) {
        console.log('Message:', response.data.message);
        dispatch(clearCart());
        navigation.navigate('Success');
      }
    } catch (error) {
      console.log('Unknown error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        // Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
          alignItems: 'center',
          backgroundColor: 'white',
          elevation: 4,
          paddingBottom: 10,
          borderBottomColor: '#e5e5e5',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          style={{flex: 0.2, paddingLeft: 20}}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            color="black"
            size={19}
            style={{
              backgroundColor: '#f5f5f5',
              width: 40,
              height: 40,
              textAlign: 'center',
              paddingTop: 10,
              borderRadius: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 0.8}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
              color: 'black',
              fontSize: 18,
            }}>
            Order confirmation
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 15, paddingVertical: 20}}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              // letterSpacing: 1,
              color: 'black',
              fontSize: 15,
              marginBottom: 10,
            }}>
            Delivery address
          </Text>
          <View
            style={{
              padding: 10,
              borderColor: '#e5e5e5',
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-SemiBold',
                // letterSpacing: 1,
              }}>
              {userAddress.fullName}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-Regular',
                // letterSpacing: 1,
              }}>
              {userAddress.houseFlatBlock}, {userAddress.roadArea},
              {/* 2/182b, 5th street, sengunthapuram(po) */}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-Regular',
                // letterSpacing: 1,
              }}>
              {/* Jayankondam, Ariyalur(Dk) */}
              {userAddress.cityDownVillage}, {userAddress.distric},
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-Regular',
                // letterSpacing: 1,
              }}>
              {/* Tamilnadu - 621802 */}
              {userAddress.state} {userAddress.pincode}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-Regular',
                // letterSpacing: 1,
              }}>
              {/* Tamilnadu - 621802 */}
              Contact: {userAddress.mobileNumber}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              // letterSpacing: 1,
              color: 'black',
              fontSize: 15,
              marginBottom: 10,
            }}>
            Order summary
          </Text>
          <View style={{padding: 10}}>
            {cart.map((item, index) => (
              <View
                key={index}
                // onPress={() =>
                //   navigation.navigate('Order Summary', {product: item})
                // }
                style={{
                  // margin: 5,
                  borderBottomWidth:
                    index === bookingHistory.length - 1 ? 0 : 1,
                  borderBottomColor: '#f3efef',
                  backgroundColor: 'white',
                  padding: 5,
                  // borderRadius: 10,
                  // elevation: 2,
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  // alignItems: 'center',
                }}>
                <View style={{flex: 0.2}}>
                  <Image
                    style={{
                      width: '100%',
                      height: 80,
                      resizeMode: 'center',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: `http://192.168.1.103:9000/${item.imageUrl.replace(
                        /\\/g,
                        '/',
                      )}`,
                    }}
                  />
                </View>
                <View style={{flex: 0.8, marginLeft: 15}}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: 'Montserrat-SemiBold',
                      // letterSpacing: 1,
                      color: 'black',
                      marginBottom: 5,
                    }}>
                    {item.productName.length < 65
                      ? item.productName
                      : item.productName.substring(0, 65) + '...'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#414242',
                      // color: 'black',
                      fontFamily: 'Montserrat-Medium',
                      // letterSpacing: 1,
                    }}>
                    {/* <MaterialIcons
                      name="currency-rupee"
                      size={14}
                      color="black"
                    /> */}
                    ₹ {item.totalPrice}
                  </Text>
                  <Text
                    style={{
                      color: '#ea5362',
                      fontFamily: 'Montserrat-Medium',
                      fontSize: 13,
                      padding: 5,
                    }}>
                    X{item.quantity}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={{padding: 10}}>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Medium', 
                  }}>
                  Subtotal
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Medium', 
                  }}> 
                  ₹ 1025000{' '}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Medium', 
                  }}>
                  GST 18%
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Medium', 
                  }}> 
                  ₹ 10000{' '}
                </Text>
              </View>
            </View> */}
            {/* <View
              style={{
                borderBottomWidth: 1,
                marginTop: 10,
                borderBottomColor: '#e1e1e1',
                backgroundColor: 'white',
                borderStyle: 'dashed',
              }}></View> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 16,
                    letterSpacing: 1,
                  }}>
                  Grand total
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 16,
                    letterSpacing: 1,
                  }}>
                  {' '}
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹ {total.toFixed(2)}{' '}
                </Text>
              </View>
            </View>
          </View>
          <View style={{margin: 10}}>
            <TouchableOpacity
              style={{
                marginTop: 15,
                backgroundColor: THEMECOLOR.mainColor,
                padding: 10,
                borderRadius: 5,
              }}
              onPress={
                proceedToPay
                // navigation.navigate('Success');
              }>
              <Text
                style={{
                  color: THEMECOLOR.textColor,
                  textAlign: 'center',
                  fontSize: 15,
                  // letterSpacing: 1,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Proceed to Pay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
