import {Animated, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import THEMECOLOR from '../utilities/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {apiUrl} from '../api-services/api-constants';

export default function SplashScreen({navigation}) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [vendor, setVendor] = useState(null);
  const [vendorApiRes, setVendorApiRes] = useState(null);
  const [navigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();

    // Delay navigation by 10 seconds
    const timer = setTimeout(() => {
      setNavigationReady(true);
    }, 100000); // 10 seconds

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('vendor');
        if (value !== null) {
          setVendor(JSON.parse(value));
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.log('error', error);
      }
    };

    retrieveData();
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      if (vendor?._id) {
        try {
          const res = await axios.get(
            `${apiUrl.BASEURL}${apiUrl.GET_VENDOR_PROFILE}${vendor?._id}`,
          );
          if (res.status === 200) {
            const updatedUser = res.data;
            setVendorApiRes(updatedUser);
            // Update AsyncStorage with latest user data
            await AsyncStorage.setItem('vendor', JSON.stringify(updatedUser));
          } else {
            console.error(
              'Failed to fetch vendor profile:',
              res.status,
              res.statusText,
            );
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    };

    fetchData();
  }, [vendor]);

  useEffect(() => {
    if (vendor) {
      if (vendorApiRes?.is_approved === true) {
        navigation.navigate('BottomTab');
      } else {
        navigation.navigate('Waiting');
      }
    }
  }, [navigationReady, vendorApiRes, navigation]);
  // console.log('vendor in splashscreen...', vendorApiRes);
  console.log('vendor approval', vendorApiRes?.is_approved);

  // useEffect(() => {
  //   retrieveData();
  // }, []);

  // const retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('vendor');
  //     if (value !== null) {
  //       setVendor(JSON.parse(value));
  //     } else {
  //       setTimeout(() => {
  //         navigation.navigate('Login');
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   const condition = () => {
  //     if (vendor?.is_approved === true) {
  //       setTimeout(() => {
  //         navigation.navigate('BottomTab');
  //       }, 7000);
  //     } else {
  //       navigation.navigate('Waiting');
  //     }
  //   };

  //   condition();
  // }, [vendor]);

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
  // if (vendor) {
  //   setTimeout(() => {
  //     navigation.navigate('BottomTab');
  //   }, 3000);
  // }
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
