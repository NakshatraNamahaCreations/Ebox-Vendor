import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import THEMECOLOR from '../../utilities/color';
import moment from 'moment';
import {apiUrl} from '../../api-services/api-constants';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

export default function OrderSummary({route}) {
  const navigation = useNavigation();
  const {product, vendorData} = route.params;
  console.log('product in order summary>>>>>>>>>> ', product);

  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    // Only fetch data if vendor data is available
    if (vendorData) {
      fetchData(vendorData);
    }
  }, [vendorData]);

  const fetchData = async () => {
    // loading all selling data and filterout in frontend
    try {
      const res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_SELLING_PRODUCTS}`,
      );
      if (res.status === 200) {
        const filteredProducts = res.data.allSellProduct.filter(
          item => item.vendor_id !== vendorData?._id,
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
  // console.log('popularItems', popularItems);

  const calculateTaxes = product => {
    if (product && product.totalPrice) {
      const totalPrice = product.totalPrice;
      const cgstRate = 0.09; // 9%
      const sgstRate = 0.09; // 9%

      const cgst = totalPrice * cgstRate;
      const sgst = totalPrice * sgstRate;

      return {
        cgst,
        sgst,
      };
    } else {
      throw new Error('Invalid product or totalPrice');
    }
  };

  const taxes = calculateTaxes(product);
  // console.log(`CGST: ${taxes.cgst.toFixed(2)}`);
  // console.log(`SGST: ${taxes.sgst.toFixed(2)}`);
  const finalAmountWithIncludingTax =
    taxes.cgst + taxes.sgst + product.totalPrice;
  // const subtotal = calculateTaxes();

  // const gst = calculateGST(subtotal).toFixed(2);
  // const total = Number(subtotal) + Number(gst);
  // const grand = total.toFixed(2);
  // console.log('gst in order summary', gst / 2);
  // console.log('total in order summary', finalAmountWithIncludingTax.toFixed(2));

  const generatePDF = async () => {
    const htmlContent = `
      <h1>Invoice</h1>
      <p>Booking ID: ${product._id}</p>
      <p>Date: ${product.ordered_date}</p>
      <p>Total Amount: ${product.totalPrice}</p>
      <!-- Add more dynamic content as needed -->
    `;

    let options = {
      html: htmlContent,
      fileName: `invoice_${product._id}`,
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      return file.filePath;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('Failed to generate PDF');
    }
  };

  const downloadInvoice = async () => {
    try {
      const pdfPath = await generatePDF();
      const downloadPath = `${RNFS.DownloadDirectoryPath}/invoice_${product._id}.pdf`;

      await RNFS.moveFile(pdfPath, downloadPath);
      Alert.alert(
        'Invoice Downloaded',
        'Your invoice has been saved to Downloads.',
      );
    } catch (error) {
      Alert.alert('Error', 'There was a problem downloading the invoice.');
      console.error(error);
    }
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{marginTop: 20, marginLeft: 10}}>
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

      <ScrollView>
        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
              marginBottom: 5,
            }}>
            Booking Summary
          </Text>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Text
              style={{
                fontSize: 14,
                color: '#3f3f3f',
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Order ID:{' '}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'Montserrat-Regular',
              }}>
              {' '}
              {product.order_id}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              marginBottom: 5,
            }}>
            <View style={{flex: 0.2}}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}>
                <Image
                  source={{
                    uri: `${apiUrl.IMAGEURL}${product.product_image}`,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
            <View style={{flex: 0.6}}>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                }}>
                {product.product_name.length < 58
                  ? product.product_name
                  : product.product_name.substring(0, 58) + '...'}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: '#ea5362',
                  marginTop: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                Qty: {product.applied_quantity}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  color: '#7d8592',
                  marginTop: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                Seller: {product.store_or_seller}
              </Text>
            </View>
            <View style={{flex: 0.2, alignItems: 'flex-end'}}>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                {' '}
                ₹ {product.totalPrice}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor:
                product.order_status === 'Order Placed'
                  ? '#fffbc0'
                  : product.order_status === 'Order Delivered'
                  ? '#d1fff9'
                  : product.order_status === 'Order Returned'
                  ? '#f9d0d0'
                  : '#c6c6c6',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 3,
              marginBottom: 10,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'Montserrat-Medium',
                marginBottom: 5,
              }}>
              {product.order_status}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'black',
                fontFamily: 'Montserrat-Medium',
                marginBottom: 5,
              }}>
              {product.order_status === 'Order Placed'
                ? `Your order has been placed, ${moment(
                    product.ordered_date,
                  ).format('LLL')}`
                : product.order_status === 'Order Delivered'
                ? `Your order has been delivered, ${moment(
                    product.delivered_date,
                  ).format('LLL')}`
                : product.order_status === 'Order Returned'
                ? `Your order has been returned, ${moment(
                    product.returned_date,
                  ).format('LLL')}`
                : null}
            </Text>
          </View>
          {product.order_status === 'Order Delivered' && (
            <>
              <View style={{marginHorizontal: 10, marginVertical: 10}}>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'black',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Return policy valid till September 2, 2024
                </Text>
              </View>
              <View
                style={{
                  borderTopColor: '#f5f5f5',
                  borderTopWidth: 1,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Request Return', {
                      order: product,
                      vendorData: vendorData,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontFamily: 'Montserrat-Medium',
                      textAlign: 'center',
                      marginVertical: 10,
                    }}>
                    Return order
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
        {/* <View
          style={{
            borderColor: '#f7f6fd',
            borderWidth: 2,
            // marginBottom: 5,
          }}></View> */}

        <View
          style={{
            borderColor: '#f7f6fd',
            borderWidth: 2,
            marginBottom: 5,
          }}></View>
        <View
          style={{
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
              padding: 10,
            }}>
            Bill details
          </Text>
          <View
            style={{
              borderTopColor: '#f5f5f5',
              borderTopWidth: 1,
              marginBottom: 5,
            }}></View>
          <View style={{padding: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  Items
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹ {product.totalPrice}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    fontFamily: 'Montserrat-Medium',
                    letterSpacing: 1,
                  }}>
                  CGST 9%
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹ {taxes.cgst.toFixed(2)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    fontFamily: 'Montserrat-Medium',
                    letterSpacing: 1,
                  }}>
                  SGST 9%
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    letterSpacing: 1,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹ {taxes.sgst.toFixed(2)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 13,
                    letterSpacing: 1,
                  }}>
                  Bill total
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 13,
                    letterSpacing: 1,
                  }}>
                  {' '}
                  {/* <MaterialIcons
                    name="currency-rupee"
                    size={14}
                    color="black"
                  /> */}
                  ₹ {finalAmountWithIncludingTax.toFixed(2)}{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            borderColor: '#f7f6fd',
            borderWidth: 2,
            marginBottom: 5,
          }}></View>
        <View
          style={{
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontFamily: 'Montserrat-SemiBold',
              padding: 10,
            }}>
            Order details
          </Text>
          <View
            style={{
              borderTopColor: '#f5f5f5',
              borderTopWidth: 1,
              marginBottom: 2,
            }}></View>
          <View style={{padding: 10}}>
            <View style={{marginTop: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#3f3f3f',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Payment
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {product.payment_method}
              </Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#3f3f3f',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Shipping Address
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {product.delivery_address.fullName}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: 'black',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {product.delivery_address.houseFlatBlock},{' '}
                {product.delivery_address.roadArea},{' '}
                {product.delivery_address.cityDownVillage},{' '}
                {product.delivery_address.distric},{' '}
                {product.delivery_address.state} -{' '}
                {product.delivery_address.pincode}
                {/* Ibis Party Hall, No.26, 1, Hosur Rd, Zuzuvadi, Madiwala, 1st
                Stage, Bommanahalli, Bengaluru, Karnataka 560068 */}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#3f3f3f',
                  fontFamily: 'Montserrat-SemiBold',
                }}>
                Phone Number: {product.delivery_address.mobileNumber}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderColor: '#f7f6fd',
            borderWidth: 2,
            marginBottom: 5,
          }}></View>
        <Text
          style={{
            fontSize: 14,
            color: 'black',
            fontFamily: 'Montserrat-SemiBold',
            padding: 10,
          }}>
          You may also like
        </Text>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            // justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            // gap: 10,
          }}>
          {popularItems.slice(0, 5).map(item => (
            <TouchableOpacity
              key={item._id}
              style={{width: '33.33%', paddingHorizontal: 5, marginBottom: 10}}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  item: item,
                })
              }>
              <View
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                  backgroundColor: '#e5e5e5',
                  marginBottom: 10,
                  padding: 5,
                }}>
                <Image
                  source={{
                    uri: `${apiUrl.IMAGEURL}${item.product_image[0].replace(
                      /\\/g,
                      '/',
                    )}`,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontFamily: 'Montserrat-Medium',
                }}>
                {item.product_name.length < 12
                  ? item.product_name
                  : item.product_name.substring(0, 11) + '...'}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontFamily: 'Montserrat-SemiBold',
                  marginTop: 2,
                }}>
                ₹{item.product_price}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Product Filter', {
                filterType: 'Browsing History',
                allPopularItems: popularItems,
              })
            }>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'Montserrat-SemiBold',
                marginLeft: 15,
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          paddingLeft: 30,
          paddingRight: 30,
          marginTop: 15,
          paddingBottom: 15,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            padding: 10,
            borderRadius: 7,
          }}
          onPress={downloadInvoice}
          // onPress={() => {
          //   navigation.navigate(
          //     'Add Address',
          //   );
          // }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              fontFamily: 'Montserrat-Medium',
              textAlign: 'center',
            }}>
            Download invoice{' '}
            <AntDesign
              name="download"
              size={14}
              color="white"
              //   onPress={() => navigation.goBack()}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
