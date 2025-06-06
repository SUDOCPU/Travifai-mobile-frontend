import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TileProgressBar = ({progress = 0}: {progress: number}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.filled, {width: `${progress}%`}]} />
      <Text style={styles.text}>{progress}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    width: 80,
    height: 8,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  filled: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  text: {
    fontSize: 12,
    position: 'absolute',
    right: -30,
    top: -6,
    color: '#555',
  },
});

export default TileProgressBar;
