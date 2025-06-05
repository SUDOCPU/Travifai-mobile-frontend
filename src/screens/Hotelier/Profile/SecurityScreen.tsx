import React from 'react';
import {View, StyleSheet, Button, TextInput} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {saveTile} from '../../../store/dashboard/onboardingSlice';
import {RootState} from '../../../store/dashboard';

const schema = Yup.object().shape({
  cctvAvailable: Yup.string().required('Required'),
  fireSafety: Yup.string().required('Required'),
});

const SecurityScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {data} = useSelector((state: RootState) => state.onboarding);

  return (
    <Formik
      initialValues={data.security || {cctvAvailable: '', fireSafety: ''}}
      validationSchema={schema}
      onSubmit={values => {
        dispatch(saveTile({tile: 'security', payload: values}));
        navigation.goBack();
      }}>
      {({handleChange, handleSubmit, values}) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="CCTV Available? (Yes/No)"
            value={values.cctvAvailable}
            onChangeText={handleChange('cctvAvailable')}
          />
          <TextInput
            style={styles.input}
            placeholder="Fire Safety Info"
            value={values.fireSafety}
            onChangeText={handleChange('fireSafety')}
          />
          <Button title="Save" onPress={handleSubmit as any} />
        </View>
      )}
    </Formik>
  );
};

export default SecurityScreen;

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
