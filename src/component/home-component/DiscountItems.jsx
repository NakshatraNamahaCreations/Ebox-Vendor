import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {productList} from '../../data/global-data';
import {useNavigation} from '@react-navigation/native';

export default function DiscountItems() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  const enablePopup = items => {
    console.log('modal opening>>>>');
    setSelectedItem(items);
    setIsModalOpen(!isModalOpen);
  };
  return (
    <View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {productList.map((item, index) => (
          <TouchableOpacity
            style={{
              width: '50%',
              padding: 5,
              // borderColor: 'black',
              // borderWidth: 2,
            }}
            key={index}
            onPress={() =>
              navigation.navigate('ProductDetails', {
                item: item,
              })
            }
            // onPress={() => enablePopup(item)}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: 'transparent',
                borderRadius: 10,
              }}>
              {/* <Image
                style={{width: 100, height: 100, alignSelf: 'center'}}
                source={{
                  uri: 'https://m.media-amazon.com/images/I/81FzSswwCVL.jpg',
                }}
              /> */}
              <View
                style={{
                  marginTop: -2,
                  flexDirection: 'row',
                  backgroundColor: '#cc0c39',
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  position: 'absolute',
                  zIndex: 1,
                  top: 3,
                  left: 3,
                  // marginRight: 105,
                  // paddingBottom: 4,
                  // paddingLeft: 6,
                  // paddingRight: 6,
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 8,
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  50% off
                </Text>
              </View>
              <Image
                style={{
                  width: '100%',
                  height: 150,
                  resizeMode: 'cover',
                  alignSelf: 'center',
                  borderRadius: 10,
                }}
                source={{
                  uri: item.productImage,
                }}
              />
              <View style={{padding: 5}}>
                <View style={{marginTop: 5}}>
                  <View style={{marginBottom: 2}}>
                    <Text
                      style={{
                        // width: 150,
                        fontSize: 10,
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#cc0c39',
                        marginTop: 2,
                        marginLeft: 1,
                      }}>
                      Limited time deal
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
