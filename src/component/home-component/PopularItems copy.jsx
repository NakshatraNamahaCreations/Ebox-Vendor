import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {productList} from '../../data/global-data';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

export default function PopularItems() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const navigation = useNavigation();
  // const enablePopup = items => {
  //   setSelectedItem(items);
  //   setIsModalOpen(!isModalOpen);
  // };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      let res = await axios.get(
        'http://192.168.1.103:9000/api/product/getsellproduct',
      );
      if (res.status === 200) {
        setAllProducts(res.data.allSellProduct);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  // console.log('allProducts', JSON.stringify(allProducts));

  return (
    <View>
      {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
      {allProducts.map((item, index) => (
        <Pressable
          key={index}
          onPress={() =>
            navigation.navigate('Login', {
              item: item,
            })
          }
          // onPress={() => enablePopup(item)}
          style={{
            margin: 5,
            borderWidth: 1,
            borderColor: '#f3f3f3',
            backgroundColor: 'white',
            width: 170,
            padding: 5,
            borderRadius: 10,
            elevation: 2,
          }}>
          {/* {item.product_image && item.product_image.length > 0 ? (
              <Image
                style={{
                  width: '100%',
                  height: 100,
                  resizeMode: 'center',
                  borderRadius: 10,
                }}
                source={{
                  uri: `http://192.168.1.103:9000/${item.product_image[0].replace(
                    /\\/g,
                    '/',
                  )}`,
                }}
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f3f3f3',
                  borderRadius: 10,
                }}>
                <Text style={{color: '#ccc'}}>No Image</Text>
              </View>
            )}
            <View style={{marginTop: 5, padding: 5}}>
              <Text
                style={{
                  fontSize: 13,
                  // width: 170,
                  // overflow: 'hidden',
                  fontFamily: 'Montserrat-Medium',
                  // letterSpacing: 1,
                  color: 'black',
                  marginBottom: 5,
                }}>
                {item.product_name.length < 17
                  ? item.product_name
                  : item.product_name.substring(0, 17) + '...'}
              </Text>
              <View style={{flexDirection: 'row', marginBottom: 2}}>
                {Array.from({length: 5}).map((_, index) => (
                  <AntDesign
                    key={index}
                    name="star"
                    size={12}
                    color="#fdd663"
                  />
                ))}
                <View style={{marginLeft: 9, marginTop: -2}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 11,
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    13{' '}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 11,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                  // letterSpacing: 1,
                }}>
                ₹ {item.product_price}
              </Text>
            </View> */}
          <Text style={{color: 'black', fontSize: 20}}>wklgnqewlkgbwe</Text>
        </Pressable>
      ))}
      {/* </ScrollView> */}
    </View>
  );
}
