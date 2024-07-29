import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import THEMECOLOR from '../utilities/color';

export default function OtpSuccess({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../assets/verified.png')}
        style={{width: 100, height: 100}}
      />
      <Text
        style={{
          color: THEMECOLOR.mainColor,
          fontSize: 18,
          marginTop: 12,
          marginBottom: 12,
          textAlign: 'left',
          fontFamily: 'Montserrat-Medium',
        }}>
        Successfully
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          fontFamily: 'Montserrat-Medium',
        }}>
        Your Account has been Created.
      </Text>
      <View style={{position: 'absolute', bottom: 40, width: '50%'}}>
        <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            padding: 10,
            borderRadius: 10,
            elevation: 3,
          }}
          onPress={() => {
            navigation.navigate('BottomTab');
          }}>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'Montserrat-Medium',
            }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
