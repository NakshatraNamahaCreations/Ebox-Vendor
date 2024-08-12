import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {productList} from '../../data/global-data';
import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';

function PopularItems({allProducts}) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const navigation = useNavigation();
  // const enablePopup = items => {
  //   setSelectedItem(items);
  //   setIsModalOpen(!isModalOpen);
  // };
  const navigation = useNavigation();
  // const [allProducts, setAllProducts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // // Function to fetch data from the API
  // const fetchData = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(
  //       'http://192.168.1.103:9000/api/product/getsellproduct',
  //     );
  //     if (res.status === 200) {
  //       setAllProducts(res.data.allSellProduct);
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // // Trigger fetchData when refreshing changes
  // useEffect(() => {
  //   if (refreshing) {
  //     fetchData();
  //   }
  // }, [refreshing, fetchData]);

  // if (!allProducts) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  return (
    <View>
      {/* {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : ( */}
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
      {/* // )} */}
    </View>
  );
}
export default React.memo(PopularItems);
