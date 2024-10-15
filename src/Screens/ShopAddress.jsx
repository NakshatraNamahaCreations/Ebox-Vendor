import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  BackHandler,
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
  const [loading, setLoading] = useState(false);
  const [directions, setDirections] = useState('');
  const [houseFlatBlock, setHouseFlatBlock] = useState('');
  const [roadArea, setRoadArea] = useState('');
  const [cityDownVillage, setCityDownVillage] = useState('');
  const [distric, setDistric] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

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
    setLoading(true);
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
    } finally {
      setLoading(false); // Re-enable the button after the API call completes
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert(
          'Exit App',
          'Do you want to exit the app?',
          [
            {text: 'Cancel', onPress: () => null, style: 'cancel'},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: false},
        );
        return true;
      },
    );

    // Clean up the event listener
    return () => backHandler.remove();
  }, []);

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
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text
              style={{
                color: THEMECOLOR.textColor,
                fontSize: 14,
                textAlign: 'center',
                fontFamily: 'Montserrat-Medium',
              }}>
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default ShopAddress;
