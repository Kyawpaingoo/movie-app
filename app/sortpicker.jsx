import React from 'react';
import { Picker } from '@react-native-picker/picker';
import styles from './scripts.js';

const SortPicker = ({ selectedSortOption, setSelectedSortOption, sortOptions }) => (
  <Picker
    selectedValue={selectedSortOption}
    style={styles.sortPicker}
    onValueChange={(itemValue) => setSelectedSortOption(itemValue)}
  >
    {sortOptions.map((option) => (
      <Picker.Item key={option.id} label={option.label} value={option.id} />
    ))}
  </Picker>
);

export default SortPicker;