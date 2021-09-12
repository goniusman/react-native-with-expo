import React from 'react';
import { View, StyleSheet } from 'react-native';
import HorizotalList from './lists/HorizotalList';

const BreakingPosts = ({ data }) => {
  return <HorizotalList title='Breaking Posts' data={data} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default BreakingPosts;
