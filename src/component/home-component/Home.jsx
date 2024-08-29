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
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Header from './Header';
import THEMECOLOR from '../../utilities/color';
import PopularItems from './PopularItems';
import ExploreShop from './ExploreShop';
// import Recommended from './Recommended';
// import DiscountItems from './DiscountItems';
import {useNavigation} from '@react-navigation/native';
import {sliderImage} from '../../data/global-data';
// import TopRated from './TopRated';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WhyEventBox from './WhyEventBox';
import NewArrivals from './NewArrivals';
import {apiUrl} from '../../api-services/api-constants';
// import {List} from 'react-native-paper';
import Accordion from './Accordion';

const {width} = Dimensions.get('window');

export default function Home() {
  const [vendor, setVendor] = useState(null);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [imgActive, setImgActive] = React.useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popularItems, setPopularItems] = useState([]);
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  // const [filterOut, setFilterOut] = useState([]);
  // const [flp, setFlp] = useState([]);
  // const [filterOutVendor, setFilterOutVendor] = useState([]);

  // const [data, setData] = useState({
  //   popularItems: [],
  //   recommended: [],
  //   exploreShop: [],
  //   topRated: [],
  //   discounted: [],
  // });

  useEffect(() => {
    const getVendorData = async () => {
      try {
        const storedVendorData = await AsyncStorage.getItem('vendor');
        if (storedVendorData) {
          const parsedVendorData = JSON.parse(storedVendorData);
          setVendor(parsedVendorData);

          // Only fetch data after vendor is set
          // fetchData(parsedVendorData);
        }
      } catch (error) {
        console.error('Failed to load vendor data', error);
      }
    };
    getVendorData();
  }, []); // This useEffect runs once when the component mounts
  // console.log('vendor in home page', vendor?._id);

  useEffect(() => {
    // Only fetch data if vendor data is available
    if (vendor) {
      fetchData(vendor);
    }
  }, [vendor]);

  const fetchData = async () => {
    // loading all selling data and filterout in frontend
    try {
      setLoading(true);
      const res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_SELLING_PRODUCTS}`,
      );
      if (res.status === 200) {
        const filteredProducts = res.data.allSellProduct.filter(
          item => item.vendor_id !== vendor?._id,
        );
        setPopularItems(filteredProducts);
        // setFlp(res.data.allSellProduct);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(vendor).finally(() => {
      setRefreshing(false);
    });
  }, [vendor]);

  // console.log('popularItems', popularItems);

  // const fetchFilteroutData = async () => {
  //   // receiving from backend
  //   try {
  //     setLoading(true);
  //     const filterRes = await axios.get(
  //       `${apiUrl.BASEURL}${apiUrl.FILTEROUT_PRODUCTS}${vendor?._id}`,
  //     );
  //     if (filterRes.status === 200) {
  //       setFilterOut(filterRes.data.products.reverse());
  //     }
  //     const filterVendorRes = await axios.get(
  //       `${apiUrl.BASEURL}${apiUrl.FILTEROUT_VENDOR}${vendor?._id}`,
  //     );
  //     if (filterVendorRes.status === 200) {
  //       setFilterOutVendor(filterVendorRes.data.remaingVendor);
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // console.log(
  //   'filterOut',
  //   filterOut.filter(item => item.product_type === 'sell').length,
  // );

  // useEffect(() => {
  //   fetchFilteroutData();
  // }, []);

  // console.log(
  //   'filterOutVendor in home page>>>>>>>>>>>>>>>>>>',
  //   filterOutVendor,
  // );
  // console.log(
  //   'filterOutVendor lenght>>>>>>>>>>>>>>>>>>',
  //   filterOutVendor.length,
  // );
  // console.log('Filtered vendor product', ls.length);
  // console.log('All selling products count:', flp.length);

  // console.log('vendor._id', vendor?._id);

  // Trigger fetchData when refreshing changes

  // const memoizedData = useMemo(() => data, [data]);
  // console.log('memoizedData', memoizedData);

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
  // console.log('product list', data);
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          padding: 10,
          marginHorizontal: 10,
          marginTop: 10,
          backgroundColor: THEMECOLOR.secondaryColor,
          borderRadius: 20,
          marginBottom: 15,
          // elevation: 2,
          // borderBottomLeftRadius: 20,
        }}>
        <Header vendor={vendor} />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{marginBottom: 30}}>
          {/* <Image
            source={require('../../../assets/Untitled-2-02.jpg')}
            style={{
              width: width - 10, // Adjusted width to account for margins
              height: 200,
              borderRadius: 15,
              // resizeMode: 'center',
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
              <View key={index.toString()}>
                <Image
                  key={index}
                  style={{
                    width: width - 10, // Adjusted width to account for margins
                    height: 200,
                    // borderRadius: 20,
                    marginHorizontal: 5,
                    // resizeMode: 'center',
                    borderRadius: 25,
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
                Explore Products
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Product Filter', {
                    filterType: 'Explore Products',
                    allPopularItems: popularItems,
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
              allProducts={popularItems.reverse()}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'Montserrat-SemiBold',
                paddingLeft: 10,
                marginBottom: 10,
              }}>
              Why us?
            </Text>
            <WhyEventBox />
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
                Our Partner Vendor's
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
                backgroundColor: THEMECOLOR.secondaryColor,
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
                    backgroundColor: '#20c5ad',
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
        </View>
        <View style={{paddingHorizontal: 10, marginBottom: 20}}>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              fontSize: 15,
              //   textAlign: 'center',
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Frequently Asked Questions
          </Text>
        </View>
        <View style={{marginBottom: 20}}>
          {/* <List.Section title="Accordions">
            <List.Accordion
              title="Uncontrolled Accordion"
              left={props => <List.Icon {...props} icon="folder" />}>
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>

            <List.Accordion
              title="Controlled Accordion"
              left={props => <List.Icon {...props} icon="folder" />}
              expanded={expanded}
              onPress={handlePress}>
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
          </List.Section> */}
          <Accordion title="How to book a event on EventBox">
            <Text
              style={{
                color: THEMECOLOR.textColor,
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
              }}>
              This is the content of section 1
            </Text>
          </Accordion>
          <Accordion title="Who is a EventBox Partner?">
            <Text
              style={{
                color: THEMECOLOR.textColor,
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
              }}>
              This is the content of section 2
            </Text>
          </Accordion>
          <Accordion title="Section 3">
            <Text
              style={{
                color: THEMECOLOR.textColor,
                fontSize: 14,
                fontFamily: 'Montserrat-Medium',
              }}>
              This is the content of section 3
            </Text>
          </Accordion>
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 50, right: 10}}>
        <NewArrivals filterOut={popularItems} />
      </View>
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
