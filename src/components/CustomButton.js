import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

const CustomButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.click}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#7f00ff', '#e100ff']}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: width / 3,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CustomButton;
