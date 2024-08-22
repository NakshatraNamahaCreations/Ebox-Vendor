import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiUrl} from '../api-services/api-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import THEMECOLOR from '../utilities/color';
import axios from 'axios';

function ShopAddress({navigation, route}) {
  // const {
  //   vendorId,
  //   businessName,
  //   godownName,
  //   godownLink,
  //   gstNumber,
  //   panNumber,
  //   vehicleType,
  //   numberPlate,
  //   logoOrImageUri,
  //   logoOrImageFileName,
  //   vehicleUri,
  //   vehicleFileName,
  //   checked,
  // } = route.params;
  // console.log(
  //   'CONSOLE LOG IN ADD ADDRESS PAGE',
  //   'vendorId:',
  //   vendorId,
  //   'businessName:',
  //   businessName,
  //   'godownName:',
  //   godownName,
  //   'godownLink:',
  //   godownLink,
  //   'gstNumber:',
  //   gstNumber,
  //   'panNumber:',
  //   panNumber,
  //   'vehicleType:',
  //   vehicleType,
  //   'numberPlate:',
  //   numberPlate,
  //   'logoOrImageUri:',
  //   logoOrImageUri,
  //   'logoOrImageFileName:',
  //   logoOrImageFileName,
  //   'vehicleUri:',
  //   vehicleUri,
  //   'vehicleFileName:',
  //   vehicleFileName,
  //   'checked:',
  //   checked,
  // );
  const [locality, setLocality] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [locationPin, setLocationPin] = useState('');

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

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View>
        <Image
          source={require('../../assets/map_screenshot.png')}
          style={{width: '100%', height: 350}}
        />
      </View>
      <View style={{padding: 15}}>
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
              Locality
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="e.g. 1st Floor, Kukke Plaza"
              value={locality}
              // maxLength={10}
              onChangeText={val => setLocality(val)}
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
              Area
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="e.g. Electronic City"
              value={area}
              // maxLength={10}
              onChangeText={val => setArea(val)}
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
              City
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="e.g. Bangalore"
              value={city}
              // maxLength={10}
              onChangeText={val => setCity(val)}
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
              Business Location Pin
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="Google map link"
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
          onPress={handleSubmit}>
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
      </View>
    </View>
  );
}

export default ShopAddress;
