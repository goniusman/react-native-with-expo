import React from 'react';
import { View, StyleSheet } from 'react-native';
import HorizotalList from './lists/HorizotalList';

const TechPosts = ({ data }) => {
  return <HorizotalList key="techposts" title='Tech Posts' data={data} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default TechPosts;
