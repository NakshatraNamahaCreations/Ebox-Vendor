import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {apiUrl} from '../../api-services/api-constants';
import moment from 'moment';
import NumberToWord from './NumberToWord';
import {useGenerateInvoice} from '../../hooks/useGenerateInvoice';
import {PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';

export default function Invoice({route}) {
  const {order, vendorData} = route.params;
  // console.log('order in invoice', order);
  // console.log('vendorData in invoice', vendorData);

  const [loading, setLoading] = useState(false);
  const [sellerAddress, setSellerAddress] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `${apiUrl.BASEURL}${apiUrl.GET_VENDOR_PROFILE}${order.seller_id}`,
      );
      if (res.status === 200) {
        setSellerAddress(res.data);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log('sellerAddress', sellerAddress?.gst_number);

  const defultId = order._id.slice(-4);
  const vendorId = vendorData._id.slice(-4);
  const invoiceNumber = String(vendorId + defultId);

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

  const taxes = calculateTaxes(order);
  const finalAmountWithIncludingTax =
    taxes.cgst + taxes.sgst + order.totalPrice;

  const {generatePdf} = useGenerateInvoice();
  // Function to handle PDF generation
  //first one
  // const handleGeneratePdf = async () => {
  //   try {
  //     await generatePdf(
  //       order,
  //       vendorData,
  //       invoiceNumber,
  //       sellerAddress,
  //       taxes,
  //       finalAmountWithIncludingTax,
  //     );
  //     console.log('PDF generated successfully');
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   }
  // };

  async function requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to save PDFs.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        return true;
      } else {
        console.log('Storage permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  requestStoragePermission();

  async function copyToDownloads(filePath) {
    const hasPermission = await requestStoragePermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'Unable to save the PDF to Downloads folder.',
      );
      return;
    }

    const downloadsPath = `${RNFS.DownloadDirectoryPath}/Invoice.pdf`;

    try {
      await RNFS.copyFile(filePath, downloadsPath);
      console.log('PDF copied to Downloads folder:', downloadsPath);
      Alert.alert(
        'Success',
        `PDF saved to Downloads folder:\n${downloadsPath}`,
      );
    } catch (error) {
      console.error('Error copying PDF to Downloads folder:', error);
      Alert.alert('Error', 'Failed to save the PDF to Downloads folder.');
    }
  }

  const handleGeneratePdf = async () => {
    try {
      const filePath = await generatePdf(
        order,
        vendorData,
        invoiceNumber,
        sellerAddress,
        taxes,
        finalAmountWithIncludingTax,
      );
      if (filePath) {
        console.log('PDF File:', filePath);
        copyToDownloads(filePath);
        // Optionally, open the file using Linking
        // Linking.openURL(`file://${filePath}`);
      } else {
        console.error('PDF generation failed, file path is undefined.');
      }
      // console.log('PDF File:', filePath);
      // Linking.openURL(`file://${filePath}`); // This should prompt you to open the file with a PDF viewer
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}>
        <ActivityIndicator size="large" color="#0a6fe8" />
      </View>
    );
  }

  return (
    <ScrollView style={{backgroundColor: 'white', height: '100%', flex: 1}}>
      <View style={{margin: 5, borderColor: 'black', borderWidth: 1}}>
        <View style={{padding: 10}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Bold',
                    color: 'black',
                  }}>
                  <MaterialCommunityIcons
                    name="drawing-box"
                    size={21}
                    color="black"
                    // color={THEMECOLOR.mainColor}
                  />{' '}
                  EVENT BOX
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Montserrat-Bold',
                    color: 'black',
                    textAlign: 'right',
                  }}>
                  Tax Invoice
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Montserrat-Medium',
                    color: 'black',
                  }}>
                  (Original for Recipient)
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: 20, marginBottom: 5}}>
              <View style={{flex: 0.6}}>
                <Text style={styles.idAndDatesHead}>Order ID</Text>
                <Text style={styles.idAndDates}>{order.order_id}</Text>
              </View>
              <View style={{flex: 0.6}}>
                <Text style={[styles.idAndDatesHead, {textAlign: 'right'}]}>
                  Order Date
                </Text>
                <Text style={[styles.idAndDates, {textAlign: 'right'}]}>
                  {moment(order.ordered_date).format('DD-MM-YYYY')}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 25}}>
              <View style={{flex: 0.6}}>
                <Text style={styles.idAndDatesHead}>Invoice ID</Text>
                <Text style={styles.idAndDates}>
                  {`EB-${invoiceNumber.toUpperCase()}`}
                </Text>
              </View>
              <View style={{flex: 0.6}}>
                <Text style={[styles.idAndDatesHead, {textAlign: 'right'}]}>
                  Invoice Date
                </Text>
                <Text style={[styles.idAndDates, {textAlign: 'right'}]}>
                  {moment(order.ordered_date).format('DD-MM-YYYY')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={{flex: 0.6}}>
                <Text style={styles.addressHead}>Sold By :</Text>
                <Text style={styles.address}>
                  {order.store_or_seller.toUpperCase()}
                </Text>
                <Text style={styles.sellerAddress}>
                  {sellerAddress?.address[0]?.houseFlatBlock},
                  {sellerAddress?.address[0]?.roadArea}
                </Text>
                <Text style={styles.sellerAddress}>
                  {sellerAddress?.address[0]?.cityDownVillage},
                </Text>
                <Text style={styles.sellerAddress}>
                  {sellerAddress?.address[0]?.distric},{' '}
                  {sellerAddress?.address[0]?.state} -{' '}
                  {sellerAddress?.address[0]?.pincode}
                </Text>
                <Text style={styles.sellerAddress}>
                  GST: {sellerAddress?.gst_number}
                </Text>
              </View>
              <View style={{flex: 0.6}}>
                <Text style={[styles.addressHead, {textAlign: 'right'}]}>
                  Billing Address :
                </Text>
                <Text style={styles.billingAddress}>
                  {vendorData.address[0]?.fullName}
                </Text>
                <Text style={styles.billingAddress}>
                  {vendorData.address[0]?.houseFlatBlock},
                  {vendorData.address[0]?.roadArea}
                </Text>
                <Text style={styles.billingAddress}>
                  {vendorData.address[0]?.cityDownVillage},
                </Text>
                <Text style={styles.billingAddress}>
                  {vendorData.address[0]?.distric},{' '}
                  {vendorData.address[0]?.state} -{' '}
                  {vendorData.address[0]?.pincode}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row-reverse',
                marginTop: 25,
              }}>
              <View style={{flex: 0.6}}>
                <Text style={[styles.addressHead, {textAlign: 'right'}]}>
                  Shipping Address :
                </Text>
                <Text style={styles.billingAddress}>
                  {vendorData.address[0]?.fullName}
                </Text>
                <Text style={styles.billingAddress}>
                  {vendorData.address[0]?.houseFlatBlock},
                  {vendorData.address[0]?.roadArea}
                </Text>
                <Text style={styles.billingAddress}>
                  {vendorData.address[0]?.cityDownVillage},
                </Text>
                <Text style={styles.billingAddress}>
                  {vendorData.address[0]?.distric},{' '}
                  {vendorData.address[0]?.state} -{' '}
                  {vendorData.address[0]?.pincode}
                </Text>
              </View>
            </View>
            {/* Table */}
            <View style={{marginTop: 20}}>
              <View style={{borderWidth: 1, borderColor: 'black'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    backgroundColor: '#cacaca',
                    alignItems: 'center',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    padding: 3,
                  }}>
                  <Text
                    style={{
                      flex: 2,
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'black',
                    }}>
                    Product
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'black',
                      textAlign: 'center',
                    }}>
                    Qty
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontFamily: 'Montserrat-SemiBold',
                      color: 'black',
                      textAlign: 'center',
                    }}>
                    Unit Price
                  </Text>
                  <Text
                    style={{
                      flex: 2,
                      fontFamily: 'Montserrat-SemiBold',
                      textAlign: 'center',
                      color: 'black',
                    }}>
                    Tax
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      fontFamily: 'Montserrat-SemiBold',
                      textAlign: 'center',
                      color: 'black',
                    }}>
                    Total
                  </Text>
                </View>

                <View
                  style={{flexDirection: 'row', padding: 3, marginBottom: 10}}>
                  <Text
                    style={{
                      flex: 2,
                      color: 'black',
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    {order.product_name}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      color: 'black',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    {order.applied_quantity}
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      color: 'black',
                      fontFamily: 'Montserrat-Medium',
                      textAlign: 'center',
                    }}>
                    ₹{order.product_price}
                  </Text>
                  <View style={{flex: 2}}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Montserrat-Medium',
                        textAlign: 'center',
                      }}>
                      CGST (9%): ₹{taxes.cgst.toFixed(2)}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Montserrat-Medium',
                        textAlign: 'center',
                      }}>
                      SGST (9%): ₹{taxes.sgst.toFixed(2)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      color: 'black',
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    ₹{finalAmountWithIncludingTax.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderColor: 'black',
                    borderBottomWidth: 1,
                    marginTop: 10,
                    paddingVertical: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      textAlign: 'right',
                      color: 'black',
                      marginRight: 3,
                    }}>
                    TOTAL: ₹{finalAmountWithIncludingTax.toFixed(2)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Medium',
                      textAlign: 'right',
                      color: 'black',
                      fontSize: 12,
                      marginRight: 3,
                    }}>
                    All values are in INR
                  </Text>
                </View>
                <View style={{padding: 3}}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Bold',
                      color: 'black',
                    }}>
                    Amount in Words:
                  </Text>

                  <NumberToWord
                    numberWord={finalAmountWithIncludingTax.toFixed(2)}
                  />

                  {/* One Thousand Two Hundreden Three Rupees and sixty paisa */}
                  {/* {convertNumberToWords(finalAmountWithIncludingTax)} */}
                </View>
              </View>
              <View style={{marginTop: 5}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  Declaration
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 10,
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  The goods sold are intended for end user consumption and not
                  for resale.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleGeneratePdf}
        style={{
          marginVertical: 20,
          marginRight: 20,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 13,
            fontFamily: 'Montserrat-Medium',
          }}>
          Download
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  addressHead: {
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },
  address: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: 'black',
  },
  sellerAddress: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: 'black',
    textAlign: 'left',
  },
  billingAddress: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: 'black',
    textAlign: 'right',
  },
  idAndDatesHead: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    textAlign: 'left',
  },
  idAndDates: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: 'black',
    textAlign: 'left',
  },
});
