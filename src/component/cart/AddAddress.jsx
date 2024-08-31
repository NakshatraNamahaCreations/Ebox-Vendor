import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import MapView, {Marker} from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {ScrollView} from 'react-native';
import THEMECOLOR from '../../utilities/color';
import axios from 'axios';
import Modal from 'react-native-modal';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {apiUrl} from '../../api-services/api-constants';

export default function AddAddress({route}) {
  const vendorData = route.params.vendorData;
  console.log('vendorData in add address page', vendorData);
  const navigation = useNavigation();
  const [vendorDetail, setVendorDetail] = useState([]);
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [houseFlatBlock, setHouseFlatBloack] = useState('');
  const [roadArea, setRoadArea] = useState('');
  const [cityDownVillage, setCityDownVillage] = useState('');
  const [distric, setDistric] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [directions, setDirections] = useState('');
  const [vendorAddress, setVendorAddress] = useState([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  // const [isAddressSelected, setIsAddressSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_VENDOR_PROFILE}${vendorData._id}`,
      );
      if (res.status === 200) {
        setVendorAddress(res.data.address.reverse());
        setVendorDetail(res.data);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <ActivityIndicator size="large" color="#0a6fe8" />
      </View>
    );
  }
  // console.log('fullName', fullName);
  console.log('vendorAddress', vendorAddress);

  const handleAddressSelect = address => {
    setSelectedAddress(address);
    // setIsAddressSelected(true)
  };
  console.log('selectedAddress', selectedAddress);

  const navigatingToOrderConfirm = () => {
    if (selectedAddress === null) {
      Alert.alert('Please select an address');
    } else {
      navigation.navigate('Order Confirmation', {
        address: selectedAddress,
        vendorData: vendorData,
      });
    }
  };

  const showAddress = () => setShowAddAddress(true);

  const handleAddAddress = async () => {
    if (
      !fullName ||
      !mobileNumber ||
      !houseFlatBlock ||
      !cityDownVillage ||
      !roadArea ||
      !distric ||
      !state ||
      !pincode
    ) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }
    try {
      const config = {
        url: `${apiUrl.ADD_SHIPPING_ADDRESS}${vendorData._id}`,
        method: 'put',
        baseURL: apiUrl.BASEURL,
        headers: {'Content-Type': 'application/json'},
        data: {
          address: {
            fullName,
            mobileNumber,
            houseFlatBlock,
            roadArea,
            cityDownVillage,
            distric,
            state,
            pincode,
            directions,
          },
        },
      };
      const response = await axios(config);

      if (response.status === 200) {
        Alert.alert('Success', response.data.success);
        // console.log('response.data', response.data);
        setHouseFlatBloack('');
        setRoadArea('');
        setCityDownVillage('');
        setDistric('');
        setState('');
        setPincode('');
        setDirections('');
        setShowAddAddress(false);
        fetchData();
      }
    } catch (error) {
      console.log('Unknown error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        // Alert.alert('Error', error.response.data.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
          backgroundColor: 'white',
          elevation: 2,
          // borderBottomColor: '#e5e5e5',
          // borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          style={{flex: 0.2, paddingLeft: 20}}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            color="black"
            size={19}
            style={{
              backgroundColor: '#f5f5f5',
              width: 40,
              height: 40,
              textAlign: 'center',
              paddingTop: 10,
              borderRadius: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 0.8}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
              color: 'black',
              fontSize: 18,
            }}>
            Address
          </Text>
        </View>
      </View>

      {/* <MapView
        ref={mapRef}
        style={{width: '100%', height: '30%'}}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChange={x => {
          // console.log(x);
        }}>
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
        />
        <Marker coordinate={destinationLocation} />
        <MapViewDirections
          origin={userLocation}
          destination={destinationLocation}
          apikey="AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk" // Replace with your Google Maps API key
          strokeWidth={7}
          strokeColor="#3dabdd"
        />
      </MapView> */}
      {/* <Image
        source={require('../../../assets/map.png')}
        style={{width: '100%', height: 300, resizeMode: 'cover'}}
      /> */}
      <ScrollView
        style={{
          // borderTopLeftRadius: 10,
          // borderTopRightRadius: 10,
          // borderColor: 'transparent',
          // backgroundColor: 'white',
          padding: 10,
          //   elevation: 3,
          // position: 'relative',
          // top: -10,
          // width: '100%',
        }}>
        {/* <Text
          style={{
            fontSize: 20,
            fontFamily: 'Montserrat-SemiBold',
            color: 'black',
            letterSpacing: 1,
          }}>
          <SimpleLineIcons name="location-pin" color="black" size={25} />{' '}
          Madiwala
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: 'black',
            fontFamily: 'Montserrat-Regular',
            marginTop: 4,
            letterSpacing: 1,
          }}>
          Madiwala, 1st Stage, Bommanahalli, Bengaluru, Karnataka 560068
        </Text>
        <View
          style={{
            marginTop: 20,
            borderRadius: 6,
            backgroundColor: '#fffafa',
            padding: 10,
            borderColor: '#b63d42',
            borderWidth: 1,
          }}>
          <Text
            style={{
              color: '#b63d42',
              fontFamily: 'Montserrat-Regular',
              fontSize: 11,
              letterSpacing: 1,
            }}>
            A detailed address will help our Delivery Partner reach your
            doorstep easily
          </Text>
        </View> */}
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            marginBottom: 10,
            padding: 8,
            borderRadius: 10,
          }}
          onPress={showAddress}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              color: '#21005d',
              fontSize: 15,
            }}>
            + Add new address
          </Text>
        </TouchableOpacity>
        {vendorAddress.length > 0 && (
          <View
            style={{
              backgroundColor: 'white',
              marginBottom: 10,
              padding: 8,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: 'green',
                fontSize: 12,
                // letterSpacing: 1,
                marginBottom: 10,
              }}>
              Your saved address
            </Text>
            {vendorAddress.map(addr => (
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  alignItems: 'center',
                }}
                key={addr._id}>
                <RadioButton
                  // value="default"
                  status={
                    selectedAddress?._id === addr._id ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleAddressSelect(addr)}
                  style={{flex: 0.1}}
                />
                <View style={{flex: 0.9}}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'black',
                      fontSize: 13,
                    }}>
                    {addr.fullName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',

                      color: '#595959',
                      fontSize: 12,
                    }}>
                    {addr.houseFlatBlock}, {addr.roadArea},{' '}
                    {addr.cityDownVillage}, {addr.distric}, {addr.state}{' '}
                    {addr.pincode}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',

                      color: '#595959',
                      fontSize: 12,
                    }}>
                    Phone number: {addr.mobileNumber}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              // marginTop: 15,
              backgroundColor: THEMECOLOR.mainColor,
              padding: 10,
              borderRadius: 5,
              marginHorizontal: 80,
            }}
            onPress={navigatingToOrderConfirm}>
            <Text
              style={{
                color: THEMECOLOR.textColor,
                textAlign: 'center',
                fontSize: 14,
                // letterSpacing: 1,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        isVisible={showAddAddress}
        style={{
          margin: 0,
          // height: '100%',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            // backgroundColor: 'red',
            width: '100%',
            position: 'absolute',
            top: '5%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              // marginBottom: 10,
              margin: 10,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Add Address
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{flex: 0.6, margin: 10}}>
              <TextInput
                placeholder="FULL NAME"
                placeholderTextColor="#a1a1a1"
                style={{
                  height: 40,
                  // padding: 5,
                  color: 'black',
                  backgroundColor: 'transparent',
                  fontSize: 12,
                  borderColor: '#e3e3e3',
                  borderBottomWidth: 1,
                  // borderBottomColor: '#e3e3e3',
                  fontFamily: 'Montserrat-Medium',
                  // letterSpacing: 1,
                }}
                value={fullName}
                // value={vendorDetail ? vendorDetail.vendor_name : ''}
                // onChangeText={name => {
                //   setFullName(name);
                //   setVendorDetail(prev => ({...prev, vendor_name: name}));
                // }}
                onChangeText={name => setFullName(name)}
              />
            </View>
            <View style={{margin: 10, flex: 0.6}}>
              <TextInput
                placeholder="MOBILE NUMBER"
                placeholderTextColor="#a1a1a1"
                keyboardType="numeric"
                maxLength={10}
                style={{
                  height: 40,
                  // padding: 5,
                  color: 'black',
                  backgroundColor: 'transparent',
                  fontSize: 12,
                  borderColor: '#e3e3e3',
                  borderBottomWidth: 1,
                  // borderWidth: 1,
                  // borderBottomColor: '#c9c9c9',
                  // letterSpacing: 1,
                  fontFamily: 'Montserrat-Medium',
                }}
                value={mobileNumber}
                // value={vendorDetail ? String(vendorDetail.mobile_number) : null}
                onChangeText={mobile => setMobileNumber(mobile)}
                // onChangeText={mobile => {
                //   setMobileNumber(mobile);
                //   setVendorDetail(prev => ({...prev, mobile_number: mobile}));
                // }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{flex: 0.6, margin: 10}}>
              <TextInput
                placeholder="HOUSE/FLAT/BLOCK"
                placeholderTextColor="#a1a1a1"
                style={{
                  height: 40,
                  // padding: 5,
                  color: 'black',
                  backgroundColor: 'transparent',
                  fontSize: 12,
                  borderColor: '#e3e3e3',
                  borderBottomWidth: 1,
                  // borderBottomColor: '#e3e3e3',
                  fontFamily: 'Montserrat-Medium',
                  // letterSpacing: 1,
                }}
                value={houseFlatBlock}
                onChangeText={house => setHouseFlatBloack(house)}
              />
            </View>
            <View style={{margin: 10, flex: 0.6}}>
              <TextInput
                placeholder="AREA/ROAD"
                placeholderTextColor="#a1a1a1"
                style={{
                  height: 40,
                  // padding: 5,
                  color: 'black',
                  backgroundColor: 'transparent',
                  fontSize: 12,
                  borderColor: '#e3e3e3',
                  borderBottomWidth: 1,
                  // borderWidth: 1,
                  // borderBottomColor: '#c9c9c9',
                  // letterSpacing: 1,
                  fontFamily: 'Montserrat-Medium',
                }}
                value={roadArea}
                onChangeText={area => setRoadArea(area)}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={{margin: 10, flex: 0.6}}>
              <TextInput
                placeholder="CITY/DOWN/VILLAGE"
                placeholderTextColor="#a1a1a1"
                style={{
                  height: 40,
                  // padding: 5,
                  color: 'black',
                  backgroundColor: 'transparent',
                  fontSize: 12,
                  borderColor: '#e3e3e3',
                  borderBottomWidth: 1,
                  // borderWidth: 1,
                  // borderBottomColor: '#c9c9c9',
                  // letterSpacing: 1,
                  fontFamily: 'Montserrat-Medium',
                }}
                value={cityDownVillage}
                onChangeText={city => setCityDownVillage(city)}
              />
            </View>
            <View style={{margin: 10, flex: 0.6}}>
              <TextInput
                placeholder="STATE"
                placeholderTextColor="#a1a1a1"
                style={{
                  height: 40,
                  // padding: 5,
                  color: 'black',
                  backgroundColor: 'transparent',
                  fontSize: 12,
                  borderColor: '#e3e3e3',
                  borderBottomWidth: 1,
                  // borderWidth: 1,
                  // borderBottomColor: '#c9c9c9',
                  // letterSpacing: 1,
                  fontFamily: 'Montserrat-Medium',
                }}
                value={state}
                onChangeText={state => setState(state)}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={{margin: 10, flex: 0.6}}>
              <TextInput
                placeholder="DISTRIC"
                placeholderTextColor="#a1a1a1"
                style={{
                  height: 40,
                  // padding: 5,
                  color: 'black',
                  backgroundColor: 'transparent',
                  fontSize: 12,
                  borderColor: '#e3e3e3',
                  borderBottomWidth: 1,
                  // borderWidth: 1,
                  // borderBottomColor: '#c9c9c9',
                  // letterSpacing: 1,
                  fontFamily: 'Montserrat-Medium',
                }}
                value={distric}
                onChangeText={state => setDistric(state)}
              />
            </View>
            <View style={{margin: 10, flex: 0.6}}>
              <TextInput
                placeholder="PINCODE"
                placeholderTextColor="#a1a1a1"
                keyboardType="numeric"
                style={{
                  height: 40,
                  // padding: 5,
                  color: 'black',
                  backgroundColor: 'transparent',
                  fontSize: 12,
                  borderColor: '#e3e3e3',
                  borderBottomWidth: 1,
                  // borderWidth: 1,
                  // borderBottomColor: '#c9c9c9',
                  // letterSpacing: 1,
                  fontFamily: 'Montserrat-Medium',
                }}
                value={pincode}
                onChangeText={pincode => setPincode(pincode)}
              />
            </View>
          </View>
          <View style={{margin: 10}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '500',
                marginBottom: 20,
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Medium',
              }}>
              {/* DIRECTIONS TO REACH (OPTIONAL) */}
              Directions to reach (Optional)
            </Text>
            <TextInput
              placeholder="Road / Area"
              placeholderTextColor="#a1a1a1"
              multiline
              numberOfLines={4}
              maxLength={200}
              style={{
                height: 120,
                padding: 10,
                color: 'black',
                backgroundColor: '#e3e3e326',
                fontSize: 14,
                borderColor: '#e3e3e3',
                borderWidth: 1,
                //   borderBottomColor: '#e3e3e3',
                textAlignVertical: 'top',
                borderRadius: 5,
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Medium',
              }}
              value={directions}
              onChangeText={directions => setDirections(directions)}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => setShowAddAddress(false)}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  backgroundColor: THEMECOLOR.mainColor,
                  fontFamily: 'Montserrat-SemiBold',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  // elevation: 1,
                  borderRadius: 10,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginLeft: 5,
              }}
              onPress={handleAddAddress}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  backgroundColor: THEMECOLOR.mainColor,
                  fontFamily: 'Montserrat-SemiBold',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  // elevation: 1,
                  borderRadius: 10,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
