import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import THEMECOLOR from '../../utilities/color';
import Entypo from 'react-native-vector-icons/Entypo';

const Accordion = ({title, children}) => {
  const [expanded, setExpanded] = useState(false);
  const [height] = useState(new Animated.Value(0)); // Initialize the animated value

  const toggleAccordion = () => {
    const initialValue = expanded ? height._value : 0;
    const finalValue = expanded ? 0 : 100; // Adjust this based on your content height

    setExpanded(!expanded);

    Animated.timing(height, {
      toValue: finalValue,
      duration: 300, // Adjust the animation duration as needed
      useNativeDriver: false,
    }).start();
  };

  return (
    <View
      style={{
        marginBottom: 10,
        marginHorizontal: 10,
        // borderBottomColor: '#e2e2e2',
        // borderBottomWidth: 1,
      }}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View
          style={{
            marginBottom: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              fontSize: 14,
              //   textAlign: 'center',
              fontFamily: 'Montserrat-Medium',
            }}>
            {title}
          </Text>
          <Entypo name="chevron-small-down" color="black" size={19} />
        </View>
      </TouchableOpacity>
      <Animated.View style={{height: height}}>
        <View>{children}</View>
      </Animated.View>
      <View
        style={{
          borderBottomColor: '#e2e2e2',
          borderBottomWidth: 1,
        }}></View>
    </View>
  );
};

export default Accordion;
