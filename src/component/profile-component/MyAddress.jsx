import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {apiUrl} from '../../api-services/api-constants';
import axios from 'axios';

function MyAddress({route}) {
  const vendorId = route.params.vendorId;
  //   console.log('vendorId in my address page', vendorId);
  const [vendor, setVendor] = useState(null);
  const [vendorAddress, setVendorAddress] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_VENDOR_PROFILE}${vendorId}`,
        // `http://192.168.1.103:9000/api/vendor/getprofile/${vendorId}`,
      );
      if (res.status === 200) {
        setVendor(res.data);
        setVendorAddress(res.data.address);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  console.log('vendor in my address pogae', vendor?.address);

  return (
    <ScrollView style={styles.ViewContain}>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          marginBottom: 10,
          padding: 8,
          borderRadius: 10,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            color: 'green',
            fontSize: 15,
            letterSpacing: 1,
          }}>
          + Add new address
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          color: '#595959',
          fontSize: 12,
          letterSpacing: 1,
          marginBottom: 10,
        }}>
        Your saved addresses
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          marginBottom: 10,
          padding: 8,
          borderRadius: 10,
        }}>
        {vendorAddress?.map(ele => (
          <View key={ele._id}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: '#3f3f3f',
                fontSize: 15,
                letterSpacing: 1,
              }}>
              {ele.fullName} <Feather name="edit" color="green" size={16} />
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Light',
                color: '#595959',
                fontSize: 12,
                letterSpacing: 1,
                marginTop: 5,
              }}>
              {ele.houseFlatBlock}, {ele.roadArea}, {ele.cityDownVillage},{' '}
              {ele.distric}, {ele.state} - {ele.pincode}
              {/* No.26, 1, Hosur Rd, Zuzuvadi, Madiwala, 1st Stage, Bommanahalli,
              Bengaluru, Karnataka 560068 */}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ViewContain: {
    backgroundColor: '#f7f6fd',
    height: '100%',
    padding: 10,
    paddingTop: 20,
  },
});

export default MyAddress;
