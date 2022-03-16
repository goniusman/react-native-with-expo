import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import SearchModel from '../components/common/SearchModel';
// import postsApi from '../api/postsApi';

import client from "../api/client"; 

import postsApi from "../api/postsApi";

let timeOutId;

const debounce = (func, delay) => {
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const SearchBar = ({ setSearchFocused }) => {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [notFound, setNotFound] = useState('');

  const handleChange = ({ nativeEvent }) => {
    const { text } = nativeEvent;
    setQuery(text);
    setVisible(true);
    debounceSearch(query);
  };

  const handleSearch = async value => {
    // console.log(value);
    const res = await postsApi.searchPost(value);
    // console.log(`/post/search/${value}`)
    // console.log(res)
    if (res.data.success) {
      setNotFound('');
      // console.log(res)
      setData(res.data.post); 
    }

    if (!res.data.success) {
      setNotFound(res.data.message);
    }
  };

  const debounceSearch = debounce(handleSearch, 1000);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          value={query}
          style={styles.searchInput}
          placeholder='Search here..'
          onChange={handleChange}
          onFocus={() => {
            setSearchFocused(true);
          }}
          onBlur={() => {
            setSearchFocused(false);
            setQuery('');
            setVisible(false);
            setData([]);
            setNotFound('');
          }}
        />
      </View>
      <SearchModel visible={visible} data={data} notFound={notFound} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchInput: {
    width: '100%',
    height: '100%',
    paddingLeft: 8,
    fontSize: 16,
  },
});

export default SearchBar;
