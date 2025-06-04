// src/screens/auth/ResetPasswordScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {resetPassword} from '../../api/authApi';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthStack';
import {bgImg} from './ForgotPassword';
import styles from './authStyles';

type Props = StackScreenProps<AuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen: React.FC<Props> = ({navigation, route}) => {
  const mode = useColorScheme();
  const {email, otp} = route.params as any;
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');

  const reset = async () => {
    if (pass !== cpass)
      return Toast.show({type: 'error', text1: 'Passwords do not match'});
    try {
      await resetPassword(email, otp, pass);
      Toast.show({type: 'success', text1: 'Password reset'});
      navigation.popToTop();
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message || 'Server error',
      });
    }
  };

  return (
    <ImageBackground source={bgImg(mode)} style={styles.bg}>
      <View style={[styles.card, mode === 'dark' && styles.cardDark]}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          placeholder="New Password"
          placeholderTextColor="#77559990"
          secureTextEntry
          style={styles.input}
          value={pass}
          onChangeText={setPass}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#77559990"
          secureTextEntry
          style={styles.input}
          value={cpass}
          onChangeText={setCpass}
        />
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.buttonText}>Save Password</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default ResetPasswordScreen;
