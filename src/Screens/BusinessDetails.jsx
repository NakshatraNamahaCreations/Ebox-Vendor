import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import THEMECOLOR from '../utilities/color';
import {apiUrl} from '../api-services/api-constants';
import axios from 'axios';
import moment from 'moment';

export default function BusinessDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const serviceRes = route.params?.serverResponse || {};
  const vendorData = route.params?.vendorData || {};
  console.log('vendorData in business detailed page', vendorData);
  console.log('serviceRes in business detailed page', serviceRes);

  const [businessName, setBusinessName] = useState('');
  const [logoOrImageUri, setLogoOrImageUri] = useState('');
  const [logoOrImageFileName, setLogoOrImageFileName] = useState('');
  const [businessExperience, setBusinessExperience] = useState('');
  const [yearOfEstablishment, setYearOfEstablishment] = useState('');
  const [website, setWebsite] = useState('');
  const [gstNumber, setGSTNumber] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // State to manage the start and end times for each day
  const [businessHours, setBusinessHours] = useState({
    Monday: {start: null, end: null},
    Tuesday: {start: null, end: null},
    Wednesday: {start: null, end: null},
    Thursday: {start: null, end: null},
    Friday: {start: null, end: null},
    Saturday: {start: null, end: null},
    Sunday: {start: null, end: null},
  });

  const showTimePicker = (day, isStart) => {
    setCurrentDay(day);
    if (isStart) {
      setStartTimePickerVisible(true);
    } else {
      setEndTimePickerVisible(true);
    }
  };

  const handleConfirm = (selectedTime, isStart) => {
    setBusinessHours(prevHours => ({
      ...prevHours,
      [currentDay]: {
        ...prevHours[currentDay],
        ...(isStart ? {start: selectedTime} : {end: selectedTime}),
      },
    }));
    if (isStart) {
      setStartTimePickerVisible(false);
    } else {
      setEndTimePickerVisible(false);
    }
  };
  const asterisk = () => <Text style={{color: '#f44336'}}>*</Text>;

  console.log('businessHours', businessHours);

  const handleSubmit = async () => {
    if (
      !businessName ||
      !logoOrImageUri ||
      !businessExperience ||
      !yearOfEstablishment
    ) {
      Alert.alert('Alert', 'Fill all mandory fields');
      return;
    }
    for (const [day, hours] of Object.entries(businessHours)) {
      if (!hours.start || !hours.end) {
        Alert.alert('Error', `Please fill in the working hours for ${day}.`);
        return;
      }
    }
    setLoading(true);

    const businessHoursArray = daysOfWeek.map(day => ({
      day: day,
      start_time: moment(businessHours[day].start).format('LT'),
      end_time: moment(businessHours[day].end).format('LT'),
    }));

    try {
      const vendorId = vendorData._id;
      const formData = new FormData();
      formData.append('shop_name', businessName);
      formData.append('shop_image_or_logo', {
        uri: logoOrImageUri,
        type: 'image/jpeg',
        name: logoOrImageFileName || 'image.jpg',
      });
      formData.append('experience_in_business', businessExperience);
      formData.append('year_of_establishment', yearOfEstablishment);
      formData.append('website_url', website);
      formData.append('gst_number', gstNumber);
      formData.append('business_hours', JSON.stringify(businessHoursArray));
      const config = {
        url: `${apiUrl.BASEURL}${apiUrl.ADD_SERVICE_USER_BUSINESS_DETAILS}${vendorId}`,
        method: 'put',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData,
      };
      const response = await axios(config);
      if (response.status === 200) {
        Alert.alert('Success', 'Business details updated successfully!');
        // console.log('response', response.data.data);
        // const vendorData = response.data.data;
        // console.log('vendorData in service poeple requrement', vendorData);

        navigation.navigate('AddShopAddress', {
          vendorData: vendorData,
        });
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'Failed to update vendor details');
    } finally {
      setLoading(false);
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
          }}>
          Business/Service Name {asterisk()}
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
            // marginBottom: 10,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
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
              Business or shop Image/Logo {asterisk()}
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
            fontSize: 14,
            marginBottom: 5,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}>
          Experience in Business {asterisk()}
        </Text>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Enter experiences in the field"
          keyboardType="numeric"
          value={businessExperience}
          onChangeText={val => setBusinessExperience(val)}
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
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            marginBottom: 5,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}>
          Year of Establishment {asterisk()}
        </Text>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Enter year of establishment"
          keyboardType="numeric"
          value={yearOfEstablishment}
          onChangeText={val => setYearOfEstablishment(val)}
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
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            marginBottom: 5,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}>
          Website
        </Text>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Website URL (optional)"
          value={website}
          onChangeText={val => setWebsite(val)}
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
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            marginBottom: 5,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}>
          GSTIN
        </Text>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="GST Number"
          value={gstNumber}
          onChangeText={val => setGSTNumber(val)}
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
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            marginBottom: 5,
            fontFamily: 'Montserrat-Medium',
            marginBottom: 10,
          }}>
          Business Hours {asterisk()}
        </Text>
        <View>
          {daysOfWeek.map(day => (
            <View key={day} style={styles.dayContainer}>
              <Text style={styles.dayText}>{day}</Text>
              <View style={styles.timeContainer}>
                <Button
                  title={
                    businessHours[day].start
                      ? businessHours[day].start.toLocaleTimeString()
                      : 'Set Start Time'
                  }
                  onPress={() => showTimePicker(day, true)}
                />
                <Button
                  title={
                    businessHours[day].end
                      ? businessHours[day].end.toLocaleTimeString()
                      : 'Set End Time'
                  }
                  onPress={() => showTimePicker(day, false)}
                />
              </View>
            </View>
          ))}

          {/* Time Picker Modals */}
          <DatePicker
            modal
            open={isStartTimePickerVisible}
            date={businessHours[currentDay]?.start || new Date()}
            mode="time"
            onConfirm={date => handleConfirm(date, true)}
            onCancel={() => setStartTimePickerVisible(false)}
          />

          <DatePicker
            modal
            open={isEndTimePickerVisible}
            date={businessHours[currentDay]?.end || new Date()}
            mode="time"
            onConfirm={date => handleConfirm(date, false)}
            onCancel={() => setEndTimePickerVisible(false)}
          />
        </View>
        <View>
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
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text
                style={{
                  color: THEMECOLOR.textColor,
                  fontSize: 14,
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Medium',
                }}>
                Next
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    marginBottom: 10,
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: 'black',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
