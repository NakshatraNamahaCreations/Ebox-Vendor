import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {productList} from '../../data/global-data';
import ProductDetails from '../product/ProductDetails';

export default function DiscountItems() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
            }}
            key={index}
            onPress={() => enablePopup(item)}>
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
                  <View style={{flexDirection: 'row', marginBottom: 2}}>
                    <View
                      style={{
                        marginTop: -2,
                        backgroundColor: '#cc0c39',
                        paddingHorizontal: 1,
                        paddingVertical: 3,
                        // paddingTop: 5,
                        // paddingBottom: 4,
                        // paddingLeft: 6,
                        // paddingRight: 6,
                        borderRadius: 6,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 8,
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        50% off
                      </Text>
                    </View>
                    <Text
                      style={{
                        width: 150,
                        fontSize: 10,
                        fontFamily: 'Montserrat-Medium',
                        color: 'black',
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
      {isModalOpen === true && (
        <ProductDetails
          selectedProduct={selectedItem}
          closeModal={enablePopup}
        />
      )}
    </View>
  );
}
