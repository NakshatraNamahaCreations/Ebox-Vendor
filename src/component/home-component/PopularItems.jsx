import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {productList} from '../../data/global-data';
import {useNavigation} from '@react-navigation/native';
import THEMECOLOR from '../../utilities/color';
import {useSelector} from 'react-redux';
// import {
//   addToCart,
//   decrementQuantity,
//   incrementQuantity,
//   removeFromCart,
// } from '../../state_management/cartSlice';
import {apiUrl} from '../../api-services/api-constants';
// import axios from 'axios';

function PopularItems({allProducts}) {
  const [buttonText, setButtonText] = React.useState('ADD TO CART');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const navigation = useNavigation();
  // const enablePopup = items => {
  //   setSelectedItem(items);
  //   setIsModalOpen(!isModalOpen);
  // };
  // console.log('allProducts in popular page', allProducts);

  // const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const navigation = useNavigation();

  // const handleAddToCart = product => {
  //   dispatch(
  //     addToCart({
  //       id: product._id,
  //       productName: product.product_name,
  //       productPrice: product.product_price,
  //       mrpPrice: product.mrp_rate,
  //       store: product.shop_name,
  //       imageUrl: product.product_image[0],
  //     }),
  //   );
  //   setButtonText('VIEW CART');
  // };

  // const handleDecrementQuantity = productId => {
  //   const productInCart = cart.find(item => item.id === productId);

  //   if (productInCart.quantity === 1) {
  //     // When the quantity is 1, dispatch an action to remove the item from the cart
  //     dispatch(removeFromCart({id: productId}));
  //   } else {
  //     // Otherwise, just decrement the quantity
  //     dispatch(decrementQuantity({id: productId}));
  //   }
  // };

  // const [allProducts, setAllProducts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // // Function to fetch data from the API
  // const fetchData = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(
  //       'https://eventbox.nakshatranamahacreations.in/api/product/getsellproduct',
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
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {allProducts.map((item, index) => {
          // Calculate average rating if reviews are present
          const averageRating =
            item.Reviews.length > 0
              ? item.Reviews.reduce((sum, review) => sum + review.ratings, 0) /
                item.Reviews.length
              : 0;
          const productInCart = cart.find(item => item.id === item._id);
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
                borderWidth: 2,
                borderColor: THEMECOLOR.mainColor,
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
                    height: 200,
                    resizeMode: 'center',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: `${apiUrl.IMAGEURL}${item.product_image[0].replace(
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
                  {item.product_name.length < 10
                    ? item.product_name
                    : item.product_name.substring(0, 14) + '...'}
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      flex: 0.6,
                      color: 'black',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    ₹ {item.product_price}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
export default React.memo(PopularItems);
