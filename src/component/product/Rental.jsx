import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
// import ToggleSwitch from 'toggle-switch-react-native';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
// import HTMLView from 'react-native-htmlview';
// import WebView from 'react-native-webview';

export default function Rental({deviceTheme}) {
  console.log('deviceTheme in rental component>>>', deviceTheme);

  const [galleryImages, setGalleryImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [on, setOff] = useState(false);
  const [whatsIncluded, setWhatsIncluded] = useState('');

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

  const removeImage = index => {
    const updatedImages = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updatedImages);
  };

  return (
    <ScrollView style={{padding: 15}}>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 4,
            color: 'black',
            letterSpacing: 1,
            fontFamily: 'Poppins-Medium',
          }}>
          Upload product image
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 4,
            color: '#f44336',
            letterSpacing: 1,
            fontFamily: 'Poppins-Medium',
          }}>
          (max 3 image)
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
      <View style={{marginVertical: 5}}>
        <Text style={styles.productLable}>Select category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={itemValue => {
              if (itemValue !== selectedCategory) {
                setSelectedCategory(itemValue);
              }
            }}>
            <Picker.Item
              label="Select"
              value=""
              style={[
                styles.pickerItemPlaceholder,
                {color: deviceTheme === 'dark' ? 'white' : '#757575'},
              ]}
            />
            {categories.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.type}
                value={item.type}
                style={[
                  styles.pickerItem,
                  {color: deviceTheme === 'dark' ? 'white' : 'black'},
                ]}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={{marginVertical: 5}}>
        <Text style={styles.productLable}>Product name</Text>
        <TextInput
          placeholderTextColor="#757575"
          placeholder="Enter product name"
          style={styles.productInput}
          value={productName}
          onChangeText={pname => setProductName(pname)}
        />
      </View>
      <View style={{marginVertical: 5, flexDirection: 'row'}}>
        <View style={{flex: 0.6, marginRight: 2}}>
          <Text style={styles.productLable}>Product price</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="price/day"
            keyboardType="numeric"
            value={productPrice}
            onChangeText={pprice => setProductPrice(pprice)}
            style={styles.productInput}
          />
        </View>
        <View style={{flex: 0.6, marginLeft: 2}}>
          <Text style={styles.productLable}>Quantity</Text>
          <TextInput
            placeholderTextColor="#757575"
            placeholder="stock in hand"
            keyboardType="numeric"
            value={productPrice}
            onChangeText={pprice => setProductPrice(pprice)}
            style={styles.productInput}
          />
        </View>
      </View>
      <View style={{marginVertical: 5}}>
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
      </View>
      <View style={{marginVertical: 5}}>
        <Text style={styles.productLable}>What's includes</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#d5d5d5',
            borderRadius: 10,
            letterSpacing: 1,
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
        {/* <View style={styles.previewContainer}>
          <HTMLView value={whatsIncluded} style={[styles.div, styles.li]} />
        </View> */}
      </View>
      <View style={{marginVertical: 5, marginTop: 20, marginBottom: 40}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#ea5362',
            padding: 15,
            borderRadius: 15,
          }}
          // onPress={() => {
          //   navigation.navigate('Order Confirmation');
          // }}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 18,
              letterSpacing: 1,
              fontFamily: 'Poppins-Medium',
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
    fontFamily: 'Poppins-Medium',
    color: 'purple',
    fontSize: 20,
  },
  li: {
    fontFamily: 'Poppins-Medium',
  },

  /*******************************/

  productLable: {
    fontSize: 16,
    color: 'black',
    letterSpacing: 1,
    fontFamily: 'Poppins-Medium',
    // marginTop: 10,
  },
  productInput: {
    borderWidth: 1,
    borderColor: '#d5d5d5',
    color: 'black',
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
    paddingVertical: 15,
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
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
  },
  pickerItem: {
    // color: deviceTheme === 'dark' ? 'white' : 'black',
    // color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 1,
  },
});
