import {Animated, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import THEMECOLOR from '../utilities/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export default function SplashScreen({navigation}) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    retrieveData(); // Corrected function name
  }, []);

  useEffect(() => {
    // if (Object.keys(vendor).length > 0) {
    condition();
    // }
  }, [vendor]);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('vendor');
      if (value !== null) {
        setVendor(JSON.parse(value));
      } else {
        setTimeout(() => {
          navigation.navigate('Login');
        }, 3000);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const condition = () => {
    // console.log('vendor in splashscreen...', vendor);
    if (vendor) {
      setTimeout(() => {
        navigation.navigate('BottomTab');
      }, 7000);
    }
  };
  console.log('vendor in splashscreen...', vendor);

  // const decisionMaking = async () => {
  //   try {
  //     const vendorData = await AsyncStorage.getItem('vendor');
  //     if (vendorData !== null) {
  //       setVendor(JSON.parse(vendorData));
  //     } else {
  //       setVendor(null);
  //       setTimeout(() => {
  //         navigation.navigate('Login');
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // const checkVendor = () => {
  if (vendor) {
    setTimeout(() => {
      navigation.navigate('BottomTab');
    }, 3000);
  }
  // };
  // useEffect(() => {
  //   decisionMaking();
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     decisionMaking();
  //   }, []),
  // );

  // useEffect(() => {
  //   checkVendor();
  // }, [vendor]);

  //     const timer = setTimeout(() => {
  //       checkVendor();
  //     }, 3000);

  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }, []),
  // );

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (vendor !== null) {
  //       navigation.navigate('BottomTab');
  //       // console.log('vendor', vendor);
  //     } else {
  //       navigation.navigate('Login');
  //       // console.log('vendor', vendor);
  //     }
  //   }, 2000);
  // }, [vendor]);

  // const vendorData = AsyncStorage.getItem('vendor');

  // console.log('is vendor in AsyncStorage:', vendorData);

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
            fontFamily: 'Montserrat-SemiBold',
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
