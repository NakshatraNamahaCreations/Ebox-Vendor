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
import THEMECOLOR from '../../utilities/color';

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
      <ScrollView style={{backgroundColor: '#f7f6fd', paddingHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            // marginTop: 20,
          }}>
          {allProducts.map((ele, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  item: ele,
                })
              }
              // onPress={() => toggleModal(ele)}
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
              <Image
                style={{
                  width: '100%',
                  height: 150,
                  resizeMode: 'cover',
                  borderRadius: 10,
                }}
                // source={{
                //   uri: 'https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/m/y/y/-original-imahfcgwza6fty8w.jpeg?q=70',
                // }}
                source={{
                  uri: ele.imageUrl,
                }}
              />
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
                  {ele.productName.length < 15
                    ? ele.productName
                    : ele.productName.substring(0, 15) + '...'}
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
                        fontSize: 12,
                        fontFamily: 'Montserrat-Medium',
                        // letterSpacing: 1,
                      }}>
                      28
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
                      fontSize: 13,
                      color: 'black',
                      fontFamily: 'Montserrat-SemiBold',
                      // letterSpacing: 1,
                    }}>
                    ₹ {ele.productPrice}
                  </Text>
                  <TouchableOpacity
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
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* <View style={{flexDirection: 'row', height: '100%'}}>
        <View
          style={{
            flexDirection: 'column',
            flex: 0.3,
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
                    selectedObject === index ? '#94a784' : 'transparent',
                  borderTopRightRadius: selectedObject === index ? 10 : 0,
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
                    fontSize: 11,
                    color: 'black',
                    // letterSpacing: 1,
                    fontFamily: 'Montserrat-Regular',
                  }}>
                  {items.productName.length < 17
                    ? items.productName
                    : items.productName.substring(0, 17) + '...'}
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
                  fontSize: 10,
                  color: '#5374ea',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {productObject === null
                  ? allProducts[0].shopName
                  : productObject.shopName}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontFamily: 'Montserrat-Regular',
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
                      fontSize: 14,
                      color: 'black',
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    ₹
                    {productObject === null
                      ? allProducts[0].productPrice
                      : productObject.productPrice}
                  </Text>
                </View>
              </View>
              <View style={{marginBottom: 50}}>
                <Text
                  style={{
                    color: '#2c2c2c',
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Descriptions
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'black',
                    marginTop: 3,
                    fontFamily: 'Montserrat-Light',
                  }}>
                  ‎
                  {productObject === null
                    ? allProducts[0].productDescription
                    : productObject.productDescription}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              backgroundColor: '#f7f6fd',
              width: '100%',
              bottom: '20%',
              marginBottom: 15,
              alignItems: 'center',
            }}>
            <View style={{flex: 0.6}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                }}>
                ₹
                {productObject === null
                  ? allProducts[0].productPrice
                  : productObject.productPrice}
              </Text>
            </View>
            <View style={{flex: 0.6}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ceffa4',
                  padding: 7,
                  borderRadius: 7,
                  // padding: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    fontFamily: 'Montserrat-Medium',
                    textAlign: 'center',
                  }}>
                  Add to cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View> */}
    </View>
  );
};

export default Productfilter;

const styles = StyleSheet.create({});
