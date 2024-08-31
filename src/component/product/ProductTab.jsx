import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import THEMECOLOR from '../../utilities/color';

export default function ProductTab({product}) {
  const [productSpecification, setProductSpecification] = useState(false);
  const [productDetails, setProductDetails] = useState(true);
  const [coutryOfOrgin, setCoutryOfOrgin] = useState(false);
  const [manufacturer, setManufacturer] = useState(false);

  const handleTabClick = tabName => {
    setProductSpecification(tabName === 'specifications');
    setProductDetails(tabName === 'details');
    setCoutryOfOrgin(tabName === 'origin');
    setManufacturer(tabName === 'manufacturer');
  };

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <View style={{marginHorizontal: 10}}>
            <TouchableOpacity onPress={() => handleTabClick('details')}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 13,
                  color: productDetails ? THEMECOLOR.textColor : '#8d8d8d',
                  textAlign: 'center',
                }}>
                Product Details
              </Text>
              <View
                style={{
                  borderBottomColor: productDetails
                    ? THEMECOLOR.mainColor
                    : 'transparent',
                  borderBottomWidth: productDetails ? 4.5 : 0,
                  position: 'relative',
                  top: 2,
                }}></View>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal: 10}}>
            <TouchableOpacity onPress={() => handleTabClick('specifications')}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 13,
                  textAlign: 'center',
                  color: productSpecification
                    ? THEMECOLOR.textColor
                    : '#8d8d8d',
                }}>
                Specifications
              </Text>
              <View
                style={{
                  borderBottomColor: productSpecification
                    ? THEMECOLOR.mainColor
                    : 'transparent',
                  borderBottomWidth: productSpecification ? 4.5 : 0,
                  position: 'relative',
                  top: 2,
                }}></View>
            </TouchableOpacity>
          </View>

          <View style={{marginHorizontal: 10}}>
            <TouchableOpacity onPress={() => handleTabClick('origin')}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 13,
                  textAlign: 'center',
                  color: coutryOfOrgin ? THEMECOLOR.textColor : '#8d8d8d',
                }}>
                Country Of Orgin
              </Text>
              <View
                style={{
                  borderBottomColor: coutryOfOrgin
                    ? THEMECOLOR.mainColor
                    : 'transparent',
                  borderBottomWidth: coutryOfOrgin ? 4.5 : 0,
                  position: 'relative',
                  top: 2,
                }}></View>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal: 10}}>
            <TouchableOpacity onPress={() => handleTabClick('manufacturer')}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 13,
                  color: manufacturer ? THEMECOLOR.textColor : '#8d8d8d',
                  textAlign: 'center',
                }}>
                Manufacturer
              </Text>
              <View
                style={{
                  borderBottomColor: manufacturer
                    ? THEMECOLOR.mainColor
                    : 'transparent',
                  borderBottomWidth: manufacturer ? 4.5 : 0,
                  position: 'relative',
                  top: 2,
                }}></View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={{marginTop: 10}}>
        {productSpecification ? (
          <View>
            {product.Specifications.length > 0 ? (
              <>
                {product.Specifications.map(spe => (
                  <View key={spe._id} style={styles.productsDetasilRow}>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productDetailsHead}>{spe.name}</Text>
                    </View>
                    <View style={{flex: 0.5}}>
                      <Text style={styles.productsDetailsAns}>
                        {/* JBL Store */}
                        {spe.value}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <>
                <Text style={styles.productsDetailsAns}>
                  Specifications not Available
                </Text>
              </>
            )}
          </View>
        ) : productDetails ? (
          <View>
            <View style={styles.productsDetasilRow}>
              <View style={{flex: 0.5}}>
                <Text style={styles.productDetailsHead}>Brand</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.productsDetailsAns}>
                  {product.brand ? product.brand : 'N/A'}
                </Text>
              </View>
            </View>
            <View style={styles.productsDetasilRow}>
              <View style={{flex: 0.5}}>
                <Text style={styles.productDetailsHead}>Product Category</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.productsDetailsAns}>
                  {product.product_category}
                </Text>
              </View>
            </View>
            <View style={styles.productsDetasilRow}>
              <View style={{flex: 0.5}}>
                <Text style={styles.productDetailsHead}>Model Name</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.productsDetailsAns}>
                  {product.model_name ? product.model_name : 'N/A'}
                </Text>
              </View>
            </View>

            <View style={styles.productsDetasilRow}>
              <View style={{flex: 0.5}}>
                <Text style={styles.productDetailsHead}>
                  Product Dimensions
                </Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.productsDetailsAns}>
                  {product.product_dimension
                    ? product.product_dimension
                    : 'N/A'}
                </Text>
              </View>
            </View>
            <View style={styles.productsDetasilRow}>
              <View style={{flex: 0.5}}>
                <Text style={styles.productDetailsHead}>Item Weight</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.productsDetailsAns}>
                  {product.product_weight ? product.product_weight : 'N/A'}
                </Text>
              </View>
            </View>
            <View style={styles.productsDetasilRow}>
              <View style={{flex: 0.5}}>
                <Text style={styles.productDetailsHead}>Material Type</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.productsDetailsAns}>
                  {product.material_type ? product.material_type : 'N/A'}
                </Text>
              </View>
            </View>
            <View style={styles.productsDetasilRow}>
              <View style={{flex: 0.5}}>
                <Text style={styles.productDetailsHead}>Color</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.productsDetailsAns}>
                  {product.product_color ? product.product_color : 'N/A'}
                </Text>
              </View>
            </View>
            <View style={styles.productsDetasilRow}>
              <View style={{flex: 0.5}}>
                <Text style={styles.productDetailsHead}>Warrenty Type</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.productsDetailsAns}>
                  {product.warranty ? product.warranty : 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        ) : coutryOfOrgin ? (
          <>
            <View style={styles.productsDetasilRow}>
              <View style={{flex: 0.5}}>
                <Text style={styles.productDetailsHead}>Country of Orgin</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.productsDetailsAns}>
                  {product.country_of_orgin
                    ? product.country_of_orgin
                    : 'Unkown'}
                </Text>
              </View>
            </View>
          </>
        ) : manufacturer ? (
          <>
            <View style={styles.productsDetasilRow}>
              <View style={{flex: 0.5}}>
                <Text style={styles.productDetailsHead}>Manufacture</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text style={styles.productsDetailsAns}>
                  {product.manufature_name
                    ? product.manufature_name
                    : 'Unknown'}
                </Text>
              </View>
            </View>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productsDetasilRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  productsDetailsAns: {
    color: '#2c2c2c',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginTop: 5,
  },
  productDetailsHead: {
    color: '#2c2c2c',
    fontSize: 13,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 5,
    // letterSpacing: 1,
  },
});
