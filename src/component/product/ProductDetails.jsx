import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import THEMECOLOR from '../../utilities/color';
import Video from 'react-native-video';
import axios from 'axios';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../state_management/cartSlice';
import {Badge} from 'react-native-paper';
import {apiUrl} from '../../api-services/api-constants';

// function ProductDetails({selectedProduct, closeModal}) {
function ProductDetails({route}) {
  const product = route.params.item;
  console.log('product>>>>>', product);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  console.log('cart in product detailed >>>>>>', cart);
  const [buttonText, setButtonText] = React.useState('ADD TO CART');

  const [productSpecification, setProductSpecification] = useState(false);
  const [productDetails, setProductDetails] = useState(true);
  const [coutryOfOrgin, setCoutryOfOrgin] = useState(false);
  const [manufacturer, setManufacturer] = useState(false);
  const [mainMedia, setMainMedia] = useState(product.product_image[0] || '');
  const [loading, setLoading] = useState(false);
  const [relevantProducts, setRelevantProducts] = useState([]);
  const [reviews, setReviews] = useState(product.Reviews);

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  useEffect(() => {
    fetchData();
  }, [route.params.item]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_SELLING_PRODUCTS}`,
      );
      if (res.status === 200) {
        // Log the current product ID and all products
        // console.log('Current Product ID:', product._id);
        // console.log('All Products:', res.data.allSellProduct);

        // Filter the products
        const filteringRelevant = res.data.allSellProduct.filter(item => {
          // console.log('Checking item ID:', item._id);
          return (
            item.product_category === product.product_category &&
            String(item._id) !== String(product._id) // Ensure this comparison is correct
          );
        });

        // console.log('Filtered Relevant Products:', filteringRelevant);
        setRelevantProducts(filteringRelevant);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshReviews();
  }, []);

  const refreshReviews = async () => {
    try {
      const response = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_REVIEW}${product._id}`,
      );
      setReviews(response.data.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log('reviews', reviews);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0a6fe8" style={styles.loader} />
      </View>
    );
  }

  // const handleProductClick = async productId => {
  //   try {
  //     let res = await axios.get(
  //       `http://192.168.1.103:9000/api/product/getproduct/${productId}`,
  //     );
  //     if (res.status === 200) {
  //       setSelectedProduct(res.data.product);
  //       setMainMedia(res.data.product.product_image[0]);
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.ratings, 0) /
        reviews.length
      : 0;
  // console.log('averageRating', averageRating);

  const handleProductClick = item => {
    navigation.navigate('ProductDetails', {item});
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        productName: product.product_name,
        productPrice: product.product_price,
        mrpPrice: product.mrp_rate,
        store: product.shop_name,
        imageUrl: product.product_image[0],
      }),
    );
    setButtonText('VIEW CART');
  };

  const handleButtonPress = () => {
    if (buttonText === 'VIEW CART') {
      navigation.navigate('Cart'); // Ensure 'Cart' matches your navigator setup
    } else {
      handleAddToCart();
    }
  };

  console.log('mainMedia', mainMedia);

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      {/* <TouchableOpacity
          style={{
            position: 'relative',
            top: -20,
          }}
          onPress={closeModal}>
          <AntDesign
            name="closecircle"
            size={35}
            color="white"
            style={{textAlign: 'center'}}
          />
        </TouchableOpacity> */}
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
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        <View
          style={{paddingLeft: 20, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={navigateToSearch}>
            <AntDesign
              name="search1"
              color={THEMECOLOR.textColor}
              size={23}
              style={{marginHorizontal: 5}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <AntDesign
              name="shoppingcart"
              size={23}
              color={THEMECOLOR.textColor}
              style={{marginHorizontal: 5}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 10,
          }}>
          <Badge theme={{colors: {primary: 'green'}}}>{cart.length}</Badge>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            // backgroundColor: 'white',
            marginBottom: 10,
            // borderRadius: 10,
            padding: 15,
          }}>
          <Text
            style={{
              fontSize: 10,
              color: '#0a6fe8',
              // letterSpacing: 1,
              fontFamily: 'Montserrat-Medium',
              marginBottom: 2,
            }}>
            {product.brand}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: 'black',
              fontFamily: 'Montserrat-Bold',
            }}>
            {product.product_name}
          </Text>
          <View style={{width: '100%', height: 300, marginBottom: 10}}>
            {mainMedia.endsWith('.mp4') ? (
              <Video
                // source={{
                //   uri: `http://192.168.1.103:9000/${mainMedia.replace(
                //     /\\/g,
                //     '/',
                //   )}`,
                // }} //working
                source={{
                  uri: `http://192.168.1.103:9000/${mainMedia.replace(
                    /\\/g,
                    '/',
                  )}?${new Date().getTime()}`,
                }}
                style={styles.mainMedia}
                controls={true}
                resizeMode="contain"
              />
            ) : (
              <Image
                // source={{
                //   uri: `http://192.168.1.103:9000/${mainMedia.replace(
                //     /\\/g,
                //     '/',
                //   )}`,
                // }} working
                source={{
                  uri: `http://192.168.1.103:9000/${mainMedia.replace(
                    /\\/g,
                    '/',
                  )}?${new Date().getTime()}`,
                }}
                style={[styles.mainMedia, {marginTop: 20}]}
                resizeMode="cover"
              />
            )}
          </View>
          <ScrollView horizontal style={styles.thumbnailContainer}>
            {product.product_image.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => setMainMedia(image)}>
                <Image
                  source={{
                    uri: `http://192.168.1.103:9000/${image.replace(
                      /\\/g,
                      '/',
                    )}`,
                  }}
                  // source={{
                  //   uri: product.productImage || 'https://via.placeholder.com/300',
                  // }}
                  style={[
                    styles.thumbnail,
                    mainMedia === image && {
                      borderColor: '#007185', // Highlight color
                      borderWidth: 2,
                    },
                  ]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
            {product.product_video && (
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  opacity: 0.6,
                  width: 60,
                  height: 60,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor:
                    mainMedia === product.product_video ? '#007185' : '#ccc', // Highlight color
                  borderWidth: mainMedia === product.product_video ? 2 : 1,
                }}
                onPress={() => setMainMedia(product.product_video)}>
                <Image
                  source={require('../../../assets/play-button.png')}
                  style={{width: 40, height: 40}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </ScrollView>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#fff9ce',
                  flexDirection: 'row',
                  borderRadius: 6,
                  paddingVertical: 2,
                  paddingHorizontal: 4,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'black',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {averageRating}
                </Text>
                <AntDesign
                  name="star"
                  size={12}
                  color="#fdd663"
                  style={{marginLeft: 3, marginTop: 2}}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'black',
                    marginLeft: 3,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {' '}
                  {/* {Math.round(averageRating)}  */}
                  {reviews.length > 0 ? reviews.length : 0} rating
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 8,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  ₹ {product.product_price}
                </Text>
              </View>
              <View style={{marginLeft: 5, marginTop: 7}}>
                <Text
                  style={{
                    fontSize: 10,
                    color: 'black',
                    fontFamily: 'Montserrat-Medium',
                    textDecorationLine: 'line-through',
                  }}>
                  {' '}
                  ₹ {product.mrp_rate}
                </Text>
              </View>
              <View style={{marginLeft: 5, marginTop: 7}}>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#CC0C39',
                    // letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {' '}
                  {product.discount ? product.discount + '%' + ' OFF' : ''}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              {/* <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  marginLeft: 3,
                  fontFamily: 'Montserrat-Medium',
                }}>
                Quantity: 1
              </Text> */}
              {/* <Dropdown
                data={quantityOptions}
                onSelect={selectedItem => setQuantity(selectedItem.value)}
                buttonTextAfterSelection={selectedItem => selectedItem.label}
                rowTextForSelection={item => item.label}
                placeholder="Select quantity"
                dropdownStyle={{
                  width: 200,
                  height: 50,
                  backgroundColor: '#E9ECEF',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 12,
                }}
              /> */}
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                }}>
                <View style={{marginHorizontal: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      setProductSpecification(false);
                      setCoutryOfOrgin(false);
                      setProductDetails(true);
                      setManufacturer(false);
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 13,
                        color: productDetails
                          ? THEMECOLOR.textColor
                          : '#8d8d8d',
                        textAlign: 'center',
                      }}>
                      Product Details
                    </Text>
                    <View
                      style={{
                        borderBottomColor: productDetails
                          ? THEMECOLOR.mainColor
                          : 'transparent',
                        borderBottomWidth: productDetails ? 4.5 : 0,
                        position: 'relative',
                        top: 2,
                      }}></View>
                  </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      setProductSpecification(true);
                      setCoutryOfOrgin(false);
                      setProductDetails(false);
                      setManufacturer(false);
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 13,
                        textAlign: 'center',
                        color: productSpecification
                          ? THEMECOLOR.textColor
                          : '#8d8d8d',
                      }}>
                      Specifications
                    </Text>
                    <View
                      style={{
                        borderBottomColor: productSpecification
                          ? THEMECOLOR.mainColor
                          : 'transparent',
                        borderBottomWidth: productSpecification ? 4.5 : 0,
                        position: 'relative',
                        top: 2,
                      }}></View>
                  </TouchableOpacity>
                </View>

                <View style={{marginHorizontal: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      setProductSpecification(false);
                      setCoutryOfOrgin(true);
                      setProductDetails(false);
                      setManufacturer(false);
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 13,
                        textAlign: 'center',
                        color: coutryOfOrgin ? THEMECOLOR.textColor : '#8d8d8d',
                      }}>
                      Country Of Orgin
                    </Text>
                    <View
                      style={{
                        borderBottomColor: coutryOfOrgin
                          ? THEMECOLOR.mainColor
                          : 'transparent',
                        borderBottomWidth: coutryOfOrgin ? 4.5 : 0,
                        position: 'relative',
                        top: 2,
                      }}></View>
                  </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      setProductSpecification(false);
                      setCoutryOfOrgin(false);
                      setProductDetails(false);
                      setManufacturer(true);
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 13,
                        color: manufacturer ? THEMECOLOR.textColor : '#8d8d8d',
                        textAlign: 'center',
                      }}>
                      Manufacturer
                    </Text>
                    <View
                      style={{
                        borderBottomColor: manufacturer
                          ? THEMECOLOR.mainColor
                          : 'transparent',
                        borderBottomWidth: manufacturer ? 4.5 : 0,
                        position: 'relative',
                        top: 2,
                      }}></View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <View style={{marginTop: 10}}>
              {productSpecification ? (
                <View>
                  {product.Specifications.length > 0 ? (
                    <>
                      {product.Specifications.map(spe => (
                        <View key={spe._id} style={styles.productsDetasilRow}>
                          <View style={{flex: 0.5}}>
                            <Text style={styles.productDetailsHead}>
                              {spe.name}
                            </Text>
                          </View>
                          <View style={{flex: 0.5}}>
                            <Text style={styles.productsDetailsAns}>
                              {/* JBL Store */}
                              {spe.value}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </>
                  ) : (
                    <>
                      <Text style={styles.productsDetailsAns}>
                        Specifications not Available
                      </Text>
                    </>
                  )}
                </View>
              ) : productDetails ? (
                <View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>Brand</Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.brand ? product.brand : 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>
                        Product Category
                      </Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.product_category}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>Model Name</Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.model_name ? product.model_name : 'N/A'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>
                        Product Dimensions
                      </Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.product_dimension
                          ? product.product_dimension
                          : 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>Item Weight</Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.product_weight
                          ? product.product_weight
                          : 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>
                        Material Type
                      </Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.material_type ? product.material_type : 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>Color</Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.product_color ? product.product_color : 'N/A'}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>
                        Warrenty Type
                      </Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.warranty ? product.warranty : 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : coutryOfOrgin ? (
                <>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>
                        Country of Orgin
                      </Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.country_of_orgin
                          ? product.country_of_orgin
                          : 'Unkown'}
                      </Text>
                    </View>
                  </View>
                </>
              ) : manufacturer ? (
                <>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>Manufacture</Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.manufature_name
                          ? product.manufature_name
                          : 'Unknown'}
                      </Text>
                    </View>
                  </View>
                </>
              ) : null}
            </View>
            <Text
              style={{
                color: '#2c2c2c',
                fontSize: 15,
                fontFamily: 'Montserrat-SemiBold',
                marginTop: 20,
                marginBottom: 10,
              }}>
              Relevant Products
            </Text>
            <View style={{flexDirection: 'row'}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {relevantProducts.map((items, index) => (
                  <Pressable
                    key={index}
                    style={styles.addsOnView}
                    onPress={() => handleProductClick(items)}>
                    <View style={{padding: 3}}>
                      {items.product_image && items.product_image.length > 0 ? (
                        <Image
                          style={styles.addsOnImage}
                          source={{
                            uri: `http://192.168.1.103:9000/${items.product_image[0].replace(
                              /\\/g,
                              '/',
                            )}`,
                          }}
                          // source={{
                          //   uri: 'https://playeventrentals.com/wp-content/uploads/2022/03/play-rental-item-eternal-lighting-echomate-247x247.jpg',
                          // }}
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
                    </View>
                    <View style={{backgroundColor: 'transparent', padding: 5}}>
                      <Text style={styles.addsOnText}>
                        {items.product_name.length < 15
                          ? items.product_name
                          : items.product_name.substring(0, 14) + '...'}
                      </Text>
                      {/* <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <MaterialCommunityIcons
                            name="star-box"
                            size={16}
                            color="#236339"
                            style={{
                              marginTop: 2,
                            }}
                          />
                          <View
                            style={{
                              marginLeft: 2,
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#236339',
                                fontFamily: 'Poppins-SemiBold',
                                letterSpacing: 1,
                              }}>
                              4.3
                            </Text>
                          </View>
                        </View> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={{flex: 0.6}}>
                          <Text
                            style={{
                              fontSize: 13,
                              color: 'black',
                              fontFamily: 'Montserrat-Medium',
                            }}>
                            {/* <MaterialIcons
                                name="currency-rupee"
                                size={13}
                                color="black"
                              /> */}
                            ₹ {items.product_price}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 0.4,
                          }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: THEMECOLOR.mainColor,
                              borderRadius: 5,
                              height: 30,
                              // width: 60,
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
                        </View>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                color: '#2c2c2c',
                fontSize: 15,
                fontFamily: 'Montserrat-SemiBold',
                marginBottom: 10,
                // letterSpacing: 1,
              }}>
              Customer Reviews
            </Text>
            {reviews.length > 0 ? (
              <>
                {reviews.map((ratingItem, index) => (
                  <View key={index}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                        alignItems: 'center',
                      }}>
                      <View>
                        <AntDesign name="user" color="black" size={15} />
                      </View>
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            fontFamily: 'Montserrat-SemiBold',
                          }}>
                          {ratingItem.user_name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      {Array.from({length: 5}).map((_, index) => (
                        <AntDesign
                          key={index}
                          name="star"
                          size={13}
                          color={
                            index < ratingItem.ratings ? '#fdd663' : '#d3d3d3'
                          } // Change color based on rating
                        />
                      ))}
                    </View>
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 13,
                          marginBottom: 1,
                          marginTop: 5,
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        {ratingItem.review_title}
                      </Text>
                      <Text
                        style={{
                          color: '#616161',
                          fontSize: 12,
                          marginBottom: 1,
                          marginTop: 2,
                          fontFamily: 'Montserrat-Regular',
                        }}>
                        {/* Review on 9 July 2024 */}
                        {ratingItem.review_on
                          ? moment(ratingItem.review_on).format('ll')
                          : // ? new Date(ratingItem.review_on).toLocaleDateString()
                            'No date provided'}
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 12,
                          marginBottom: 1,
                          marginTop: 5,
                          fontFamily: 'Montserrat-Regular',
                          lineHeight: 18,
                        }}>
                        {ratingItem.review_description}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                }}>
                Be the first to review this product!
              </Text>
            )}
            <TouchableOpacity
              style={{
                borderRadius: 20,
                borderColor: '#616161',
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 7,
                alignItems: 'center',
                marginTop: 25,
                marginHorizontal: 50,
              }}
              onPress={() =>
                navigation.navigate('ProductReview', {
                  productId: product._id,
                  productImage: mainMedia,
                  refreshReviews: refreshReviews,
                })
              }>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                }}>
                Write a review
              </Text>
              <EvilIcons name="pointer" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View
          style={{
            backgroundColor: 'white',
            marginBottom: 10,
            borderRadius: 10,
            padding: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}> */}
        {/* <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  borderColor: '#ea5362',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 5,
                  backgroundColor: '#ea53621a',
                  flex: 0.3,
                }}>
                <TouchableOpacity
                  style={{
                    padding: 9,
                    marginTop: 3,
                  }}>
                  <FontAwesome5
                    name="minus"
                    size={14}
                    color="#ea5362"
                    style={{fontWeight: '500'}}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    padding: 9,
                    fontFamily: 'Montserrat-SemiBold',
                    letterSpacing: 1,
                    fontSize: 15,
                  }}>
                  1
                </Text>
                <TouchableOpacity
                  style={{
                    padding: 9,
                    marginTop: 3,
                  }}>
                  <FontAwesome5 name="plus" size={14} color="#ea5362" />
                </TouchableOpacity>
              </View> */}
        {/* <View style={{flex: 0.1}}></View> */}
        {/* <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#ceffa4',
                padding: 10,
                borderRadius: 7,
                elevation: 3,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontFamily: 'Montserrat-SemiBold',
                  textAlign: 'center',
                  letterSpacing: 1,
                }}>
                View Details{' '} 
              </Text>
            </TouchableOpacity>
          </View> */}
        {/* <View>
            <TouchableOpacity
              style={{
                backgroundColor: '#ceffa4',
                padding: 10,
                borderRadius: 7,
                elevation: 3,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontFamily: 'Montserrat-SemiBold',
                  textAlign: 'center',
                  letterSpacing: 1,
                }}>
                Add Item ₹ {product.productPrice}
              </Text>
            </TouchableOpacity>
          </View> */}
        {/* </View> */}

        {/* <View
          style={{
            borderBottomColor: '#e1e1e1',
            borderColor: '#e1e1e1',
            borderBottomWidth: 1,
            borderWidth: 1,
            marginVertical: 15,
          }}></View> */}
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: THEMECOLOR.mainColor,
          paddingVertical: 10,
        }}
        onPress={handleButtonPress}>
        <Text
          style={{
            fontSize: 13,
            color: THEMECOLOR.textColor,
            fontFamily: 'Montserrat-SemiBold',
            textAlign: 'center',
          }}>
          <AntDesign
            name="shoppingcart"
            size={15}
            color={THEMECOLOR.textColor}
            style={{margin: 3}}
          />{' '}
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  productsDetailsAns: {
    color: '#2c2c2c',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginTop: 5,
  },
  productsDetasilRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  productDetailsHead: {
    color: '#2c2c2c',
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 5,
    // letterSpacing: 1,
  },
  addsOnText: {
    fontSize: 13,
    color: '#2c2c2c',
    fontFamily: 'Montserrat-SemiBold',
    // width: 200,
    // fontWeight: '500',
    // color: 'black',
    marginBottom: 5,
  },
  addsOnImage: {
    // width: '50%',
    width: 150,
    height: 100,
    resizeMode: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#ededed',
    // alignSelf: 'center',
  },
  addsOnView: {
    elevation: 1,
    margin: 5,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    backgroundColor: 'white',
    // padding: 5,
    borderRadius: 10,
    // width: '15%',
  },
  mainMedia: {
    width: '100%',
    height: '100%',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 25,
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -20}, {translateY: -20}],
  },
});
export default ProductDetails;
