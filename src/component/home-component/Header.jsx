import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import THEMECOLOR from '../../utilities/color';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  const goToNotification = () => {
    navigation.navigate('Notification');
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
      <View style={{flex: 0.7}}>
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            // marginBottom: 10,
            fontFamily: 'Montserrat-Bold',
            textShadowColor: 'gray',
            textShadowOffset: {width: 2, height: 0},
            textShadowRadius: 2,
          }}>
          WELCOME
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: THEMECOLOR.mainColor,
            fontFamily: 'Montserrat-SemiBold',
          }}>
          Jimmy Morgan
        </Text>
      </View>
      <View
        style={{
          flex: 0.3,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={navigateToSearch}>
          <AntDesign
            name="search1"
            color="black"
            size={20}
            style={{
              backgroundColor: '#f9f9f9',
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
        <TouchableOpacity onPress={goToNotification}>
          <FontAwesome
            name="bell-o"
            color="black"
            size={20}
            style={{
              backgroundColor: '#f9f9f9',
              width: 40,
              height: 40,
              textAlign: 'center',
              paddingTop: 10,
              borderRadius: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
