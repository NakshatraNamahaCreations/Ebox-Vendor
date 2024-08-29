import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiUrl} from '../../api-services/api-constants';
import {RadioButton} from 'react-native-paper';
import THEMECOLOR from '../../utilities/color';
import moment from 'moment';

function RequestReturn({route}) {
  const orderData = route.params.order;
  const vendorData = route.params.vendorData;
  //   console.log('vendorData in return page', vendorData);
  const navigation = useNavigation();
  const reasonList = [
    {id: 1, reason: 'Performance or quality not adequate'},
    {id: 2, reason: 'Product damaged, but shipping box OK'},
    {id: 3, reason: 'Missing parts or accesssories'},
    {id: 4, reason: 'Both  products and shipping box damaged'},
    {id: 5, reason: 'Wrong item was sent'},
    {id: 6, reason: "Item defective or doesn't work"},
  ];
  const [selectedValue, setSelectedValue] = React.useState('');
  const [commandForReason, setCommandForReason] = React.useState('');
  const handleSelectReason = item => {
    setSelectedValue(item);
  };
  //   console.log('commandForReason', commandForReason);

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 10}}>
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
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            fontFamily: 'Montserrat-SemiBold',
            marginBottom: 5,
            marginLeft: 15,
          }}>
          Request Return
        </Text>
      </View>
      <ScrollView style={{padding: 10}}>
        <Text
          style={{
            fontSize: 14,
            color: 'green',
            fontFamily: 'Montserrat-Medium',
          }}>
          Order ID: {orderData.order_id}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 0.3}}>
            <View
              style={{
                width: 100,
                height: 100,
                //   borderRadius: 10,
              }}>
              <Image
                source={{
                  uri: `${apiUrl.IMAGEURL}${orderData.product_image}`,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
          <View style={{flex: 0.7}}>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                fontFamily: 'Montserrat-Medium',
              }}>
              {orderData.product_name}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderColor: '#f7f6fd',
            borderWidth: 2,
            marginBottom: 5,
          }}></View>
        <View style={{paddingHorizontal: 20}}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Why are you returing this?
          </Text>
          <View
            style={{
              //   padding: 5,
              borderColor: '#c6c6c6',
              borderWidth: 1,
              borderRadius: 5,
              marginTop: 20,
            }}>
            {reasonList.map((item, index) => (
              <>
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <View style={{flex: 0.1}}>
                    <RadioButton
                      status={
                        selectedValue?.id === item.id ? 'checked' : 'unchecked'
                      }
                      onPress={() => handleSelectReason(item)}
                    />
                  </View>
                  <View style={{flex: 0.9}}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        marginLeft: 2,
                        fontFamily: 'Montserrat-SemiBold',
                      }}>
                      {item.reason}
                    </Text>
                  </View>
                </View>
                {selectedValue?.id === item.id && (
                  <View style={{marginHorizontal: 20, marginBottom: 10}}>
                    <TextInput
                      multiline
                      numberOfLines={4}
                      placeholder="Command (optional)"
                      placeholderTextColor="gray"
                      textAlignVertical="top"
                      onChangeText={text => setCommandForReason(text)}
                      style={{
                        borderWidth: 1,
                        borderColor: '#c6c6c6',
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 15,
                        color: 'black',
                        borderRadius: 5,
                        padding: 10,
                      }}
                    />
                  </View>
                )}
                {index !== reasonList.length - 1 && (
                  <View
                    style={{
                      borderBottomColor: '#c6c6c6',
                      borderBottomWidth: 1,
                    }}></View>
                )}
              </>
            ))}
          </View>
          <View style={{marginVertical: 20}}>
            <TouchableOpacity
              style={{
                backgroundColor: THEMECOLOR.mainColor,
                borderRadius: 5,
                paddingVertical: 15,
              }}
              onPress={() =>
                navigation.navigate('Email Summary', {
                  vendorData: orderData,
                  vendorData: vendorData,
                })
              }>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                  textAlign: 'center',
                }}>
                Continue
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#727272',
                  fontFamily: 'Montserrat-Medium',
                  textAlign: 'center',
                }}>
                Return by{' '}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: '#727272',
                  fontFamily: 'Montserrat-SemiBold',
                  textAlign: 'center',
                }}>
                {moment(new Date()).format('ll')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default RequestReturn;
