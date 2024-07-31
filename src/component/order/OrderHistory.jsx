import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {bookingHistory} from '../../data/global-data';
import {useNavigation} from '@react-navigation/native';

export default function OrderHistory() {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          elevation: 4,
          //   paddingBottom: 10,
          //   borderBottomColor: '#e5e5e5',
          //   borderBottomWidth: 1,
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
            color: 'black',
            fontSize: 20,
            textAlign: 'left',
          }}>
          My Orders
        </Text>
      </View>
      <ScrollView>
        <View style={{padding: 10}}>
          {bookingHistory.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('Order Summary', {product: item})
              }
              style={{
                margin: 5,
                borderWidth: 1,
                borderColor: '#f3f3f3',
                backgroundColor: 'white',
                padding: 5,
                borderRadius: 10,
                elevation: 2,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 0.4}}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'center',
                    borderRadius: 10,
                  }}
                  source={{
                    uri: item.imageUrl,
                  }}
                />
              </View>
              <View style={{flex: 0.7}}>
                <View style={{padding: 5}}>
                  <Text
                    style={{
                      fontSize: 13,
                      width: 200,
                      overflow: 'hidden',
                      fontFamily: 'Montserrat-Medium',
                      // letterSpacing: 1,
                      color: 'black',
                      marginBottom: 5,
                    }}>
                    {item.productName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      //   color: '#414242',
                      color: 'green',
                      fontFamily: 'Montserrat-Medium',
                      // letterSpacing: 1,
                    }}>
                    {item.orderStatus}
                  </Text>
                </View>
              </View>
              <View style={{flex: 0.1}}>
                <Feather name="chevron-right" size={20} color="#313131" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
