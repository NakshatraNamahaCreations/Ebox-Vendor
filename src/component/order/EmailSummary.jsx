import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  PermissionsAndroid,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput as TextBox} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import * as ImagePicker from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput as TextField} from 'react-native-paper';
import email from 'react-native-email';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import RNFS from 'react-native-fs';

const EmailSummary = ({route}) => {
  const {orderData, vendorData, reasonForReturn, commandForReturn} =
    route.params;
  const navigation = useNavigation();
  const [bodyText, setBodyText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [showBody, setShowBody] = useState(false);
  console.log('vendorData in email summary page', vendorData);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access to capture selfies.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const resizeImage = async imageUri => {
    const resizedImage = await ImageResizer.createResizedImage(
      imageUri,
      800,
      600,
      'JPEG',
      80,
      0,
    );
    return resizedImage.uri;
  };

  const uploadAttachments = () => {
    ImagePicker.launchImageLibrary({noData: true}, async response => {
      if (response.assets) {
        console.log('Gellery image:', response);
        const galleryPic = response.assets[0].uri;
        const resizedImageUri = await resizeImage(galleryPic);
        setAttachments(prev => [...prev, resizedImageUri]);
      }
    });
  };

  const addBody = () => {
    setShowBody(true);
  };
  const sendEmail = () => {
    const to = 'kiruthivalli@gmail.com';
    email(to, {
      cc: 'kiruthikamani0599@gmail.com',
      bcc: 'kiruthikamani0599@gmail.com',
      subject: `Return Request for ${orderData?.order_id}`,
      body: bodyText,
      checkCanOpen: false,
      // attachments: attachments.map(uri => ({path: uri})),
    }).catch(console.error);
  };
  return (
    <View style={{backgroundColor: 'white', height: '100%', flex: 1}}>
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
      <View style={{marginTop: 20, paddingHorizontal: 20}}>
        <TextField
          placeholderTextColor="black"
          placeholder="To: eventboxsupport@gmail.com"
          editable={false}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#8f8f8f',
            color: 'black',
            fontSize: 14,
            backgroundColor: '#dfdfdf',
            marginBottom: 10,
            fontFamily: 'Montserrat-Medium',
            width: '100%',
          }}
        />
        <TextField
          placeholderTextColor="black"
          placeholder={`Sub: Return Request for ${orderData?.order_id}`}
          editable={false}
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#8f8f8f',
            color: 'black',
            fontSize: 14,
            backgroundColor: '#dfdfdf',
            marginBottom: 10,
            fontFamily: 'Montserrat-Medium',
          }}
        />
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 20, marginBottom: 20}}>
          {attachments.length > 0 &&
            attachments.map((uri, index) => (
              <Image
                key={index}
                source={{uri}}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 20,
                  marginBottom: 10,
                }}
              />
            ))}
          {showBody && (
            <TextBox
              multiline
              placeholder="Descriptions"
              placeholderTextColor="gray"
              textAlignVertical="top"
              value={bodyText}
              onChangeText={val => setBodyText(val)}
              style={{
                borderWidth: 0,
                borderColor: 'transparent',
                fontFamily: 'Montserrat-Medium',
                fontSize: 15,
                color: 'black',
                backgroundColor: 'white',
              }}
            />
          )}
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 20, marginBottom: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{backgroundColor: '#025bca', borderRadius: 30}}
            onPress={sendEmail}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}>
              Send
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={uploadAttachments}
            style={{marginLeft: 10}}>
            <MaterialCommunityIcons
              name="image-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={addBody} style={{marginLeft: 10}}>
            <MaterialCommunityIcons
              name="format-text"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmailSummary;
