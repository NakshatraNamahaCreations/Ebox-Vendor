import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import THEMECOLOR from '../../utilities/color';
import LottieView from 'lottie-react-native';
// import * as Animatable from 'react-native-animatable';

export default function OrderSuccessPage({navigation}) {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      {/* <Animatable.Image
        animation="bounceIn"
        duration={2000}
        iterationCount={1}
        source={require('../../../assets/success-box.gif')}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          marginTop: '20%',
        }}
        onAnimationEnd={() => console.log('Animation Finished')}
      /> */}
      <LottieView
        source={require('../../../assets/review.json')} // Your Lottie animation file
        autoPlay
        loop={false} // Set to false to play the animation only once
        style={{width: 200, height: 200, alignSelf: 'center', marginTop: '20%'}}
        onAnimationFinish={() => console.log('Animation Finished')}
      />
      <Text
        style={{
          fontFamily: 'Montserrat-SemiBold',
          letterSpacing: 1,
          color: 'black',
          fontSize: 18,
          textAlign: 'center',
        }}>
        Order confirmed
      </Text>
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          // letterSpacing: 1,
          color: 'black',
          fontSize: 15,
          textAlign: 'center',
          marginTop: 5,
        }}>
        Your order is placed successfully!
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 15,
          backgroundColor: THEMECOLOR.mainColor,
          padding: 10,
          borderRadius: 5,
          margin: 60,
        }}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text
          style={{
            color: THEMECOLOR.textColor,
            textAlign: 'center',
            fontSize: 15,
            // letterSpacing: 1,
            fontFamily: 'Montserrat-SemiBold',
          }}>
          Go to Home page
        </Text>
      </TouchableOpacity>
    </View>
  );
}
