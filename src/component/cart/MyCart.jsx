import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {bookingHistory} from '../../data/global-data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import THEMECOLOR from '../../utilities/color';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../state_management/cartSlice';
import Octicons from 'react-native-vector-icons/Octicons';

export default function MyCart({vendorData}) {
  console.log('vendorData in cart', vendorData);
  const navigation = useNavigation();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  console.log('cart details in cart page', cart);

  // Function to calculate subtotal and GST
  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const calculateGST = subtotal => {
    return subtotal * 0.18; // GST at 18%
  };

  const subtotal = calculateSubtotal();
  const gst = calculateGST(subtotal).toFixed(2);
  const total = Number(subtotal) + Number(gst);
  const grand = total.toFixed(2);
  // console.log('subtotal', subtotal);
  // console.log('gst', gst);
  // console.log('total', grand);

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          elevation: 4,
          //   paddingBottom: 10,
          //   borderBottomColor: '#e5e5e5',
          //   borderBottomWidth: 1,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
            color: 'black',
            fontSize: 20,
            textAlign: 'left',
          }}>
          Cart
        </Text>
      </View>
      {cart.length > 0 ? (
        <>
          <ScrollView>
            <View style={{padding: 10}}>
              {cart.map((item, index) => (
                <View
                  key={index}
                  style={{
                    margin: 5,
                    borderWidth: 1,
                    borderColor: '#f3f3f3',
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 10,
                    elevation: 2,
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    // alignItems: 'center',
                  }}>
                  <View style={{flex: 0.2, padding: 5, marginRight: 10}}>
                    <Image
                      style={{
                        width: '100%',
                        height: 100,
                        // resizeMode: 'center',
                        borderRadius: 10,
                        // marginBottom: 10,
                      }}
                      source={{
                        uri: `http://192.168.1.103:9000/${item.imageUrl.replace(
                          /\\/g,
                          '/',
                        )}`,
                      }}
                    />
                  </View>

                  <View style={{flex: 0.8}}>
                    <Text
                      style={{
                        fontSize: 13,
                        // width: 200,
                        // overflow: 'hidden',
                        fontFamily: 'Montserrat-SemiBold',
                        // letterSpacing: 1,
                        color: 'black',
                        marginBottom: 5,
                      }}>
                      {/* {item.productName} */}
                      {item.productName.length < 75
                        ? item.productName
                        : item.productName.substring(0, 75) + '...'}
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#f2f2f2',
                        borderRadius: 7,
                        padding: 5,
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 12,
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        Sold by: {item.store ? item.store : ''}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        // marginVertical: 5,
                        justifyContent: 'space-between',
                        borderBottomColor: '#f2f2f2',
                        borderBottomWidth: 1,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingHorizontal: 5,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            // borderWidth: 1,
                            // borderColor: '#c1bfbf',
                            // backgroundColor: 'yellow',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 6,
                            borderRadius: 8,
                            alignItems: 'center',
                            // marginTop: 6,
                          }}>
                          <TouchableOpacity
                            style={{paddingRight: 5}}
                            onPress={() => {
                              if (item.quantity === 1) {
                                dispatch(removeFromCart({id: item.id}));
                              } else {
                                dispatch(decrementQuantity({id: item.id}));
                                // dispatch(updateQuantity({id: item.id, quantity: item.quantity - 1}))
                              }
                            }}>
                            <AntDesign
                              name="minus"
                              size={13}
                              color="#313131"
                              style={{
                                backgroundColor: THEMECOLOR.mainColor,
                                padding: 5,
                                borderRadius: 50,
                              }}
                            />
                          </TouchableOpacity>
                          <Text
                            style={{color: 'black', fontSize: 12, padding: 5}}>
                            {item.quantity}
                          </Text>
                          <TouchableOpacity
                            style={{paddingLeft: 5}}
                            onPress={() =>
                              dispatch(incrementQuantity({id: item.id}))
                            }>
                            <AntDesign
                              name="plus"
                              size={13}
                              color="#313131"
                              style={{
                                backgroundColor: THEMECOLOR.mainColor,
                                padding: 5,
                                borderRadius: 50,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() => dispatch(removeFromCart({id: item.id}))}>
                        <AntDesign
                          name="delete"
                          size={17}
                          color="#ea5362"
                          style={{paddingTop: 10, paddingRight: 5}}
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 11,
                          color: '#9a9ba2',
                          // color: THEMECOLOR.textColor,
                          fontFamily: 'Montserrat-SemiBold',
                          marginVertical: 5,
                          textAlign: 'right',
                          textDecorationLine: 'line-through',
                        }}>
                        {' '}
                        ₹ {item.mrpPrice}{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          //   color: '#414242',
                          color: THEMECOLOR.textColor,
                          fontFamily: 'Montserrat-SemiBold',
                          marginVertical: 5,
                          textAlign: 'right',
                          marginLeft: 5,
                          // letterSpacing: 1,
                        }}>
                        ₹ {item.totalPrice}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View
              style={{
                padding: 10,
                margin: 10,
                borderColor: '#e5e5e5',
                borderWidth: 1,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  // letterSpacing: 1,
                  color: 'black',
                  fontSize: 15,
                  // textAlign: 'left',
                  // borderBottomColor: '#e5e5e5',
                  // borderBottomWidth: 1,
                }}>
                Payment summary
              </Text>
              <View
                style={{
                  padding: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 14,
                        // letterSpacing: 1,
                      }}>
                      Subtotal
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 14,
                        // letterSpacing: 1,
                      }}>
                      <MaterialIcons
                        name="currency-rupee"
                        size={12}
                        color="black"
                      />
                      {subtotal}{' '}
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
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 14,
                        // letterSpacing: 1,
                      }}>
                      GST 18%
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 14,
                        // letterSpacing: 1,
                      }}>
                      <MaterialIcons
                        name="currency-rupee"
                        size={12}
                        color="black"
                      />
                      {gst}{' '}
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
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 14,
                        letterSpacing: 1,
                      }}>
                      Total
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 14,
                        letterSpacing: 1,
                      }}>
                      <MaterialIcons
                        name="currency-rupee"
                        size={12}
                        color="black"
                      />
                      {total.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: '#e3e3e3',
              borderTopColor: '#817575',
              borderTopWidth: 1,
              borderColor: 'transparent',
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                alignItems: 'center',
              }}>
              <View style={{flex: 0.4}}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontFamily: 'Montserrat-SemiBold',
                    // letterSpacing: 1,
                  }}>
                  <MaterialIcons
                    name="currency-rupee"
                    size={13}
                    color="black"
                  />
                  {total.toFixed(2)}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#555',
                    fontFamily: 'Montserrat-Medium',
                    // letterSpacing: 1,
                    // marginTop: 5,
                  }}>
                  Grand Total
                </Text>
              </View>
              <View style={{flex: 0.6}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: THEMECOLOR.mainColor,
                    padding: 15,
                    borderRadius: 7,
                    flexDirection: 'row',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    navigation.navigate(
                      'Add Address',
                      {vendorData: vendorData},
                      // {product:product,product2:product2,product3:product3,product4
                      //  {
                      //   category: category,
                      // }
                    );
                  }}>
                  <Text
                    style={{
                      color: THEMECOLOR.textColor,
                      fontSize: 15,
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 1,
                    }}>
                    Add Address
                  </Text>
                  <AntDesign
                    style={{marginTop: 4}}
                    name="arrowright"
                    size={20}
                    color={THEMECOLOR.textColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Image
            source={require('../../../assets/box.png')}
            style={{
              width: 200,
              height: 200,
              marginTop: '20%',
              marginBottom: 30,
            }}
            onError={() => console.log('Error loading image')} // Error handling for image
          />
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text
              style={{
                color: THEMECOLOR.mainColor,
                fontSize: 15,
                marginBottom: 10,
                textAlign: 'center',
                fontFamily: 'Montserrat-Medium',
              }}>
              Your cart is empty
            </Text>
            {/* <View
          style={{
            borderBottomColor: '#353249',
            borderWidth: 2,
            // width: 50,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}></View> */}
            <Octicons
              name="horizontal-rule"
              color={THEMECOLOR.mainColor}
              size={20}
              style={{textAlign: 'center', marginBottom: 10}}
            />
            <Text
              style={{
                color: '#515151',
                fontSize: 14,
                fontWeight: '400',
                textAlign: 'center',
                fontFamily: 'Montserrat-Medium',
              }}>
              Look like you haven't made your choice yet...
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: THEMECOLOR.mainColor,
                padding: 10,
                borderRadius: 10,
                elevation: 3,
                marginTop: 20,
                marginHorizontal: 50,
              }}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Text
                style={{
                  color: THEMECOLOR.textColor,
                  fontSize: 15,
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Medium',
                }}>
                Start Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
