import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {productList} from '../../data/global-data';

export default function Search() {
  const navigation = useNavigation();
  const [searchProduct, setSearchProduct] = useState('');
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        'https://eventbox.nakshatranamahacreations.in/api/product/getsellproduct',
      );
      if (res.status === 200) {
        setProductList(res.data.allSellProduct);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = val => {
    setSearchProduct(val);
    if (val.trim() === '') {
      setFilteredProducts([]); // Clear results when input is empty
      return;
    }
    const filtered = productList.filter(
      item =>
        item.product_name.toLowerCase().includes(val.toLowerCase()) ||
        item.product_category.toLowerCase().includes(val.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={{backgroundColor: 'white', padding: 10, height: '100%'}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#d5d5d5',
          backgroundColor: 'white',
          elevation: 2,
          margin: 5,
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 12,
            //   bottom: 100,
            left: 10,
            zIndex: 111,
          }}>
          <Feather name="chevron-left" size={23} color="black" />
        </TouchableOpacity>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Search product"
          onChangeText={handleSearch}
          style={{
            color: 'black',
            fontSize: 15,
            borderRadius: 10,
            paddingLeft: 50,
            fontFamily: 'Montserrat-Regular',
            // letterSpacing: 1,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 12,
            //   bottom: 100,
            right: 10,
            zIndex: 111,
          }}>
          <Feather name="mic" size={23} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {searchProduct !== '' && filteredProducts.length > 0
          ? filteredProducts.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    item: item,
                  })
                }
                style={{
                  margin: 5,
                  borderWidth: 1,
                  borderColor: '#f3f3f3',
                  backgroundColor: 'white',
                  padding: 5,
                  borderRadius: 10,
                  elevation: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{flex: 0.4}}>
                  {item.product_image && item.product_image.length > 0 ? (
                    <Image
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'center',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: `https://eventbox.nakshatranamahacreations.in/${item.product_image[0].replace(
                          /\\/g,
                          '/',
                        )}`,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f3f3f3',
                        borderRadius: 10,
                      }}>
                      <Text style={{color: '#ccc'}}>No Image</Text>
                    </View>
                  )}
                </View>
                <View style={{flex: 0.8}}>
                  <View style={{padding: 5}}>
                    <Text
                      style={{
                        fontSize: 13,
                        // width: 200,
                        overflow: 'hidden',
                        fontFamily: 'Montserrat-Medium',
                        // letterSpacing: 1,
                        color: 'black',
                        marginBottom: 5,
                      }}>
                      {/* {item.product_name} */}
                      {item.product_name.length < 70
                        ? item.product_name
                        : item.product_name.substring(0, 70) + '...'}
                    </Text>

                    {/* <View style={{flexDirection: 'row', marginBottom: 2}}>
                  {Array.from({length: 5}).map((_, index) => (
                    <AntDesign
                      key={index}
                      name="star"
                      size={14}
                      color="#fdd663"
                    />
                  ))}
                  <View style={{marginLeft: 9, marginTop: -2}}>
                    <Text style={{color: 'black', fontSize: 14}}>45</Text>
                  </View>
                </View> */}
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#414242',
                        fontFamily: 'Montserrat-Regular',
                        // letterSpacing: 1,
                      }}>
                      ₹ {item.product_price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : searchProduct !== '' && (
              <View style={{padding: 20, alignItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    fontSize: 16,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Oops! No products found.
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  Please try something else
                  {/* Try searching with different keywords. */}
                </Text>
                <Image
                  source={{uri: 'https://img.icons8.com/color/452/no-data.png'}}
                  style={{width: 200, height: 200, marginTop: 20}}
                />
              </View>
            )}
      </ScrollView>
    </View>
  );
}
