import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CalendarPicker from 'react-native-calendar-picker';
import {taskList} from '../../data/global-data';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';

const Schedules = ({vendorData}) => {
  // console.log('vendorData in service scheduke page', vendorData);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskObject, setTaskObject] = useState({});

  const toggleModal = task => {
    setModalVisible(true);
    setTaskObject(task);
  };

  const handleDateChange = date => {
    setSelectedDate(date.toString()); // Convert to string or any format you need
    // console.log('Selected Date:', date.toString());
  };

  // console.log('selectedDate', selectedDate);
  const formattedDate = moment(selectedDate).format('DD/MM/YYYY');
  const findSelectedTask = taskList.filter(
    ele => moment(ele.ordered_date).format('DD/MM/YYYY') === formattedDate,
  );
  // console.log('findSelectedTask', findSelectedTask);
  const makeACall = () => {
    Linking.openURL(`tel:${taskObject?.receiver_mobilenumber}`);
  };

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 13,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{fontSize: 18, fontFamily: 'Montserrat-Bold', color: 'black'}}>
          Schedules
        </Text>
      </View>
      <View style={{height: '100%', padding: 15}}>
        <ScrollView style={{marginBottom: 50}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                flex: 0.6,
                backgroundColor: 'white',
                borderRadius: 9,
                padding: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 17,
                  marginBottom: 5,
                  fontFamily: 'Montserrat-Bold',
                }}>
                <AntDesign name="calendar" color="black" size={20} /> Today
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginBottom: 5,
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Medium',
                }}>
                {moment().format('ll')}
              </Text>
            </View>
            <View
              style={{
                flex: 0.6,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  marginBottom: 5,
                  fontFamily: 'Montserrat-Bold',
                  textAlign: 'center',
                }}>
                Your
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  marginBottom: 5,
                  fontFamily: 'Montserrat-Bold',
                  textAlign: 'center',
                }}>
                Schedules
              </Text>
            </View>
          </View>
          <View style={{marginTop: 30}}>
            <CalendarPicker
              onDateChange={handleDateChange}
              selectedDayColor="#7300e6"
              selectedDayTextColor="#ffffff"
              textStyle={{color: 'black', fontFamily: 'Montserrat-Medium'}}
            />
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'Montserrat-Bold',
              marginBottom: 10,
              marginTop: 20,
            }}>
            Task List
          </Text>
          {findSelectedTask.length === 0 ? (
            <Text
              style={{
                color: '#505050',
                fontSize: 12,
                marginBottom: 5,
                fontFamily: 'Montserrat-SemiBold',
                textAlign: 'center',
                marginTop: 20,
              }}>
              No Event for {formattedDate}
            </Text>
          ) : (
            <>
              {findSelectedTask.map(task => (
                <TouchableOpacity
                  key={task._id}
                  onPress={() => toggleModal(task)}
                  style={{
                    backgroundColor: 'white',
                    marginBottom: 5,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: '#cd126a',
                      fontSize: 10,
                      marginBottom: 5,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    <Entypo name="calendar" color="#cd126a" size={10} />{' '}
                    {moment(task.ordered_date).format('lll')}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      marginBottom: 5,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    <MaterialIcons
                      name="business-center"
                      color="black"
                      size={12}
                    />{' '}
                    {task.event_name}
                  </Text>
                  <Text
                    style={{
                      color: '#505050',
                      fontSize: 12,
                      marginBottom: 5,
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    <Octicons name="organization" color="#505050" size={12} />{' '}
                    {task.company_name}
                  </Text>
                  <Text
                    style={{
                      color: '#505050',
                      fontSize: 12,
                      marginBottom: 5,
                      fontFamily: 'Montserrat-Medium',
                    }}>
                    <Entypo name="location-pin" color="#505050" size={14} />{' '}
                    {task.delivery_address}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </View>
      <Modal
        isVisible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          margin: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <View style={{flex: 1, padding: 10}}>
          <TouchableOpacity
            style={{position: 'absolute', right: 10, padding: 10}}
            onPress={() => setModalVisible(false)}>
            <Ionicons name="close-circle" color="#505050" size={25} />
          </TouchableOpacity>

          <View style={{padding: 10}}>
            <Text
              style={{
                color: '#cd126a',
                fontSize: 10,
                marginBottom: 5,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              <Entypo name="calendar" color="#cd126a" size={10} />{' '}
              {moment(taskObject.ordered_date).format('lll')}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                marginBottom: 5,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              <MaterialIcons name="business-center" color="black" size={12} />{' '}
              {taskObject.event_name}
            </Text>
            <Text
              style={{
                color: '#505050',
                fontSize: 12,
                marginBottom: 5,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              <Octicons name="organization" color="#505050" size={12} />{' '}
              {taskObject.company_name}
            </Text>
            <Text
              style={{
                color: '#505050',
                fontSize: 12,
                marginBottom: 5,
                fontFamily: 'Montserrat-Medium',
              }}>
              <Entypo name="location-pin" color="#505050" size={14} />{' '}
              {taskObject.delivery_address}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Text
                style={{
                  color: '#505050',
                  fontSize: 12,
                  marginBottom: 5,
                  fontFamily: 'Montserrat-Medium',
                }}>
                <AntDesign name="user" color="#505050" size={13} />{' '}
                {taskObject.user_name}{' '}
              </Text>
              <TouchableOpacity onPress={makeACall}>
                <Text
                  style={{
                    color: '#505050',
                    fontSize: 12,
                    marginBottom: 5,
                    fontFamily: 'Montserrat-Medium',
                    marginLeft: 10,
                  }}>
                  <Feather name="phone-call" color="#505050" size={12} /> +91-
                  {taskObject?.receiver_mobilenumber}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Schedules;
