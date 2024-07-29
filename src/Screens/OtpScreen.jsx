import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import THEMECOLOR from '../utilities/color';
import OTPTextInput from 'react-native-otp-textinput';

function OtpScreen({navigation, route}) {
  const mobileNumber = route.params.number || '';
  console.log('mobileNumber===', mobileNumber);
  const [enteredOtp, setEnteredOtp] = React.useState('');

  let otpInput = useRef(null);

  const verifyOTP = () => {
    navigation.navigate('Otp Success');
  };
  const reSendOTP = () => {
    alert('OTP sent!');
  };
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/one-time-password.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.helperText}>OTP Verification</Text>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: THEMECOLOR.helperTextGray,
            fontSize: 12,
            // letterSpacing: 1,
            fontFamily: 'Montserrat-Medium',
            textAlign: 'center',
            marginBottom: 20,
            // padding: 25,
          }}>
          OTP sent to your phone number ******
        </Text>
        <Text
          style={{
            color: THEMECOLOR.mainColor,
            fontSize: 12,
            // letterSpacing: 1,
            fontFamily: 'Montserrat-Medium',
            textAlign: 'center',
            marginBottom: 20,
            // padding: 25,
          }}>
          {mobileNumber.substr(mobileNumber.length - 4)}{' '}
        </Text>
      </View>
      <OTPTextInput
        ref={e => (otpInput = e)}
        textInputStyle={{
          borderWidth: 1,
          borderBottomWidth: 1,
          borderRadius: 5,
          marginTop: 10,
        }}
        tintColor={THEMECOLOR.mainColor}
      />
      <TouchableOpacity
        style={{
          backgroundColor: THEMECOLOR.mainColor,
          // width: '90%',
          // height: 60,
          paddingVertical: 7,
          paddingHorizontal: 15,
          // flexDirection: 'row',
          // justifyContent: 'center',
          // alignItems: 'center',
          borderRadius: 10,
          elevation: 3,
          marginTop: 10,
          // marginHorizontal: 50,
        }}
        onPress={verifyOTP}>
        <Text
          style={{
            color: THEMECOLOR.textColor,
            fontSize: 15,
            textAlign: 'center',
            // letterSpacing: 1,
            fontFamily: 'Montserrat-Medium',
          }}>
          Verify OTP
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            color: '#393939',
            fontSize: 13,
            // letterSpacing: 1,
            fontFamily: 'Montserrat-Medium',
          }}>
          Didn't receive the OTP?{' '}
        </Text>
        <TouchableOpacity onPress={reSendOTP}>
          <Text
            style={{
              color: THEMECOLOR.mainColor,
              fontSize: 13,
              // letterSpacing: 1,
              fontFamily: 'Montserrat-Medium',
            }}>
            Resend now!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 50,
    resizeMode: 'cover',
    marginTop: '20%',
  },
  helperText: {
    color: THEMECOLOR.mainColor,
    fontSize: 18,
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'left',
    // letterSpacing: 1,
    fontFamily: 'Montserrat-Medium',
  },
});
export default OtpScreen;
