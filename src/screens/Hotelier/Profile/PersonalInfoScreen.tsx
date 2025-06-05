import React from 'react';
import {View, StyleSheet, Button, TextInput, Text} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {saveTile} from '../../../store/dashboard/onboardingSlice';
import {RootState} from '../../../store/dashboard';

const schema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
});

const PersonalInfoScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  // FIX: Use RootState (not DashboardState)
  const onboarding = useSelector((state: RootState) => state.onboarding);

  const initialValues = onboarding?.data?.personal || {
    fullName: '',
    phone: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={values => {
        dispatch(saveTile({tile: 'personal', payload: values}));
        navigation.goBack();
      }}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={values.fullName}
            onChangeText={handleChange('fullName')}
          />
          {touched.fullName && errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
            value={values.phone}
            onChangeText={handleChange('phone')}
          />
          {touched.phone && errors.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}

          <Button title="Save" onPress={handleSubmit as any} />
        </View>
      )}
    </Formik>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  input: {
    borderWidth: 1,
    borderColor: '#8452C7',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 4,
  },
});
