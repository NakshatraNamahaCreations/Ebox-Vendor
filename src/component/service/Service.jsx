import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {apiUrl} from '../../api-services/api-constants';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Service({vendorData}) {
  const navigation = useNavigation();
  const [vendorApiRes, setVendorApiRes] = useState(null);
  //   console.log('vendor details in service', vendorData);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_VENDOR_PROFILE}${vendorData?._id}`,
      );
      if (res.status === 200) {
        const updatedUser = res.data;
        setVendorApiRes(updatedUser);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [vendorData]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData(); // Re-fetch the data whenever the screen is focused
    });

    return unsubscribe; // Cleanup the listener on unmount
  }, [navigation]);

  console.log('vendorApiRes details in service', vendorApiRes);

  const today = new Date().toLocaleString('en-us', {weekday: 'long'});

  const extractBusinessHours = vendorApiRes?.business_hours;

  const matchDay = extractBusinessHours?.find(element => {
    return element.day === today;
  });
  const extractAdditionalServices = vendorApiRes?.additional_services;
  const extractAdditionalImages = vendorApiRes?.additional_images;
  // console.log('Matched Business Hours:', matchDay.day);

  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      {loading ? (
        <View style={styles.overlay}>
          <ActivityIndicator size={30} color="#111111" />
        </View>
      ) : (
        <>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 13,
              paddingHorizontal: 10,
              elevation: 2,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Montserrat-Bold',
                color: 'black',
              }}>
              My Services
            </Text>
          </View>
          <ScrollView>
            <View style={{padding: 15}}>
              {extractAdditionalImages?.length === 0 ||
              extractAdditionalServices?.length === 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddService', {
                      vendorData: vendorApiRes,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 14,
                      marginBottom: 4,
                      color: 'black',
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    <AntDesign name="pluscircle" size={15} color="#313131" />{' '}
                    Add Service
                  </Text>
                </TouchableOpacity>
              ) : null}
              <View style={{marginTop: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.7}}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#20c5ad',
                      }}>
                      {vendorApiRes?.profession}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        marginTop: 3,
                        fontFamily: 'Montserrat-SemiBold',
                        color: 'black',
                      }}>
                      {vendorApiRes?.shop_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#4e4e4e',
                        marginTop: 5,
                      }}>
                      Established in {vendorApiRes?.year_of_establishment}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#4e4e4e',
                        marginTop: 5,
                      }}>
                      {vendorApiRes?.experience_in_business} years in Business
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Montserrat-SemiBold',
                        color: '#4e4e4e',
                        marginTop: 5,
                      }}>
                      Website URL : {vendorApiRes?.website_url}
                    </Text>
                  </View>
                  <View style={{flex: 0.3}}>
                    <Image
                      source={{
                        uri: `${apiUrl.IMAGEURL}${vendorApiRes?.shop_image_or_logo}`,
                      }}
                      style={{width: 90, height: 130}}
                    />
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <Text
                    style={{
                      marginTop: 3,
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'black',
                      marginBottom: 10,
                      fontSize: 15,
                    }}>
                    Business Hours:
                  </Text>
                  {extractBusinessHours?.map(ele => (
                    <>
                      <View
                        key={ele._id}
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            marginTop: 3,
                            fontFamily:
                              matchDay.day === ele.day
                                ? 'Montserrat-SemiBold'
                                : 'Montserrat-Medium',
                            color: 'black',
                            flex: 0.5,
                            fontSize: matchDay.day === ele.day ? 13 : 12,
                          }}>
                          {ele.day} {matchDay.day === ele.day ? '(Today)' : ''}
                        </Text>
                        <Text
                          style={{
                            marginTop: 3,
                            fontFamily: 'Montserrat-Medium',
                            color: 'black',
                            flex: 0.5,
                            fontSize: 12,
                          }}>
                          {ele.start_time} - {ele.end_time}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 0.2,
                          marginVertical: 15,
                          borderColor: '#444444',
                        }}></View>
                    </>
                  ))}
                  {extractAdditionalServices?.length > 0 && (
                    <View>
                      <Text
                        style={{
                          marginTop: 3,
                          fontFamily: 'Montserrat-SemiBold',
                          color: 'black',
                          marginBottom: 10,
                          fontSize: 15,
                        }}>
                        Business Details:
                      </Text>
                      {extractAdditionalServices.map((ele, index) => (
                        <View
                          key={index}
                          style={{flexDirection: 'row', flex: 1}}>
                          <Text
                            style={{
                              marginTop: 3,
                              fontFamily: 'Montserrat-Medium',
                              color: 'black',
                              marginBottom: 10,
                              fontSize: 13,
                              flex: 0.5,
                            }}>
                            {ele.parameter} :{' '}
                          </Text>
                          <Text
                            style={{
                              marginTop: 3,
                              fontFamily: 'Montserrat-Medium',
                              color: 'black',
                              marginBottom: 10,
                              fontSize: 13,
                              flex: 0.5,
                            }}>
                            {ele.value}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {extractAdditionalImages?.length > 0 && (
                    <View>
                      <Text
                        style={{
                          marginTop: 3,
                          fontFamily: 'Montserrat-SemiBold',
                          color: 'black',
                          marginBottom: 10,
                          fontSize: 15,
                        }}>
                        Images:
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          margin: 10,
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                        {extractAdditionalImages.map((ele, index) => (
                          <View
                            key={index}
                            style={{
                              width: '33.33%',
                              paddingHorizontal: 5,
                              marginBottom: 10,
                            }}>
                            <View
                              style={{
                                width: '100%',
                                height: 150,
                                borderRadius: 10,
                                marginBottom: 10,
                                padding: 5,
                              }}>
                              <Image
                                source={{
                                  uri: `${apiUrl.IMAGEURL}${ele.replace(
                                    /\\/g,
                                    '/',
                                  )}`,
                                }}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: 10,
                                  alignSelf: 'center',
                                }}
                              />
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </>
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
