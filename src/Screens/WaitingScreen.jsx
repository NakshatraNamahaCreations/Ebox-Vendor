import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import THEMECOLOR from '../utilities/color';

export default function WaitingScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../../assets/truck.gif')}
        style={{width: 200, height: 200}}
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
        Thanks for Submitting...
      </Text>
      <Text
        style={{
          color: 'black',
          fontSize: 14,
          fontFamily: 'Montserrat-Medium',
          textAlign: 'center',
          marginHorizontal: 30,
        }}>
        Your details has been submitted, We will let you know once your account
        has been approved.
      </Text>
      {/* <View style={{position: 'absolute', bottom: 40, width: '50%'}}>
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
      </View> */}
    </View>
  );
}
