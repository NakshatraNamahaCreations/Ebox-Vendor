import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {productList} from '../../data/global-data';
import ProductDetails from '../product/ProductDetails';

export default function Recommended() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const enablePopup = items => {
    console.log('modal opening>>>>');
    setSelectedItem(items);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {productList.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => enablePopup(item)}
            style={{
              margin: 5,
              borderWidth: 1,
              borderColor: '#f3f3f3',
              backgroundColor: 'white',
              width: 170,
              padding: 5,
              borderRadius: 10,
              elevation: 2,
            }}>
            <Image
              style={{
                width: 155,
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
                  <Text style={{color: 'black', fontSize: 14}}>45</Text>
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
      </ScrollView>
      {isModalOpen === true && (
        <ProductDetails
          selectedProduct={selectedItem}
          closeModal={enablePopup}
        />
      )}
    </View>
  );
}
