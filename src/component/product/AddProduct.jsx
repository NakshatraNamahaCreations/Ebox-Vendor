import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  useColorScheme,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
// import ToggleSwitch from 'toggle-switch-react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import THEMECOLOR from '../../utilities/color';
import {Dropdown} from 'react-native-element-dropdown';
import {
  categoryGenSet,
  categoryLightings,
  categorySound,
  categoryVideo,
} from '../../data/global-data';
import axios from 'axios';
import Video from 'react-native-video';
import {Button, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
// import Video from 'react-native-video';
// import HTMLView from 'react-native-htmlview';
// import WebView from 'react-native-webview';

export default function AddProduct({ProductType}) {
  const deviceTheme = useColorScheme();
  const theme = useTheme();
  const navigation = useNavigation();
  // console.log('ProductType', ProductType);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryVideos, setGalleryVideos] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [mrpRate, setMrpRate] = useState('');
  const [productDiscount, setProductDiscount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [stockInHand, setStockInHand] = useState('');
  const [modelName, setModelName] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [productDimension, setProductDimension] = useState('');
  const [productWeight, setProductWeight] = useState('');
  const [coutryOfOrgin, setCoutryOfOrgin] = useState('');
  const [manufactureName, setManufactureName] = useState('');
  const [color, setColor] = useState('');
  const [warranty, setWarranty] = useState('');
  const [isResponse, setIsResponse] = useState(false);

  // const [on, setOff] = useState(false);
  // const [whatsIncluded, setWhatsIncluded] = useState('');
  // console.log('selectedCategory', selectedCategory);
  // const editorRef = React.createRef();
  //   console.log('whatsIncluded', <HTMLView value={whatsIncluded} />);
  // const renderedHtml = whatsIncluded;
  const categories = [
    // {
    //   type: 'Select',
    // },
    {
      type: 'Sound',
    },
    {
      type: 'Lighting',
    },
    {
      type: 'Video',
    },
    {
      type: 'Fabrication',
    },
    {
      type: 'Genset',
    },
    {
      type: 'shamiana',
    },
  ];

  const [addItems, setAddItems] = useState([
    {
      selectItem: '',
      ItemSpecification: '',
    },
  ]);

  const addSpecifications = () => {
    const newBoard = {
      selectItem: '',
      ItemSpecification: '',
    };
    setAddItems(prevBoards => [...prevBoards, newBoard]);
  };

  // console.log('addItems', addItems);

  const handleSelectItemChange = (index, label) => {
    const updatedItems = [...addItems];
    // console.log('updatedItems', updatedItems);
    updatedItems[index].selectItem = label;
    setAddItems(updatedItems);
  };

  const handleSpecificationChange = (index, value) => {
    const updatedItems = [...addItems];
    updatedItems[index].ItemSpecification = value;
    setAddItems(updatedItems);
  };

  const openLibrary = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 6, // Set selection limit to 3
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else if (response.assets) {
          if (response.assets.length > 6) {
            Alert.alert('You can only select 3 images');
          } else {
            const selectedImages = response.assets.map(asset => asset.uri);
            console.log('selectedImages', response.assets.length);
            setGalleryImages(selectedImages);
          }
        }
      },
    );
  };

  const uploadVideo = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'video', // Specify media type as video
        selectionLimit: 1, // Set selection limit to 3
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled video picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else if (response.assets) {
          // Filter out only mp4 videos
          const selectedVideos = response.assets.filter(
            asset => asset.type === 'video/mp4',
          );

          if (selectedVideos.length > 3) {
            Alert.alert('You can only select up to 3 videos');
          } else {
            const videoUris = selectedVideos.map(asset => asset.uri);
            console.log('Selected Videos', videoUris);
            setGalleryVideos(videoUris);
          }
        }
      },
    );
  };

  const removeImage = index => {
    const updatedImages = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updatedImages);
  };

  const asterisk = () => <Text style={{color: '#f44336'}}>*</Text>;
  console.log('addItems', addItems);
  const addProduct = async () => {
    if (
      !productName ||
      !productPrice ||
      !mrpRate ||
      !selectedCategory ||
      !productBrand ||
      !stockInHand ||
      !modelName ||
      !materialType ||
      !productDimension ||
      !productWeight ||
      !coutryOfOrgin ||
      !manufactureName ||
      galleryImages.length === 0 ||
      !galleryVideos
      // !selectedProductType ||
    ) {
      Alert.alert(
        'Error',
        'Please fill all mandatory fields and add images/videos',
      );
      return;
    }
    try {
      setIsResponse(true);
      const formData = new FormData();
      formData.append('vendor_id', '54436425on7y9687f6956');
      formData.append('vendor_name', 'Jimmy Morgan');
      formData.append('product_type', ProductType);
      formData.append('product_name', productName);
      formData.append('product_price', productPrice);
      formData.append('discount', productDiscount);
      formData.append('mrp_rate', mrpRate);
      formData.append('product_category', selectedCategory);
      formData.append('brand', productBrand);
      formData.append('stock_in_hand', stockInHand);
      formData.append('model_name', modelName);
      formData.append('material_type', materialType);
      formData.append('product_dimension', productDimension);
      formData.append('product_weight', productWeight);
      formData.append('country_of_orgin', coutryOfOrgin);
      formData.append('manufacturer_name', manufactureName);
      formData.append('product_color', color);
      formData.append(
        'Specifications',
        JSON.stringify(
          addItems.map(item => ({
            name: item.selectItem,
            value: item.ItemSpecification,
          })),
        ),
      );

      galleryImages.forEach((uri, index) => {
        formData.append('images', {
          uri,
          name: `image_${index}.jpg`,
          type: 'image/jpeg',
        });
      });

      if (galleryVideos) {
        formData.append('video', {
          uri: galleryVideos[0],
          name: 'video.mp4',
          type: 'video/mp4',
        });
      }
      const config = {
        url: 'product/addproduct',
        method: 'post',
        baseURL: 'http://192.168.1.103:9000/api/',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData,
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          Alert.alert(response.data.message);
          setIsResponse(true);
          console.log('Response:', response);
          // setProductName('');
          // setGalleryVideos([]);
          // setGalleryImages([]);
          // setProductPrice('');
          // setMrpRate('');
          // setProductDiscount('');
          // setSelectedCategory('');
          // setProductBrand('');
          // setStockInHand('');
          // setModelName('');
          // setMaterialType('');
          // setProductDimension('');
          // setCoutryOfOrgin('');
          // setManufactureName('');
          // setColor('');
          // setWarranty('');
          // setAddItems([]);
          // setProductWeight('');
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'Error while adding product');
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          Alert.alert(
            'Error',
            error.response.data.message || 'Error while adding product',
          );
        } else if (error.request) {
          console.error('Request data:', error.request);
          Alert.alert('Error', 'No response received from server');
        }
      } else {
        console.error('Unknown error:', error);
        Alert.alert('Error', 'An unknown error occurred');
      }
    } finally {
      setIsResponse(false);
    }
  };

  // const addProduct = async e => {
  //   e.preventDefault();
  //   if (
  //     !productName ||
  //     !productPrice ||
  //     !mrpRate ||
  //     !selectedCategory ||
  //     !productBrand ||
  //     !stockInHand ||
  //     !modelName ||
  //     !materialType ||
  //     !productDimension ||
  //     !productWeight ||
  //     !coutryOfOrgin ||
  //     !manufactureName ||
  //     galleryImages.length === 0 || // Ensure images are selected
  //     !galleryVideos // Ensure video is selected
  //   ) {
  //     Alert.alert('Error', 'Please fill all mandatory fields and add images/videos');
  //   } else {
  //     try {
  //       const config = {
  //         url: 'product/addproduct',
  //         method: 'post',
  //         baseURL: 'http://192.168.1.103:9000/api/',
  //         headers: {'Content-Type': 'application/json'},
  //         data: {
  //           product_type: ProductType,
  //           product_name: productName,
  //           product_price: productPrice,
  //           discount: productDiscount,
  //           mrp_rate: mrpRate,
  //           product_category: selectedCategory,
  //           brand: productBrand.id,
  //           stock_in_hand: stockInHand,
  //           model_name: modelName,
  //           material_type: materialType,
  //           product_dimension: productDimension,
  //           product_weight: productWeight,
  //           country_of_origin: coutryOfOrgin,
  //           manufacture_name: manufactureName,
  //           product_color: color,
  //           Specifications: addItems.map(item => ({
  //             name: item.selectItem,
  //             value: item.ItemSpecification,
  //           })),
  //         },
  //       };
  //       const response = await axios(config);
  //       if (response.status === 201) {
  //         Alert.alert('Success', 'Product added successfully');
  //         // Reset form or navigate away
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       console.log('error', error);
  //       Alert.alert('Error', 'Error while adding product');
  //     }
  //   }
  // };

  // product_image: galleryImages.map((image, index) => {
  //   return {
  //     image: image,
  //     index: index
  //     }
  //     }
  //     ),

  return (
    <ScrollView style={{padding: 15}}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            marginBottom: 4,
            color: 'black',
            // letterSpacing: 1,
            fontFamily: 'Montserrat-Medium',
          }}>
          Upload product image {asterisk()}
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 4,
            color: '#f44336',
            // letterSpacing: 1,
            fontFamily: 'Montserrat-Medium',
          }}>
          {' '}
          (max 6 image)
        </Text>
      </View>
      <Text
        style={{
          fontSize: 11,
          marginBottom: 4,
          color: '#f44336',
          // letterSpacing: 1,
          fontFamily: 'Montserrat-Medium',
        }}>
        * Upload image with white background
      </Text>
      <View style={{flexDirection: 'row', marginBottom: 4, marginTop: 10}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#dddddd',
            width: 100,
            height: 100,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={openLibrary}>
          <AntDesign name="plus" size={20} color="#313131" />
        </TouchableOpacity>
        <ScrollView
          horizontal
          style={{marginLeft: 10, flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          {galleryImages.map((uri, index) => (
            <>
              <View
                key={index}
                style={{
                  position: 'relative',
                  width: 100,
                  height: 100,
                  marginLeft: 10,
                }}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    zIndex: 1,
                  }}
                  onPress={() => removeImage(index)}>
                  <AntDesign name="closecircle" size={20} color="black" />
                </TouchableOpacity>
                <Image
                  key={index}
                  source={{uri}}
                  style={{
                    resizeMode: 'cover',
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                />
              </View>
            </>
          ))}
        </ScrollView>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 13,
            marginBottom: 4,
            color: 'black',
            // letterSpacing: 1,
            fontFamily: 'Montserrat-Medium',
          }}>
          Upload product Video {asterisk()}
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginBottom: 4,
            color: '#f44336',
            // letterSpacing: 1,
            fontFamily: 'Montserrat-Medium',
          }}>
          (Max 3MB, 1080p, 30fps)
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 4, marginTop: 10}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#dddddd',
            width: 100,
            height: 100,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={uploadVideo}>
          <AntDesign name="plus" size={20} color="#313131" />
        </TouchableOpacity>
        {galleryVideos.map((videoUri, index) => (
          <View
            style={{
              // marginLeft: 10,
              // backgroundColor: 'yellow',
              width: 200,
              height: 130,
              position: 'absolute',
              left: 120,
              top: -10,
            }}>
            <Video
              key={index}
              source={{uri: videoUri}}
              style={{width: '100%', height: '100%', borderRadius: 10}}
              controls={false}
              resizeMode="contain"
            />
          </View>
        ))}
        {/* <ScrollView
          horizontal
          style={{marginLeft: 10, flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          {galleryImages.map((uri, index) => (
            <>
              <View
                key={index}
                style={{
                  position: 'relative',
                  width: 100,
                  height: 100,
                  marginLeft: 10,
                }}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    zIndex: 1,
                  }}
                  onPress={() => removeImage(index)}>
                  <AntDesign name="closecircle" size={20} color="black" />
                </TouchableOpacity>
                <Image
                  key={index}
                  source={{uri}}
                  style={{
                    resizeMode: 'cover',
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                />
              </View>
            </>
          ))}
        </ScrollView> */}
      </View>
      <View style={{marginVertical: 5}}>
        <Text style={styles.productLable}>Category {asterisk()}</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#d5d5d5',
            // height: 55,
            borderRadius: 10,
            // marginBottom: 10,
          }}>
          <Picker
            // Use board.category
            selectedValue={selectedCategory}
            onValueChange={
              cteItem => setSelectedCategory(cteItem) // Pass the index and new value
            }>
            <Picker.Item
              label="Select category"
              value=""
              style={{
                color: '#757575',
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
                // letterSpacing: 1,
              }}
            />
            {categories.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.type}
                value={item.type}
                style={{
                  color: 'black',
                  fontSize: 13,
                  fontFamily: 'Montserrat-Regular',
                  // color: deviceTheme === 'dark' ? 'white' : 'black',
                  // letterSpacing: 1,
                }}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        <Text style={styles.productLable}>Product Name {asterisk()}</Text>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Enter product name"
          style={styles.productInput}
          value={productName}
          onChangeText={pname => setProductName(pname)}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.6}}>
          <Text style={styles.productLable}>Product Price {asterisk()}</Text>
          {ProductType === 'sell' ? (
            <TextInput
              placeholderTextColor="#757575"
              placeholder="Price"
              keyboardType="numeric"
              value={productPrice}
              onChangeText={pprice => setProductPrice(pprice)}
              style={styles.productInput}
            />
          ) : ProductType === 'rental' ? (
            <TextInput
              placeholderTextColor="#757575"
              placeholder="Price/day"
              keyboardType="numeric"
              // value={productPrice}
              // onChangeText={pprice => setProductPrice(pprice)}
              style={styles.productInput}
            />
          ) : null}
        </View>
        <View style={{flex: 0.6, marginHorizontal: 2}}>
          <Text style={styles.productLable}>MRP Rate {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="MRP"
            keyboardType="numeric"
            value={mrpRate}
            onChangeText={pprice => setMrpRate(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6}}>
          <Text style={styles.productLable}>Discount(%)</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="%"
            keyboardType="numeric"
            value={productDiscount}
            onChangeText={pprice => setProductDiscount(pprice)}
            style={styles.productInput}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.6, marginRight: 2}}>
          <Text style={styles.productLable}>Brand {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Enter brand"
            // keyboardType="numeric"
            value={productBrand}
            onChangeText={pprice => setProductBrand(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Quantity {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Stock in hand"
            keyboardType="numeric"
            value={stockInHand}
            onChangeText={pprice => setStockInHand(pprice)}
            style={styles.productInput}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.6, marginRight: 2}}>
          <Text style={styles.productLable}>Model Name {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Model name"
            value={modelName}
            onChangeText={pprice => setModelName(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Material Type {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Material type"
            value={materialType}
            onChangeText={pprice => setMaterialType(pprice)}
            style={styles.productInput}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.6, marginRight: 2}}>
          <Text style={styles.productLable}>
            Product Dimensions {asterisk()}
          </Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="e.g. 7D x 7W x 7H cm"
            value={productDimension}
            onChangeText={pprice => setProductDimension(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Product Weight {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="e.g. 200 grams"
            value={productWeight}
            onChangeText={pprice => setProductWeight(pprice)}
            style={styles.productInput}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.6, marginRight: 2}}>
          <Text style={styles.productLable}>Country Of Orgin {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Country of orgin"
            value={coutryOfOrgin}
            onChangeText={pprice => setCoutryOfOrgin(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Manufacturer {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Manufacture name"
            value={manufactureName}
            onChangeText={pprice => setManufactureName(pprice)}
            style={styles.productInput}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.6, marginRight: 2}}>
          <Text style={styles.productLable}>Color</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Product color"
            value={color}
            onChangeText={pprice => setColor(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Warranty</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Enter warranty"
            value={warranty}
            onChangeText={pprice => setWarranty(pprice)}
            style={styles.productInput}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.Specifications}>Add Specifications</Text>
        <TouchableOpacity onPress={addSpecifications}>
          <AntDesign name="pluscircleo" color="black" size={20} />
        </TouchableOpacity>
      </View>
      {selectedCategory === 'Sound' ? (
        <>
          {addItems.map((ele, index) => (
            <View key={index} style={{flexDirection: 'row'}}>
              <View style={{flex: 0.6, marginRight: 2}}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={categorySound}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select a feature"
                  searchPlaceholder="Search..."
                  value={ele.selectItem}
                  itemTextStyle={styles.itemTextStyle}
                  onChange={item => handleSelectItemChange(index, item.value)}
                />
              </View>
              <View style={{flex: 0.6, marginLeft: 2}}>
                <TextInput
                  placeholderTextColor="#757575"
                  placeholder="e.g. Wired or wireless"
                  style={styles.productInput}
                  value={ele.ItemSpecification}
                  onChangeText={text => handleSpecificationChange(index, text)}
                />
              </View>
            </View>
          ))}
        </>
      ) : selectedCategory === 'Lighting' ? (
        <>
          {addItems.map((ele, index) => (
            <View key={index} style={{flexDirection: 'row'}}>
              <View style={{flex: 0.6, marginRight: 2}}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={categoryLightings}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select a feature"
                  searchPlaceholder="Search..."
                  value={ele.selectItem}
                  itemTextStyle={styles.itemTextStyle}
                  onChange={item => handleSelectItemChange(index, item.value)}
                  // renderLeftIcon={() => (
                  //   <AntDesign
                  //     style={styles.icon}
                  //     color="black"
                  //     name="Safety"
                  //     size={20}
                  //   />
                  // )}
                />
              </View>
              <View style={{flex: 0.6, marginLeft: 2}}>
                <TextInput
                  placeholderTextColor="#757575"
                  placeholder="e.g. Wired or wireless"
                  style={styles.productInput}
                  value={ele.ItemSpecification}
                  onChangeText={text => handleSpecificationChange(index, text)}
                />
              </View>
            </View>
          ))}
        </>
      ) : selectedCategory === 'Video' ? (
        <>
          {addItems.map((ele, index) => (
            <View key={index} style={{flexDirection: 'row'}}>
              <View style={{flex: 0.6, marginRight: 2}}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={categoryVideo}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select a feature"
                  searchPlaceholder="Search..."
                  value={ele.selectItem}
                  itemTextStyle={styles.itemTextStyle}
                  onChange={item => handleSelectItemChange(index, item.value)}
                  // renderLeftIcon={() => (
                  //   <AntDesign
                  //     style={styles.icon}
                  //     color="black"
                  //     name="Safety"
                  //     size={20}
                  //   />
                  // )}
                />
              </View>
              <View style={{flex: 0.6, marginLeft: 2}}>
                <TextInput
                  placeholderTextColor="#757575"
                  placeholder="e.g. Wired or wireless"
                  style={styles.productInput}
                  value={ele.ItemSpecification}
                  onChangeText={text => handleSpecificationChange(index, text)}
                />
              </View>
            </View>
          ))}
        </>
      ) : selectedCategory === 'Fabrication' ? (
        <>
          {addItems.map((ele, index) => (
            <View key={index} style={{flexDirection: 'row'}}>
              <View style={{flex: 0.6, marginRight: 2}}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={categorySound}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select a feature"
                  searchPlaceholder="Search..."
                  value={ele.selectItem}
                  itemTextStyle={styles.itemTextStyle}
                  onChange={item => handleSelectItemChange(index, item.value)}
                  // renderLeftIcon={() => (
                  //   <AntDesign
                  //     style={styles.icon}
                  //     color="black"
                  //     name="Safety"
                  //     size={20}
                  //   />
                  // )}
                />
              </View>
              <View style={{flex: 0.6, marginLeft: 2}}>
                <TextInput
                  placeholderTextColor="#757575"
                  placeholder="e.g. Wired or wireless"
                  style={styles.productInput}
                  value={ele.ItemSpecification}
                  onChangeText={text => handleSpecificationChange(index, text)}
                />
              </View>
            </View>
          ))}
        </>
      ) : selectedCategory === 'Genset' ? (
        <>
          {addItems.map((ele, index) => (
            <View key={index} style={{flexDirection: 'row'}}>
              <View style={{flex: 0.6, marginRight: 2}}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={categoryGenSet}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select a feature"
                  searchPlaceholder="Search..."
                  value={ele.selectItem}
                  itemTextStyle={styles.itemTextStyle}
                  onChange={item => handleSelectItemChange(index, item.value)}
                  // renderLeftIcon={() => (
                  //   <AntDesign
                  //     style={styles.icon}
                  //     color="black"
                  //     name="Safety"
                  //     size={20}
                  //   />
                  // )}
                />
              </View>
              <View style={{flex: 0.6, marginLeft: 2}}>
                <TextInput
                  placeholderTextColor="#757575"
                  placeholder="e.g. Wired or wireless"
                  style={styles.productInput}
                  value={ele.ItemSpecification}
                  onChangeText={text => handleSpecificationChange(index, text)}
                />
              </View>
            </View>
          ))}
        </>
      ) : selectedCategory === 'shamiana' ? (
        <>
          {addItems.map((ele, index) => (
            <View key={index} style={{flexDirection: 'row'}}>
              <View style={{flex: 0.6, marginRight: 2}}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={categorySound}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select a feature"
                  searchPlaceholder="Search..."
                  value={ele.selectItem}
                  itemTextStyle={styles.itemTextStyle}
                  onChange={item => handleSelectItemChange(index, item.value)}
                  // renderLeftIcon={() => (
                  //   <AntDesign
                  //     style={styles.icon}
                  //     color="black"
                  //     name="Safety"
                  //     size={20}
                  //   />
                  // )}
                />
              </View>
              <View style={{flex: 0.6, marginLeft: 2}}>
                <TextInput
                  placeholderTextColor="#757575"
                  placeholder="e.g. Wired or wireless"
                  style={styles.productInput}
                  value={ele.ItemSpecification}
                  onChangeText={text => handleSpecificationChange(index, text)}
                />
              </View>
            </View>
          ))}
        </>
      ) : null}

      {/* <View style={{marginVertical: 5}}>
        <Text style={styles.productLable}>Product description</Text>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Enter product description"
          multiline={true}
          numberOfLines={4}
          maxLength={200}
          value={productDescription}
          onChangeText={pdescr => setProductDescription(pdescr)}
          style={[styles.productInput, {textAlignVertical: 'top'}]}
        />
      </View> */}
      {/* <View style={{marginVertical: 5}}>
        <Text style={styles.productLable}>What's includes</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#d5d5d5',
            borderRadius: 10,
            // letterSpacing: 1,
            padding: 10,
          }}>
          <RichEditor
            ref={editorRef}
            onChange={text => setWhatsIncluded(text)}
            placeholder={'Enter included items'}
          />
          <RichToolbar
            editor={editorRef}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.setUnderline,
              actions.insertBulletsList,
            ]}
          />
        </View>
          <Text>command later </Text>
        <View style={styles.previewContainer}>
          <HTMLView value={whatsIncluded} style={[styles.div, styles.li]} />
        </View>
      </View> */}
      <View style={{marginVertical: 5, marginTop: 20, marginBottom: 40}}>
        {/* <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            padding: 15,
            borderRadius: 15,
            marginHorizontal: 50,
          }}
          onPress={addProduct}>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              textAlign: 'center',
              fontSize: 13,
              // letterSpacing: 1,
              fontFamily: 'Montserrat-SemiBold',
            }}>
            Add Product
          </Text>
        </TouchableOpacity> */}
        <Button
          // icon="camera"
          loading={isResponse === true ? true : false}
          // disabled={isResponse === true ? false : true}
          mode="contained"
          onPress={addProduct}
          textColor={THEMECOLOR.textColor}
          style={{
            // fontSize: 13,
            backgroundColor: THEMECOLOR.mainColor,
            marginHorizontal: 70,
            // color: THEMECOLOR.textColor,
          }}>
          Add Product
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /* styles for html tags */
  div: {
    fontFamily: 'Montserrat-Medium',
    color: 'purple',
    fontSize: 20,
  },
  li: {
    fontFamily: 'Montserrat-Medium',
  },

  /*******************************/

  productLable: {
    fontSize: 13,
    color: 'black',
    // letterSpacing: 1,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
  },
  productInput: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    color: 'black',
    fontSize: 13,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
    // letterSpacing: 1,
    // paddingVertical: 15,
  },
  Specifications: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 10,
    overflow: 'hidden', // Ensures the picker stays within bounds
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
  },
  pickerItemPlaceholder: {
    // color: '#757575',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    // letterSpacing: 1,
  },
  pickerItem: {
    // color: deviceTheme === 'dark' ? 'white' : 'black',
    // color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    // letterSpacing: 1,
  },

  //==============Dropdown====================

  dropdown: {
    // margin: 16,
    paddingHorizontal: 15,
    height: 50,
    borderColor: '#d5d5d5',
    borderWidth: 1,
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 13,
    color: '#757575',
    fontFamily: 'Montserrat-Regular',
  },
  selectedTextStyle: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 13,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
  itemTextStyle: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
});
