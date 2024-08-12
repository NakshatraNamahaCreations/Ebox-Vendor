import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from './Header';
import THEMECOLOR from '../../utilities/color';
import PopularItems from './PopularItems';
import ExploreShop from './ExploreShop';
import Recommended from './Recommended';
import DiscountItems from './DiscountItems';
import {useNavigation} from '@react-navigation/native';
import {sliderImage} from '../../data/global-data';
import TopRated from './TopRated';
import axios from 'axios';

const {width} = Dimensions.get('window');

export default function Home() {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [imgActive, setImgActive] = React.useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    popularItems: [],
    recommended: [],
    exploreShop: [],
    topRated: [],
    discounted: [],
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // setLoading(true);
    fetchData().finally(() => {
      setRefreshing(false);
      // setLoading(false);
    });
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'http://192.168.1.103:9000/api/product/getsellproduct',
      );
      if (res.status === 200) {
        setData({
          popularItems: res.data.allSellProduct,
          recommended: res.data.allSellProduct,
          exploreShop: res.data.allSellProduct,
          topRated: res.data.allSellProduct,
          discounted: res.data.allSellProduct,
        });
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetchData when refreshing changes
  useEffect(() => {
    // if (refreshing) {
    fetchData();
    // }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imgActive < sliderImage.length - 1) {
        scrollViewRef.current.scrollTo({
          x: (imgActive + 1) * width,
          animated: true,
        });
      } else {
        scrollViewRef.current.scrollTo({x: 0, animated: true});
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [imgActive]);

  const onChange = event => {
    const slide = Math.ceil(
      event.contentOffset.x / event.layoutMeasurement.width,
    );
    if (slide !== imgActive) {
      setImgActive(slide);
    }
  };

  const imageSliderData = sliderImage.map(item => ({
    img: item.imageUrl,
  }));

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{padding: 10}}>
        <Header />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{marginBottom: 30}}>
          {/* <Image
            source={require('../../../assets/offer.jpg')}
            style={{
              width: width - 30, // Adjusted width to account for margins
              height: 200,
              borderRadius: 15,
              resizeMode: 'center',
              // marginHorizontal: 10,
            }}
          /> */}
          <ScrollView
            ref={scrollViewRef}
            onScroll={({nativeEvent}) => onChange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal>
            {imageSliderData.map((e, index) => (
              <View key={index.toString()} style={{borderRadius: 10}}>
                <Image
                  key={index}
                  style={{
                    width: width - 10, // Adjusted width to account for margins
                    height: 150,
                    // borderRadius: 20,
                    marginHorizontal: 5,
                    // resizeMode: 'cover',
                  }}
                  source={e.img}
                  onError={() => console.log('Error loading image:', e.img)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{padding: 10}}>
          <View style={{marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                marginHorizontal: 8,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                New products for sale
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Product Filter', {
                    filterType: 'New products for sale',
                  })
                }>
                <Text
                  style={{
                    fontSize: 12,
                    color: THEMECOLOR.viewColor,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            {/* new products */}
            <PopularItems
              refreshing={refreshing}
              allProducts={data.popularItems}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                marginHorizontal: 8,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Explore Shop
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('All Shop')}>
                <Text
                  style={{
                    fontSize: 12,
                    color: THEMECOLOR.viewColor,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <ExploreShop />
          </View>
          <View style={{marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                marginHorizontal: 8,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Recommended for you
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Product Filter', {
                    filterType: 'Recommended for you',
                  })
                }>
                <Text
                  style={{
                    fontSize: 12,
                    color: THEMECOLOR.viewColor,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <Recommended />
          </View>
          <View style={{marginBottom: 20}}>
            <View
              style={{
                backgroundColor: '#ea536221',
                padding: 10,
                flexDirection: 'row',
                borderRadius: 20,
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  position: 'absolute',
                  left: 20,
                  zIndex: 1,
                  width: '70%',
                  top: 20,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Start selling and achieve your business goals.
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#1b8d5b',
                    width: '60%', // height: '30%',
                    paddingTop: 13,
                    paddingBottom: 13,
                    borderRadius: 10,
                    elevation: 3,
                    marginTop: 20,
                  }}
                  onPress={() => {
                    navigation.navigate('Add');
                  }}>
                  <Text
                    style={{
                      color: THEMECOLOR.textColor,
                      fontSize: 14,
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    {' '}
                    Become a seller{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={require('../../../assets/codifyformatter.png')}
                style={{
                  width: 150, // Adjusted width to account for margins
                  height: 150,
                  borderRadius: 15,
                  resizeMode: 'contain',
                  alignSelf: 'flex-end',
                  // marginHorizontal: 10,
                }}
              />
            </View>
          </View>
          <View style={{marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                marginHorizontal: 8,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Top Rated items
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Product Filter', {
                    filterType: 'Top Rated items',
                  })
                }>
                <Text
                  style={{
                    fontSize: 12,
                    color: THEMECOLOR.viewColor,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <TopRated />
            {/* <Recommended /> */}
          </View>
          <View style={{marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                marginHorizontal: 8,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Discounted items
              </Text>
            </View>
            <DiscountItems />
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() =>
                navigation.navigate('Product Filter', {
                  filterType: 'Discount items',
                })
              }>
              <Text
                style={{
                  fontSize: 12,
                  color: THEMECOLOR.viewColor,
                  fontFamily: 'Montserrat-Bold',
                }}>
                View all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
