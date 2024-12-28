import React from 'react';
import { TextInput } from 'react-native';
import styles from './scripts.js';

const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <TextInput
    style={styles.searchBar}
    placeholder="Search..."
    value={searchQuery}
    onChangeText={setSearchQuery}
  />
);

export default SearchBar;