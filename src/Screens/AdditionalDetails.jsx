import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {apiUrl} from '../api-services/api-constants';
import axios from 'axios';
import THEMECOLOR from '../utilities/color';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {IconButton, Tooltip} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AdditionalDetails = () => {
  const route = useRoute();
  const vendorData = route.params?.vendorData || {};
  const navigation = useNavigation();
  console.log('vendor in ADD IMAGE SCREEN', vendorData);
  const [logoOrImageFileName, setLogoOrImageFileName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = () => {
    setShowInfo(prev => !prev);
  };

  const openLibrary = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 5, // Set selection limit to 3
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else if (response.assets) {
          if (response.assets.length > 6) {
            Alert.alert('You can only select 5 images');
          } else {
            const selectedImages = response.assets.map(asset => asset.uri);
            console.log('selectedImages', response.assets.length);
            setLogoOrImageFileName(selectedImages);
          }
        }
      },
    );
  };

  const handleAdditionalDetails = async () => {
    const formData = new FormData();
    formData.append('gst_number', gstNumber);
    formData.append('pan_number', panNumber);
    if (Array.isArray(logoOrImageFileName)) {
      logoOrImageFileName.forEach((uri, index) => {
        formData.append('images', {
          uri,
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
        });
      });
    }

    try {
      const response = await axios.put(
        `${apiUrl.BASEURL}${apiUrl.SERVICE_ADDITIONAL_DETAILS}/${vendorData._id}`,
        formData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );
      console.log('response', response.data);

      if (response.status === 200) {
        Alert.alert('Success', response.data.message);
        console.log('SERVER RESPONSE DATA', response.data.vendor);
        navigation.navigate('AddShopAddress', {
          vendorData: response.data.vendor,
        });
      }
    } catch (error) {
      console.log('Unknown error:', error);
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: 'white',
        height: '100%',
        paddingTop: 20,
      }}>
      <ScrollView>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
            marginBottom: 10,
            textDecorationColor: 'black',
            textDecorationLine: 'underline',
            // letterSpacing: 1,
            color: 'black',
          }}>
          Additional details
        </Text>

        <View
          style={{
            marginBottom: 15,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
              }}>
              Additional Images{' '}
            </Text>
            <AntDesign
              name="infocirlce"
              size={9}
              color="black"
              onPress={toggleInfo}
            />
          </View>
          {showInfo && (
            <Text
              style={{
                color: 'blue',
                fontFamily: 'Montserrat-Medium',
                fontSize: 9,
                position: 'relative',
                // top: -17,
              }}>
              Add your business related images upto 5
            </Text>
          )}
          <TouchableOpacity onPress={openLibrary}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginLeft: 5,
                fontFamily: 'Montserrat-Medium',
                marginTop: 10,
              }}>
              {logoOrImageFileName ? (
                logoOrImageFileName
              ) : (
                <>
                  <Feather name="upload" size={17} color="black" /> Upload
                </>
              )}
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
            marginTop: 5,
            marginBottom: 10,
          }}>
          Documents
        </Text>
        <View style={{marginBottom: 10}}>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="GST number (optional)"
            value={gstNumber}
            onChangeText={val => setGstNumber(val)}
            style={{
              borderWidth: 1,
              borderColor: '#d5d5d5',
              color: 'black',
              fontSize: 14,
              borderRadius: 10,
              paddingLeft: 15,
              backgroundColor: 'white',
              fontFamily: 'Montserrat-Medium',
            }}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="PAN number (optional)"
            value={panNumber}
            onChangeText={val => setPanNumber(val)}
            style={{
              borderWidth: 1,
              borderColor: '#d5d5d5',
              color: 'black',
              fontSize: 14,
              borderRadius: 10,
              paddingLeft: 15,
              backgroundColor: 'white',
              fontFamily: 'Montserrat-Medium',
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            paddingVertical: 10,
            borderRadius: 10,
            marginHorizontal: 100,
            marginTop: 20,
          }}
          onPress={handleAdditionalDetails}>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              fontSize: 14,
              textAlign: 'center',
              fontFamily: 'Montserrat-Medium',
            }}>
            Add Address
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 20,
          }}
          onPress={() =>
            navigation.navigate('AddShopAddress', {
              vendorData: vendorData,
            })
          }>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              fontSize: 14,
              textAlign: 'center',
              fontFamily: 'Montserrat-Medium',
              textDecorationLine: 'underline',
              textDecorationColor: 'black',
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AdditionalDetails;
