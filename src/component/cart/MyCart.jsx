import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {bookingHistory} from '../../data/global-data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
export default function MyCart() {
  const navigation = useNavigation();
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
            fontFamily: 'Poppins-Medium',
            letterSpacing: 1,
            color: 'black',
            fontSize: 20,
            textAlign: 'left',
          }}>
          Cart
        </Text>
      </View>
      <ScrollView>
        <View style={{padding: 10}}>
          {bookingHistory.map((item, index) => (
            <View
              key={index}
              // onPress={() =>
              //   navigation.navigate('Order Summary', {product: item})
              // }
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
                alignItems: 'center',
              }}>
              <View style={{flex: 0.2, padding: 5}}>
                <Image
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'center',
                    borderRadius: 10,
                    // marginBottom: 10,
                  }}
                  source={{
                    uri: item.imageUrl,
                  }}
                />
              </View>
              <View style={{flex: 0.8}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 5,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      width: 200,
                      overflow: 'hidden',
                      fontFamily: 'Poppins-SemiBold',
                      letterSpacing: 1,
                      color: 'black',
                      marginBottom: 5,
                    }}>
                    {item.productName}
                    {/* {item.productName.length < 20
                      ? item.productName
                      : item.productName.substring(0, 20) + '...'} */}
                  </Text>
                  <TouchableOpacity>
                    <AntDesign
                      name="delete"
                      size={20}
                      color="#ea5362"
                      // style={{paddingBottom: 10}}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      //   color: '#414242',
                      color: 'green',
                      fontFamily: 'Poppins-Regular',
                      letterSpacing: 1,
                    }}>
                    ₹{item.productPrice}
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#c1bfbf',
                      // backgroundColor: 'yellow',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 6,
                      borderRadius: 8,
                      // marginTop: 6,
                    }}>
                    <TouchableOpacity style={{padding: 5}}>
                      <AntDesign name="minus" size={20} color="#313131" />
                    </TouchableOpacity>
                    <Text style={{color: 'black', fontSize: 16, padding: 5}}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity style={{padding: 5}}>
                      <AntDesign name="plus" size={20} color="#313131" />
                    </TouchableOpacity>
                  </View>
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
              fontFamily: 'Poppins-Medium',
              letterSpacing: 1,
              color: 'black',
              fontSize: 17,
              // textAlign: 'left',
              borderBottomColor: '#e5e5e5',
              borderBottomWidth: 1,
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
                    fontFamily: 'Poppins-Regular',
                    letterSpacing: 1,
                  }}>
                  Subtotal
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    letterSpacing: 1,
                  }}>
                  <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  />
                  1025000{' '}
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
                    fontFamily: 'Poppins-Regular',
                    letterSpacing: 1,
                  }}>
                  GST 18%
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Poppins-Regular',
                    letterSpacing: 1,
                  }}>
                  <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  />
                  10000{' '}
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
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 16,
                    letterSpacing: 1,
                  }}>
                  Total
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 16,
                    letterSpacing: 1,
                  }}>
                  {' '}
                  <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  />
                  1045000{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            borderTopColor: '#e1e1e1',
            borderWidth: 1,
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
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'Poppins-SemiBold',
                  letterSpacing: 1,
                }}>
                <MaterialIcons name="currency-rupee" size={17} color="black" />
                1045000
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: '#555',
                  fontFamily: 'Poppins-Medium',
                  letterSpacing: 1,
                  // marginTop: 5,
                }}>
                Grand Total
              </Text>
            </View>
            <View style={{flex: 0.6}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ea5362',
                  padding: 15,
                  borderRadius: 7,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  navigation.navigate(
                    'Add Address',
                    // {product:product,product2:product2,product3:product3,product4
                    //  {
                    //   category: category,
                    // }
                  );
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Poppins-Medium',
                    letterSpacing: 1,
                  }}>
                  Add Address
                </Text>
                <AntDesign
                  style={{marginTop: 4}}
                  name="arrowright"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
