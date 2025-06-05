import React from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {saveTile} from '../../../store/dashboard/onboardingSlice';
import {RootState} from '../../../store/dashboard';

const schema = Yup.object().shape({
  roomTypes: Yup.string().required('Required'),
  pricePerNight: Yup.string().required('Required'),
});

const RoomInfoScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {data} = useSelector((state: RootState) => state.onboarding);

  return (
    <Formik
      initialValues={data.room || {roomTypes: '', pricePerNight: ''}}
      validationSchema={schema}
      onSubmit={values => {
        dispatch(saveTile({tile: 'room', payload: values}));
        navigation.goBack();
      }}>
      {({handleChange, handleSubmit, values}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Room Types (e.g. Deluxe, Suite)"
            value={values.roomTypes}
            onChangeText={handleChange('roomTypes')}
          />
          <TextInput
            style={styles.input}
            placeholder="Price per night"
            keyboardType="numeric"
            value={values.pricePerNight}
            onChangeText={handleChange('pricePerNight')}
          />
          <Button title="Save" onPress={handleSubmit as any} />
        </View>
      )}
    </Formik>
  );
};

export default RoomInfoScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  input: {
    borderWidth: 1,
    borderColor: '#8452C7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
});
