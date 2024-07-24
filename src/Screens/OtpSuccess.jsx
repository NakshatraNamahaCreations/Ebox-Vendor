import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import THEMECOLOR from '../utilities/color';

export default function OtpSuccess({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../assets/verified.png')}
        style={{width: 150, height: 150}}
      />
      <Text
        style={{
          color: THEMECOLOR.mainColor,
          fontSize: 30,
          marginTop: 12,
          marginBottom: 12,
          textAlign: 'left',
          letterSpacing: 1,
          fontFamily: 'Poppins-Medium',
        }}>
        Successfully
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 16,
          letterSpacing: 1,
          fontFamily: 'Poppins-Medium',
        }}>
        Your Account has been Created.
      </Text>
      <View style={{position: 'absolute', bottom: 40, width: '90%'}}>
        <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            padding: 15,
            borderRadius: 10,
            elevation: 3,
          }}
          onPress={() => {
            navigation.navigate('BottomTab');
          }}>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              fontSize: 20,
              textAlign: 'center',
              letterSpacing: 1,
              fontFamily: 'Poppins-Medium',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
