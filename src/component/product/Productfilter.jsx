import {
  Image,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {allProducts, productList} from '../../data/global-data';
import {useNavigation} from '@react-navigation/native';
import THEMECOLOR from '../../utilities/color';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../state_management/cartSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Badge} from 'react-native-paper';
import Modal from 'react-native-modal';
import {apiUrl} from '../../api-services/api-constants';

const Productfilter = ({route}) => {
  const filterType = route.params.filterType;
  const allProducts = route.params.allPopularItems;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  console.log('cart in product filtereds page >>>>>>', cart);
  console.log('all products in product filter page >>>>>>', allProducts.length);
  // const [productObject, setProductObject] = useState(allProducts[0]);
  const [categoryObject, setCategoryObject] = useState(null);
  const [brandObject, setBrandObject] = useState(null);
  // const [allProducts, setAllProducts] = useState([]);
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [checked, setChecked] = React.useState('default');
  const [tempChecked, setTempChecked] = useState('default');

  const selectedCategory = product => {
    const category = categories.find(item => item.name === product);
    if (category) {
      setCategoryObject(category.name);
    }
  };
  const uniqueBrands = [...new Set(allProducts.map(ele => ele.brand))];

  const selectedBrand = brand => {
    const brandItem = allProducts.find(item => item.brand === brand);
    // console.log('brandItem inside function', brandItem);
    if (brandItem) {
      setBrandObject(brand);
    }
  };
  // console.log('allProducts in proiduct filter page>>>', allProducts);
  // console.log('brandObject', brandObject);
  // console.log('uniqueBrands', typeof uniqueBrands);
  // console.log('categoryObject', categoryObject);

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

  const toggleSortModal = () => {
    setShowSort(true);
  };
  const closeSortModal = () => {
    setShowSort(false);
  };
  const toggleFilterModal = () => {
    setShowFilter(true);
  };
  const closeFilterModal = () => {
    setShowFilter(false);
  };
  const categories = [
    {id: 1, name: 'Sound'},
    {id: 2, name: 'Lighting'},
    {id: 3, name: 'Video'},
    {id: 4, name: 'Fabrication'},
    {id: 5, name: 'Genset'},
    {id: 6, name: 'shamiana'},
  ];

  const calculateAverageRating = reviews => {
    if (reviews.length === 0) return 0;
    return (
      reviews.reduce((sum, review) => sum + review.ratings, 0) / reviews.length
    );
  };

  //   const [showSort, setShowSort] = useState(false);
  // const [checked, setChecked] = React.useState('default');
  //  const sortProducts = (products, criteria) => {
  //     switch (criteria) {
  //       case 'default':
  //         // Implement your default sorting logic here
  //         return products;
  //       case 'new':
  //         return products.sort(
  //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  //         );
  //       case 'low':
  //         return products.sort((a, b) => a.product_price - b.product_price);
  //       case 'high':
  //         return products.sort((a, b) => b.product_price - a.product_price);
  //       case 'ratingLow':
  //         return products.sort((a, b) => {
  //           const ratingA =
  //             a.Reviews.length > 0
  //               ? a.Reviews.reduce((sum, review) => sum + review.ratings, 0) /
  //                 a.Reviews.length
  //               : 0;
  //           const ratingB =
  //             b.Reviews.length > 0
  //               ? b.Reviews.reduce((sum, review) => sum + review.ratings, 0) /
  //                 b.Reviews.length
  //               : 0;
  //           return ratingA - ratingB;
  //         });
  //       case 'ratingHigh':
  //         return products.sort((a, b) => {
  //           const ratingA =
  //             a.Reviews.length > 0
  //               ? a.Reviews.reduce((sum, review) => sum + review.ratings, 0) /
  //                 a.Reviews.length
  //               : 0;
  //           const ratingB =
  //             b.Reviews.length > 0
  //               ? b.Reviews.reduce((sum, review) => sum + review.ratings, 0) /
  //                 b.Reviews.length
  //               : 0;
  //           return ratingB - ratingA;
  //         });
  //       default:
  //         return products;
  //     }
  //   };

  //   const [sortedProducts, setSortedProducts] = useState(allProducts);

  //   useEffect(() => {
  //     const sorted = sortProducts(allProducts, checked);
  //     setSortedProducts(sorted);
  //   }, [checked, allProducts]);

  //   const handleSortOptionSelect = sortOption => {
  //     setChecked(sortOption);
  //     setShowSort(false);
  //   };

  const sortProducts = (products, criteria) => {
    return [...products].sort((a, b) => {
      switch (criteria) {
        case 'new':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'low':
          return a.product_price - b.product_price;
        case 'high':
          return b.product_price - a.product_price;
        case 'ratingLow':
          return (
            calculateAverageRating(a.Reviews) -
            calculateAverageRating(b.Reviews)
          );
        case 'ratingHigh':
          return (
            calculateAverageRating(b.Reviews) -
            calculateAverageRating(a.Reviews)
          );
        default:
          return 0; // No sorting for 'default'
      }
    });
  };

  // const [sortedProducts, setSortedProducts] = useState(allProducts);

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, checked),
    [checked, filteredProducts],
  );

  const handleSortOptionSelect = sortOption => {
    setTempChecked(sortOption);
  };

  const handleApplySort = () => {
    setChecked(tempChecked);
    setShowSort(false);
  };

  //  const filterPrice = item.product_price >= minPrice && item.product_price <= maxPrice;

  const applyFilters = () => {
    const filtered = allProducts.filter(item => {
      const filterByCategory = categoryObject
        ? item.product_category === categoryObject
        : true;
      const filterByBrand = brandObject ? item.brand === brandObject : true;
      return filterByCategory && filterByBrand;
    });
    setFilteredProducts(filtered);
    closeFilterModal();
  };

  const clearFilters = () => {
    setCategoryObject(null);
    setBrandObject(null);
    setFilteredProducts(allProducts);
    closeFilterModal();
  };

  // console.log('filterProduct', filteredProducts.length);
  // console.log('sortedProducts', sortedProducts);

  return (
    <View
      style={{
        flex: 1,
        // height: '100%',
      }}>
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
          <Entypo
            name="chevron-thin-left"
            color="black"
            size={13}
            style={{
              backgroundColor: '#f5f5f5',
              width: 30,
              height: 30,
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
              // letterSpacing: 1,
              color: 'black',
              fontSize: 16,
            }}>
            {filterType}
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

      <ScrollView style={{backgroundColor: '#f7f6fd', paddingHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            // marginTop: 20,
          }}>
          {sortedProducts.map((ele, index) => {
            // const slideAnim = useRef(new Animated.Value(300)).current; // Start off-screen (300 is the offset)

            // useEffect(() => {
            //   Animated.timing(slideAnim, {
            //     toValue: 0, // Final position
            //     duration: 400, // Animation duration in ms
            //     delay: index * 100, // Delay the animation for each item
            //     useNativeDriver: true,
            //   }).start();
            // }, []);

            // Calculate average rating if reviews are present
            const averageRating =
              ele.Reviews.length > 0
                ? ele.Reviews.reduce((sum, review) => sum + review.ratings, 0) /
                  ele.Reviews.length
                : 0;
            const productInCart = cart.find(item => item.id === ele._id);
            return (
              // <Animated.View
              //   key={index}
              //   style={{
              //     transform: [{translateX: slideAnim}],
              //     marginVertical: 5,
              //     borderWidth: 1,
              //     borderColor: '#f3f3f3',
              //     backgroundColor: 'white',
              //     width: '49%',
              //     // padding: 5,
              //     borderRadius: 10,
              //     elevation: 2,
              //   }}>
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    item: ele,
                  })
                }
                style={{
                  marginVertical: 5,
                  // marginHorizontal: 2,
                  borderWidth: 1,
                  borderColor: '#f3f3f3',
                  backgroundColor: 'white',
                  width: '49%',
                  padding: 5,
                  borderRadius: 10,
                  elevation: 2,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    // top: 10,
                    // left: 12,
                    backgroundColor: '#002f36',
                    zIndex: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: 'white',
                      fontFamily: 'Montserrat-SemiBold',
                      // letterSpacing: 1,
                    }}>
                    {ele.product_category}
                  </Text>
                </View>
                {ele.product_image && ele.product_image.length > 0 ? (
                  <Image
                    style={{
                      width: '100%',
                      height: 120,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      resizeMode: 'cover',
                      // borderRadius: 10,
                    }}
                    source={{
                      uri: `${apiUrl.IMAGEURL}${ele.product_image[0].replace(
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
                      fontSize: 14,
                      // width: '100%',
                      // overflow: 'hidden',
                      fontFamily: 'Montserrat-Medium',
                      // letterSpacing: 1,
                      color: 'black',
                      marginBottom: 5,
                    }}>
                    {/* {`Aputure LS 300X BI - Color LED Moonlight`} */}
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
                          // letterSpacing: 1,
                        }}>
                        {Math.round(averageRating)}{' '}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      marginVertical: 5,
                      flex: 0.6,
                      fontSize: 11,
                      color: 'black',
                      borderRadius: 5,
                      padding: 5,
                      fontFamily: 'Montserrat-SemiBold',
                      backgroundColor: '#ffc0cb57',
                      position: 'relative',
                    }}>
                    {ele.brand}
                    {/* {moment(ele.createdAt).format('lll')} */}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 5,
                    }}>
                    <View style={{flex: 0.6}}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'black',
                          fontFamily: 'Montserrat-SemiBold',
                        }}>
                        ₹ {ele.product_price}
                      </Text>
                    </View>

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
              // </Animated.View>
            );
          })}
        </View>
      </ScrollView>
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: '#3b3026',
            position: 'absolute',
            width: '40%',
            bottom: 50,
            padding: 10,
            borderRadius: 10,
            elevation: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={toggleSortModal}>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontFamily: 'Montserrat-SemiBold',
                textAlign: 'center',
              }}>
              <MaterialCommunityIcons
                name="sort-ascending"
                color="white"
                size={15}
              />{' '}
              Sort
            </Text>
          </TouchableOpacity>
          <View style={{borderRightWidth: 1, borderRightColor: 'white'}}></View>
          <TouchableOpacity onPress={toggleFilterModal}>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontFamily: 'Montserrat-SemiBold',
                textAlign: 'center',
              }}>
              <AntDesign name="filter" color="white" size={15} /> Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Sort========================================= */}
      <Modal
        isVisible={showSort}
        style={{margin: 0, position: 'absolute', bottom: 0, width: '100%'}}>
        <TouchableOpacity
          style={{
            position: 'relative',
            top: -20,
          }}
          onPress={closeSortModal}>
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
                // backgroundColor: 'white',
                marginBottom: 10,
                borderRadius: 10,
                padding: 6,
              }}>
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  style={{position: 'absolute', bottom: 10, left: 10}}>
                  <Ionicons name="heart-outline" size={27} color="#e91e63" />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    // marginBottom: 10,
                    marginTop: 10,
                    fontFamily: 'Montserrat-SemiBold',
                    // borderBottomWidth: 1,
                    // borderBottomColor: '#f2f2f2',
                  }}>
                  Sort
                </Text>
                <View style={{padding: 10}}>
                  {[
                    'default',
                    'new',
                    'low',
                    'high',
                    'ratingLow',
                    'ratingHigh',
                  ].map(sortOption => (
                    <TouchableOpacity
                      key={sortOption}
                      onPress={() => handleSortOptionSelect(sortOption)}
                      style={{
                        paddingVertical: 10,
                      }}>
                      <Text
                        style={{
                          color:
                            tempChecked === sortOption
                              ? THEMECOLOR.mainColor
                              : 'black',
                          fontSize: 14,
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        {sortOption === 'default'
                          ? 'Default'
                          : sortOption === 'new'
                          ? 'Newest'
                          : sortOption === 'low'
                          ? 'Price: Low to High'
                          : sortOption === 'high'
                          ? 'Price: High to Low'
                          : sortOption === 'ratingLow'
                          ? 'Rating: Low to High'
                          : 'Rating: High to Low'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={{borderColor: '#e9e9e9', borderWidth: 0.8}}></View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    onPress={handleApplySort}
                    style={{
                      backgroundColor: '#21005d',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontFamily: 'Montserrat-Medium',
                      }}>
                      Apply
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      {/* Filter========================================= */}
      <Modal
        isVisible={showFilter}
        style={{margin: 0, position: 'absolute', bottom: 0, width: '100%'}}>
        <TouchableOpacity
          style={{
            position: 'relative',
            top: -20,
          }}
          onPress={closeFilterModal}>
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
          <View
            style={{
              // backgroundColor: 'white',
              marginBottom: 10,
              borderRadius: 10,
              padding: 6,
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  // marginBottom: 10,
                  marginTop: 10,
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Filter
              </Text>
              <View
                style={{
                  padding: 10,
                  borderBottomColor: '#e9e9e9',
                  borderBottomWidth: 1,
                }}>
                <View style={{marginBottom: 5}}>
                  <Text
                    style={{
                      color: '#2f2f2f',
                      fontSize: 13,
                      textAlign: 'left',
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    Categories
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      margin: 2,
                    }}>
                    {categories.map(ele => (
                      <TouchableOpacity
                        key={ele.id}
                        onPress={() => selectedCategory(ele.name)}
                        style={{
                          marginBottom: 5,
                          backgroundColor:
                            categoryObject === ele.name
                              ? '#cfcfcf'
                              : 'transparent',
                          borderColor: '#cfcfcf',
                          borderWidth: 1,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 13,
                            textAlign: 'center',
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          {ele.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
              <View
                style={{
                  padding: 10,
                  borderBottomColor: '#e9e9e9',
                  borderBottomWidth: 1,
                }}>
                <View style={{marginBottom: 5}}>
                  <Text
                    style={{
                      color: '#2f2f2f',
                      fontSize: 13,
                      textAlign: 'left',
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    Brand
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      margin: 2,
                    }}>
                    {uniqueBrands.map(brand => (
                      <TouchableOpacity
                        key={brand}
                        onPress={() => selectedBrand(brand)}
                        style={{
                          marginBottom: 5,
                          backgroundColor:
                            brandObject === brand ? '#cfcfcf' : 'transparent',
                          borderColor: '#cfcfcf',
                          borderWidth: 1,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 13,
                            textAlign: 'center',
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          {brand}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={clearFilters}
                  style={{
                    backgroundColor: '#3b3026',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    Clear
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={applyFilters}
                  style={{
                    backgroundColor: '#21005d',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Productfilter;

const styles = StyleSheet.create({});
