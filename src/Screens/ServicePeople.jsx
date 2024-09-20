import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {apiUrl} from '../api-services/api-constants';
import axios from 'axios';
import THEMECOLOR from '../utilities/color';
import * as ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';

const ServicePeople = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const serviceRes = route.params?.serverResponse || {};
  const vendor = route.params?.vendorData || {};
  // console.log('serviceRes in service people screen', serviceRes);
  // console.log('vendor in service people screen', vendor);
  const [inputValues, setInputValues] = useState({});
  const [fileValues, setFileValues] = useState({});
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});

  const handleDateChange = field => {
    setOpen(true);
    setSelectedField(field);
  };

  const handleConfirm = date => {
    setOpen(false);
    setDate(date);
    // Handle date or time based on field type
    if (selectedField.field_type === 'Date') {
      const formattedDate = date.toISOString(); // ISO string format
      setSelectedValues(prev => ({
        ...prev,
        [selectedField.parameter]: formattedDate,
      }));
      handleInputChange(selectedField.parameter, formattedDate); // Save selected date/time to your form state
    } else if (selectedField.field_type === 'Time') {
      const timeString = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setSelectedValues(prev => ({
        ...prev,
        [selectedField.parameter]: timeString,
      }));
      handleInputChange(selectedField.parameter, timeString); // Save selected time to your form state
    }
  };

  const formatDate = isoString => {
    const dateObj = new Date(isoString);
    return `${dateObj.toDateString()} ${dateObj.toLocaleTimeString()}`;
  };

  const formatTime = timeString => {
    return timeString; // Time is already in a readable format
  };

  const handleInputChange = (parameter, value) => {
    setInputValues(prevState => ({
      ...prevState,
      [parameter]: value, // Dynamically setting the value for each parameter
    }));
  };

  const handleFileUpload = async parameter => {
    const result = await ImagePicker.launchImageLibrary({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFileValues(prevData => ({
        ...prevData,
        [parameter]: result.uri,
      }));
    }
  };

  console.log('selectd date', date);

  // useEffect(() => {
  //   const getVendorData = async () => {
  //     try {
  //       const vendorData = await AsyncStorage.getItem('vendor');
  //       setVendorAsync(vendorData ? JSON.parse(vendorData) : null);
  //     } catch (error) {
  //       console.error('Failed to load vendor data', error);
  //     }
  //   };
  //   getVendorData();
  // }, []);

  const extractTheRequirementFields = serviceRes.requirement_fields || [];

  const handleSubmit = async () => {
    try {
      for (let field of extractTheRequirementFields) {
        if (field.field_type === 'Text' && !inputValues[field.parameter]) {
          Alert.alert('Error', `Please fill in the ${field.parameter} field`);
          return;
        }
      }
      const vendorId = vendor._id;
      console.log('inputValues inside handleSumbit', inputValues);

      const config = {
        url: `${apiUrl.BASEURL}${apiUrl.SERVICE_USER_BUSINESS}/${vendorId}`,
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        data: {
          requirement_fields: inputValues,
        },
      };

      const response = await axios(config);
      if (response.status === 200) {
        Alert.alert('Success', 'Business details updated successfully!');
        console.log('response', response.data.data);
        const vendorData = response.data.data;
        navigation.navigate('AdditionalDetails', {
          vendorData: vendorData,
        });
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'Failed to update vendor details');
    }
  };

  // const handleSubmit = async () => {
  //   // Optional: You can validate if all required fields are filled in
  //   for (let field of extractTheRequirementFields) {
  //     if (field.field_type === 'Text' && !inputValues[field.parameter]) {
  //       Alert.alert('Error', `Please fill in the ${field.parameter} field`);
  //       return;
  //     }
  //   }

  //   try {
  //     const dataToSend = {
  //       requirement_fields: {
  //         ...inputValues,
  //       },
  //       // requirement_fields: inputValues,
  //     };

  //     // Make the POST request to the backend
  //     const response = await axios.put(
  //       `${apiUrl.BASEURL}${apiUrl.SERVICE_USER_BUSINESS}/${vendor._id}`,
  //       dataToSend,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );

  //     if (response.status === 200) {
  //       Alert.alert('Success', 'Data submitted successfully!');
  //       console.log('Response from backend:', response.data);
  //     }
  //   } catch (error) {
  //     console.log('Error submitting data:', error);
  //     Alert.alert('Error', 'Failed to submit data to the backend');
  //   }
  // };

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
          Add Bussiness Details
        </Text>
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
            {fields.field_type === 'Text' && (
              <TextInput
                placeholderTextColor="#757575"
                placeholder={`Enter ${fields.parameter}`}
                value={inputValues[fields.parameter] || ''}
                onChangeText={val => handleInputChange(fields.parameter, val)}
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
            )}
            {(fields.field_type === 'Date' || fields.field_type === 'Time') && (
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  borderWidth: 1,
                  borderColor: '#d5d5d5',
                  borderRadius: 10,
                  padding: 13,
                }}
                onPress={() => handleDateChange(fields)}>
                <Text style={{fontSize: 14, fontFamily: 'Montserrat-Medium'}}>
                  {selectedValues[fields.parameter]
                    ? fields.field_type === 'Date'
                      ? formatDate(selectedValues[fields.parameter])
                      : formatTime(selectedValues[fields.parameter])
                    : fields.field_type === 'Date'
                    ? 'Select Date'
                    : 'Select Time'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <DatePicker
          modal
          mode={selectedField?.field_type === 'Date' ? 'date' : 'time'}
          open={open}
          date={date}
          onConfirm={handleConfirm}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            paddingVertical: 10,
            borderRadius: 10,
            // elevation: 3,
            marginHorizontal: 100,
            marginTop: 20,
          }}
          onPress={handleSubmit}>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              fontSize: 14,
              textAlign: 'center',
              fontFamily: 'Montserrat-Medium',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ServicePeople;
