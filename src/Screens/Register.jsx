import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {Checkbox} from 'react-native-paper';
import THEMECOLOR from '../utilities/color';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../api-services/api-constants';
import {useNavigation} from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [profession, setProfession] = useState('');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('');
  const [findServiceCategory, setFindServiceCategory] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [serviceCategoryList, setServiceCategoryList] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [vendorData, setVendorData] = useState({});
  const [hasNavigated, setHasNavigated] = useState(false);

  const fetchData = async () => {
    try {
      const serviceRes = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_ALL_SERVICE}`,
      );
      if (serviceRes.status === 200) {
        setServiceList(serviceRes.data.data);
      }
      const serviceCategoryRes = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_ALL_SUB_SERVICE}`,
      );
      if (serviceCategoryRes.status === 200) {
        setServiceCategoryList(serviceCategoryRes.data.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (profession) {
      const filteredCategories = serviceCategoryList.filter(
        item => item.service_name === profession,
      );
      setFindServiceCategory(filteredCategories);
    }
  }, [profession, serviceCategoryList]);

  const handleSubmit = async () => {
    if (!name || !mobileNumber || !profession || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    try {
      const config = {
        url: apiUrl.VENDOR_REGISTER,
        method: 'post',
        baseURL: apiUrl.BASEURL,
        headers: {'Content-Type': 'application/json'},
        data: {
          vendor_name: name,
          mobile_number: mobileNumber,
          profession: profession,
          profession_category: selectedServiceCategory,
          email: email,
          password: password,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        console.log('New Vendor Data:', response.data.newVendor);
        Alert.alert('Success', response.data.message);
        setVendorData(response.data.newVendor);
        const service = response.data.newVendor
          ? response.data.newVendor.profession
          : '';
        // console.log('serviceName', service);

        // if (response.data.newVendor.profession === 'Vendor & Seller') {
        //   navigation.navigate('AddShopDetails', {
        //     vendorData: response.data.newVendor,
        //   });
        // }
        if (service === 'Vendor & Seller') {
          navigation.navigate('AddShopDetails', {
            vendorData: response.data.newVendor,
          });
        } else {
          setServiceName(service);
          await fetchServerRes();
        }
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
  // useEffect(() => {
  //   console.log('Current serviceName in useEffect:', serviceName);
  //   if (serviceName && serviceName !== 'Vendor & Seller' && !hasNavigated) {
  //     fetchServerRes();
  //   }
  // }, [serviceName]);

  const fetchServerRes = async () => {
    try {
      if (!serviceName) {
        console.log('Error: serviceName is undefined');
        return;
      }

      const res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_SERVICE_BY_SERVICENAME}/${serviceName}`,
      );
      if (res.status === 200) {
        const service = res.data.service;
        if (service.requirement_fields?.length > 0) {
          navigation.navigate('Service People', {
            serverResponse: service,
            vendorData: vendorData,
          });
          // setHasNavigated(true); // Prevent further navigation
        } else {
          await AsyncStorage.setItem('vendor', JSON.stringify(vendorData));
          navigation.navigate('Waiting');
          // setHasNavigated(true); // Prevent further navigation
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  useEffect(() => {
    if (serviceName && serviceName !== 'Vendor & Seller') {
      fetchServerRes();
    }
  }, [serviceName]);
  console.log('serviceName', serviceName);

  // const handleOTP = () => {
  //   // alert('Registration successful! Please login');
  //   navigation.navigate('AddShopDetails', {number: mobileNumber});
  // };
  return (
    <>
      <ScrollView>
        <View
          style={{
            padding: 15,
            backgroundColor: 'white',
            height: '100%',
            paddingTop: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: THEMECOLOR.mainColor,
              marginBottom: 10,
              // letterSpacing: 1,
              fontFamily: 'Montserrat-Medium',
            }}>
            Sign up
          </Text>

          <Text
            style={{
              color: 'black',
              fontSize: 14,
              marginBottom: 5,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
            }}>
            Name
          </Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Enter name"
            value={name}
            onChangeText={val => setName(val)}
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
            }}>
            Profession
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#d5d5d5',
              // height: 55,
              borderRadius: 10,
              marginBottom: 10,
              paddingHorizontal: 5,
            }}>
            <Picker
              itemStyle={{backgroundColor: 'white'}}
              selectedValue={profession}
              onValueChange={value => {
                setProfession(value);
              }}>
              <Picker.Item
                label="Select profession"
                value=""
                style={{
                  backgroundColor: 'white',
                  color: '#757575',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Regular',
                }}
              />
              {serviceList.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.service_name}
                  value={item.service_name}
                  style={{
                    color: 'black',
                    fontSize: 14,
                    backgroundColor: 'white',
                    fontFamily: 'Montserrat-Regular',
                  }}
                />
              ))}
            </Picker>
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              marginBottom: 5,
              fontFamily: 'Montserrat-Medium',
            }}>
            Category
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#d5d5d5',
              // height: 55,
              borderRadius: 10,
              marginBottom: 10,
              paddingHorizontal: 5,
            }}>
            <Picker
              // Use board.category
              itemStyle={{backgroundColor: 'white'}}
              selectedValue={selectedServiceCategory}
              onValueChange={
                cteItem => setSelectedServiceCategory(cteItem) // Pass the index and new value
              }>
              <Picker.Item
                label="Select Category"
                value=""
                style={{
                  backgroundColor: 'white',
                  color: '#757575',
                  fontSize: 14,
                  fontFamily: 'Montserrat-Regular',
                  // letterSpacing: 1,
                }}
              />
              {findServiceCategory.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.sub_service_name}
                  value={item.sub_service_name}
                  style={{
                    color: 'black',
                    fontSize: 14,
                    backgroundColor: 'white',
                    fontFamily: 'Montserrat-Regular',
                    // letterSpacing: 1,
                  }}
                />
              ))}
            </Picker>
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
              marginBottom: 5,
            }}>
            Phone number
          </Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Enter phone number"
            value={mobileNumber}
            maxLength={10}
            onChangeText={val => setMobileNumber(val)}
            keyboardType="number-pad"
            style={{
              borderWidth: 1,
              borderColor: '#d5d5d5',
              color: 'black',
              fontSize: 14,
              borderRadius: 10,
              paddingLeft: 15,
              backgroundColor: 'white',
              marginBottom: 15,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
              marginBottom: 5,
            }}>
            Email id
          </Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Enter email id"
            value={email}
            onChangeText={val => setEmail(val.toLowerCase())}
            keyboardType="email-address"
            style={{
              borderWidth: 1,
              borderColor: '#d5d5d5',
              color: 'black',
              fontSize: 14,
              borderRadius: 10,
              paddingLeft: 15,
              backgroundColor: 'white',
              marginBottom: 15,
              fontFamily: 'Montserrat-Medium',
            }}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
              marginBottom: 5,
            }}>
            Password
          </Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Enter password"
            value={password}
            // maxLength={10}
            onChangeText={val => setPassword(val)}
            // keyboardType="number-pad"
            style={{
              borderWidth: 1,
              borderColor: '#d5d5d5',
              color: 'black',
              fontSize: 14,
              borderRadius: 10,
              paddingLeft: 15,
              backgroundColor: 'white',
              marginBottom: 15,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
            }}
          />
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
              elevation: 3,
              marginHorizontal: 50,
            }}
            onPress={handleSubmit}>
            <Text
              style={{
                color: THEMECOLOR.textColor,
                fontSize: 14,
                textAlign: 'center',
                fontFamily: 'Montserrat-Medium',
              }}>
              Add Bussiness Details{' '}
              <AntDesign name="arrowright" size={14} color="black" />
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

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 13,
                fontFamily: 'Montserrat-Medium',
              }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text
                style={{
                  color: THEMECOLOR.mainColor,
                  fontSize: 13,
                  fontFamily: 'Montserrat-Medium',
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
