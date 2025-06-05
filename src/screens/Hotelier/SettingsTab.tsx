import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DevBackdoor from '../../components/DevBackdoor';

const SettingsTab = () => {
  return (
    <View style={styles.screenBackground}>
      <Text>SettingsTab</Text>
      <DevBackdoor />
    </View>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: '#000',
    height: '100%',
  },
});
