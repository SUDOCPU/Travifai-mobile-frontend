// src/screens/auth/ForgotPasswordScreen.tsx
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
import {forgotPassword} from '../../api/authApi';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthStack';
import styles from './authStyles';

type Props = StackScreenProps<AuthStackParamList, 'ForgotPassword'>;
export const bgImg = (mode: string | null) =>
  mode === 'dark'
    ? require('../../assets/Images/BgImageDarkMode.png')
    : require('../../assets/Images/BgImageLightMode.png');

const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  const mode = useColorScheme();
  const [email, setEmail] = useState('');

  const send = async () => {
    if (!email) return Toast.show({type: 'error', text1: 'Enter email'});
    try {
      await forgotPassword(email);
      Toast.show({type: 'success', text1: 'OTP sent to email'});
      navigation.navigate('OtpVerification', {email});
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
        <Text style={styles.title}>Forgot Password</Text>
        <TextInput
          placeholder="Enter registered email"
          placeholderTextColor="#77559990"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={send}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default ForgotPasswordScreen;
