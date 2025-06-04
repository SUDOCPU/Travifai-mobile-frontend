// src/screens/auth/LoginScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Haptics from 'react-native-haptic-feedback';
import {login} from '../../api/authApi';
import {createSessionToken, getAuthData} from '../../utils/session';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthStack';
import styles from './authStyles';
import DevBackdoor from '../DevBackdoor';

type Props = StackScreenProps<AuthStackParamList, 'Login'>;
const haptic = () =>
  Haptics.trigger('impactLight', {enableVibrateFallback: true});

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const color = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (!email || !password) {
      Toast.show({type: 'error', text1: 'Enter both fields'});
      haptic();
      return;
    }
    try {
      await login(email, password);
      const {role} = await getAuthData();
      const token = await createSessionToken();
      Toast.show({type: 'success', text1: `Welcome back! ${role}`});
      navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: err?.response?.data?.message || 'Server error',
      });
      console.error(err);
      haptic();
    }
  };

  return (
    <ImageBackground
      source={
        color === 'dark'
          ? require('../../assets/Images/BgImageDarkMode.png')
          : require('../../assets/Images/BgImageLightMode.png')
      }
      style={styles.bg}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={[styles.card, color === 'dark' && styles.cardDark]}>
          <Text style={styles.title}>Sign In</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#77559990"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#77559990"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkAlt}>
              New to Travifai? <Text style={styles.link}>Create account</Text>
            </Text>
          </TouchableOpacity>
          <DevBackdoor />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default LoginScreen;
