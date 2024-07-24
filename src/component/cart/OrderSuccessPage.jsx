import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

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
          fontFamily: 'Poppins-Medium',
          letterSpacing: 1,
          color: 'black',
          fontSize: 20,
          textAlign: 'center',
        }}>
        Order confirmed
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          letterSpacing: 1,
          color: 'black',
          fontSize: 16,
          textAlign: 'center',
        }}>
        Your order is placed successfully!
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 15,
          backgroundColor: '#ea5362',
          padding: 15,
          borderRadius: 5,
          margin: 60,
        }}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 18,
            letterSpacing: 1,
            fontFamily: 'Poppins-Medium',
          }}>
          Go to Home page
        </Text>
      </TouchableOpacity>
    </View>
  );
}
