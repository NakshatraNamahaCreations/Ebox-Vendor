import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import THEMECOLOR from '../../utilities/color';
import axios from 'axios';
import {apiUrl} from '../../api-services/api-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProductReview({navigation, route}) {
  const productId = route.params.productId;
  const refreshReviews = route.params.refreshReviews;
  const productImage = route.params.productImage;
  console.log('Product review page', productImage, productId);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [rating, setRating] = useState(0);

  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const getVendorData = async () => {
      try {
        const vendorData = await AsyncStorage.getItem('vendor');
        setVendor(vendorData ? JSON.parse(vendorData) : null);
      } catch (error) {
        console.error('Failed to load vendor data', error);
      }
    };

    getVendorData();
  }, []);

  const writeReview = async () => {
    if (!rating || !reviewTitle) {
      Alert.alert('Error', 'Please fill all fields');
    } else {
      try {
        const config = {
          url: `${apiUrl.WRITE_A_REVIEW}${productId}`,
          method: 'put',
          baseURL: apiUrl.BASEURL,
          headers: {'Content-Type': 'application/json'},
          data: {
            user_id: vendor._id,
            user_name: vendor.vendor_name,
            review_title: reviewTitle,
            review_description: reviewDescription,
            ratings: rating,
          },
        };
        const response = await axios(config);
        if (response.status === 200) {
          Alert.alert(
            'Thanks for sharing your rating with us and the community!',
          );
          // Reset form or navigate away
          refreshReviews();
          navigation.goBack();
        }
      } catch (error) {
        console.error(error);
        console.log('error', error);
        Alert.alert('Error', 'Error while adding product');
      }
    }
  };

  // product_image: galleryImages.map((image, index) => {
  //   return {
  //     image: image,
  //     index: index
  //     }
  //     }
  //     ),

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{paddingTop: 20, paddingBottom: 10}}>
        <View
          style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
              color: 'black',
              fontSize: 15,
              fontFamily: 'Montserrat-SemiBold',
              marginLeft: 20,
            }}>
            Write Reviews
          </Text>
        </View>
      </View>
      <View style={{padding: 16}}>
        <View style={{flexDirection: 'row'}}>
          {productImage === null ||
          productImage === undefined ||
          !productImage ? (
            <View
              style={{
                width: '100%',
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f3f3f3',
                borderRadius: 10,
              }}>
              <Text style={{color: '#ccc'}}>No Image</Text>
            </View>
          ) : (
            <Image
              style={{width: 50, height: 50, borderRadius: 5}}
              source={{
                uri: `${apiUrl.IMAGEURL}${productImage.replace(/\\/g, '/')}`,
              }}
              // source={{
              //   uri: 'https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/m/y/y/-original-imahfcgwza6fty8w.jpeg?q=70',
              // }}
            />
          )}
          {/* <Text style={{color: 'black'}}>ProductReview</Text> */}
        </View>
        <View style={{marginVertical: 20}}>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            How would you rate it?
          </Text>
          <View style={{flexDirection: 'row', marginVertical: 15}}>
            {Array.from({length: 5}).map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setRating(index + 1)}>
                <AntDesign
                  name={rating > index ? 'star' : 'staro'}
                  size={20}
                  color="#ffa41c"
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Title your review
          </Text>
          <TextInput
            style={{
              backgroundColor: 'transparent',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#b7b4b4',
              color: 'black',
              fontSize: 13,
              padding: 10,
              marginBottom: 10,
              fontFamily: 'Montserrat-Medium',
              marginVertical: 10,
            }}
            placeholderTextColor="#a1a1a1"
            placeholder="What's most important to know?"
            value={reviewTitle}
            onChangeText={reTit => setReviewTitle(reTit)}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 13,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Write your review
          </Text>
          <TextInput
            style={{
              backgroundColor: 'transparent',
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#b7b4b4',
              color: 'black',
              fontSize: 13,
              padding: 10,
              marginBottom: 10,
              fontFamily: 'Montserrat-Medium',
              marginVertical: 10,
              textAlignVertical: 'top',
            }}
            placeholderTextColor="#a1a1a1"
            placeholder="What did you use this product for?"
            multiline
            numberOfLines={4}
            // maxLength={40}
            value={reviewDescription}
            onChangeText={revDesc => setReviewDescription(revDesc)}
          />

          <TouchableOpacity
            style={{
              backgroundColor: THEMECOLOR.mainColor,
              padding: 7,
              borderRadius: 7,
              padding: 10,
              marginTop: 30,
              elevation: 3,
              marginHorizontal: 50,
            }}
            onPress={writeReview}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                // letterSpacing: 1,
                fontFamily: 'Montserrat-Medium',
                textAlign: 'center',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ProductReview;
