import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useUser} from '../../../context/UserContext';

const MyProfile = () => {
  const {hotelName, setHotelName} = useUser();
  const [name, setName] = useState(hotelName);

  return (
    <View>
      <Text style={styles.label}>Hotel Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => {
          setName(text);
          setHotelName(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {fontSize: 16, marginTop: 10},
  input: {borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 5},
});

export default MyProfile;
