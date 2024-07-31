import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
// import {Checkbox} from 'react-native-paper';
import THEMECOLOR from '../utilities/color';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

export default function AddShopDetails({navigation}) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [checked, setChecked] = useState(false);
  const [gstUri, setGstUri] = useState('');
  const [gstFileName, setGstFileName] = useState('');
  const professionType = [
    {
      type: 'Select',
    },
    {
      type: 'Vendor & Seller',
    },
    {
      type: 'DJ',
    },
    {
      type: 'Celebrity',
    },
    {
      type: 'Host',
    },
  ];
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

  const uploadGSTCert = () => {
    ImagePicker.launchImageLibrary({noData: true}, async response => {
      const source = {uri: response.uri};
      if (response.assets) {
        console.log('Gellery image:', response);
        const fileNAME = response.assets[0].fileName;
        const galleryPic = response.assets[0].uri;
        const resizedImageUri = await resizeImage(galleryPic);
        setGstUri(resizedImageUri);
        setGstFileName(fileNAME);
      }
    });
  };

  // const handleOTP = () => {
  //   // alert('Registration successful! Please login');
  //   navigation.navigate('OTP', {number: mobileNumber});
  // };

  return (
    <View
      style={{
        padding: 15,
        backgroundColor: 'white',
        height: '100%',
        paddingTop: 20,
      }}>
      <ScrollView>
        <Text
          style={{
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
            marginBottom: 10,
            // letterSpacing: 1,
            color: 'black',
          }}>
          Shop Details
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            marginBottom: 5,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}>
          Shop Name
        </Text>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Enter shop name"
          value={name}
          onChangeText={val => setName(val)}
          style={{
            borderWidth: 1,
            borderColor: '#d5d5d5',
            color: 'black',
            fontSize: 14,
            borderRadius: 10,
            paddingLeft: 15,
            backgroundColor: 'white',
            marginBottom: 10,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}
        />
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <View style={{flex: 0.6, marginRight: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              Godown Name
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="Godown Name"
              // value={mobileNumber}
              // maxLength={10}
              onChangeText={val => setMobileNumber(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View style={{flex: 0.6, marginLeft: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              Godown Pin
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="Google map link"
              value={mobileNumber}
              // maxLength={10}
              onChangeText={val => setMobileNumber(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
          }}>
          <View style={{flex: 0.6}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                // marginBottom: 5,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}>
              Shop Image
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              marginLeft: 2,
              // alignItems: 'flex-start',
              // justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={uploadGSTCert}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {gstFileName ? (
                  gstFileName
                ) : (
                  <>
                    <Feather name="upload" size={25} color="black" /> Upload
                    Image
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
          }}>
          <View style={{flex: 0.6}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                // marginBottom: 5,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}>
              Shop Logo
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              marginLeft: 2,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={uploadGSTCert}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {gstFileName ? (
                  gstFileName
                ) : (
                  <>
                    <Feather name="upload" size={25} color="black" /> Upload
                    Logo
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
            // letterSpacing: 1,
            marginTop: 5,
            marginBottom: 10,
          }}>
          Address
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.6, marginRight: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              Locality
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="e.g. 1st Floor, Kukke Plaza"
              // value={mobileNumber}
              // maxLength={10}
              onChangeText={val => setMobileNumber(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View style={{flex: 0.6, marginLeft: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              Area
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="e.g. Electronic City"
              value={mobileNumber}
              // maxLength={10}
              onChangeText={val => setMobileNumber(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.6, marginRight: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              City
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="e.g. Bangalore"
              // value={mobileNumber}
              // maxLength={10}
              onChangeText={val => setMobileNumber(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View style={{flex: 0.6, marginLeft: 2}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              Shop Location Pin
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="Google map link"
              // value={mobileNumber}
              // maxLength={10}
              onChangeText={val => setMobileNumber(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
            // letterSpacing: 1,
            marginTop: 5,
            marginBottom: 10,
          }}>
          Documents
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <View style={{flex: 0.6}}>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="GST number"
              // value={mobileNumber}
              // maxLength={10}
              onChangeText={val => setMobileNumber(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                // marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              marginLeft: 2,
              // alignItems: 'flex-start',
              // justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={uploadGSTCert}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {gstFileName ? (
                  gstFileName
                ) : (
                  <>
                    <Feather name="upload" size={25} color="black" /> Upload GST
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
          }}>
          <View style={{flex: 0.6}}>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="PAN number"
              // value={mobileNumber}
              // maxLength={10}
              onChangeText={val => setMobileNumber(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                // marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              marginLeft: 2,
              // alignItems: 'flex-start',
              // justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={uploadGSTCert}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {gstFileName ? (
                  gstFileName
                ) : (
                  <>
                    <Feather name="upload" size={25} color="black" /> Upload PAN
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
            marginBottom: 5,
          }}>
          Aadhaar Number
        </Text>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Enter aadhaar number"
          // value={mobileNumber}
          // maxLength={10}
          onChangeText={val => setMobileNumber(val)}
          // keyboardType="number-pad"
          style={{
            borderWidth: 1,
            // width: '100%',
            borderColor: '#d5d5d5',
            color: 'black',
            fontSize: 14,
            borderRadius: 10,
            paddingLeft: 15,
            backgroundColor: 'white',
            marginBottom: 10,
            fontFamily: 'Montserrat-Medium',
            // letterSpacing: 1,
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontFamily: 'Montserrat-SemiBold',
            // letterSpacing: 1,
            marginTop: 5,
            marginBottom: 10,
          }}>
          Vehicle
        </Text>
        <View
          style={{
            marginBottom: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
              marginBottom: 5,
            }}>
            Vehicle Type
          </Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="e.g. Tata Ace EV"
            // value={mobileNumber}
            // maxLength={10}
            onChangeText={val => setMobileNumber(val)}
            // keyboardType="number-pad"
            style={{
              borderWidth: 1,
              // width: '100%',
              borderColor: '#d5d5d5',
              color: 'black',
              fontSize: 14,
              borderRadius: 10,
              paddingLeft: 15,
              backgroundColor: 'white',
              // marginBottom: 10,
              fontFamily: 'Montserrat-Medium',
              // letterSpacing: 1,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            alignItems: 'center',
          }}>
          <View style={{flex: 0.6}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
                marginBottom: 5,
              }}>
              Vehicle Number Plate
            </Text>
            <TextInput
              placeholderTextColor="#757575"
              placeholder="Enter number plate"
              // value={mobileNumber}
              // maxLength={10}
              onChangeText={val => setMobileNumber(val)}
              // keyboardType="number-pad"
              style={{
                borderWidth: 1,
                // width: '100%',
                borderColor: '#d5d5d5',
                color: 'black',
                fontSize: 14,
                borderRadius: 10,
                paddingLeft: 15,
                backgroundColor: 'white',
                // marginBottom: 10,
                fontFamily: 'Montserrat-Medium',
                // letterSpacing: 1,
              }}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              marginLeft: 2,
              // alignItems: 'flex-start',
              // justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={uploadGSTCert}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginLeft: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {gstFileName ? (
                  gstFileName
                ) : (
                  <>
                    <Feather name="upload" size={25} color="black" /> Vehicle
                    Image
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text
        style={{
          color: THEMECOLOR.helperTextGray,
          fontSize: 16,
          marginBottom: 5,
          textAlign: 'center',
        }}>
        You will get OTP on this number
      </Text> */}
        <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 3,
            marginHorizontal: 100,
            marginTop: 20,
          }}
          onPress={() => navigation.navigate('Waiting')}>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              fontSize: 14,
              textAlign: 'center',
              fontFamily: 'Montserrat-Medium',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
        {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />

        <Text
          style={{
            color: 'black',
            fontSize: 12,
            fontFamily: 'Montserrat-Regular',
            marginLeft: 10,
          }}>
          By sign up, you are agree out terms of condition{' '}
        </Text>
      </View> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
            marginBottom: 20,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: 'Montserrat-Medium',
            }}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text
              style={{
                color: THEMECOLOR.mainColor,
                fontSize: 13,
                fontFamily: 'Montserrat-Medium',
              }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
