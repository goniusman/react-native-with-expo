import React from 'react';
import VerticalList from './lists/VerticalList';

const PoliticalPosts = ({ data }) => {
  return <VerticalList title='Political Posts' data={data} />;
};

export default PoliticalPosts;
