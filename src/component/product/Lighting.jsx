import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Lighting() {
  const data = [
    {label: 'Speaker Maximum Output Power', value: '1'},
    {label: 'Connectivity Technology', value: '2'},
    {label: 'Mounting Type', value: '3'},
    {label: 'Speaker Type', value: '4'},
    {label: 'Special Feature', value: '5'},
    {label: 'Recommended Uses For Product', value: '6'},
    {label: 'Compatible Devices', value: '7'},
    {label: 'Colour', value: '8'},
    {label: 'Included Components', value: '9'},
    {label: 'Power Source', value: '10'},
    {label: 'Wattage', value: '11'},
    {label: 'Batteries Included', value: '12'},
    {label: 'Battery Life', value: '13'},
    {label: 'Charging Type', value: '14'},
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

  return (
    <View>
      <TouchableOpacity
        style={{position: 'absolute', top: -30, right: 20}}
        onPress={addSpecifications}>
        <AntDesign name="pluscircleo" color="black" size={20} />
      </TouchableOpacity>
      {addItems.map((ele, index) => (
        <View key={index} style={{flexDirection: 'row'}}>
          <View style={{flex: 0.6, marginRight: 2}}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
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
    </View>
  );
}
const styles = StyleSheet.create({
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
