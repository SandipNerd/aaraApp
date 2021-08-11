import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  ActivityIndicatorBase,
} from 'react-native';

import GradientHeader from '../components/GradientHeader';
import JobItem from '../components/JobItem';

const HomeScreen = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        'https://career-finder.aaratechnologies.in/job/api/all_job',
      );
      const result = await res.json();
      console.log(result.data);
      setData(result.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Error while loading the data');
    }
  };

  const renderJobs = ({item}) => {
    return (
      <JobItem
        designation={item.designation}
        author={item.author}
        exp={item.exp}
        location={item.job_location}
        technology={item.technology}
      />
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1}}>
        <GradientHeader />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#7f00ff" />
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <GradientHeader />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderJobs}
        contentContainerStyle={{padding: 20}}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
    </View>
  );
};

export default HomeScreen;
