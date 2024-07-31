import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import THEMECOLOR from '../../utilities/color';

export default function OrderSummary({navigation, route}) {
  const product = route.params.product;
  console.log('product>>>>>>>>>>', product);
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{marginTop: 20, marginLeft: 10}}>
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

      <ScrollView>
        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
              marginBottom: 5,
            }}>
            Booking Summary
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#636363',
              fontFamily: 'Montserrat-Medium',
              marginBottom: 5,
            }}>
            {product.orderDate}
          </Text>
          {/* <TouchableOpacity>
          <Text
            style={{
              fontSize: 13,
              color: 'green',
              fontFamily: 'Montserrat-Light',
              // marginBottom: 20,
            }}>
            Download Invoice{' '}
            <AntDesign
              name="download"
              size={14}
              color="green"
              //   onPress={() => navigation.goBack()}
            />
          </Text>
        </TouchableOpacity> */}
          <Text
            style={{
              fontSize: 12,
              color: 'green',
              fontFamily: 'Montserrat-Medium',
              // marginBottom: 20,
            }}>
            {product.orderStatus}
          </Text>
          {/* <View style={{marginTop: 10, marginBottom: 10}}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
              
                fontFamily: 'Montserrat-SemiBold',
              }}>
              {product.products.length} items in this order
            </Text>
          </View> */}
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                marginBottom: 5,
              }}>
              <View style={{flex: 0.2}}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    // borderWidth: 1,
                    // borderColor: '#e3e1e1',
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{
                      uri: product.imageUrl,
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
              <View style={{flex: 0.6}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {product.productName}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    // color: '#454444',
                    color: '#ea5362',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Qty: {product.quantity}
                </Text>
              </View>
              <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {/* <MaterialIcons
                    name="currency-rupee"
                    // size={13}
                    color="#3c4145"
                  /> */}
                  {/* {item.totalPrice} */}₹ {product.productPrice}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            borderColor: '#f7f6fd',
            borderWidth: 5,
            marginBottom: 5,
          }}></View>
        <View
          style={{
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
              padding: 10,
            }}>
            Bill details
          </Text>
          <View
            style={{
              borderTopColor: '#f5f5f5',
              borderTopWidth: 1,
              marginBottom: 5,
            }}></View>
          <View style={{padding: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Total Item
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹1025000
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
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Event Box Fee
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹20000
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
                    fontSize: 13,
                    fontFamily: 'Montserrat-Medium',
                    letterSpacing: 1,
                  }}>
                  GST 18%
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹10000
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
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 13,
                    letterSpacing: 1,
                  }}>
                  Bill total
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 13,
                  }}>
                  {' '}
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹1045000{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            borderColor: '#f7f6fd',
            borderWidth: 5,
            marginBottom: 5,
          }}></View>
        <View
          style={{
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
              padding: 10,
            }}>
            Order details
          </Text>
          <View
            style={{
              borderTopColor: '#f5f5f5',
              borderTopWidth: 1,
              marginBottom: 5,
            }}></View>
          <View style={{padding: 10}}>
            <Text
              style={{
                fontSize: 12,
                color: '#636363',
                fontFamily: 'Montserrat-Medium',
              }}>
              Order id
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                fontFamily: 'Montserrat-Regular',
              }}>
              {`J372Y9YE`}
            </Text>
            <View style={{marginTop: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#636363',
                  fontFamily: 'Montserrat-Medium',
                }}>
                Payment
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Regular',
                }}>
                Online
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#636363',
                  fontFamily: 'Montserrat-Medium',
                }}>
                Address
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Regular',
                }}>
                Ibis Party Hall, No.26, 1, Hosur Rd, Zuzuvadi, Madiwala, 1st
                Stage, Bommanahalli, Bengaluru, Karnataka 560068
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#636363',
                  fontFamily: 'Montserrat-Medium',
                }}>
                Event on
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Regular',
                }}>
                June 28, 2024, 10:00 AM - June 28, 2024, 6:00 PM
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: 30,
          paddingRight: 30,
          marginTop: 15,
          paddingBottom: 15,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            padding: 10,
            borderRadius: 7,
          }}
          // onPress={() => {
          //   navigation.navigate(
          //     'Add Address',
          //   );
          // }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              textAlign: 'center',
            }}>
            Download invoice{' '}
            <AntDesign
              name="download"
              size={14}
              color="black"
              //   onPress={() => navigation.goBack()}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
