import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import THEMECOLOR from '../../utilities/color';
import moment from 'moment';
import {apiUrl} from '../../api-services/api-constants';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export default function OrderSummary({route}) {
  const navigation = useNavigation();
  const {product, vendorData} = route.params;
  const returingProducts = product.product?.map(ele => ele);
  console.log('product in order summary>>>>>>>>>> ', product);
  console.log('returingProducts>>>>>>>>>> ', returingProducts);
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    // Only fetch data if vendor data is available
    if (vendorData) {
      fetchData(vendorData);
    }
  }, [vendorData]);

  const fetchData = async () => {
    // loading all selling data and filterout in frontend
    try {
      const res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_SELLING_PRODUCTS}`,
      );
      if (res.status === 200) {
        const filteredProducts = res.data.allSellProduct.filter(
          item => item.vendor_id !== vendorData?._id,
        );
        setPopularItems(filteredProducts);
        // setFlp(res.data.allSellProduct);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log('popularItems', popularItems);

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
            {moment(product.order_date).format('LLL')}
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
            {product.order_status}
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
          {returingProducts.map(item => (
            <View key={item._id}>
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
                        uri: `${apiUrl.IMAGEURL}${item.imageUrl}`,
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
                    {item.productName.length < 58
                      ? item.productName
                      : item.productName.substring(0, 58) + '...'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      // color: '#454444',
                      color: '#ea5362',
                      marginTop: 5,
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    Qty: {item.quantity}
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
                    {/* {item.totalPrice} */}₹ {item.totalPrice}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
                  ₹{product.cart_value}
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
                  ₹{product.gst_applied_value}
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
                    letterSpacing: 1,
                  }}>
                  {' '}
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹{product.paid_amount}{' '}
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
                color: '#3f3f3f',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Order id
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                fontFamily: 'Montserrat-Regular',
              }}>
              {product._id.substring(product._id.length - 8)}
            </Text>
            <View style={{marginTop: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#3f3f3f',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Payment
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {product.payment_method}
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#3f3f3f',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Shipping Address
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {product.delivery_address.fullName}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {product.delivery_address.houseFlatBlock},{' '}
                {product.delivery_address.roadArea},{' '}
                {product.delivery_address.cityDownVillage},{' '}
                {product.delivery_address.distric},{' '}
                {product.delivery_address.state} -{' '}
                {product.delivery_address.pincode}
                {/* Ibis Party Hall, No.26, 1, Hosur Rd, Zuzuvadi, Madiwala, 1st
                Stage, Bommanahalli, Bengaluru, Karnataka 560068 */}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderColor: '#f7f6fd',
            borderWidth: 5,
            marginBottom: 5,
          }}></View>
        <Text
          style={{
            fontSize: 14,
            color: 'black',
            fontFamily: 'Montserrat-SemiBold',
            padding: 10,
          }}>
          You may also like
        </Text>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            // justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            // gap: 10,
          }}>
          {popularItems.slice(0, 5).map(item => (
            <TouchableOpacity
              key={item._id}
              style={{width: '33.33%', paddingHorizontal: 5, marginBottom: 10}}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  item: item,
                })
              }>
              <View
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  backgroundColor: '#e5e5e5',
                  marginBottom: 10,
                  padding: 5,
                }}>
                <Image
                  source={{
                    uri: `${apiUrl.IMAGEURL}${item.product_image[0].replace(
                      /\\/g,
                      '/',
                    )}`,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                }}>
                {item.product_name.length < 12
                  ? item.product_name
                  : item.product_name.substring(0, 11) + '...'}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                  marginTop: 2,
                }}>
                ₹{item.product_price}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Product Filter', {
                filterType: 'Browsing History',
                allPopularItems: popularItems,
              })
            }>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 15,
              }}>
              View All
            </Text>
          </TouchableOpacity>
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
