import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

function ProductDetails({selectedProduct, closeModal}) {
  // console.log('selectedProduct>>>>>>>>>>>>>>', selectedProduct);

  return (
    <View>
      <Modal
        isVisible={true}
        animationIn="slideInUp"
        backdropOpacity={0.5}
        style={{margin: 0, position: 'absolute', bottom: 0, width: '100%'}}>
        <TouchableOpacity
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
                    height: 200,
                    resizeMode: 'cover',
                    alignSelf: 'center',
                    borderRadius: 10,
                  }}
                  source={{
                    uri:
                      selectedProduct.productImage ||
                      'https://via.placeholder.com/300',
                  }}
                />
                <TouchableOpacity
                  style={{position: 'absolute', bottom: 10, left: 10}}>
                  <Ionicons name="heart-outline" size={27} color="#e91e63" />
                </TouchableOpacity>
              </View>
              <View style={{padding: 10}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    marginBottom: 10,
                    marginTop: 10,
                    fontFamily: 'Montserrat-SemiBold',
                  }}>
                  {selectedProduct.productName}
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
                        size={12}
                        color="#fdd663"
                        style={{padding: 2}}
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
                        marginTop: 2,
                      }}>
                      {' '}
                      435 ratings
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 6,
                    color: '#696969',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {selectedProduct.productDescription}
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
                justifyContent: 'space-between',
              }}>
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
              <View>
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
                    {/* <MaterialIcons
                      name="currency-rupee"
                      size={14}
                      color="black"
                    />
                    {showItems.productPrice} */}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
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
                    Add Item{' '}
                    {/* <MaterialIcons
                      name="currency-rupee"
                      size={14}
                      color="black"
                    />
                    {showItems.productPrice} */}
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

export default ProductDetails;
