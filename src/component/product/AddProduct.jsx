import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  useColorScheme,
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
// import Video from 'react-native-video';
// import HTMLView from 'react-native-htmlview';
// import WebView from 'react-native-webview';

export default function AddProduct({ProductType}) {
  const deviceTheme = useColorScheme();
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryVideos, setGalleryVideos] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [on, setOff] = useState(false);
  const [whatsIncluded, setWhatsIncluded] = useState('');
  console.log('selectedCategory', selectedCategory);
  const editorRef = React.createRef();
  //   console.log('whatsIncluded', <HTMLView value={whatsIncluded} />);
  const renderedHtml = whatsIncluded;
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

  const handleSelectItemChange = (index, value) => {
    const updatedItems = [...addItems];
    updatedItems[index].selectItem = value;
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
        selectionLimit: 3, // Set selection limit to 3
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
          if (response.assets.length > 3) {
            alert('You can only select 3 images');
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
        selectionLimit: 3, // Set selection limit to 3
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
          (max 3 image)
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
        {/* {galleryVideos.map((videoUri, index) => (
          <Video
            key={index}
            source={{uri: videoUri}}
            style={{width: 200, height: 200}}
            controls={true}
            resizeMode="contain"
          />
        ))} */}
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
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6}}>
          <Text style={styles.productLable}>Discount(%)</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="%"
            keyboardType="numeric"
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
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
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Quantity {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Stock in hand"
            keyboardType="numeric"
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
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
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Material Type {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Material type"
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
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
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Product Weight {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="e.g. 200 grams"
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
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
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Manufacture {asterisk()}</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Manufacture name"
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
            style={styles.productInput}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.6, marginRight: 2}}>
          <Text style={styles.productLable}>Shipping Info</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Details on shipping"
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Warranty</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="Enter warranty"
            // value={productPrice}
            // onChangeText={pprice => setProductPrice(pprice)}
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
        <TouchableOpacity
          style={{
            backgroundColor: THEMECOLOR.mainColor,
            padding: 15,
            borderRadius: 15,
            marginHorizontal: 50,
          }}
          // onPress={() => {
          //   navigation.navigate('Order Confirmation');
          // }}
        >
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
        </TouchableOpacity>
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
