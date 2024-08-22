import {View, Text, useColorScheme} from 'react-native';
import React, {useState} from 'react';
import AddProduct from './AddProduct';
import {RadioButton} from 'react-native-paper';

export default function ProductType({vendorData}) {
  console.log('vendorData in product type page', vendorData);
  const [onFocus, setOnFocus] = useState('sell');

  return (
    <View style={{flex: 1, backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}>
        {/* <LinearGradient
        style={{paddingVertical: 20, paddingHorizontal: 10}}
        colors={['#20c5ad', '#b2d76566']}> */}
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            // letterSpacing: 1,
            color: 'black',
            fontSize: 15,
            textAlign: 'left',
          }}>
          ADD PRODUCTS
        </Text>
        {/* </LinearGradient> */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <RadioButton
          value="sell"
          status={onFocus === 'sell' ? 'checked' : 'unchecked'}
          onPress={() => setOnFocus('sell')}
        />
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            // letterSpacing: 1,
            color: 'black',
            fontSize: 13,
            textAlign: 'left',
          }}>
          SELLING
        </Text>
        <RadioButton
          value="rental"
          status={onFocus === 'rental' ? 'checked' : 'unchecked'}
          onPress={() => setOnFocus('rental')}
        />
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            // letterSpacing: 1,
            color: 'black',
            fontSize: 13,
            textAlign: 'left',
          }}>
          RENTAL
        </Text>
      </View>
      {/* <View style={{flexDirection: 'row', marginTop: 15}}>
        <TouchableOpacity
          style={{
            flex: 0.6,
            borderColor: onFocus === 'Sell' ? '#76ad46' : 'transaprent',
            borderBottomWidth: onFocus === 'Sell' ? 3 : 0,
          }}
          onPress={() => setOnFocus('Sell')}>
          <Text
            style={{
              fontSize: 14,
              // letterSpacing: 1,
              fontFamily: 'Montserrat-SemiBold',
              color: onFocus === 'Sell' ? 'black' : '#696969',
              textAlign: 'center',
            }}>
            Sell
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 0.6,
            borderColor: onFocus === 'Rental' ? '#76ad46' : 'transaprent',
            borderBottomWidth: onFocus === 'Rental' ? 3 : 0,
          }}
          onPress={() => setOnFocus('Rental')}>
          <Text
            style={{
              fontSize: 14,
              // letterSpacing: 1,
              fontFamily: 'Montserrat-SemiBold',
              color: onFocus === 'Rental' ? 'black' : '#696969',
              textAlign: 'center',
            }}>
            Rental
          </Text>
        </TouchableOpacity>
      </View> */}
      <AddProduct ProductType={onFocus} vendorData={vendorData} />
      {/* {onFocus === 'Sell' && (
        <>
          <Selling deviceTheme={colorScheme} />
        </>
      )}
      {onFocus === 'Rental' && (
        <>
          <Rental deviceTheme={colorScheme} />
        </>
      )} */}
    </View>
  );
}
