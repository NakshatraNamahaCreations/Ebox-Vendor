import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import THEMECOLOR from '../../utilities/color';

export default function ReleventProduct({relevantProducts}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {relevantProducts.map(items => (
          <Pressable
            key={items._id}
            style={styles.addsOnView}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                item: items,
              })
            }>
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
  );
}

const styles = StyleSheet.create({
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

  addsOnText: {
    fontSize: 13,
    color: '#2c2c2c',
    fontFamily: 'Montserrat-SemiBold',
    // width: 200,
    // fontWeight: '500',
    // color: 'black',
    marginBottom: 5,
  },
});
