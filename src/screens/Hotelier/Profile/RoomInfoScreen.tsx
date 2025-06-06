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
import {saveRoom} from '../../../store/dashboard/hotelierSlice';
import {RootState} from '../../../store/dashboard';
import {useNavigation} from '@react-navigation/native';

const RoomInfoSchema = Yup.object().shape({
  type: Yup.string().required('Room type is required'),
  price: Yup.string().required('Room price is required'),
});

const RoomInfoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {room} = useSelector((state: RootState) => state.hotelier);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Room Information</Text>

      <Formik
        initialValues={room}
        validationSchema={RoomInfoSchema}
        onSubmit={values => {
          dispatch(saveRoom(values));
          navigation.navigate('Onboarding');
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
              <Icon name="bed" size={16} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Room Type (e.g., Deluxe, Suite)"
                onChangeText={handleChange('type')}
                onBlur={handleBlur('type')}
                value={values.type}
              />
            </View>
            {touched.type && errors.type && (
              <Text style={styles.error}>{errors.type}</Text>
            )}

            <View style={styles.inputCard}>
              <Icon name="rupee-sign" size={16} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Room Price"
                keyboardType="numeric"
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
              />
            </View>
            {touched.price && errors.price && (
              <Text style={styles.error}>{errors.price}</Text>
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

export default RoomInfoScreen;

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
