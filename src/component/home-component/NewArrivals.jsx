import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {featuredProduct} from '../../data/global-data';
import THEMECOLOR from '../../utilities/color';
// import LottieView from 'lottie-react-native';

export default function NewArrivals({filterOut}) {
  // const vendor = route.params.vendor
  // console.log('vendorId', filterOut);

  const [showNewArr, setShowNewArr] = useState(false);
  const deviceWidth = Dimensions.get('window').width;
  // const [filterOut, setFilterOut] = useState([]);

  // const fetchFilteroutData = async () => {
  //   try {
  //     setLoading(true);

  //     const filterRes = await axios.get(
  //       `http://192.168.1.103:9000/api/product/getfilteroutproducts/${vendor?._id}`,
  //     );
  //     if (filterRes.status === 200) {
  //       // const resultData = filterRes.data.products;
  //       setFilterOut(filterRes.data.products);
  //       // console.log('resultData', resultData);
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View>
      <TouchableOpacity
        style={{
          borderRadius: 16,
          backgroundColor: THEMECOLOR.mainColor,
          width: 70,
          height: 70,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // borderColor: 'black',
          // borderColor: '#ebebeb',
          // borderWidth: 1,
          elevation: 3,
        }}
        onPress={() => setShowNewArr(true)}>
        <View>
          <Image
            source={require('../../../assets/box.png')}
            style={{
              width: '100%',
              height: 30,
              resizeMode: 'center',
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              textAlign: 'center',
              fontFamily: 'Montserrat-Bold',
            }}>
            NEW
          </Text>
        </View>
        <View></View>
      </TouchableOpacity>
      <Modal
        animationIn="slideInUp"
        isVisible={showNewArr}
        deviceWidth={deviceWidth}
        style={{
          margin: 0,
          position: 'absolute',
          width: '100%',
          backgroundColor: 'white',
          shadowColor: '#000',
          bottom: 2,
          padding: 10,
          borderRadius: 15,
        }}
        transparent={true}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowNewArr(false)}>
            <AntDesign
              name="closecircle"
              size={35}
              color="white"
              style={{textAlign: 'center'}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: 'red',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Newly
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            {' '}
            launched Products
          </Text>
        </View>
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              // padding: 5,
              marginTop: 5,
            }}>
            {filterOut.map(item => (
              <TouchableOpacity
                key={item._id}
                style={{
                  margin: 5,
                  borderWidth: 2,
                  borderColor: THEMECOLOR.mainColor,
                  backgroundColor: 'white',
                  width: 170,
                  padding: 5,
                  borderRadius: 10,
                  elevation: 2,
                }}
                // onPress={() =>
                //   navigation.navigate('ProductDetails', {
                //     ele: vendor,
                //   })
                // }
              >
                {/* {vendor.discount && (
                  <View style={{position: 'absolute', top: 10, zIndex: 999999}}>
                    <Image
                      // resizeMode="cover"
                      style={{
                        width: 40,
                        height: 35,
                        transform: [{rotate: '315deg'}],
                      }}
                      source={require('../../../assets/tag.png')}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 8,
                        zIndex: 9999,
                        position: 'absolute',
                        left: 12,
                        top: 10,
                        fontWeight: '700',
                      }}>
                      {vendor.discount}%
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 8,
                        zIndex: 9999,
                        position: 'absolute',
                        left: 12,
                        top: 20,
                        fontWeight: '700',
                      }}>
                      OFF
                    </Text>
                  </View>
                )} */}
                {/* <Image
                  key={index} // Ensure each image has a unique key
                  source={{uri: vendor.productImage[0]?.imageUrl}}
                  style={{
                    width: '100%',
                    height: 150,
                    borderColor: '#e8e8e8',
                    borderWidth: 1,
                    borderRadius: 10,
                    // resizeMode: 'cover',
                  }}
                /> */}
                <Image
                  style={{
                    width: '100%',
                    height: 150,
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
                {/* <VendorImageSlider images={vendor.productImage} /> */}
                <View style={{paddingTop: 10, padding: 3}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#363636',
                      // letterSpacing: 1,
                      marginBottom: 3,
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    {/* {vendor.productName} */}
                    {item.product_name.length < 10
                      ? item.product_name
                      : item.product_name.substring(0, 14) + '...'}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 15,
                        color: '#363636',
                        letterSpacing: 1,
                      }}>
                      ₹{item.product_price}
                    </Text>
                    {/* <TouchableOpacity
                      style={{
                        backgroundColor: THEMECOLOR.mainColor,
                        borderRadius: 5,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Medium',
                          fontSize: 13,
                          color: THEMECOLOR.textColor,
                          // letterSpacing: 1,
                          textAlign: 'center',
                        }}>
                        + Add
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
