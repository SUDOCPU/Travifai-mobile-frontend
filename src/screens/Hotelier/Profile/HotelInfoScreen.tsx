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
import Icon from 'react-native-vector-icons/FontAwesome5';
import {saveHotel} from '../../../store/dashboard/hotelierSlice';
import {RootState} from '../../../store/dashboard';
import {useNavigation} from '@react-navigation/native';

const HotelInfoSchema = Yup.object().shape({
  hotelName: Yup.string().required('Hotel name is required'),
  address: Yup.string().required('Address is required'),
});

const HotelInfoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {hotel} = useSelector((state: RootState) => state.hotelier);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Navigation */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Property Information</Text>

      <Formik
        initialValues={hotel}
        validationSchema={HotelInfoSchema}
        onSubmit={values => {
          dispatch(saveHotel(values));
          navigation.navigate('Onboarding'); // Move to next step
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
            <View style={styles.inputCard}>
              <Icon name="hotel" size={16} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter Hotel Name"
                onChangeText={handleChange('hotelName')}
                onBlur={handleBlur('hotelName')}
                value={values.hotelName}
              />
            </View>
            {touched.hotelName && errors.hotelName && (
              <Text style={styles.error}>{errors.hotelName}</Text>
            )}

            <View style={styles.inputCard}>
              <Icon name="map-marker-alt" size={16} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Enter Hotel Address"
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
            </View>
            {touched.address && errors.address && (
              <Text style={styles.error}>{errors.address}</Text>
            )}

            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
              <Text style={styles.submitText}>Save and Continue</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default HotelInfoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDEBED',
    padding: 16,
    flexGrow: 1,
  },
  backButton: {
    marginBottom: 10,
    padding: 6,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
    color: '#FF69B4',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 8,
  },
  submitBtn: {
    backgroundColor: '#FF69B4',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
