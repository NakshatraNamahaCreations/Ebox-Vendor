import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
// import {Checkbox} from 'react-native-paper';
import THEMECOLOR from '../utilities/color';
// import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {RadioButton} from 'react-native-paper';
import {apiUrl} from '../api-services/api-constants';
import axios from 'axios';

export default function AddShopDetails({navigation, route}) {
  const {vendor} = route.params;
  // console.log('response data from reguter page to addshop details>>', vendor);
  const [businessName, setBusinessName] = useState('');
  const [godownName, setGodownName] = useState('');
  const [godownLink, setGodownLink] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  // const [imageUri, setImageUri] = useState('');
  // const [imageFileName, setImageFileName] = useState('');
  const [logoOrImageUri, setLogoOrImageUri] = useState('');
  const [logoOrImageFileName, setLogoOrImageFileName] = useState('');
  const [vehicleUri, setVehicleUri] = useState('');
  const [vehicleFileName, venhicleFileName] = useState('');
  const [checked, setChecked] = useState('');
  // console.log('checked', checked);

  const resizeImage = async imageUri => {
    const resizedImage = await ImageResizer.createResizedImage(
      imageUri,
      800,
      600,
      'JPEG',
      80,
      0,
    );
    return resizedImage.uri;
  };

  // const uploadBussinessImage = () => {
  //   ImagePicker.launchImageLibrary({noData: true}, async response => {
  //     if (response.assets) {
  //       console.log('Gellery image:', response);
  //       const fileNAME = response.assets[0].fileName;
  //       const galleryPic = response.assets[0].uri;
  //       const resizedImageUri = await resizeImage(galleryPic);
  //       setImageUri(resizedImageUri);
  //       setImageFileName(fileNAME);
  //     }
  //   });
  // };

  const uploadBussinessLogo = () => {
    ImagePicker.launchImageLibrary({noData: true}, async response => {
      if (response.assets) {
        console.log('Gellery image:', response);
        const fileNAME = response.assets[0].fileName;
        const galleryPic = response.assets[0].uri;
        const resizedImageUri = await resizeImage(galleryPic);
        setLogoOrImageUri(resizedImageUri);
        setLogoOrImageFileName(fileNAME);
      }
    });
  };

  const uploadVehicleImage = () => {
    ImagePicker.launchImageLibrary({noData: true}, async response => {
      if (response.assets) {
        console.log('Gellery image:', response);
        const fileNAME = response.assets[0].fileName;
        const galleryPic = response.assets[0].uri;
        const resizedImageUri = await resizeImage(galleryPic);
        setVehicleUri(resizedImageUri);
        venhicleFileName(fileNAME);
      }
    });
  };

  // console.log('imageUri', imageUri, imageFileName);

  // const handleAddShopDetails = () => {
  //   if (
  //     !businessName ||
  //     !gstNumber ||
  //     !logoOrImageFileName ||
  //     !vehicleFileName
  //   ) {
  //     alert('Please fill all the fields');
  //   } else {
  //     // alert('Registration successful! Please login');
  //     navigation.navigate('AddShopAddress', {
  //       vendorId: vendor._id,
  //       businessName: businessName,
  //       godownName: godownName,
  //       godownLink: godownLink,
  //       gstNumber: gstNumber,
  //       panNumber: panNumber,
  //       vehicleType: vehicleType,
  //       numberPlate: numberPlate,
  //       // imageFileName: imageFileName,
  //       // imageUri: imageUri,
  //       // logoOrImageUri: logoOrImageUri,
  //       logoOrImageFileName: logoOrImageFileName,
  //       // vehicleUri: vehicleUri,
  //       vehicleFileName: vehicleFileName,
  //       checked: checked,
  //     });
  //   }
  // };

  // const handleAddShopDetails = async () => {
  //   if (
  //     !businessName ||
  //     !gstNumber ||
  //     !logoOrImageFileName ||
  //     !vehicleFileName
  //   ) {
  //     Alert.alert('Please fill all the fields');
  //   } else {
  //     formData.append('shop_name', businessName);
  //     formData.append('godown_name', godownName);
  //     formData.append('godown_pin', godownLink);
  //     formData.append('gst_number', gstNumber);
  //     formData.append('pan_number', panNumber);
  //     formData.append('vehicle_name', vehicleType);
  //     formData.append('number_plate', numberPlate);
  //     formData.append('vehicle_by', checked);
  //     formData.append('shop_image_or_logo', {
  //       uri: logoOrImageFileName,
  //       type: 'image/jpeg',
  //       name: 'image.jpg',
  //     });
  //     formData.append('vehicle_image', {
  //       uri: vehicleFileName,
  //       type: 'image/jpeg',
  //       name: 'image.jpg',
  //     });
  //     try {
  //       const config = {
  //         url: `${apiUrl.UPDATE_VENDOR_PROFILE}${vendor._id}`,
  //         method: 'put',
  //         baseURL: apiUrl.BASEURL,
  //         headers: {'Content-Type': 'multipart/form-data'},
  //         data: formData,
  //       };
  //       const response = await axios(config);
  //       if (response.status === 200) {
  //         Alert.alert('Success', response.data.message);
  //         console.log('AsyncStorage', response.data);
  //         // AsyncStorage.setItem('token', response.data.newVendor);
  //         // await AsyncStorage.setItem(
  //         //   'vendor',
  //         //   JSON.stringify(response.data.),
  //         // );
  //         // navigation.navigate('Waiting');
  //       }
  //     } catch (error) {
  //       console.log('Unknown error:', error);
  //       if (error.response && error.response.data) {
  //         Alert.alert('Error', error.response.data.message);
  //       } else {
  //         Alert.alert('Error', 'An unknown error occurred');
  //       }
  //     }
  //   }
  // };

  const handleAddShopDetails = async () => {
    if (
      !businessName ||
      !gstNumber ||
      !logoOrImageFileName ||
      !vehicleFileName
    ) {
      Alert.alert('Please fill all the fields');
    } else {
      const formData = new FormData(); // Make sure to create `formData` before using it.
      formData.append('shop_name', businessName);
      formData.append('godown_name', godownName);
      formData.append('godown_pin', godownLink);
      formData.append('gst_number', gstNumber);
      formData.append('pan_number', panNumber);
      formData.append('vehicle_name', vehicleType);
      formData.append('number_plate', numberPlate);
      formData.append('vehicle_by', checked);
      formData.append('shop_image_or_logo', {
        uri: logoOrImageFileName,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      formData.append('vehicle_image', {
        uri: vehicleFileName,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      try {
        const response = await axios.put(
          `${apiUrl.BASEURL}${apiUrl.UPDATE_VENDOR_PROFILE}${vendor._id}`,
          formData,
          {
            headers: {'Content-Type': 'multipart/form-data'},
          },
        );

        if (response.status === 200) {
          Alert.alert('Success', response.data.message);
          console.log('AsyncStorage', response.data.vendor);
        }
      } catch (error) {
        console.log('Unknown error:', error);
        if (error.response && error.response.data) {
          Alert.alert('Error', error.response.data.message);
        } else {
          Alert.alert('Error', 'An unknown error occurred');
        }
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
            // letterSpacing: 1,
            color: 'black',
          }}>
          Bussiness Details
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            marginBottom: 5,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}>
          Business Name
        </Text>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Enter business name"
          value={businessName}
          onChangeText={val => setBusinessName(val)}
          style={{
            borderWidth: 1,
            borderColor: '#d5d5d5',
            color: 'black',
            fontSize: 14,
            borderRadius: 10,
            paddingLeft: 15,
            backgroundColor: 'white',
            marginBottom: 10,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}
        />
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <View style={{flex: 0.6, marginRight: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              Godown Name
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="Godown Name"
              value={godownName}
              // maxLength={10}
              onChangeText={val => setGodownName(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View style={{flex: 0.6, marginLeft: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              <Ionicons name="location" size={15} color="black" /> Godown Pin
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="Google map link"
              value={godownLink}
              // maxLength={10}
              onChangeText={val => setGodownLink(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
          }}>
          <View style={{flex: 0.6}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                // marginBottom: 5,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}>
              Business Image
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              marginLeft: 2,
              // alignItems: 'flex-start',
              // justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={uploadBussinessImage}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {imageFileName ? (
                  imageFileName
                ) : (
                  <>
                    <Feather name="upload" size={25} color="black" /> Upload
                    Image
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
          }}>
          <View style={{flex: 0.6}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                // marginBottom: 5,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}>
              Business or shop Image/Logo
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              marginLeft: 2,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={uploadBussinessLogo}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {logoOrImageFileName ? (
                  logoOrImageFileName
                ) : (
                  <>
                    <Feather name="upload" size={25} color="black" /> Upload
                    Logo
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
            // letterSpacing: 1,
            marginTop: 5,
            marginBottom: 10,
          }}>
          Documents
        </Text>

        {/* <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'center',
          }}> */}
        <View style={{marginBottom: 10}}>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="GST number"
            value={gstNumber}
            // maxLength={10}
            onChangeText={val => setGstNumber(val)}
            // keyboardType="number-pad"
            style={{
              borderWidth: 1,
              // width: '100%',
              borderColor: '#d5d5d5',
              color: 'black',
              fontSize: 14,
              borderRadius: 10,
              paddingLeft: 15,
              backgroundColor: 'white',
              // marginBottom: 10,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
            }}
          />
        </View>
        {/* <View
            style={{
              flex: 0.6,
              marginLeft: 2,
              // alignItems: 'flex-start',
              // justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={uploadGSTCert}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {gstFileName ? (
                  gstFileName
                ) : (
                  <>
                    <Feather name="upload" size={25} color="black" /> Upload GST
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <View
          style={{
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
          }}> */}
        <View style={{marginBottom: 10}}>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="PAN number (optional)"
            value={panNumber}
            // maxLength={10}
            onChangeText={val => setPanNumber(val)}
            // keyboardType="number-pad"
            style={{
              borderWidth: 1,
              // width: '100%',
              borderColor: '#d5d5d5',
              color: 'black',
              fontSize: 14,
              borderRadius: 10,
              paddingLeft: 15,
              backgroundColor: 'white',
              // marginBottom: 10,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
            }}
          />
        </View>
        {/* <View
            style={{
              flex: 0.6,
              marginLeft: 2,
              // alignItems: 'flex-start',
              // justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={uploadGSTCert}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {gstFileName ? (
                  gstFileName
                ) : (
                  <>
                    <Feather name="upload" size={25} color="black" /> Upload PAN
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
            marginBottom: 5,
          }}>
          Aadhaar Number
        </Text> */}
        {/* <TextInput
          placeholderTextColor="#757575"
          placeholder="Enter aadhaar number"
          // value={mobileNumber}
          // maxLength={10}
          onChangeText={val => setMobileNumber(val)}
          // keyboardType="number-pad"
          style={{
            borderWidth: 1,
            // width: '100%',
            borderColor: '#d5d5d5',
            color: 'black',
            fontSize: 14,
            borderRadius: 10,
            paddingLeft: 15,
            backgroundColor: 'white',
            marginBottom: 10,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}
        /> */}
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
            // letterSpacing: 1,
            marginTop: 5,
            marginBottom: 10,
          }}>
          Vehicle
        </Text>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
          }}>
          <RadioButton
            value="own"
            status={checked === 'own' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('own')}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              marginTop: 7,
            }}>
            Own Vehicle
          </Text>
          <RadioButton
            value="others"
            status={checked === 'others' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('others')}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              marginTop: 7,
            }}>
            Other's Vehicle
          </Text>
          {/* </View> */}
        </View>
        <View
          style={{
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
              marginBottom: 5,
            }}>
            Vehicle Type
          </Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="e.g. Tata Ace EV"
            value={vehicleType}
            // maxLength={10}
            onChangeText={val => setVehicleType(val)}
            // keyboardType="number-pad"
            style={{
              borderWidth: 1,
              // width: '100%',
              borderColor: '#d5d5d5',
              color: 'black',
              fontSize: 14,
              borderRadius: 10,
              paddingLeft: 15,
              backgroundColor: 'white',
              // marginBottom: 10,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <View style={{flex: 0.6}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              Vehicle Number Plate
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="Enter number plate"
              value={numberPlate}
              // maxLength={10}
              onChangeText={val => setNumberPlate(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                // marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              marginLeft: 2,
              marginTop: 10,
              // alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={uploadVehicleImage}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {vehicleFileName ? (
                  vehicleFileName
                ) : (
                  <>
                    <Feather name="upload" size={25} color="black" /> Vehicle
                    Image
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text
        style={{
          color: THEMECOLOR.helperTextGray,
          fontSize: 16,
          marginBottom: 5,
          textAlign: 'center',
        }}>
        You will get OTP on this number
      </Text> */}
        <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            paddingVertical: 10,
            borderRadius: 10,
            // elevation: 3,
            marginHorizontal: 100,
            marginTop: 20,
          }}
          onPress={handleAddShopDetails}>
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
        {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />

        <Text
          style={{
            color: 'black',
            fontSize: 12,
            fontFamily: 'Montserrat-Regular',
            marginLeft: 10,
          }}>
          By sign up, you are agree out terms of condition{' '}
        </Text>
      </View> */}
      </ScrollView>
    </View>
  );
}
