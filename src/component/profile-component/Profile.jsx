import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function Profile({vendorData}) {
  // console.log('vendorData in profile page', vendorData);
  const navigation = useNavigation();
  const removeItemValue = async () => {
    try {
      await AsyncStorage.removeItem('vendor');
      console.log('User removed from AsyncStorage');
      Alert.alert('Logout successful');
      navigation.navigate('Login');
    } catch (exception) {
      console.error('Failed to remove the user from AsyncStorage', exception);
    }
  };

  return (
    <View style={{paddingVertical: 25, paddingHorizontal: 10}}>
      <ScrollView>
        <View>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              // letterSpacing: 1,
              fontFamily: 'Montserrat-Medium',
            }}>
            {vendorData.vendor_name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Regular',
              }}>
              +91-{vendorData.mobile_number}
            </Text>
            <Entypo name="dot-single" size={20} color="black" />
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Regular',
              }}>
              {vendorData.email}
            </Text>
          </View>
          <TouchableOpacity style={{marginTop: 5}}>
            <Text
              style={{
                fontSize: 13,
                color: '#f44336',
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Medium',
              }}>
              Edit Profile{' '}
              <Entypo name="chevron-thin-right" size={12} color="#f44336" />
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: '#5d5d5d',
            borderBottomWidth: 1,
            marginVertical: 15,
          }}></View>
        <TouchableOpacity
          style={{marginVertical: 2}}
          onPress={() =>
            navigation.navigate('My Address', {
              vendorId: vendorData._id,
            })
          }>
          <Text style={styles.profileLable}>
            <MaterialIcons name="location-pin" size={14} color="#f44336" />
            Address
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Light',
              }}>
              Edit & Add new addresses
            </Text>
            <Entypo name="chevron-thin-right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: '#9d9d9d',
            borderBottomWidth: 1,
            marginVertical: 15,
          }}></View>
        <TouchableOpacity
          style={{marginVertical: 2}}
          onPress={() =>
            navigation.navigate('My Products', {
              vendorId: vendorData._id,
            })
          }>
          <Text style={styles.profileLable}>
            <Feather name="box" size={14} color="#f44336" /> My products
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Light',
              }}>
              View & Edit product listings
            </Text>
            <Entypo name="chevron-thin-right" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: '#9d9d9d',
            borderBottomWidth: 1,
            marginVertical: 15,
          }}></View>
        <View style={{marginVertical: 2}}>
          <Text style={styles.profileLable}>
            <MaterialCommunityIcons
              name="shield-key-outline"
              size={14}
              color="#f44336"
            />{' '}
            Security
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Light',
              }}>
              Change password
            </Text>
            <TouchableOpacity>
              <Entypo name="chevron-thin-right" size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View
          style={{
            borderBottomColor: '#9d9d9d',
            borderBottomWidth: 1,
            marginVertical: 15,
          }}></View>
        <View style={{marginVertical: 2}}>
          <Text style={styles.profileLable}>
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={14}
              color="#f44336"
            />{' '}
            Wishlist
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Light',
              }}>
              View & Remove wishlist
            </Text>
            <TouchableOpacity>
              <Entypo name="chevron-thin-right" size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <View
          style={{
            borderBottomColor: '#9d9d9d',
            borderBottomWidth: 1,
            marginVertical: 15,
          }}></View>
        <View style={{marginVertical: 2}}>
          <Text style={styles.profileLable}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={14}
              color="#f44336"
            />{' '}
            Uploads
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Light',
              }}>
              Add & Edit documents
            </Text>
            <TouchableOpacity>
              <Entypo name="chevron-thin-right" size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View> */}
        <View
          style={{
            borderBottomColor: '#9d9d9d',
            borderBottomWidth: 1,
            marginVertical: 15,
          }}></View>
        <View style={{marginVertical: 2}}>
          <Text style={styles.profileLable}>
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={14}
              color="#f44336"
            />{' '}
            Privacy policy
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Light',
              }}>
              Read privacy policy
            </Text>
            <TouchableOpacity>
              <Entypo name="chevron-thin-right" size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            borderBottomColor: '#9d9d9d',
            borderBottomWidth: 1,
            marginVertical: 15,
          }}></View>
        <View style={{marginVertical: 2}}>
          <Text style={styles.profileLable}>
            <MaterialIcons name="settings-suggest" size={14} color="#f44336" />{' '}
            Settings
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Light',
              }}>
              About us, Feedback, Terms & Conditions
            </Text>
            <TouchableOpacity>
              <Entypo name="chevron-thin-right" size={15} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Pressable
          onPress={removeItemValue}
          style={{
            backgroundColor: '#e1e3f9',
            padding: 10,
            marginVertical: 20,
            // elevation: 1,
          }}>
          <Text style={styles.profileLable}>
            {' '}
            <Octicons name="sign-in" size={15} color="black" /> Logout
          </Text>
        </Pressable>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              color: '#bfbfbf',
              fontSize: 13,
              letterSpacing: 1,
              textAlign: 'center',
            }}>
            &copy;2023 All rights reserved.
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Montserrat-SemiBold',
              letterSpacing: 1,
              color: '#bfbfbf',
            }}>
            <MaterialCommunityIcons
              name="drawing-box"
              size={18}
              color="#bfbfbf"
            />
            EVENT BOX
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileLable: {
    fontSize: 15,
    color: 'black',
    // letterSpacing: 1,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 3,
  },
});
