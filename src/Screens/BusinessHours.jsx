import React, {useState} from 'react';
import {View, Text, Button, ScrollView, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';

const BusinessHours = () => {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // State to manage the start and end times for each day
  const [businessHours, setBusinessHours] = useState({
    Monday: {start: null, end: null},
    Tuesday: {start: null, end: null},
    Wednesday: {start: null, end: null},
    Thursday: {start: null, end: null},
    Friday: {start: null, end: null},
    Saturday: {start: null, end: null},
    Sunday: {start: null, end: null},
  });

  const [currentDay, setCurrentDay] = useState('');
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const showTimePicker = (day, isStart) => {
    setCurrentDay(day);
    if (isStart) {
      setStartTimePickerVisible(true);
    } else {
      setEndTimePickerVisible(true);
    }
  };

  const handleConfirm = (selectedTime, isStart) => {
    setBusinessHours(prevHours => ({
      ...prevHours,
      [currentDay]: {
        ...prevHours[currentDay],
        ...(isStart ? {start: selectedTime} : {end: selectedTime}),
      },
    }));
    if (isStart) {
      setStartTimePickerVisible(false);
    } else {
      setEndTimePickerVisible(false);
    }
  };
  console.log('businessHours', businessHours);

  return (
    <ScrollView style={styles.container}>
      {daysOfWeek.map(day => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayText}>{day}</Text>
          <View style={styles.timeContainer}>
            <Button
              title={
                businessHours[day].start
                  ? businessHours[day].start.toLocaleTimeString()
                  : 'Set Start Time'
              }
              onPress={() => showTimePicker(day, true)}
            />
            <Button
              title={
                businessHours[day].end
                  ? businessHours[day].end.toLocaleTimeString()
                  : 'Set End Time'
              }
              onPress={() => showTimePicker(day, false)}
            />
          </View>
        </View>
      ))}

      {/* Time Picker Modals */}
      <DatePicker
        modal
        open={isStartTimePickerVisible}
        date={businessHours[currentDay]?.start || new Date()}
        mode="time"
        onConfirm={date => handleConfirm(date, true)}
        onCancel={() => setStartTimePickerVisible(false)}
      />

      <DatePicker
        modal
        open={isEndTimePickerVisible}
        date={businessHours[currentDay]?.end || new Date()}
        mode="time"
        onConfirm={date => handleConfirm(date, false)}
        onCancel={() => setEndTimePickerVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  dayContainer: {
    marginBottom: 10,
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default BusinessHours;
