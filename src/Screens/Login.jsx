import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import THEMECOLOR from '../utilities/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {bookingHistory} from '../data/global-data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {apiUrl} from '../api-services/api-constants';

export default function Login({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleLogin = async () => {
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter mobile number');
      return;
    }
    // alert('Registration successful! Please login');
    try {
      const config = {
        url: apiUrl.LOGIN_WITH_MOBILE,
        method: 'post',
        baseURL: apiUrl.BASEURL,
        headers: {'Content-Type': 'application/json'},
        data: {
          mobile_number: mobileNumber,
        },
      };
      const response = await axios(config);

      if (response.status === 200) {
        Alert.alert('Success', response.data.message);
        console.log('AsyncStorage', response.data.vendor);
        // AsyncStorage.setItem('token', response.data.vendor);
        await AsyncStorage.setItem(
          'vendor',
          JSON.stringify(response.data.vendor),
        );
        navigation.navigate('BottomTab');
        // navigation.navigate('AddShopDetails');
      }
    } catch (error) {
      console.log('Unknown error:', error);
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: 'white',
        height: '100%',
        paddingTop: '10%',
      }}>
      <Image
        source={require('../../assets/secure-login-concept-illustration.png')}
        style={{
          width: 210,
          height: 200,
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          fontSize: 18,
          color: THEMECOLOR.mainColor,
          marginBottom: 10,
          // letterSpacing: 1,
          fontFamily: 'Montserrat-SemiBold',
        }}>
        Login
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: 'black',
          marginBottom: 10,
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
          //   fontWeight: '400',
        }}>
        Welcome back! Please login
      </Text>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Montserrat-Regular',
          fontSize: 14,
          marginBottom: 5,
          // letterSpacing: 1,
        }}>
        Phone number
      </Text>
      <TextInput
        placeholderTextColor="#757575"
        placeholder="Enter phone number"
        value={mobileNumber}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={val => setMobileNumber(val)}
        style={{
          borderWidth: 1,
          borderColor: '#d5d5d5',
          color: 'black',
          fontSize: 14,
          borderRadius: 10,
          fontFamily: 'Montserrat-Regular',
          paddingLeft: 15,
          backgroundColor: 'white',
          // marginBottom: 15,
          // letterSpacing: 1,
        }}
      />
      <TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            // marginBottom: 5,
            textAlign: 'right',
            // letterSpacing: 1,
          }}>
          {/* Forgot Password? */}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: THEMECOLOR.mainColor,
          paddingVertical: 10,
          borderRadius: 10,
          elevation: 3,
          marginHorizontal: 100,
          // marginTop: 40,
        }}
        onPress={handleLogin}>
        <Text
          style={{
            color: THEMECOLOR.textColor,
            fontSize: 15,
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}>
          Login
        </Text>
      </TouchableOpacity>
      <View
        style={{
          // justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}> */}
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
              // letterSpacing: 1,
            }}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text
              style={{
                color: THEMECOLOR.mainColor,
                fontSize: 13,
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Regular',
              }}>
              Sign up
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 0.3,
            borderTopColor: '#58e4a738',
            borderTopWidth: 1,
            marginTop: 3,
          }}></View>
        <View
          style={{
            flex: 0.4,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#414242',
              // color: 'black',
              fontFamily: 'Montserrat-Regular',
              textAlign: 'center',
              // letterSpacing: 1,
            }}>
            Or Signup With
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            borderTopColor: '#58e4a738',
            borderTopWidth: 1,
            marginTop: 3,
          }}></View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          // alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/search.png')}
          style={{width: 60, height: 60, borderRadius: 50}}
        />
      </TouchableOpacity>
    </View>
  );
}
