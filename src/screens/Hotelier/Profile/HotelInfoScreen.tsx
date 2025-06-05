import React from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {saveTile} from '../../../store/dashboard/onboardingSlice';
import {RootState} from '../../../store/dashboard';

const schema = Yup.object().shape({
  hotelName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
});

const HotelInfoScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {data} = useSelector((state: RootState) => state.onboarding);

  return (
    <Formik
      initialValues={data.hotel || {hotelName: '', address: ''}}
      validationSchema={schema}
      onSubmit={values => {
        dispatch(saveTile({tile: 'hotel', payload: values}));
        navigation.goBack();
      }}>
      {({handleChange, handleSubmit, values}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Hotel Name"
            value={values.hotelName}
            onChangeText={handleChange('hotelName')}
          />
          <TextInput
            style={styles.input}
            placeholder="Hotel Address"
            value={values.address}
            onChangeText={handleChange('address')}
          />
          <Button title="Save" onPress={handleSubmit as any} />
        </View>
      )}
    </Formik>
  );
};

export default HotelInfoScreen;

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
