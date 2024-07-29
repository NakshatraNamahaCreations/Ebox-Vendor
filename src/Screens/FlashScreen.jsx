import {Image, Animated, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import THEMECOLOR from '../utilities/color';

export default function FlashScreen({navigation}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // useEffect(() => {
  //   setTimeout(() => {
  //     // navigation.navigate('BottomTab');
  //     navigation.navigate('Login');
  //   }, 3000);
  // }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      // navigation.navigate('BottomTab');
      navigation.navigate('Login');
    }, 3000);
  }, [fadeAnim]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Image
        source={require('../../assets/logo.png')}
        style={{width: 150, height: 150}}
      /> */}
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: fadeAnim,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Poppins-SemiBold',
            letterSpacing: 2,
            color: 'black',
          }}>
          <MaterialCommunityIcons
            name="drawing-box"
            size={50}
            color={THEMECOLOR.mainColor}
          />
          EVENT BOX
        </Text>
      </Animated.View>
    </View>
  );
}
