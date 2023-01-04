import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../misc/colors';

const SearchBar = ({ containerStyle }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput style={styles.SearchBar} placeholder="Search here" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  SearchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
});

export default SearchBar;
