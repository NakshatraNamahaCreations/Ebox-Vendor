import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {allProducts} from '../../data/global-data';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import THEMECOLOR from '../../utilities/color';
function ShopDetails({route}) {
  const navigation = useNavigation();
  const shop = route.params.shop || '';
  // console.log('shop>>>>>>', shop);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showItems, setShowItems] = useState({});

  const toggleModal = item => {
    setShowItems(item);
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
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
              // letterSpacing: 1,
              color: 'black',
              fontSize: 18,
            }}>
            {shop.shopName}
          </Text>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#f7f6fd', padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            // marginTop: 20,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingBottom: '25%',
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
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
          color: '#a9a9a9',
          fontSize: 20,
        }}>
        Event Host
      </Text>
      {/* show short details */}
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
                    // letterSpacing: 1,
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
                        marginTop: 0,
                        // letterSpacing: 1,
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
                    // letterSpacing: 1,
                    color: '#696969',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {showItems.productDescription}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                marginBottom: 10,
                borderRadius: 10,
                padding: 6,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
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
                    // letterSpacing: 1,
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
              </View>
              <View style={{flex: 0.1}}></View>
              <View style={{flex: 0.6}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ea5362',
                    padding: 15,
                    borderRadius: 7,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontFamily: 'Montserrat-Medium',
                      textAlign: 'center',
                      // letterSpacing: 1,
                    }}>
                    Add item ₹ {showItems.productPrice}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

export default ShopDetails;

const styles = StyleSheet.create({});
