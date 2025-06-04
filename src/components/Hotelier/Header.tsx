import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useUser} from '../../context/UserContext';

const Header = () => {
  const {hotelName} = useUser();

  return (
    <View style={styles.header}>
      <Text style={styles.name}>{hotelName || 'Hotel Name'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#f7e4e1',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Header;
