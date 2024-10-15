import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {apiUrl} from '../../api-services/api-constants';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import THEMECOLOR from '../../utilities/color';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddService() {
  const route = useRoute();
  const vendorData = route.params?.vendorData || {};
  const navigation = useNavigation();

  // console.log('vendorData in add se4vicepage', vendorData);
  const [requiredField, setRequiredField] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [isResponse, setIsResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_SERVICE_BY_SERVICENAME}/${vendorData.profession}`,
      );
      if (res.status === 200) {
        const service = res.data.service;
        // console.log('service', service);
        setRequiredField(service);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log('requiredField', requiredField);

  const extractTheRequirementFields = requiredField.requirement_fields || [];

  const handleInputChange = (parameter, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [parameter]: value,
    }));
  };

  const openLibrary = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 6, // Set selection limit to 3
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
            Alert.alert('You can only select 6 images');
          } else {
            const selectedImages = response.assets.map(asset => asset.uri);
            console.log('selectedImages', response.assets.length);
            setGalleryImages(selectedImages);
          }
        }
      },
    );
  };

  const removeImage = index => {
    const updatedImages = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updatedImages);
  };
  //   console.log('galleryImages', galleryImages);

  const addService = async () => {
    // Validate if images are selected
    // if (galleryImages.length === 0) {
    //   Alert.alert('Error', 'Please select at least one image');
    //   return;
    // }

    // Validate if required text fields are filled
    // for (let field of extractTheRequirementFields) {
    //   if (field.field_type === 'Text' && !inputValues[field.parameter]) {
    //     Alert.alert('Error', `Please fill in the ${field.parameter} field`);
    //     return;
    //   }
    // }

    setIsResponse(true);

    try {
      // Create FormData object to hold additional services and images
      const formData = new FormData();

      // Append the additional services as a JSON string
      formData.append('additional_services', JSON.stringify(inputValues));

      // Append the images to the formData object
      galleryImages.forEach((uri, index) => {
        formData.append('additional_images', {
          uri,
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
        });
      });

      // Axios configuration
      const config = {
        url: `${apiUrl.ADD_SERVICE_ADDITIONAL_DETAILS}${vendorData._id}`, // Ensure URL is correct
        method: 'put',
        baseURL: apiUrl.BASEURL, // Ensure baseURL is set correctly
        headers: {'Content-Type': 'multipart/form-data'}, // Set headers for multipart/form-data
        data: formData,
      };

      // Make the API request
      const response = await axios(config);

      // Check the response and handle success
      if (response.status === 200) {
        Alert.alert(
          'Success',
          response.data.message || 'Services Added Successfully',
        );
        console.log('response.data', response.data);
        if (route.params?.onGoBack) {
          route.params.onGoBack(); // Call the function to refresh data
        }
        await AsyncStorage.setItem('vendor', JSON.stringify(vendorData));
        navigation.navigate('Service');
      } else {
        Alert.alert('Error', 'Error while adding product');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        if (error.response) {
          // Error response from the server
          console.error('Response data>>>:', error.response.data);
          Alert.alert(
            'Error',
            error.response.data.message || 'Error while adding product',
          );
        } else if (error.request) {
          // No response received from server
          console.error('Request data<<<<:', error.request);
          Alert.alert('Error', 'No response received from server');
        }
      } else {
        // Unknown error handling
        console.error('Unknown error:', error);
        Alert.alert('Error', 'An unknown error occurred');
      }
    } finally {
      // Reset the response state after completion
      setIsResponse(false);
    }
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 13,
          paddingHorizontal: 10,
          flexDirection: 'row',
          elevation: 2,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginTop: 2}}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#111111" />
        </TouchableOpacity>
        <Text
          style={{fontSize: 18, fontFamily: 'Montserrat-Bold', color: 'black'}}>
          {' '}
          Add Service
        </Text>
      </View>
      <View style={{padding: 15, marginTop: 10}}>
        <ScrollView>
          {vendorData && vendorData?.additional_images?.length === 0 && (
            <>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    marginBottom: 4,
                    color: 'black',
                    // letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Upload {vendorData?.profession} / your service related image
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginBottom: 4,
                    color: '#f44336',
                    marginTop: 2,
                    // letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {' '}
                  (max 6 image)
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#dddddd',
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={openLibrary}>
                  <AntDesign name="plus" size={20} color="#313131" />
                </TouchableOpacity>
                <ScrollView
                  horizontal
                  style={{marginLeft: 10, flex: 1}}
                  contentContainerStyle={{alignItems: 'center'}}>
                  {galleryImages.map((uri, index) => (
                    <>
                      <View
                        key={index}
                        style={{
                          position: 'relative',
                          width: 100,
                          height: 100,
                          marginLeft: 10,
                        }}>
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            zIndex: 1,
                          }}
                          onPress={() => removeImage(index)}>
                          <AntDesign
                            name="closecircle"
                            size={20}
                            color="black"
                          />
                        </TouchableOpacity>
                        <Image
                          key={index}
                          source={{uri}}
                          style={{
                            resizeMode: 'cover',
                            width: 100,
                            height: 100,
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    </>
                  ))}
                </ScrollView>
              </View>
            </>
          )}
          {vendorData && vendorData?.additional_services?.length === 0 && (
            <View style={{marginTop: 15}}>
              {extractTheRequirementFields.map((fields, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      marginBottom: 5,
                      fontFamily: 'Montserrat-Medium',
                      flex: 0.5,
                    }}>
                    {fields.parameter}
                  </Text>

                  <TextInput
                    placeholderTextColor="#757575"
                    placeholder={`Enter ${fields.parameter}`}
                    value={inputValues[fields.parameter] || ''}
                    onChangeText={val =>
                      handleInputChange(fields.parameter, val)
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#d5d5d5',
                      color: 'black',
                      fontSize: 14,
                      flex: 0.5,
                      borderRadius: 10,
                      paddingLeft: 15,
                      backgroundColor: 'white',
                      marginBottom: 10,
                      fontFamily: 'Montserrat-Medium',
                    }}
                  />

                  {/* {(fields.field_type === 'Date' || fields.field_type === 'Time') && (
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  borderWidth: 1,
                  borderColor: '#d5d5d5',
                  borderRadius: 10,
                  padding: 13,
                }}
                onPress={() => handleDateChange(fields)}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',
                    color: 'black',
                  }}>
                  {selectedValues[fields.parameter]
                    ? fields.field_type === 'Date'
                      ? formatDate(selectedValues[fields.parameter])
                      : formatTime(selectedValues[fields.parameter])
                    : fields.field_type === 'Date'
                    ? 'Select Date'
                    : 'Select Time'}
                </Text>
              </TouchableOpacity>
            )} */}
                </View>
              ))}
            </View>
          )}
          <View style={{marginHorizontal: 70, marginTop: 20}}>
            <TouchableOpacity
              style={{
                backgroundColor: THEMECOLOR.mainColor,
                paddingVertical: 10,
                borderRadius: 10,
                // marginHorizontal: 100,
                marginTop: 20,
              }}
              onPress={addService}>
              {isResponse ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text
                  style={{
                    color: THEMECOLOR.textColor,
                    fontSize: 14,
                    textAlign: 'center',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Add Service
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size={30} color="#111111" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
