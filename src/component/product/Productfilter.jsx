import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {allProducts, productList} from '../../data/global-data';
import {useNavigation} from '@react-navigation/native';

const Productfilter = ({route}) => {
  const filterType = route.params.filterType;
  const navigation = useNavigation();
  const [productObject, setProductObject] = useState(allProducts[0]);
  const [selectedObject, setSelectedObject] = useState(0);

  const selectedProduct = (product, index) => {
    setProductObject(product);
    setSelectedObject(index);
  };
  // console.log('productObject======>', selectedObject, productObject);
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
            size={20}
            style={{
              backgroundColor: '#f5f5f5',
              width: 50,
              height: 50,
              textAlign: 'center',
              paddingTop: 15,
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
              fontFamily: 'Poppins-Medium',
              letterSpacing: 1,
              color: 'black',
              fontSize: 20,
            }}>
            {filterType}
          </Text>
        </View>
      </View>

      {/* <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 20,
          }}>
          {productList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                margin: 5,
                borderWidth: 1,
                borderColor: '#f3f3f3',
                backgroundColor: 'white',
                width: 120,
                padding: 5,
                borderRadius: 10,
                elevation: 2,
              }}>
              <Image
                style={{
                  //   width: 155,
                  height: 150,
                  resizeMode: 'center',
                  borderRadius: 10,
                }}
                source={{
                  uri: item.productImage,
                }}
              />
              <View style={{marginTop: 5, padding: 5}}>
                <Text
                  style={{
                    fontSize: 15,
                    width: 200,
                    overflow: 'hidden',
                    fontFamily: 'Poppins-Regular',
                    letterSpacing: 1,
                    color: 'black',
                    marginBottom: 5,
                  }}>
                  {item.productName.length < 15
                    ? item.productName
                    : item.productName.substring(0, 15) + '...'}
                </Text>

                <View style={{flexDirection: 'row', marginBottom: 2}}>
                  {Array.from({length: 5}).map((_, index) => (
                    <AntDesign
                      key={index}
                      name="star"
                      size={14}
                      color="#fdd663"
                    />
                  ))}
                  <View style={{marginLeft: 9, marginTop: -2}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 14,
                        fontFamily: 'Poppins-Regular',
                        letterSpacing: 1,
                      }}>
                      28
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#414242',
                    fontFamily: 'Poppins-Medium',
                    letterSpacing: 1,
                  }}>
                  ₹ {item.productPrice}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View> */}
      <View style={{flexDirection: 'row', height: '100%'}}>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.3,
            // backgroundColor: 'white',
            // borderRightWidth: 1,
            // borderRightColor: '#e5e5e5',
            // elevation: 1,
            paddingBottom: 70,
          }}>
          <ScrollView>
            {allProducts.map((items, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderBottomColor: '#f7f6fd',
                  borderBottomWidth: 3,
                  padding: 10,
                  borderRightWidth: selectedObject === index ? 5 : 5,
                  borderRightColor:
                    selectedObject === index ? '#ea5362' : 'transparent',
                  borderTopRightRadius: selectedObject === index ? 10 : 0,
                  // borderBottomRightRadius: 10,
                }}
                onPress={() => selectedProduct(items, index)}>
                <Image
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'stretch',
                    alignSelf: 'center',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: items.imageUrl,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: 'black',
                    letterSpacing: 1,
                    fontFamily: 'Poppins-Light',
                  }}>
                  {items.productName.length < 15
                    ? items.productName
                    : items.productName.substring(0, 15) + '...'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            flex: 0.7,
            backgroundColor: '#f7f6fd',
            padding: 10,
            height: '100%',
          }}>
          <ScrollView>
            <Image
              style={{
                width: '100%',
                height: 200,
                resizeMode: 'stretch',
                alignSelf: 'center',
                borderRadius: 5,
              }}
              source={{
                uri:
                  productObject === null
                    ? allProducts[0].imageUrl
                    : productObject.imageUrl,
              }}
              // source={{
              //   uri: 'https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/m/y/y/-original-imahfcgwza6fty8w.jpeg?q=70',
              // }}
            />
            <View
              style={{
                backgroundColor: '#ffd7db',
                marginTop: 10,
                borderRadius: 5,
                paddingHorizontal: 9,
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#5374ea',
                  letterSpacing: 1,
                  fontFamily: 'Poppins-Light',
                }}>
                {productObject === null
                  ? allProducts[0].shopName
                  : productObject.shopName}
                {/* Martin Garrix Music Academy */}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  letterSpacing: 1,
                  fontFamily: 'Poppins-Regular',
                }}>
                {productObject === null
                  ? allProducts[0].productName
                  : productObject.productName}
              </Text>
            </View>
            <View style={{paddingTop: 10, marginBottom: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 8,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      color: 'black',
                      letterSpacing: 1,
                      fontFamily: 'Poppins-Regular',
                    }}>
                    ₹
                    {productObject === null
                      ? allProducts[0].productPrice
                      : productObject.productPrice}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    borderColor: '#ea5362',
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <AntDesign name="minus" size={17} color="#ea5362" />
                  </TouchableOpacity>
                  <View
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      // padding: 9,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        letterSpacing: 1,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {' '}
                      0{' '}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <AntDesign name="plus" size={17} color="#ea5362" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginBottom: 50}}>
                <Text
                  style={{
                    color: '#2c2c2c',
                    fontSize: 15,
                    fontFamily: 'Poppins-Medium',
                    letterSpacing: 1,
                  }}>
                  Descriptions
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                    letterSpacing: 1,
                    fontFamily: 'Poppins-Light',
                  }}>
                  ‎
                  {productObject === null
                    ? allProducts[0].productDescription
                    : productObject.productDescription}
                </Text>
              </View>
              {/*  */}
              {/* <View style={{marginBottom: 30}}>
                <Text
                  style={{
                    color: '#2c2c2c',
                    fontSize: 15,
                    fontFamily: 'Poppins-Medium',
                    letterSpacing: 1,
                  }}>
                  Descriptions
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                    letterSpacing: 1,
                    fontFamily: 'Poppins-Light',
                  }}>
                  ‎Dynamic Light show with Strobe Lights;Pair with other
                  speaker;Aux in & Bluetooth;Customize configurations via
                  PartyBox App;Multi Source Playback via USB drive
                </Text>
              </View>
              <View style={{marginBottom: 30}}>
                <Text
                  style={{
                    color: '#2c2c2c',
                    fontSize: 15,
                    fontFamily: 'Poppins-Medium',
                    letterSpacing: 1,
                  }}>
                  Descriptions
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                    letterSpacing: 1,
                    fontFamily: 'Poppins-Light',
                  }}>
                  ‎Dynamic Light show with Strobe Lights;Pair with other
                  speaker;Aux in & Bluetooth;Customize configurations via
                  PartyBox App;Multi Source Playback via USB drive
                </Text>
              </View>
              <View style={{marginBottom: 30}}>
                <Text
                  style={{
                    color: '#2c2c2c',
                    fontSize: 15,
                    fontFamily: 'Poppins-Medium',
                    letterSpacing: 1,
                  }}>
                  Descriptions
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                    letterSpacing: 1,
                    fontFamily: 'Poppins-Light',
                  }}>
                  ‎Dynamic Light show with Strobe Lights;Pair with other
                  speaker;Aux in & Bluetooth;Customize configurations via
                  PartyBox App;Multi Source Playback via USB drive
                </Text>
              </View>
              <View style={{marginBottom: 30}}>
                <Text
                  style={{
                    color: '#2c2c2c',
                    fontSize: 15,
                    fontFamily: 'Poppins-Medium',
                    letterSpacing: 1,
                  }}>
                  Descriptions
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                    letterSpacing: 1,
                    fontFamily: 'Poppins-Light',
                  }}>
                  ‎Dynamic Light show with Strobe Lights;Pair with other
                  speaker;Aux in & Bluetooth;Customize configurations via
                  PartyBox App;Multi Source Playback via USB drive
                </Text>
              </View>
              <View style={{marginBottom: 50}}>
                <Text
                  style={{
                    color: '#2c2c2c',
                    fontSize: 15,
                    fontFamily: 'Poppins-Medium',
                    letterSpacing: 1,
                  }}>
                  Descriptions
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                    letterSpacing: 1,
                    fontFamily: 'Poppins-Light',
                  }}>
                  ‎Dynamic Light show with Strobe Lights;Pair with other
                  speaker;Aux in & Bluetooth;Customize configurations via
                  PartyBox App;Multi Source Playback via USB drive
                </Text>
              </View> */}
              {/*  */}
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              backgroundColor: '#f7f6fd',
              // position: 'absolute',
              width: '100%',
              bottom: '20%',
              marginBottom: 15,
              alignItems: 'center',
            }}>
            <View style={{flex: 0.6}}>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  letterSpacing: 1,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                {/* <MaterialIcons name="currency-rupee" size={13} color="black" /> */}
                ₹
                {productObject === null
                  ? allProducts[0].productPrice
                  : productObject.productPrice}
              </Text>
            </View>
            <View style={{flex: 0.6}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ea5362',
                  padding: 7,
                  borderRadius: 7,
                  // padding: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: 'Poppins-Medium',
                    textAlign: 'center',
                  }}>
                  Add to cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Productfilter;

const styles = StyleSheet.create({});
