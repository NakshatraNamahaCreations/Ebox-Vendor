import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {productList} from '../../data/global-data';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {apiUrl} from '../../api-services/api-constants';

export default function Recommended() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const navigation = useNavigation();
  // const enablePopup = items => {
  //   console.log('modal opening>>>>');
  //   setSelectedItem(items);
  //   setIsModalOpen(!isModalOpen);
  // };

  const navigation = useNavigation();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      let res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_SELLING_PRODUCTS}`,
      );
      if (res.status === 200) {
        setAllProducts(res.data.allSellProduct);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {allProducts.map((item, index) => {
          // Calculate average rating if reviews are present
          const averageRating =
            item.Reviews.length > 0
              ? item.Reviews.reduce((sum, review) => sum + review.ratings, 0) /
                item.Reviews.length
              : 0;
          return (
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
                width: 170,
                padding: 5,
                borderRadius: 10,
                elevation: 2,
              }}>
              {item.product_image && item.product_image.length > 0 ? (
                <Image
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'center',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: `${apiUrl.IMAGEURL}/${item.product_image[0].replace(
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
                    fontFamily: 'Montserrat-Medium',
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
                      color={index < averageRating ? '#fdd663' : '#d3d3d3'}
                    />
                  ))}

                  <View style={{marginLeft: 9, marginTop: -2}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 11,
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      {Math.round(averageRating)}{' '}
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
              </View>
              {/* <Text style={{color: 'black', fontSize: 20}}>wklgnqewlkgbwe</Text> */}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
