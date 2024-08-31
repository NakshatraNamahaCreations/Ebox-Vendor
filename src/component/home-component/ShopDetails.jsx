import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {allProducts} from '../../data/global-data';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import THEMECOLOR from '../../utilities/color';
import axios from 'axios';
import {apiUrl} from '../../api-services/api-constants';
import {Badge, RadioButton} from 'react-native-paper';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../state_management/cartSlice';
import {useDispatch, useSelector} from 'react-redux';

function ShopDetails({route}) {
  const navigation = useNavigation();
  const shop = route.params.shop || '';
  const shopname = route.params.shopname || '';
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  console.log('cart in shop details>>>>>>', cart);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showItems, setShowItems] = useState({});
  const [allvendorproduct, setallvendorproduct] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log('vendir id in sgop detyails', shopname);

  useEffect(() => {
    getallvendor();
  }, []);

  const getallvendor = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_VENDOR_PRODUCT}${shop}`,
      );
      if (res.status === 200) {
        const filteredProducts = res.data.products.reverse();

        setallvendorproduct(filteredProducts);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0a6fe8" style={styles.loader} />
      </View>
    );
  }
  // console.log('allvendorproduct', allvendorproduct);
  const toggleModal = item => {
    setShowItems(item);
    setModalVisible(!isModalVisible);
  };

  const handleAddToCart = product => {
    dispatch(
      addToCart({
        id: product._id,
        productName: product.product_name,
        productPrice: product.product_price,
        mrpPrice: product.mrp_rate,
        store: product.shop_name,
        imageUrl: product.product_image[0],
        productCategory: product.product_category,
        sellerName: product.vendor_name,
        sellerId: product.vendor_id,
      }),
    );
  };

  const handleDecrementQuantity = productId => {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart.quantity === 1) {
      // When the quantity is 1, dispatch an action to remove the item from the cart
      dispatch(removeFromCart({id: productId}));
    } else {
      // Otherwise, just decrement the quantity
      dispatch(decrementQuantity({id: productId}));
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
              color: 'black',
              fontSize: 15,
            }}>
            {shopname}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginHorizontal: 5,
          position: 'absolute',
          right: 20,
          top: 12,
        }}
        onPress={() => navigation.navigate('Cart')}>
        <AntDesign name="shoppingcart" size={23} color={THEMECOLOR.textColor} />
        <Badge
          theme={{colors: {primary: 'green'}}}
          style={{position: 'absolute', top: -5, right: -12}}>
          {cart.length}
        </Badge>
      </TouchableOpacity>

      {allvendorproduct.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'gray',
              fontSize: 16,
              fontFamily: 'Montserrat-Medium',
            }}>
            No products found.
          </Text>
        </View>
      ) : (
        <ScrollView style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              paddingBottom: '25%',
            }}>
            {allvendorproduct.map((ele, index) => {
              const averageRating =
                ele.Reviews.length > 0
                  ? ele.Reviews.reduce(
                      (sum, review) => sum + review.ratings,
                      0,
                    ) / ele.Reviews.length
                  : 0;
              const productInCart = cart.find(item => item.id === ele._id);

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      item: ele,
                    })
                  }
                  style={{
                    marginVertical: 5,
                    borderWidth: 1,
                    borderColor: '#f3f3f3',
                    backgroundColor: 'white',
                    width: '49%',
                    padding: 5,
                    borderRadius: 10,
                    elevation: 2,
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: 150,
                      resizeMode: 'cover',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: `${apiUrl.IMAGEURL}${ele.product_image[0]}`,
                    }}
                  />
                  <View style={{marginTop: 5, padding: 5}}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: 'Montserrat-Medium',
                        color: 'black',
                        marginBottom: 5,
                      }}>
                      {ele.product_name.length < 15
                        ? ele.product_name
                        : ele.product_name.substring(0, 15) + '...'}
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
                            fontSize: 12,
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
                          flex: 0.6,
                          fontSize: 11,
                          color: 'black',
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        ₹ {ele.product_price}
                      </Text>
                      {/* <TouchableOpacity
                      style={{
                        flex: 0.6,
                        backgroundColor: THEMECOLOR.mainColor,
                        borderRadius: 5,
                        height: 30,
                        paddingTop: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'black',
                          fontFamily: 'Montserrat-Medium',
                          textAlign: 'center',
                        }}>
                        + Add
                      </Text>
                    </TouchableOpacity> */}
                      {productInCart ? (
                        productInCart.quantity > 0 ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              flex: 0.6,
                            }}>
                            <TouchableOpacity
                              onPress={() => handleDecrementQuantity(ele._id)}>
                              <AntDesign
                                name="minus"
                                size={13}
                                color={THEMECOLOR.textColor}
                                style={{
                                  backgroundColor: THEMECOLOR.mainColor,
                                  padding: 5,
                                  borderRadius: 50,
                                }}
                              />
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 13,
                                color: 'black',
                                marginHorizontal: 10,
                                fontFamily: 'Montserrat-Medium',
                                textAlign: 'center',
                              }}>
                              {productInCart.quantity}
                            </Text>
                            <TouchableOpacity
                              onPress={() =>
                                dispatch(incrementQuantity({id: ele._id}))
                              }>
                              <AntDesign
                                name="plus"
                                size={13}
                                color={THEMECOLOR.textColor}
                                style={{
                                  backgroundColor: THEMECOLOR.mainColor,
                                  padding: 5,
                                  borderRadius: 50,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => handleAddToCart(ele)}
                            style={{
                              flex: 0.6,
                              backgroundColor: THEMECOLOR.mainColor,
                              borderRadius: 5,
                              height: 30,
                              paddingTop: 5,
                            }}>
                            <Text
                              style={{
                                fontSize: 13,
                                color: THEMECOLOR.textColor,
                                fontFamily: 'Montserrat-Medium',
                                textAlign: 'center',
                              }}>
                              + Add
                            </Text>
                          </TouchableOpacity>
                        )
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleAddToCart(ele)}
                          style={{
                            flex: 0.6,
                            backgroundColor: THEMECOLOR.mainColor,
                            borderRadius: 5,
                            height: 30,
                            paddingTop: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: THEMECOLOR.textColor,
                              fontFamily: 'Montserrat-Medium',
                              textAlign: 'center',
                            }}>
                            + Add
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}

      {/* Modal for displaying item details */}
      <Modal
        isVisible={isModalVisible}
        animationIn="slideInUp"
        backdropOpacity={0.5}
        style={{margin: 0, position: 'absolute', bottom: 0, width: '100%'}}>
        <TouchableOpacity
          style={{
            position: 'relative',
            top: -20,
          }}
          onPress={toggleModal}>
          <AntDesign
            name="closecircle"
            size={35}
            color="white"
            style={{textAlign: 'center'}}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#f7f6fd',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 15,
          }}>
          <ScrollView>
            <View
              style={{
                backgroundColor: 'white',
                marginBottom: 10,
                borderRadius: 10,
                padding: 6,
              }}>
              <View style={{width: '100%'}}>
                <Image
                  style={{
                    width: '100%',
                    height: 300,
                    resizeMode: 'stretch',
                    alignSelf: 'center',
                    borderRadius: 10,
                  }}
                  source={{
                    uri:
                      showItems.imageUrl || 'https://via.placeholder.com/300',
                  }}
                />
                <TouchableOpacity
                  style={{position: 'absolute', bottom: 10, left: 10}}>
                  <Ionicons name="heart-outline" size={27} color="#ea5362" />
                </TouchableOpacity>
              </View>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    marginBottom: 1,
                    marginTop: 10,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {showItems.productName}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#fff9ce',
                      borderColor: '#f1e698',
                      borderWidth: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      borderRadius: 5,
                    }}>
                    {Array.from({length: 5}).map((_, index) => (
                      <AntDesign
                        key={index}
                        name="star"
                        size={13}
                        color="#fdd663"
                      />
                    ))}
                  </View>
                  <View
                    style={{
                      marginLeft: 2,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'black',
                        fontFamily: 'Montserrat-Medium',
                        marginTop: 2,
                      }}>
                      {' '}
                      435 ratings
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 6,
                    color: '#696969',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {showItems.productDescription}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

export default ShopDetails;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
