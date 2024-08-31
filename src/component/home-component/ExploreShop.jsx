import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {vendor} from '../../data/global-data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import THEMECOLOR from '../../utilities/color';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../api-services/api-constants';

export default function ExploreShop() {
  const navigation = useNavigation();
  const [allvendor, setAllvendor] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('vendor');
        if (storedValue !== null) {
          setValue(JSON.parse(storedValue)); // Parse JSON if you stored it in JSON format
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage', error);
      }
    };

    fetchData();
  }, []);

  // console.log('value====', value);

  useEffect(() => {
    getallvendor();
  }, []);
  const getallvendor = async () => {
    try {
      const res = await axios.get(`${apiUrl.BASEURL}${apiUrl.GET_ALL_VENDOR}`);
      if (res.status === 200) {
        const filteredProducts = res.data;

        setAllvendor(filteredProducts);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const filterallshop = allvendor.filter(
    item => item?._id !== value?._id && item?.is_approved === true,
  );
  // console.log('filterallshop=====', filterallshop);
  // console.log('allvendor', allvendor);

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {filterallshop.map((item, index) => (
          <View
            key={index}
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
                width: 100,
                height: 100,
                resizeMode: 'cover',
                borderRadius: 50,
                alignSelf: 'center',
                marginTop: 15,
              }}
              source={{
                uri: `${apiUrl.IMAGEURL}${item.shop_image_or_logo}`,
              }}
            />
            {/* {item.verifiedBadge && (
              <MaterialIcons
                name="verified-user"
                size={20}
                color="#4a75f6"
                style={{
                  position: 'absolute',
                  bottom: 100,
                  left: 100,
                  zIndex: 1,
                }}
              />
            )} */}
            <View style={{paddingLeft: 5, paddingRight: 5, marginTop: 15}}>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                  marginBottom: 5,
                  textAlign: 'center',
                }}>
                {item.shop_name?.length < 15
                  ? item.shop_name
                  : item.shop_name?.substring(0, 15) + '...'}
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: 7,
                  marginTop: 7,
                  marginBottom: 5,
                  paddingTop: 9,
                  paddingBottom: 9,
                  backgroundColor: THEMECOLOR.mainColor,
                }}
                onPress={() =>
                  navigation.navigate('Shop Details', {
                    shop: item?._id,
                    shopname: item?.shop_name,
                  })
                }>
                <Text
                  style={{
                    color: THEMECOLOR.textColor,
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  View Profile
                </Text>
              </TouchableOpacity>
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
              {/* <Text
                style={{fontSize: 15, color: '#414242', fontWeight: 'bold'}}>
                ₹ 1000.00
              </Text> */}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
