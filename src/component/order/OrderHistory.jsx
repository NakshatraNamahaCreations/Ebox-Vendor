import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import {apiUrl} from '../../api-services/api-constants';
import THEMECOLOR from '../../utilities/color';
import Octicons from 'react-native-vector-icons/Octicons';

export default function OrderHistory({vendorData}) {
  // console.log('vendorData in order history page>>>', vendorData);
  const navigation = useNavigation();
  const [orderHistory, setOrderHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_ORDER_BY_VENDOR_ID}${vendorData._id}`,
      );
      if (res.status === 200) {
        setOrderHistory(res.data.vendorOrder.reverse());
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <ActivityIndicator size="large" color="#0a6fe8" />
      </View>
    );
  }

  console.log('vendor Orders in order history ', orderHistory);
  // const formattedProducts = orderHistory.flatMap(order =>
  //   order.product.map(product => ({
  //     ...product,
  //     // order_id: order._id +  ,
  //     payment_method: order.payment_method,
  //     order_date: order.order_date,
  //     order_status: order.order_status,
  //     delivery_address: order.delivery_address,
  //   })),
  // );
  // console.log('formattedProducts', formattedProducts);

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          elevation: 4,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            color: 'black',
            fontSize: 20,
            textAlign: 'left',
          }}>
          My Orders
        </Text>
      </View>
      {orderHistory.length === 0 ? (
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
              You haven't placed any orders
            </Text>
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
              All your orders will appear here
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
                View Products
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[THEMECOLOR.mainColor]} // Customize the color of the refresh indicator
            />
          }>
          <View style={{padding: 10}}>
            {orderHistory.length > 0 ? (
              <>
                {orderHistory.map(item => (
                  <TouchableOpacity
                    key={item.order_id}
                    style={{
                      backgroundColor: 'white',
                      marginBottom: 10,
                      borderRadius: 7,
                      borderTopColor: '#eee',
                      borderTopWidth: 1,
                    }}
                    onPress={() =>
                      navigation.navigate('Order Summary', {
                        product: item,
                        vendorData: vendorData,
                      })
                    }>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        marginBottom: 5,
                      }}>
                      <View style={{flex: 0.2}}>
                        {/* <View
                          style={{
                            backgroundColor: 'yellow',
                            borderRadius: 50,
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}> */}
                        <Image
                          source={{
                            uri: `${apiUrl.IMAGEURL}${item.product_image}`,
                          }}
                          style={{
                            flex: 0.2,
                            borderWidth: 1,
                            borderColor: '#e3e1e1',
                            paddingVertical: 10,
                            height: 80,
                            borderRadius: 10,
                            resizeMode: 'cover',
                            margin: 4,
                          }}
                        />
                        {/* </View> */}
                      </View>
                      <View style={{flex: 0.7, marginLeft: 13}}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'black',
                            // letterSpacing: 1,
                            fontFamily: 'Montserrat-SemiBold',
                          }}>
                          {/* {item.order_status} */}
                          {item.product_name.length < 57
                            ? item.product_name
                            : item.product_name.substring(0, 55) + '...'}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'black',
                            // letterSpacing: 1,
                            marginVertical: 2,
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          ₹{item.totalPrice}
                          <Text
                            style={{
                              fontSize: 14,
                              color: 'black',
                              fontFamily: 'Montserrat-SemiBold',
                            }}>
                            {' '}
                            •{' '}
                          </Text>
                          {/* <Entypo name="dot-single" size={20} color="gray" /> */}
                          {moment(item.ordered_date).format('LLL')}
                        </Text>
                      </View>
                      <TouchableOpacity style={{flex: 0.1}}>
                        <Feather name="arrow-right" size={20} color="#313131" />
                      </TouchableOpacity>
                    </View>
                    {/* <View
                      style={{
                        borderTopColor: '#f9f9f9',
                        borderTopWidth: 1,
                        paddingTop: 5,
                        marginBottom: 5,
                      }}></View> */}
                    {/* <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}>
                      {item.product.slice(0, 4).map((ele, index) => (
                        <>
                          <Image
                            key={index}
                            source={{
                              uri: `${apiUrl.IMAGEURL}${ele.imageUrl.replace(
                                /\\/g,
                                '/',
                              )}`,
                            }}
                            style={{
                              flex: 0.2,
                              borderWidth: 1,
                              borderColor: '#e3e1e1',
                              paddingVertical: 10,
                              height: 80,
                              borderRadius: 10,
                              resizeMode: 'cover',
                              margin: 4,
                            }}
                          />
                        </>
                      ))}
                      {item.product.length > 4 && (
                        <View
                          style={{
                            flex: 0.2,
                            // paddingVertical: 10,
                            height: 80,
                            borderRadius: 10,
                            margin: 4,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#efefef',
                          }}>
                          <Text
                            style={{
                              color: '#575757',
                              fontFamily: 'Montserrat-SemiBold',
                            }}>
                            +{item.product.length - 4}
                          </Text>
                        </View>
                      )}
                    </View> */}
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <>
                <View style={styles.overlay}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              </>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
