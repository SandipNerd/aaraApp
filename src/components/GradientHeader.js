import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';

const GradientHeader = props => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    colors={['#5376da', '#8755e8']}
    style={styles.linearGradient}>
    <Ionicons name="menu" size={30} color="#fff" />
    <View style={styles.header}>
      <Ionicons
        name="search-outline"
        size={30}
        color="#fff"
        style={{marginHorizontal: 10}}
      />
      <Ionicons name="funnel-outline" size={30} color="#fff" />
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  linearGradient: {
    height: '13%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default GradientHeader;
