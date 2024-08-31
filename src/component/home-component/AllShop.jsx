import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {vendor} from '../../data/global-data';
import Entypo from 'react-native-vector-icons/Entypo';
import THEMECOLOR from '../../utilities/color';
import axios from 'axios';
import {apiUrl} from '../../api-services/api-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AllShop() {
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
    <View style={{backgroundColor: 'white', height: '100%'}}>
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
            size={20}
            style={{
              backgroundColor: '#f5f5f5',
              width: 50,
              height: 50,
              textAlign: 'center',
              paddingTop: 15,
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
              color: 'black',
              fontSize: 15,
            }}>
            All Shop
          </Text>
        </View>
      </View>
      <ScrollView style={{padding: 5}}>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Search by shop"
          // value={name}
          // onChangeText={val => setName(val)}
          style={{
            borderWidth: 1,
            borderColor: '#d5d5d5',
            color: 'black',
            fontSize: 14,
            borderRadius: 10,
            paddingLeft: 15,
            backgroundColor: 'white',
            // marginBottom: 20,
            fontFamily: 'Montserrat-Regular',
            margin: 5,
            elevation: 1,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          {filterallshop.map((item, index) => (
            <View
              key={index}
              style={{
                margin: 5,
                borderWidth: 1,
                borderColor: '#f3f3f3',
                backgroundColor: 'white',
                width: '47%',
                padding: 5,
                borderRadius: 10,
                elevation: 2,
                // flex: 0.6,
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
                    left: 120,
                    zIndex: 1,
                  }}
                />
              )} */}
              <View style={{paddingLeft: 5, paddingRight: 5, marginTop: 15}}>
                <Text
                  style={{
                    fontSize: 13,
                    color: 'black',
                    fontFamily: 'Montserrat-SemiBold',
                    // letterSpacing: 1,
                    marginBottom: 5,
                    textAlign: 'center',
                  }}>
                  {item.shop_name?.length < 15
                    ? item.shop_name
                    : item.shop_name?.substring(0, 15) + '...'}
                </Text>
                <TouchableOpacity
                  style={{
                    borderColor: THEMECOLOR.mainColor,
                    borderWidth: 1,
                    borderRadius: 7,
                    marginTop: 7,
                    marginBottom: 5,
                    paddingTop: 9,
                    paddingBottom: 9,
                  }}
                  onPress={() =>
                    navigation.navigate('Shop Details', {
                      shop: item?._id,
                      shopname: item?.shop_name,
                    })
                  }>
                  <Text
                    style={{
                      color: THEMECOLOR.mainColor,
                      fontFamily: 'Montserrat-SemiBold',
                      // letterSpacing: 1,
                      fontSize: 13,
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
        </View>
      </ScrollView>
    </View>
  );
}

export default AllShop;
