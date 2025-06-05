import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  percent: number; // 0‑100
}

const ProgressHeader: React.FC<Props> = ({percent}) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>Profile completion: {percent.toFixed(0)}%</Text>
    <View style={styles.bar}>
      <View style={[styles.fill, {width: `${percent}%`}]} />
    </View>
  </View>
);

export default ProgressHeader;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  label: {
    marginBottom: 4,
    color: '#8452C7',
    fontWeight: '600',
  },
  bar: {
    height: 14,
    backgroundColor: '#ddd',
    borderRadius: 7,
  },
  fill: {
    flex: 1,
    backgroundColor: '#8452C7',
  },
});
