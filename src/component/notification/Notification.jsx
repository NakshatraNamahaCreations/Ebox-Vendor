import {View, Text, Image} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import THEMECOLOR from '../../utilities/color';

export default function Notification() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../../../assets/notification.png')}
        style={{width: 200, height: 200, marginTop: '20%', marginBottom: 30}}
        onError={() => console.log('Error loading image')} // Error handling for image
      />
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <Text
          style={{
            color: THEMECOLOR.mainColor,
            fontSize: 15,
            marginBottom: 10,
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
          }}>
          NO NOTIFICATIONS
        </Text>
        {/* <View
          style={{
            borderBottomColor: '#353249',
            borderWidth: 2,
            // width: 50,
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}></View> */}
        <Octicons
          name="horizontal-rule"
          color={THEMECOLOR.mainColor}
          size={20}
          style={{textAlign: 'center', marginBottom: 10}}
        />
        <Text
          style={{
            color: '#515151',
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
          }}>
          Clutter cleared! We'll notify you when there is something to show
        </Text>
      </View>
    </View>
  );
}
