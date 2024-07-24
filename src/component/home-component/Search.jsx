import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {productList} from '../../data/global-data';

export default function Search() {
  const navigation = useNavigation();
  const [searchProduct, setSearchProduct] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = val => {
    setSearchProduct(val);
    if (val.trim() === '') {
      setFilteredProducts([]); // Clear results when input is empty
      return;
    }

    const filtered = productList.filter(
      item =>
        item.productName.toLowerCase().includes(val.toLowerCase()) ||
        item.shopName.toLowerCase().includes(val.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(val.toLowerCase()),
    );

    setFilteredProducts(filtered);
  };
  return (
    <View style={{backgroundColor: 'white', padding: 10, height: '100%'}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#d5d5d5',
          backgroundColor: 'white',
          elevation: 2,
          margin: 5,
          borderRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 8,
            //   bottom: 100,
            left: 10,
            zIndex: 111,
          }}>
          <Feather name="chevron-left" size={30} color="#ea5362" />
        </TouchableOpacity>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Search product"
          onChangeText={handleSearch}
          style={{
            color: 'black',
            fontSize: 17,
            borderRadius: 10,
            paddingLeft: 50,
            fontFamily: 'Poppins-Regular',
            letterSpacing: 1,
          }}
        />
      </View>
      <ScrollView>
        {searchProduct !== '' && filteredProducts.length > 0
          ? filteredProducts.map((item, index) => (
              <TouchableOpacity
                key={index}
                // onPress={() => enablePopup(item)}
                style={{
                  margin: 5,
                  borderWidth: 1,
                  borderColor: '#f3f3f3',
                  backgroundColor: 'white',
                  padding: 5,
                  borderRadius: 10,
                  elevation: 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{flex: 0.4}}>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: 'center',
                      borderRadius: 10,
                    }}
                    source={{
                      uri: item.productImage,
                    }}
                  />
                </View>
                <View style={{flex: 0.8}}>
                  <View style={{padding: 5}}>
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
                      {item.productName}
                      {/* {item.productName.length < 15
                    ? item.productName
                    : item.productName.substring(0, 15) + '...'} */}
                    </Text>

                    {/* <View style={{flexDirection: 'row', marginBottom: 2}}>
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
                </View> */}
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
                </View>
              </TouchableOpacity>
            ))
          : searchProduct !== '' && (
              <View style={{padding: 20, alignItems: 'center'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    fontSize: 16,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Oops! No products found.
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    fontSize: 14,
                    fontFamily: 'Poppins-Regular',
                  }}>
                  Please try something else
                  {/* Try searching with different keywords. */}
                </Text>
                <Image
                  source={{uri: 'https://img.icons8.com/color/452/no-data.png'}}
                  style={{width: 200, height: 200, marginTop: 20}}
                />
              </View>
            )}
      </ScrollView>
    </View>
  );
}
