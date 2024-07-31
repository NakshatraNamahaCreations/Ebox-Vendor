import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {bookingHistory} from '../../data/global-data';
import THEMECOLOR from '../../utilities/color';

export default function OrderConfirmation() {
  const navigation = useNavigation();
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
                fontFamily: 'Montserrat-Regular',
                // letterSpacing: 1,
              }}>
              2/182b, 5th street, sengunthapuram(po)
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-Regular',
                // letterSpacing: 1,
              }}>
              Jayankondam, Ariyalur(Dk)
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Montserrat-Regular',
                // letterSpacing: 1,
              }}>
              Tamilnadu - 621802
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
            {bookingHistory.map((item, index) => (
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
                      uri: item.imageUrl,
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
                    {item.productName}
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
                    ₹ {item.productPrice}
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Medium',
                    // letterSpacing: 1,
                  }}>
                  Subtotal
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Medium',
                    // letterSpacing: 1,
                  }}>
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
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
                    // letterSpacing: 1,
                  }}>
                  GST 18%
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Medium',
                    // letterSpacing: 1,
                  }}>
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹ 10000{' '}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                marginTop: 10,
                borderBottomColor: '#e1e1e1',
                backgroundColor: 'white',
                borderStyle: 'dashed',
              }}></View>
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
                  ₹ 1045000{' '}
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
              onPress={() => {
                navigation.navigate('Success');
              }}>
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
