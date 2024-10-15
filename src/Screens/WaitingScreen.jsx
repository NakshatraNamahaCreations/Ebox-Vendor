import {View, Text, Image, BackHandler, Alert, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import THEMECOLOR from '../utilities/color';
import {apiUrl} from '../api-services/api-constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WaitingScreen({navigation}) {
  const [isApproved, setIsApproved] = useState(false);
  const [vendor, setVendor] = useState(null);

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
  }, []);
  console.log('vendor on asyncstorage in waiting screen', vendor);

  useEffect(() => {
    const checkApprovalStatus = async () => {
      const userData = await AsyncStorage.getItem('vendor');
      if (userData) {
        const user = JSON.parse(userData);
        // Fetch the latest approval status from the server
        try {
          const response = await axios.get(
            `${apiUrl.BASEURL}${apiUrl.GET_VENDOR_PROFILE}${user._id}`,
          );
          const updatedUser = response.data;
          setIsApproved(updatedUser.is_approved);

          // Update the AsyncStorage with the latest user data
          if (updatedUser.is_approved) {
            await AsyncStorage.setItem('vendor', JSON.stringify(updatedUser));
          }
          // if (updatedUser.is_approved) {
          //   // Enable the button if approved
          //   setIsApproved(true);
          // } else {
          //   // Stay on this screen if not approved
          //   setIsApproved(false);
          // }
        } catch (error) {
          console.error('Error checking approval status:', error);
        }
      }
    };

    // Check approval status on component mount
    checkApprovalStatus();

    // Optional: Polling to check approval status periodically
    const interval = setInterval(checkApprovalStatus, 5000); // every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'AsyncStorage successfully cleared!');
      navigation.navigate('Login');
    } catch (e) {
      Alert.alert('Error', 'Failed to clear AsyncStorage');
      console.error(e);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert(
          'Exit App',
          'Do you want to exit the app?',
          [
            {text: 'Cancel', onPress: () => null, style: 'cancel'},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: false},
        );
        return true;
      },
    );

    // Clean up the event listener
    return () => backHandler.remove();
  }, []);

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
      <View style={{position: 'absolute', bottom: 40, width: '50%'}}>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
        <Button
          title="Continue"
          onPress={() => navigation.navigate('BottomTab')}
          style={{marginBottom: 20}}
          disabled={!isApproved}
        />
        <Button title="Clear AsyncStorage" onPress={clearAsyncStorage} />
      </View>
    </View>
  );
}
