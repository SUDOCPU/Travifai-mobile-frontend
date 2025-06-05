import React from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {saveTile} from '../../../store/dashboard/onboardingSlice';
import {RootState} from '../../../store/dashboard';

const schema = Yup.object().shape({
  amenities: Yup.string().required('Required'),
});

const AmenitiesScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {data} = useSelector((state: RootState) => state.onboarding);

  return (
    <Formik
      initialValues={data.amenities || {amenities: ''}}
      validationSchema={schema}
      onSubmit={values => {
        dispatch(saveTile({tile: 'amenities', payload: values}));
        navigation.goBack();
      }}>
      {({handleChange, handleSubmit, values}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="List of Amenities (comma separated)"
            value={values.amenities}
            onChangeText={handleChange('amenities')}
          />
          <Button title="Save" onPress={handleSubmit as any} />
        </View>
      )}
    </Formik>
  );
};

export default AmenitiesScreen;

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
