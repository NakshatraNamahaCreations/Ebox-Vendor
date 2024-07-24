import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import THEMECOLOR from '../utilities/color';

export default function Login({navigation}) {
  const [mobileNumber, setMobileNumber] = useState('');

  const handleLogin = () => {
    alert('Login successful');
    navigation.navigate('BottomTab');
  };

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: 'white',
        height: '100%',
        paddingTop: 20,
      }}>
      <Text
        style={{
          fontSize: 30,
          color: THEMECOLOR.mainColor,
          marginBottom: 10,
          letterSpacing: 1,
          fontFamily: 'Poppins-Medium',
        }}>
        Login
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          marginBottom: 10,
          fontFamily: 'Poppins-Regular',
          letterSpacing: 1,
          //   fontWeight: '400',
        }}>
        Welcome back! Please login
      </Text>
      <Text
        style={{
          color: 'black',
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
          marginBottom: 5,
          letterSpacing: 1,
        }}>
        Phone number
      </Text>
      <TextInput
        placeholderTextColor="#757575"
        placeholder="Enter phone number"
        value={mobileNumber}
        onChangeText={val => setMobileNumber(val)}
        style={{
          borderWidth: 1,
          borderColor: '#d5d5d5',
          color: 'black',
          fontSize: 16,
          borderRadius: 10,
          fontFamily: 'Poppins-Regular',
          paddingLeft: 15,
          backgroundColor: 'white',
          marginBottom: 15,
          letterSpacing: 1,
        }}
      />
      <TouchableOpacity>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            marginBottom: 5,
            textAlign: 'right',
            letterSpacing: 1,
          }}>
          {/* Forgot Password? */}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: THEMECOLOR.mainColor,
          width: '100%',
          // height: 60,
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          elevation: 3,
          marginTop: 40,
        }}
        onPress={handleLogin}>
        <Text
          style={{
            color: THEMECOLOR.textColor,
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
            letterSpacing: 1,
          }}>
          Login
        </Text>
      </TouchableOpacity>
      <View style={{position: 'absolute', bottom: 20, width: '100%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'Poppins-Regular',
              letterSpacing: 1,
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
                fontSize: 18,
                letterSpacing: 1,
                fontFamily: 'Poppins-Regular',
              }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
