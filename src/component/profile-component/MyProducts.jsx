import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import {apiUrl} from '../../api-services/api-constants';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import THEMECOLOR from '../../utilities/color';
import Entypo from 'react-native-vector-icons/Entypo';

export default function MyProducts({route}) {
  const vendorId = route.params.vendorId;
  const navigation = useNavigation();
  console.log('vendorId in my my product listing page', vendorId);
  const [vendorProduct, setVendorProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_VENDOR_PRODUCT}${vendorId}`,
      );
      if (res.status === 200) {
        setVendorProduct(res.data.products);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

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
  console.log('vendorProduct', vendorProduct);

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          backgroundColor: 'white',
          elevation: 4,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 10}}>
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
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            color: 'black',
            fontSize: 18,
            marginLeft: 20,
          }}>
          Product Listings
        </Text>
      </View>
      {vendorProduct?.length === 0 ? (
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <Text
            style={{
              color: THEMECOLOR.mainColor,
              fontSize: 15,
              marginBottom: 10,
              textAlign: 'center',
              fontFamily: 'Montserrat-Medium',
            }}>
            You haven't added any products
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View style={{padding: 10}}>
            {vendorProduct?.map((item, index) => (
              <View key={index} style={{marginBottom: 10}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginBottom: 10,
                  }}>
                  <View style={{flex: 0.2}}>
                    <Image
                      source={{
                        uri: `${apiUrl.IMAGEURL}${item.product_image[0].replace(
                          /\\/g,
                          '/',
                        )}`,
                      }}
                      style={{
                        borderWidth: 1,
                        borderColor: '#e3e1e1',
                        paddingVertical: 10,
                        height: 80,
                        borderRadius: 10,
                        resizeMode: 'cover',
                        margin: 4,
                      }}
                    />
                  </View>
                  <View style={{flex: 0.8, marginLeft: 13}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        marginTop: 5,
                        fontFamily: 'Montserrat-Bold',
                      }}>
                      {item.product_name?.length < 57
                        ? item.product_name
                        : item.product_name?.substring(0, 55) + '...'}
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        {item.product_category}
                      </Text>
                      {/* <Entypo
                        name="dot-single"
                        color="black"
                        size={20}
                        style={{textAlign: 'center', marginBottom: 10}}
                      /> */}
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          fontFamily: 'Montserrat-Medium',
                          marginLeft: 10,
                        }}>
                        {item.product_type}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'black',
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          Unit price
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'black',
                            fontFamily: 'Montserrat-SemiBold',
                          }}>
                          ₹{item.product_price}
                        </Text>
                      </View>

                      <View style={{marginLeft: 20}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'black',
                            fontFamily: 'Montserrat-Regular',
                          }}>
                          MRP Price
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'black',
                            fontFamily: 'Montserrat-SemiBold',
                          }}>
                          ₹{item.mrp_rate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomColor:
                      index === vendorProduct.length - 1
                        ? 'transparent'
                        : '#eee',
                    borderBottomWidth:
                      index === vendorProduct.length - 1 ? 0 : 1,
                  }}></View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
