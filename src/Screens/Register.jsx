import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
// import {Checkbox} from 'react-native-paper';
import THEMECOLOR from '../utilities/color';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const professionType = [
    {
      type: 'Vendor & Seller',
    },
    {
      type: 'DJ',
    },
    {
      type: 'Celebrity',
    },
    {
      type: 'Host',
    },
    {
      type: 'Hotels',
    },
    {
      type: 'Resorts',
    },
    {
      type: 'Catering',
    },
    {
      type: 'Photography',
    },
    {
      type: 'Videography',
    },
  ];
  const handleSubmit = async () => {
    if (!name || !mobileNumber || !profession || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    // alert('Registration successful! Please login');
    try {
      const config = {
        url: 'vendor/register',
        method: 'post',
        baseURL: 'http://192.168.1.103:9000/api/',
        headers: {'Content-Type': 'application/json'},
        data: {
          vendor_name: name,
          mobile_number: mobileNumber,
          profession: profession,
          email: email,
          password: password,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        Alert.alert('Success', response.data.message);
        // console.log('AsyncStorage', response.data.newVendor);
        // // AsyncStorage.setItem('token', response.data.newVendor);
        await AsyncStorage.setItem(
          'vendor',
          JSON.stringify(response.data.newVendor),
        );
        navigation.navigate('BottomTab');
        // navigation.navigate('AddShopDetails', {
        //   vendor: response.data.newVendor,
        // });
      }
    } catch (error) {
      console.log('Unknown error:', error);
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
    // navigation.navigate('AddShopDetails', {
    //   vendor_name: name,
    //   mobile_number: mobileNumber,
    //   prefession: profession,
    //   email: email,
    //   password: password,
    // });
  };

  const handleOTP = () => {
    // alert('Registration successful! Please login');
    navigation.navigate('AddShopDetails', {number: mobileNumber});
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
          fontSize: 18,
          color: THEMECOLOR.mainColor,
          marginBottom: 10,
          // letterSpacing: 1,
          fontFamily: 'Montserrat-Medium',
        }}>
        Sign up
      </Text>

      <Text
        style={{
          color: 'black',
          fontSize: 14,
          marginBottom: 5,
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
        }}>
        Name
      </Text>
      <TextInput
        placeholderTextColor="#757575"
        placeholder="Enter name"
        value={name}
        onChangeText={val => setName(val)}
        style={{
          borderWidth: 1,
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

      <Text
        style={{
          color: 'black',
          fontSize: 14,
          marginBottom: 5,
          fontFamily: 'Montserrat-Medium',
        }}>
        Profession
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#d5d5d5',
          // height: 55,
          borderRadius: 10,
          marginBottom: 10,
          paddingHorizontal: 5,
        }}>
        <Picker
          // Use board.category
          itemStyle={{backgroundColor: 'white'}}
          selectedValue={profession}
          onValueChange={
            cteItem => setProfession(cteItem) // Pass the index and new value
          }>
          <Picker.Item
            label="Select profession"
            value=""
            style={{
              backgroundColor: 'white',
              color: '#757575',
              fontSize: 14,
              fontFamily: 'Montserrat-Regular',
              // letterSpacing: 1,
            }}
          />
          {professionType.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.type}
              value={item.type}
              style={{
                color: 'black',
                fontSize: 14,
                backgroundColor: 'white',
                fontFamily: 'Montserrat-Regular',
                // letterSpacing: 1,
              }}
            />
          ))}
        </Picker>
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
          marginBottom: 5,
        }}>
        Phone number
      </Text>
      <TextInput
        placeholderTextColor="#757575"
        placeholder="Enter phone number"
        value={mobileNumber}
        maxLength={10}
        onChangeText={val => setMobileNumber(val)}
        keyboardType="number-pad"
        style={{
          borderWidth: 1,
          borderColor: '#d5d5d5',
          color: 'black',
          fontSize: 14,
          borderRadius: 10,
          paddingLeft: 15,
          backgroundColor: 'white',
          marginBottom: 15,
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
        }}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
          marginBottom: 5,
        }}>
        Email id
      </Text>
      <TextInput
        placeholderTextColor="#757575"
        placeholder="Enter email id"
        value={email}
        // maxLength={10}
        onChangeText={val => setEmail(val)}
        // keyboardType="number-pad"
        style={{
          borderWidth: 1,
          borderColor: '#d5d5d5',
          color: 'black',
          fontSize: 14,
          borderRadius: 10,
          paddingLeft: 15,
          backgroundColor: 'white',
          marginBottom: 15,
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
        }}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
          marginBottom: 5,
        }}>
        Password
      </Text>
      <TextInput
        placeholderTextColor="#757575"
        placeholder="Enter password"
        value={password}
        // maxLength={10}
        onChangeText={val => setPassword(val)}
        // keyboardType="number-pad"
        style={{
          borderWidth: 1,
          borderColor: '#d5d5d5',
          color: 'black',
          fontSize: 14,
          borderRadius: 10,
          paddingLeft: 15,
          backgroundColor: 'white',
          marginBottom: 15,
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
        }}
      />
      {/* <Text
        style={{
          color: THEMECOLOR.helperTextGray,
          fontSize: 16,
          marginBottom: 5,
          textAlign: 'center',
        }}>
        You will get OTP on this number
      </Text> */}
      <TouchableOpacity
        style={{
          backgroundColor: THEMECOLOR.mainColor,
          paddingVertical: 10,
          borderRadius: 10,
          elevation: 3,
          marginHorizontal: 50,
        }}
        onPress={handleSubmit}>
        <Text
          style={{
            color: THEMECOLOR.textColor,
            fontSize: 14,
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
          }}>
          Add Bussiness Details{' '}
          <AntDesign name="arrowright" size={14} color="black" />
        </Text>
      </TouchableOpacity>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />

        <Text
          style={{
            color: 'black',
            fontSize: 12,
            fontFamily: 'Montserrat-Regular',
            marginLeft: 10,
          }}>
          By sign up, you are agree out terms of condition{' '}
        </Text>
      </View> */}

      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
        <Text
          style={{
            color: 'black',
            fontSize: 13,
            fontFamily: 'Montserrat-Medium',
          }}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text
            style={{
              color: THEMECOLOR.mainColor,
              fontSize: 13,
              fontFamily: 'Montserrat-Medium',
            }}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
