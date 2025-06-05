import React from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {saveTile} from '../../../store/dashboard/onboardingSlice';
import {RootState} from '../../../store/dashboard';

const schema = Yup.object().shape({
  landmarks: Yup.string().required('Required'),
  distanceToAirport: Yup.string().required('Required'),
});

const NearbyScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {data} = useSelector((state: RootState) => state.onboarding);

  return (
    <Formik
      initialValues={data.nearby || {landmarks: '', distanceToAirport: ''}}
      validationSchema={schema}
      onSubmit={values => {
        dispatch(saveTile({tile: 'nearby', payload: values}));
        navigation.goBack();
      }}>
      {({handleChange, handleSubmit, values}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Nearby Landmarks"
            value={values.landmarks}
            onChangeText={handleChange('landmarks')}
          />
          <TextInput
            style={styles.input}
            placeholder="Distance to Airport (in km)"
            keyboardType="numeric"
            value={values.distanceToAirport}
            onChangeText={handleChange('distanceToAirport')}
          />
          <Button title="Save" onPress={handleSubmit as any} />
        </View>
      )}
    </Formik>
  );
};

export default NearbyScreen;

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
