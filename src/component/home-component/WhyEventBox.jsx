import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default function WhyEventBox() {
  return (
    <View>
      {/* <View style={{}}> */}

      <LinearGradient
        style={styles.gradientBox}
        colors={['#20c5ad', '#b2d76566']}>
        <View style={{flex: 0.6}}>
          <Text style={styles.gradientText}>Expand your reach</Text>
          <Text style={styles.gradientTextHelp}>
            Reach more event planners who need your awesome products.
          </Text>
        </View>
        <View style={{flex: 0.4}}>
          <Image
            source={require('../../../assets/alignment.png')}
            style={styles.image}
          />
        </View>
      </LinearGradient>
      <LinearGradient
        style={styles.gradientBox}
        colors={['#20c5ad', '#b2d76566']}>
        <View style={{flex: 0.4}}>
          <Image
            source={require('../../../assets/inventory.png')}
            style={styles.image}
          />
        </View>
        <View style={{flex: 0.6}}>
          <Text style={styles.gradientText}>Easy Management</Text>
          <Text style={styles.gradientTextHelp}>
            Manage your listings and bookings effortlessly.
          </Text>
        </View>
      </LinearGradient>
      <LinearGradient
        style={styles.gradientBox}
        colors={['#20c5ad', '#b2d76566']}>
        <View style={{flex: 0.6}}>
          <Text style={styles.gradientText}>Trustworthy Platform</Text>
          <Text style={styles.gradientTextHelp}>
            Join a platform that event planners trust for their needs.
          </Text>
        </View>
        <View style={{flex: 0.4}}>
          <Image
            source={require('../../../assets/reliability.png')}
            style={styles.image}
          />
        </View>
      </LinearGradient>
      <LinearGradient
        style={styles.gradientBox}
        colors={['#20c5ad', '#b2d76566']}>
        <View style={{flex: 0.4}}>
          <Image
            source={require('../../../assets/trend.png')}
            style={styles.image}
          />
        </View>
        <View style={{flex: 0.6}}>
          <Text style={styles.gradientText}>Boost sales and rentals</Text>
          <Text style={styles.gradientTextHelp}>
            Rent and sale your products and Turn your inventory into revenue.
          </Text>
        </View>
      </LinearGradient>
      {/* </View> */}
      {/* <LinearGradient
          colors={['#20c5ad', '#b2d76566']}
          style={styles.gradientBox}>
          <Text style={styles.gradientText}>Trustworthy Platform</Text>
          <Text style={styles.gradientTextHelp}>
            Join a platform that event planners trust for their needs.
          </Text>
        </LinearGradient> */}

      {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <LinearGradient
          style={styles.gradientBox}
          colors={['#20c5ad', '#b2d76566']}>
          <Text style={styles.gradientText}>Expand your reach</Text>
          <Text style={styles.gradientTextHelp}>
            Reach more event planners who need your awesome products.
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={['#20c5ad', '#b2d76566']}
          style={styles.gradientBox}>
          <Text style={styles.gradientText}>Trustworthy Platform</Text>
          <Text style={styles.gradientTextHelp}>
            Join a platform that event planners trust for their needs.
          </Text>
        </LinearGradient>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 2,
          justifyContent: 'space-between',
        }}>
        <LinearGradient
          style={styles.gradientBox}
          colors={['#20c5ad', '#b2d76566']}>
          <Text style={styles.gradientText}>Easy Management</Text>
          <Text style={styles.gradientTextHelp}>
            Manage your listings and bookings effortlessly.
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={['#20c5ad', '#b2d76566']}
          style={styles.gradientBox}>
          <Text style={styles.gradientText}>Boost sales and rentals</Text>
          <Text style={styles.gradientTextHelp}>
            Rent and sale your products and Turn your inventory into revenue.
          </Text>
        </LinearGradient>
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  gradientBox: {
    // flex: 0.6,
    borderRadius: 15,
    flexDirection: 'row',
    // margin: 2,
    padding: 10,
    // height: 150,
    alignItems: 'center',
  },
  gradientText: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
  gradientTextHelp: {
    color: 'black',
    fontSize: 13,
    fontFamily: 'Montserrat-Medium',
  },
  image: {
    width: 100,
    height: 100,
  },
});
