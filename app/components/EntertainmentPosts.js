import React from 'react';
import VerticalList from './lists/VerticalList';

const EntertainmentPosts = ({ data }) => {
  return <VerticalList key="enter" title='Entertainment Posts' data={data} />;
};

export default EntertainmentPosts;
