import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {saveTile} from '../../../store/dashboard/onboardingSlice';

const schema = Yup.object().shape({
  usp1: Yup.string().required(),
  usp2: Yup.string().required(),
  usp3: Yup.string().required(),
});

const PropertyUspScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Property Highlights</Text>

      <Formik
        initialValues={{usp1: '', usp2: '', usp3: ''}}
        validationSchema={schema}
        onSubmit={values => {
          dispatch(saveTile({tile: 'usp', payload: values}));
          navigation.navigate('Onboarding');
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            {['usp1', 'usp2', 'usp3'].map((field, index) => (
              <View style={styles.inputCard} key={field}>
                <Icon name="star" size={16} style={styles.icon} />
                <TextInput
                  placeholder={`USP ${index + 1}`}
                  value={values[field]}
                  onChangeText={handleChange(field)}
                  onBlur={handleBlur(field)}
                  style={styles.input}
                />
              </View>
            ))}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
              <Text style={styles.submitText}>Save and Continue</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default PropertyUspScreen;

const styles = StyleSheet.create({
  container: {backgroundColor: '#FDEBED', padding: 16, flexGrow: 1},
  backButton: {marginBottom: 10},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  icon: {marginRight: 10, color: '#FF69B4'},
  input: {flex: 1, fontSize: 16},
  submitBtn: {
    backgroundColor: '#FF69B4',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {color: '#fff', fontWeight: 'bold', fontSize: 16},
});
