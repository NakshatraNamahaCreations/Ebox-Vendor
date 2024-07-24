// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   useWindowDimensions,
//   TouchableOpacity,
//   Image,
//   TextInput,
// } from 'react-native';
// import React, {useState} from 'react';
// import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
// import * as ImagePicker from 'react-native-image-picker';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {Picker} from '@react-native-picker/picker';
// import ToggleSwitch from 'toggle-switch-react-native';

// export default function AddProduct() {
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [productName, setProductName] = useState('');
//   const [productPrice, setProductPrice] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [discount, setDiscount] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [on, setOff] = useState(false);

//   const categories = [
//     // {
//     //   type: 'Select',
//     // },
//     {
//       type: 'Sound',
//     },
//     {
//       type: 'Lighting',
//     },
//     {
//       type: 'Video',
//     },
//     {
//       type: 'Fabrication',
//     },
//     {
//       type: 'Genset',
//     },
//     {
//       type: 'shamiana',
//     },
//   ];

//   const openLibrary = () => {
//     ImagePicker.launchImageLibrary(
//       {
//         mediaType: 'photo',
//         selectionLimit: 3, // Set selection limit to 3
//         includeBase64: false,
//       },
//       response => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.error) {
//           console.log('ImagePicker Error: ', response.error);
//         } else if (response.customButton) {
//           console.log('User tapped custom button: ', response.customButton);
//         } else if (response.assets) {
//           if (response.assets.length > 3) {
//             alert('You can only select 3 images');
//           } else {
//             const selectedImages = response.assets.map(asset => asset.uri);
//             console.log('selectedImages', response.assets.length);
//             setGalleryImages(selectedImages);
//           }
//         }
//       },
//     );
//   };

//   const removeImage = index => {
//     const updatedImages = galleryImages.filter((_, i) => i !== index);
//     setGalleryImages(updatedImages);
//   };
//   const handleToggleSwitch = isOn => {
//     setOff(isOn);
//   };

//   const FirstRoute = () => (
//     <ScrollView style={{padding: 15}}>
//       <View style={{flexDirection: 'row'}}>
//         <Text
//           style={{
//             fontSize: 16,
//             marginBottom: 4,
//             color: 'black',
//             letterSpacing: 1,
//             fontFamily: 'Poppins-Medium',
//           }}>
//           Upload product image
//         </Text>
//         <Text
//           style={{
//             fontSize: 16,
//             marginBottom: 4,
//             color: '#f44336',
//             letterSpacing: 1,
//             fontFamily: 'Poppins-Medium',
//           }}>
//           (max 3 image)
//         </Text>
//       </View>
//       <View style={{flexDirection: 'row', marginBottom: 4, marginTop: 10}}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: '#dddddd',
//             width: 100,
//             height: 100,
//             borderRadius: 10,
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//           onPress={openLibrary}>
//           <AntDesign name="plus" size={20} color="#313131" />
//         </TouchableOpacity>
//         <ScrollView
//           horizontal
//           style={{marginLeft: 10, flex: 1}}
//           contentContainerStyle={{alignItems: 'center'}}>
//           {galleryImages.map((uri, index) => (
//             <>
//               <View
//                 key={index}
//                 style={{
//                   position: 'relative',
//                   width: 100,
//                   height: 100,
//                   marginLeft: 10,
//                 }}>
//                 <TouchableOpacity
//                   style={{
//                     position: 'absolute',
//                     top: 5,
//                     right: 5,
//                     zIndex: 1,
//                   }}
//                   onPress={() => removeImage(index)}>
//                   <AntDesign name="closecircle" size={20} color="black" />
//                 </TouchableOpacity>
//                 <Image
//                   key={index}
//                   source={{uri}}
//                   style={{
//                     resizeMode: 'cover',
//                     width: 100,
//                     height: 100,
//                     borderRadius: 10,
//                   }}
//                 />
//               </View>
//             </>
//           ))}
//         </ScrollView>
//       </View>
//       <View style={{marginVertical: 5}}>
//         <Text style={styles.productLable}>Select category</Text>
//         {/* <View style={styles.pickerWrapper}>
//           <Picker
//             selectedValue={selectedCategory}
//             style={styles.picker}
//             onValueChange={itemValue => {
//               if (itemValue !== selectedCategory) {
//                 setSelectedCategory(itemValue);
//               }
//             }}>
//             <Picker.Item
//               label="Select"
//               value=""
//               style={styles.pickerItemPlaceholder}
//             />
//             {categories.map((item, index) => (
//               <Picker.Item
//                 key={index}
//                 label={item.type}
//                 value={item.type}
//                 style={styles.pickerItem}
//               />
//             ))}
//           </Picker>
//         </View> */}
//       </View>
//       <View style={{marginVertical: 5}}>
//         <Text style={styles.productLable}>Product name</Text>
//         <TextInput
//           placeholderTextColor="#757575"
//           placeholder="Enter product name"
//           style={styles.productInput}
//           value={productName}
//           onChangeText={pname => setProductName(pname)}
//         />
//       </View>
//       <View style={{marginVertical: 5}}>
//         <Text style={styles.productLable}>Product price</Text>
//         <TextInput
//           placeholderTextColor="#757575"
//           placeholder="Enter product price"
//           keyboardType="numeric"
//           value={productPrice}
//           onChangeText={pprice => setProductPrice(pprice)}
//           style={styles.productInput}
//         />
//       </View>
//       <View style={{marginVertical: 5}}>
//         <Text style={styles.productLable}>Product description</Text>
//         <TextInput
//           placeholderTextColor="#757575"
//           placeholder="Enter product description"
//           multiline={true}
//           numberOfLines={4}
//           maxLength={200}
//           value={productDescription}
//           onChangeText={pdescr => setProductDescription(pdescr)}
//           style={[styles.productInput, {textAlignVertical: 'top'}]}
//         />
//       </View>
//       <View style={{marginVertical: 5}}>
//         <ToggleSwitch
//           isOn={on}
//           onColor="#ea5362"
//           offColor="gray"
//           label="Discount"
//           labelStyle={[styles.productLable]}
//           size="medium"
//           onToggle={handleToggleSwitch}
//         />
//         {on && (
//           <TextInput
//             placeholderTextColor="#757575"
//             placeholder="Discount in %"
//             keyboardType="numeric"
//             style={[styles.productInput, {marginTop: 20}]}
//             value={discount}
//             onChangeText={pdsicount => setDiscount(pdsicount)}
//           />
//         )}
//       </View>
//       <View style={{marginVertical: 5, marginBottom: 40}}>
//         <TouchableOpacity
//           style={{
//             backgroundColor: '#ea5362',
//             padding: 15,
//             borderRadius: 5,
//           }}
//           // onPress={() => {
//           //   navigation.navigate('Order Confirmation');
//           // }}
//         >
//           <Text
//             style={{
//               color: 'white',
//               textAlign: 'center',
//               fontSize: 18,
//               letterSpacing: 1,
//               fontFamily: 'Poppins-Medium',
//             }}>
//             Add Product
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
//   const SecondRoute = () => (
//     <ScrollView style={{padding: 10}}>
//       <Text
//         style={{
//           fontSize: 18,
//           letterSpacing: 1,
//           color: '#555',
//           fontFamily: 'Poppins-Medium',
//         }}>
//         What's Included
//       </Text>
//       <View style={{marginTop: 5}}>
//         <Text
//           style={{
//             fontSize: 13,
//             marginBottom: 4,
//             color: 'black',
//             letterSpacing: 1,
//             fontFamily: 'Poppins-Regular',
//           }}>
//           Protective Cover
//         </Text>
//         <Text
//           style={{
//             fontSize: 13,
//             // fontWeight: '400',
//             marginBottom: 4,
//             color: 'black',
//             letterSpacing: 1,
//             fontFamily: 'Poppins-Regular',
//           }}>
//           Power Cord
//         </Text>
//       </View>
//     </ScrollView>
//   );

//   const renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//   });

//   const layout = useWindowDimensions();

//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     {key: 'first', title: 'Sell'},
//     {key: 'second', title: `Rental`},
//   ]);

//   const renderTabBar = props => (
//     <TabBar
//       {...props}
//       indicatorStyle={{
//         backgroundColor: '#ea5362',
//         borderWidth: 2,
//         borderColor: 'transparent',
//       }}
//       style={{backgroundColor: 'transparent'}}
//       renderLabel={({route, focused, color}) => (
//         <Text
//           style={[
//             styles.tabLabel,
//             focused ? styles.activeTab : styles.inactiveTab,
//           ]}>
//           {route.title}
//         </Text>
//       )}
//     />
//   );

//   return (
//     <View style={{flex: 1}}>
//       <View
//         style={{
//           padding: 20,
//           backgroundColor: 'white',
//           elevation: 4,
//           marginBottom: 10,
//         }}>
//         <Text
//           style={{
//             fontFamily: 'Poppins-Medium',
//             letterSpacing: 1,
//             color: 'black',
//             fontSize: 20,
//             textAlign: 'left',
//           }}>
//           Add product
//         </Text>
//       </View>
//       <TabView
//         navigationState={{index, routes}}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{width: layout.width}}
//         renderTabBar={renderTabBar}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   tabLabel: {
//     fontSize: 16,
//     letterSpacing: 1,
//     fontFamily: 'Poppins-SemiBold',
//   },
//   activeTab: {
//     color: 'black',
//   },
//   inactiveTab: {
//     color: '#696969',
//   },
//   productLable: {
//     fontSize: 16,
//     color: 'black',
//     letterSpacing: 1,
//     fontFamily: 'Poppins-Medium',
//     // marginTop: 10,
//   },
//   productInput: {
//     borderWidth: 1,
//     borderColor: '#d5d5d5',
//     color: 'black',
//     fontSize: 16,
//     borderRadius: 10,
//     paddingLeft: 15,
//     marginBottom: 10,
//     fontFamily: 'Poppins-Regular',
//     letterSpacing: 1,
//     paddingVertical: 15,
//   },
//   pickerWrapper: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     overflow: 'hidden', // Ensures the picker stays within bounds
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     color: 'black',
//   },
//   pickerItemPlaceholder: {
//     color: '#757575',
//     fontSize: 16,
//     fontFamily: 'Poppins-Regular',
//     letterSpacing: 1,
//   },
//   pickerItem: {
//     color: 'black',
//     fontSize: 16,
//     fontFamily: 'Poppins-Regular',
//     letterSpacing: 1,
//   },
// });

import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ToggleSwitch from 'toggle-switch-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';

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

const FirstRoute = ({
  galleryImages,
  openLibrary,
  removeImage,
  categories,
  selectedCategory,
  setSelectedCategory,
  productName,
  setProductName,
  productPrice,
  setProductPrice,
  productDescription,
  setProductDescription,
  discount,
  setDiscount,
  on,
  handleToggleSwitch,
}) => (
  <ScrollView style={{padding: 15}}>
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.label}>Upload product image</Text>
      <Text style={[styles.label, {color: '#f44336'}]}> (max 3 images)</Text>
    </View>
    <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
      <TouchableOpacity style={styles.imagePicker} onPress={openLibrary}>
        <AntDesign name="plus" size={20} color="#313131" />
      </TouchableOpacity>
      <ScrollView
        horizontal
        style={{marginLeft: 10}}
        contentContainerStyle={{alignItems: 'center'}}>
        {galleryImages.map((uri, index) => (
          <View key={index} style={styles.imageContainer}>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}>
              <AntDesign name="closecircle" size={20} color="black" />
            </TouchableOpacity>
            <Image source={{uri}} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Select category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={itemValue => setSelectedCategory(itemValue)}>
          <Picker.Item label="Select" value="" />
          {categories.map((item, index) => (
            <Picker.Item key={index} label={item.type} value={item.type} />
          ))}
        </Picker>
      </View>
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Product name</Text>
      <TextInput
        placeholder="Enter product name"
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
      />
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Product price</Text>
      <TextInput
        placeholder="Enter product price"
        keyboardType="numeric"
        style={styles.input}
        value={productPrice}
        onChangeText={setProductPrice}
      />
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Product description</Text>
      <TextInput
        placeholder="Enter product description"
        multiline
        numberOfLines={4}
        maxLength={200}
        style={[styles.input, {height: 100}]}
        value={productDescription}
        onChangeText={setProductDescription}
      />
    </View>
    <View style={styles.inputContainer}>
      <ToggleSwitch
        isOn={on}
        label="Discount"
        labelStyle={styles.label}
        size="medium"
        onToggle={handleToggleSwitch}
      />
      {on && (
        <TextInput
          placeholder="Discount in %"
          keyboardType="numeric"
          style={[styles.input, {marginTop: 10}]}
          value={discount}
          onChangeText={setDiscount}
        />
      )}
    </View>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        // Handle button press action
      }}>
      <Text style={styles.buttonText}>Add Product</Text>
    </TouchableOpacity>
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView style={{padding: 10}}>
    <Text style={styles.header}>What's Included</Text>
    <Text style={styles.text}>Protective Cover</Text>
    <Text style={styles.text}>Power Cord</Text>
  </ScrollView>
);

const AddProduct = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Sell'},
    {key: 'second', title: 'Rental'},
  ]);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [on, setOn] = useState(false);

  const handleToggleSwitch = useCallback(value => {
    setOn(value);
  }, []);

  const openLibrary = useCallback(() => {
    // Implement openLibrary logic
  }, []);

  const removeImage = useCallback(indexToRemove => {
    // Implement removeImage logic
  }, []);

  const renderScene = SceneMap({
    first: () => (
      <FirstRoute
        galleryImages={galleryImages}
        openLibrary={openLibrary}
        removeImage={removeImage}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        productName={productName}
        setProductName={setProductName}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        productDescription={productDescription}
        setProductDescription={setProductDescription}
        discount={discount}
        setDiscount={setDiscount}
        on={on}
        handleToggleSwitch={handleToggleSwitch}
      />
    ),
    second: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#ea5362',
        borderWidth: 2,
        borderColor: 'transparent',
      }}
      style={{backgroundColor: 'transparent'}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={[
            styles.tabLabel,
            focused ? styles.activeTab : styles.inactiveTab,
          ]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = {
  header: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#555',
    fontFamily: 'Poppins-Medium',
  },
  text: {
    fontSize: 13,
    marginBottom: 4,
    color: 'black',
    letterSpacing: 1,
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
    letterSpacing: 1,
    fontFamily: 'Poppins-Medium',
  },
  inputContainer: {
    marginVertical: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingLeft: 10,
    fontFamily: 'Poppins-Regular',
  },
  imagePicker: {
    backgroundColor: '#dddddd',
    width: 100,
    height: 100,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
  },
  image: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#ea5362',
    padding: 15,
    borderRadius: 5,
    marginBottom: 40,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    letterSpacing: 1,
    fontFamily: 'Poppins-Medium',
  },
  tabLabel: {
    fontSize: 16,
    letterSpacing: 1,
    fontFamily: 'Poppins-Medium',
  },
  activeTab: {
    color: '#ea5362',
  },
  inactiveTab: {
    color: '#555',
  },
};

export default AddProduct;
