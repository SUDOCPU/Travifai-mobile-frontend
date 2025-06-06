// src/screens/Onboarding/PersonalInfoScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {savePersonal} from '../../../store/dashboard/hotelierSlice';
import {RootState} from '../../../store/dashboard';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid phone number')
    .required('Phone number is required'),
});

const PersonalInfoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const personal = useSelector((state: RootState) => state.hotelier.personal);

  return (
    <View style={styles.container}>
      {/* Back Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <View style={{width: 20}} />
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Formik
          initialValues={personal}
          validationSchema={validationSchema}
          onSubmit={values => {
            dispatch(savePersonal(values));
            navigation.navigate('Onboarding'); // Or next screen
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* Full Name */}
              <View style={styles.inputCard}>
                <FontAwesome5Icon name="user" size={16} style={styles.icon} />
                <TextInput
                  placeholder="Enter Full Name"
                  style={styles.input}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                />
              </View>
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              {/* Phone Number */}
              <View style={styles.inputCard}>
                <FontAwesome5Icon
                  name="phone-alt"
                  size={16}
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter Phone Number"
                  style={styles.input}
                  keyboardType="numeric"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                />
              </View>
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              {/* Save Button */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDEEEE',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
  },
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
    color: '#555',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    color: '#d9534f',
    marginBottom: 8,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
