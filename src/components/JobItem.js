import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const JobItem = props => {
  return (
    <TouchableNativeFeedback>
      <View style={styles.card}>
        <Text style={styles.designation}>{props.designation}</Text>
        <Text style={styles.organisation}>{props.author}</Text>
        <View style={[styles.row, {marginVertical: 10}]}>
          <View style={[styles.row, styles.detail]}>
            <Ionicons name="briefcase-outline" size={14} color="#616161" />
            <Text style={styles.exp}>{props.exp}</Text>
          </View>
          <View style={[styles.row, styles.detail]}>
            <Ionicons name="location-sharp" size={15} color="#616161" />
            <Text style={styles.location}>{props.location}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Ionicons name="information-circle-outline" size={20} />
          <Text style={styles.tech}>{props.technology}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    backgroundColor: '#e1e1e3',
    marginRight: 10,
    paddingHorizontal: 5,
    borderRadius: 30,
    width: 80,
  },
  designation: {
    fontSize: 18,
  },
  organisation: {
    fontSize: 16,
    color: '#7e7e7e',
    marginTop: 5,
  },
  tech: {
    marginHorizontal: 5,
  },
});

export default JobItem;
