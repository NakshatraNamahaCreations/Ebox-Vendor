import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
// import MapView, {Marker} from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {ScrollView} from 'react-native';

export default function AddAddress({navigation}) {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
          alignItems: 'center',
          backgroundColor: 'white',
          elevation: 4,
          paddingBottom: 10,
          borderBottomColor: '#e5e5e5',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          style={{flex: 0.2, paddingLeft: 20}}
          onPress={() => navigation.goBack()}>
          <Entypo
            name="chevron-thin-left"
            color="black"
            size={20}
            style={{
              backgroundColor: '#f5f5f5',
              width: 50,
              height: 50,
              textAlign: 'center',
              paddingTop: 15,
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
              fontFamily: 'Poppins-Medium',
              letterSpacing: 1,
              color: 'black',
              fontSize: 20,
            }}>
            Add address
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
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderColor: 'transparent',
          backgroundColor: 'white',
          padding: 10,
          //   elevation: 3,
          position: 'relative',
          top: -10,
          width: '100%',
        }}>
        {/* <Text
          style={{
            fontSize: 20,
            fontFamily: 'Poppins-SemiBold',
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
            fontFamily: 'Poppins-Regular',
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
              fontFamily: 'Poppins-Regular',
              fontSize: 11,
              letterSpacing: 1,
            }}>
            A detailed address will help our Delivery Partner reach your
            doorstep easily
          </Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-evenly',
          }}>
          <View style={{flex: 0.6, margin: 10}}>
            <TextInput
              placeholder="HOUSE/FLAT/BLOCK"
              placeholderTextColor="gray"
              style={{
                height: 40,
                // padding: 5,
                color: 'black',
                backgroundColor: 'transparent',
                fontSize: 12,
                borderColor: '#e3e3e3',
                borderBottomWidth: 1,
                // borderBottomColor: '#e3e3e3',
                fontFamily: 'Poppins-Regular',
                letterSpacing: 1,
              }}
            />
          </View>
          <View style={{margin: 10, flex: 0.6}}>
            <TextInput
              placeholder="ROAD/AREA(OPTIONAL)"
              placeholderTextColor="gray"
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
                letterSpacing: 1,
                fontFamily: 'Poppins-Regular',
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{margin: 10, flex: 0.6}}>
            <TextInput
              placeholder="CITY/DOWN/VILLAGE"
              placeholderTextColor="gray"
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
                letterSpacing: 1,
                fontFamily: 'Poppins-Regular',
              }}
            />
          </View>
          <View style={{margin: 10, flex: 0.6}}>
            <TextInput
              placeholder="STATE"
              placeholderTextColor="gray"
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
                letterSpacing: 1,
                fontFamily: 'Poppins-Regular',
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{margin: 10, flex: 0.6}}>
            <TextInput
              placeholder="DISTRIC"
              placeholderTextColor="gray"
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
                letterSpacing: 1,
                fontFamily: 'Poppins-Regular',
              }}
            />
          </View>
          <View style={{margin: 10, flex: 0.6}}>
            <TextInput
              placeholder="PINCODE"
              placeholderTextColor="gray"
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
                letterSpacing: 1,
                fontFamily: 'Poppins-Regular',
              }}
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
              letterSpacing: 1,
              fontFamily: 'Poppins-Medium',
            }}>
            {/* DIRECTIONS TO REACH (OPTIONAL) */}
            Directions to reach (Optional)
          </Text>
          <TextInput
            placeholder="Road / Area"
            placeholderTextColor="gray"
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
              letterSpacing: 1,
              fontFamily: 'Poppins-Regular',
            }}
          />
        </View>
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              // marginTop: 15,
              backgroundColor: '#ea5362',
              padding: 15,
              borderRadius: 5,
            }}
            onPress={() => {
              navigation.navigate('Order Confirmation');
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                letterSpacing: 1,
                fontFamily: 'Poppins-Medium',
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
