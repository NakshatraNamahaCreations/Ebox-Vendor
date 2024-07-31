import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import THEMECOLOR from '../../utilities/color';

export default function OrderSuccessPage({navigation}) {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <Image
        source={require('../../../assets/02-lottie-tick-01-instant-2-3.gif')}
        style={{
          width: 390,
          height: 350,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: 20,
        }}
      />
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          letterSpacing: 1,
          color: 'black',
          fontSize: 18,
          textAlign: 'center',
        }}>
        Order confirmed
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
          color: 'black',
          fontSize: 15,
          textAlign: 'center',
          marginTop: 5,
        }}>
        Your order is placed successfully!
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 15,
          backgroundColor: THEMECOLOR.mainColor,
          padding: 10,
          borderRadius: 5,
          margin: 60,
        }}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text
          style={{
            color: THEMECOLOR.textColor,
            textAlign: 'center',
            fontSize: 15,
            // letterSpacing: 1,
            fontFamily: 'Montserrat-SemiBold',
          }}>
          Go to Home page
        </Text>
      </TouchableOpacity>
    </View>
  );
}
