import {View, Text, TouchableOpacity, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import Selling from './Selling';
import Rental from './Rental';

export default function AddProduct() {
  const colorScheme = useColorScheme();
  // console.log('colorScheme', colorScheme);
  const [onFocus, setOnFocus] = useState('Sell', 'Rental');

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
          elevation: 4,
          marginBottom: 10,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            letterSpacing: 1,
            color: 'black',
            fontSize: 20,
            textAlign: 'left',
          }}>
          Add product
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <TouchableOpacity
          style={{
            flex: 0.6,
            borderColor: onFocus === 'Sell' ? '#ea5362' : 'transaprent',
            borderBottomWidth: onFocus === 'Sell' ? 3 : 0,
          }}
          onPress={() => setOnFocus('Sell')}>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 1,
              fontFamily: 'Poppins-SemiBold',
              color: onFocus === 'Sell' ? 'black' : '#696969',
              textAlign: 'center',
            }}>
            Sell
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.6,
            borderColor: onFocus === 'Rental' ? '#ea5362' : 'transaprent',
            borderBottomWidth: onFocus === 'Rental' ? 3 : 0,
          }}
          onPress={() => setOnFocus('Rental')}>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 1,
              fontFamily: 'Poppins-SemiBold',
              color: onFocus === 'Rental' ? 'black' : '#696969',
              textAlign: 'center',
            }}>
            Rental
          </Text>
        </TouchableOpacity>
      </View>
      {onFocus === 'Sell' && (
        <>
          <Selling deviceTheme={colorScheme} />
        </>
      )}
      {onFocus === 'Rental' && (
        <>
          <Rental deviceTheme={colorScheme} />
        </>
      )}
    </View>
  );
}
