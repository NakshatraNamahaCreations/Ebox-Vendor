import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiUrl} from '../api-services/api-constants';
import THEMECOLOR from '../utilities/color';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

function ShopAddress() {
  const navigation = useNavigation();
  const route = useRoute();
  const vendor = route.params?.vendorData || {};

  const [directions, setDirections] = useState('');
  const [houseFlatBlock, setHouseFlatBlock] = useState('');
  const [roadArea, setRoadArea] = useState('');
  const [cityDownVillage, setCityDownVillage] = useState('');
  const [distric, setDistric] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  // const handleSubmit = async () => {
  //   if (!locality || !area || !city || !locationPin) {
  //     Alert.alert('Error', 'Please fill all fields');
  //     return;
  //   }
  //   // alert('Registration successful! Please login');
  //   const formData = new FormData();
  //   formData.append('shop_name', businessName);
  //   formData.append('godown_name', godownName);
  //   formData.append('godown_pin', godownLink);
  //   formData.append('locality', locality);
  //   formData.append('area', area);
  //   formData.append('city', city);
  //   formData.append('shop_location_pin', locationPin);
  //   formData.append('gst_number', gstNumber);
  //   formData.append('pan_number', panNumber);
  //   formData.append('vehicle_name', vehicleType);
  //   formData.append('number_plate', numberPlate);
  //   formData.append('vehicle_by', checked);
  //   formData.append('shop_image_or_logo', {
  //     uri: logoOrImageUri,
  //     type: 'image/jpeg',
  //     name: 'image.jpg',
  //   });
  //   formData.append('vehicle_image', {
  //     uri: vehicleUri,
  //     type: 'image/jpeg',
  //     name: 'image.jpg',
  //   });
  //   try {
  //     const config = {
  //       url: `${apiUrl.UPDATE_VENDOR_PROFILE}${vendorId}`,
  //       method: 'put',
  //       baseURL: apiUrl.BASEURL,
  //       headers: {'Content-Type': 'multipart/form-data'},
  //     };
  //     const response = await axios(config);

  //     if (response.status === 200) {
  //       Alert.alert('Success', response.data.message);
  //       console.log('AsyncStorage', response.data);
  //       // AsyncStorage.setItem('token', response.data.newVendor);
  //       // await AsyncStorage.setItem(
  //       //   'vendor',
  //       //   JSON.stringify(response.data.),
  //       // );
  //       // navigation.navigate('Waiting');
  //     }
  //   } catch (error) {
  //     console.log('Unknown error:', error);
  //     if (error.response && error.response.data) {
  //       ` `;
  //       Alert.alert('Error', error.response.data.message);
  //     } else {
  //       Alert.alert('Error', 'An unknown error occurred');
  //     }
  //   }
  // };

  const handleAddAddress = async () => {
    if (
      !houseFlatBlock ||
      !cityDownVillage ||
      !roadArea ||
      !distric ||
      !state ||
      !pincode
    ) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }
    try {
      const config = {
        url: `${apiUrl.ADD_SHIPPING_ADDRESS}${vendor._id}`,
        method: 'put',
        baseURL: apiUrl.BASEURL,
        headers: {'Content-Type': 'application/json'},
        data: {
          address: {
            fullName: vendor.vendor_name,
            mobileNumber: vendor.mobile_number,
            houseFlatBlock,
            roadArea,
            cityDownVillage,
            distric,
            state,
            pincode,
            directions,
          },
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        await AsyncStorage.setItem('vendor', JSON.stringify(vendor));
        navigation.navigate('Waiting');
      }
    } catch (error) {
      console.log('Unknown error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        // Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View>
        <Image
          source={require('../../assets/map_screenshot.png')}
          style={{width: '100%', height: 350}}
        />
      </View>
      <ScrollView style={{padding: 15}}>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
            // letterSpacing: 1,
            marginTop: 5,
            marginBottom: 10,
          }}>
          <Ionicons name="location" size={15} color="black" /> Address
        </Text>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              color: 'black',
              fontSize: 11,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
              marginBottom: 5,
            }}>
            fetch address here...
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.6, marginRight: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              HOUSE/FLAT/BLOCK
            </Text>
            <TextInput
              // placeholderTextColor="#757575"
              // placeholder="e.g. 1st Floor, Kukke Plaza"
              value={houseFlatBlock}
              // maxLength={10}
              onChangeText={val => setHouseFlatBlock(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View style={{flex: 0.6, marginLeft: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              AREA/ROAD
            </Text>
            <TextInput
              // placeholderTextColor="#757575"
              // placeholder="e.g. Electronic City"
              value={roadArea}
              // maxLength={10}
              onChangeText={val => setRoadArea(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.6, marginRight: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              CITY/DOWN/VILLAGE
            </Text>
            <TextInput
              // placeholderTextColor="#757575"
              // placeholder="e.g. Bangalore"
              value={cityDownVillage}
              // maxLength={10}
              onChangeText={val => setCityDownVillage(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View style={{flex: 0.6, marginRight: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              DISTRIC
            </Text>
            <TextInput
              // placeholderTextColor="#757575"
              // placeholder="e.g. Bangalore"
              value={distric}
              // maxLength={10}
              onChangeText={val => setDistric(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          {/* <View style={{flex: 0.6, marginLeft: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              Business Location Pin
            </Text>
            <TextInput
              // placeholderTextColor="#757575"
              // placeholder="Google map link"
              value={locationPin}
              // maxLength={10}
              onChangeText={val => setLocationPin(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View> */}
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.6, marginRight: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              STATE
            </Text>
            <TextInput
              // placeholderTextColor="#757575"
              // placeholder="e.g. Bangalore"
              value={state}
              // maxLength={10}
              onChangeText={val => setState(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View style={{flex: 0.6, marginLeft: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              PINCODE
            </Text>
            <TextInput
              // placeholderTextColor="#757575"
              // placeholder="Google map link"
              value={pincode}
              // maxLength={10}
              onChangeText={val => setPincode(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            paddingVertical: 10,
            borderRadius: 10,
            // elevation: 3,
            marginHorizontal: 100,
            marginTop: 20,
          }}
          onPress={handleAddAddress}>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              fontSize: 14,
              textAlign: 'center',
              fontFamily: 'Montserrat-Medium',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default ShopAddress;
