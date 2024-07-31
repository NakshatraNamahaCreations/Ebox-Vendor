import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {vendor} from '../../data/global-data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import THEMECOLOR from '../../utilities/color';
import {useNavigation} from '@react-navigation/native';

export default function ExploreShop() {
  const navigation = useNavigation();

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {vendor.map((item, index) => (
          <View
            key={index}
            style={{
              margin: 5,
              borderWidth: 1,
              borderColor: '#f3f3f3',
              backgroundColor: 'white',
              width: 170,
              padding: 5,
              borderRadius: 10,
              elevation: 2,
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'center',
                borderRadius: 50,
                alignSelf: 'center',
                marginTop: 15,
              }}
              source={{
                uri: item.companyLogo,
              }}
            />
            {item.verifiedBadge && (
              <MaterialIcons
                name="verified-user"
                size={20}
                color="#4a75f6"
                style={{
                  position: 'absolute',
                  bottom: 100,
                  left: 100,
                  zIndex: 1,
                }}
              />
            )}
            <View style={{paddingLeft: 5, paddingRight: 5, marginTop: 15}}>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                  marginBottom: 5,
                  textAlign: 'center',
                }}>
                {item.shopName.length < 15
                  ? item.shopName
                  : item.shopName.substring(0, 15) + '...'}
              </Text>
              <TouchableOpacity
                style={{
                  borderColor: THEMECOLOR.mainColor,
                  borderWidth: 1,
                  borderRadius: 7,
                  marginTop: 7,
                  marginBottom: 5,
                  paddingTop: 9,
                  paddingBottom: 9,
                  backgroundColor: THEMECOLOR.mainColor,
                }}
                onPress={() =>
                  navigation.navigate('Shop Details', {
                    shop: item,
                  })
                }>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  View Profile
                </Text>
              </TouchableOpacity>
              {/* <View style={{flexDirection: 'row', marginBottom: 2}}>
                {Array.from({length: 5}).map((_, index) => (
                  <AntDesign
                    key={index}
                    name="star"
                    size={14}
                    color="#fdd663"
                  />
                ))}
                <View style={{marginLeft: 9, marginTop: -2}}>
                  <Text style={{color: 'black', fontSize: 14}}>45</Text>
                </View>
              </View> */}
              {/* <Text
                style={{fontSize: 15, color: '#414242', fontWeight: 'bold'}}>
                ₹ 1000.00
              </Text> */}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
