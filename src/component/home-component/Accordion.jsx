import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import THEMECOLOR from '../../utilities/color';

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
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 1,
      }}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={{marginBottom: 15}}>
          <Text
            style={{
              color: THEMECOLOR.textColor,
              fontSize: 14,
              //   textAlign: 'center',
              fontFamily: 'Montserrat-Medium',
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
      <Animated.View style={{height: height}}>
        <View>{children}</View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
