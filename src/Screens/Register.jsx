import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Checkbox} from 'react-native-paper';
import THEMECOLOR from '../utilities/color';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [checked, setChecked] = useState(false);
  const professionType = [
    {
      type: 'Select',
    },
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
  ];
  const handleOTP = () => {
    // alert('Registration successful! Please login');
    navigation.navigate('OTP', {number: mobileNumber});
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
        Sign up
      </Text>

      <Text
        style={{
          color: 'black',
          fontSize: 16,
          marginBottom: 5,
          fontFamily: 'Poppins-Regular',
          letterSpacing: 1,
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
          fontSize: 16,
          borderRadius: 10,
          paddingLeft: 15,
          backgroundColor: 'white',
          marginBottom: 20,
          fontFamily: 'Poppins-Regular',
          letterSpacing: 1,
        }}
      />

      {/* <Text
        style={{
          color: 'black',
          fontSize: 16,
          fontFamily: 'Poppins-Regular',
          letterSpacing: 1,
          marginBottom: 5,
        }}>
        Profession
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#d5d5d5',
          height: 55,
          borderRadius: 10,
          marginBottom: 20,
        }}>
        <Picker
          // Use board.category
          selectedValue={profession}
          onValueChange={
            cteItem => setProfession(cteItem) // Pass the index and new value
          }>
          <Picker.Item
            label="Select profession"
            value=""
            style={{
              color: '#757575',
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              letterSpacing: 1,
            }}
          />
          {professionType.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.type}
              value={item.type}
              style={{
                color: 'black',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                letterSpacing: 1,
              }}
            />
          ))}
        </Picker>
      </View> */}
      <Text
        style={{
          color: 'black',
          fontSize: 16,
          fontFamily: 'Poppins-Regular',
          letterSpacing: 1,
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
          fontSize: 16,
          borderRadius: 10,
          paddingLeft: 15,
          backgroundColor: 'white',
          marginBottom: 15,
          fontSize: 16,
          fontFamily: 'Poppins-Regular',
          letterSpacing: 1,
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
          width: '100%',
          // height: 60,
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          elevation: 3,
          marginTop: 20,
        }}
        onPress={handleOTP}>
        <Text
          style={{
            color: THEMECOLOR.textColor,
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
            letterSpacing: 1,
          }}>
          Get OTP
        </Text>
      </TouchableOpacity>
      <View
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
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            letterSpacing: 1,
            marginLeft: 10,
          }}>
          By sign up, you are agree out terms of condition{' '}
        </Text>
      </View>
      <View style={{position: 'absolute', bottom: 20, width: '100%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'Poppins-Regular',
              letterSpacing: 1,
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
                fontSize: 18,
                fontFamily: 'Poppins-Regular',
                letterSpacing: 1,
              }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
