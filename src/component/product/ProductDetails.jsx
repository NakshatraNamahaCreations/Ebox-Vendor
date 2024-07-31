import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
// import Dropdown from 'react-native-select-dropdown';
import {addsOnProducts} from '../../data/global-data';
import THEMECOLOR from '../../utilities/color';

// function ProductDetails({selectedProduct, closeModal}) {
function ProductDetails({route}) {
  // console.log('selectedProduct>>>>>>>>>>>>>>', selectedProduct);
  const navigation = useNavigation();
  const [productSpecification, setProductSpecification] = useState(true);
  const [productDetails, setProductDetails] = useState(false);
  const [coutryOfOrgin, setCoutryOfOrgin] = useState(false);
  const [manufacturer, setManufacturer] = useState(false);
  const [quantity, setQuantity] = useState('');

  const product = route.params.item;
  console.log('product', product);

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  const quantityOptions = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
  ];

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
        <TouchableOpacity style={{paddingLeft: 20}} onPress={navigateToSearch}>
          <AntDesign
            name="search1"
            color="black"
            size={20}
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
            JBL Store
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: 'black',
              fontFamily: 'Montserrat-Bold',
            }}>
            {/* JBL Go 4, Wireless Ultra Portable Bluetooth Speaker, Pro Sound,
              Vibrant Colors, Water & Dust Proof, Type C (without Mic, Black) */}
            {product.productName}
          </Text>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
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
                4.3
              </Text>
              <AntDesign
                name="star"
                size={12}
                color="#fdd663"
                style={{margin: 3}}
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
                243 rating
              </Text>
            </View>
          </View> */}
          <View style={{width: '100%', marginVertical: 20}}>
            <Image
              style={{
                width: '100%',
                height: 250,
                resizeMode: 'contain',
                alignSelf: 'center',
                borderRadius: 10,
              }}
              source={{
                uri: product.productImage || 'https://via.placeholder.com/300',
              }}
            />
            {/* <TouchableOpacity
              style={{position: 'absolute', bottom: 10, left: 10}}>
              <Ionicons name="heart-outline" size={27} color="#CC0C39" />
            </TouchableOpacity> */}
          </View>
          <View>
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 12,
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'white',
                    backgroundColor: '#CC0C39',
                    // letterSpacing: 1,
                    fontFamily: 'Montserrat-Regular',
                    padding: 5,
                    borderRadius: 5,
                    // marginRight: 220,
                  }}>
                  Limited time deal
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#b9bfb4',
                    borderRadius: 7,
                    padding: 7,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                    }}>
                    <AntDesign name="shoppingcart" size={12} color="#fdd663" />
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 12,
                      fontFamily: 'Montserrat-Medium',
                      textAlign: 'center',
                    }}>
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}
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
                  4.3
                </Text>
                <AntDesign
                  name="star"
                  size={12}
                  // color="#ffa41d"
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
                  243 rating
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
                    // letterSpacing: 1,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  ₹ {product.productPrice}
                </Text>
              </View>
              <View style={{marginLeft: 5, marginTop: 7}}>
                <Text
                  style={{
                    fontSize: 10,
                    color: 'black',
                    // letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                    textDecorationLine: 'line-through',
                  }}>
                  {' '}
                  ₹ 5000
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
                  14% OFF
                </Text>
              </View>
            </View>
            {/* <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Light',
                }}>
                M.R.P:
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  // letterSpacing: 1,
                  fontFamily: 'Montserrat-Light',
                  textDecorationLine: 'line-through',
                }}>
                ₹{product.productPrice}
              </Text>
            </View> */}
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  marginLeft: 3,
                  fontFamily: 'Montserrat-Medium',
                }}>
                Quantity: 1
              </Text>
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
                      Manufacture
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
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>Brand</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>
                        {product.brand}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Maximum power
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>4.2 Watts</Text>
                    </View>
                  </View>

                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Connectivity
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>
                        Bluetooth, wireless
                      </Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Audio output mode
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>Stereo</Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>Material</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>Fabric</Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>Model Name</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>GO 3</Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Speaker Type
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>Portable</Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Special Feature
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>
                        Ultra portable, IP67 Water proof
                      </Text>
                    </View>
                  </View>

                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Recommented Use
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>
                        For Smartphones or tablets
                      </Text>
                    </View>
                  </View>

                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Product Dimension
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>
                        7.5D X 8.7W X 4.1H Cm
                      </Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Product Weight
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>209 Grams</Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Battery Life
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>5 Hours</Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Charging Time
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>2.5 Hours</Text>
                    </View>
                  </View>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Maximum Range
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>10 Meters</Text>
                    </View>
                  </View>
                </View>
              ) : productDetails ? (
                <View style={{marginTop: 2}}>
                  <Text style={styles.productsDetailsAns}>
                    <MaterialCommunityIcons
                      name="star-four-points"
                      size={13}
                      color="black"
                    />{' '}
                    Ultimate JBL Pro Sound: Enjoy signature JBL bass without any
                    distortion.
                  </Text>
                  <Text style={styles.productsDetailsAns}>
                    <MaterialCommunityIcons
                      name="star-four-points"
                      size={13}
                      color="black"
                    />{' '}
                    Port-anywhere: Feather light, ultra-portable grab-and-go
                    design.
                  </Text>
                  <Text style={styles.productsDetailsAns}>
                    <MaterialCommunityIcons
                      name="star-four-points"
                      size={13}
                      color="black"
                    />{' '}
                    Charging Time: 2.5 Hrs IP67 water-resistant and
                    dust-resistant: Engineered to withstand splashes and sand.
                  </Text>
                  <Text style={styles.productsDetailsAns}>
                    <MaterialCommunityIcons
                      name="star-four-points"
                      size={13}
                      color="black"
                    />{' '}
                    Quick-Connect: Experience your music and movies without any
                    lagging with Bluetooth 5.1’s Insta-sync.
                  </Text>
                  <Text style={styles.productsDetailsAns}>
                    <MaterialCommunityIcons
                      name="star-four-points"
                      size={13}
                      color="black"
                    />{' '}
                    Mega Playtime: One single charge = upto 5 Hour battery
                    backup under optimum audio settings.
                  </Text>
                </View>
              ) : coutryOfOrgin ? (
                <>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>
                        Country of Orgin
                      </Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>India</Text>
                    </View>
                  </View>
                </>
              ) : manufacturer ? (
                <>
                  <View style={styles.productsDetasilRow}>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.productDetailsHead}>Manufacture</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                      <Text style={styles.productsDetailsAns}>
                        Harman International Industries, Inc
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
                {addsOnProducts.map((items, index) => (
                  <Pressable key={index} style={styles.addsOnView}>
                    <View style={{padding: 3}}>
                      <Image
                        style={styles.addsOnImage}
                        source={{
                          uri: items.productImage,
                        }}
                        // source={{
                        //   uri: 'https://playeventrentals.com/wp-content/uploads/2022/03/play-rental-item-eternal-lighting-echomate-247x247.jpg',
                        // }}
                      />
                    </View>
                    <View style={{backgroundColor: 'transparent', padding: 5}}>
                      <Text style={styles.addsOnText}>
                        {items.productName.length < 15
                          ? items.productName
                          : items.productName.substring(0, 14) + '...'}
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
                            ₹ {items.productPrice}
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
            {Array.from({length: 5}).map((_, index) => (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'stretch',
                        alignSelf: 'center',
                        borderRadius: 50,
                      }}
                      // source={{
                      //   uri: showItems.productImage[0]?.imageUrl,
                      // }}
                      source={{
                        uri: 'https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/m/y/y/-original-imahfcgwza6fty8w.jpeg?q=70',
                      }}
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      Kiru
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
                      color="#fdd663"
                    />
                  ))}
                  {/* <Text
                    style={{
                      color: 'maroon',
                      fontSize: 13,
                      fontFamily: 'Montserrat-Regular',
                      marginLeft: 5,
                    }}>
                    Verified Purchase
                  </Text> */}
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
                    Amazing!
                  </Text>
                  <Text
                    style={{
                      color: '#616161',
                      fontSize: 12,
                      marginBottom: 1,
                      marginTop: 2,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    Review on 9 July 2024
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
                    Every speaker has conditions under which it works best. The
                    JBL Flips sound better on the table. This baby on the other
                    hand sounds amazing on the floor. Just place it on the floor
                    you will think it’s a much larger speaker, sounds
                    incredible. Great bass, dynamic mids and beautiful highs.
                    Just buy it.
                  </Text>
                </View>
              </View>
            ))}
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
              onPress={() => navigation.navigate('ProductReview')}>
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
        }}>
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
          ADD TO CART
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
});
export default ProductDetails;
