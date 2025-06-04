// src/screens/auth/SignupScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Haptics from 'react-native-haptic-feedback';
import {signup} from '../../api/authApi';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthStack';
import styles from './authStyles';

type Props = StackScreenProps<AuthStackParamList, 'Signup'>;
const haptic = () =>
  Haptics.trigger('impactLight', {enableVibrateFallback: true});

const SignupScreen: React.FC<Props> = ({navigation}) => {
  const color = useColorScheme();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [cpass, setCpass] = useState('');

  const create = async () => {
    if (!email || !phone || !name || !password) {
      Toast.show({type: 'error', text1: 'Fill all fields'});
      haptic();
      return;
    }
    if (password !== cpass) {
      Toast.show({type: 'error', text1: 'Passwords do not match'});
      haptic();
      return;
    }
    try {
      await signup(email, phone, name, password);
      Toast.show({type: 'success', text1: 'Account created'});
      navigation.replace('Login');
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Signup failed',
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
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Welcome to Travifai</Text>

          <View style={styles.row}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#77559990"
              style={[styles.input, styles.half]}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#77559990"
              style={[styles.input, styles.half]}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TextInput
            placeholder="Email ID"
            placeholderTextColor="#77559990"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#77559990"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPass}
          />
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#77559990"
            style={styles.input}
            secureTextEntry
            value={cpass}
            onChangeText={setCpass}
          />

          <TouchableOpacity style={styles.button} onPress={create}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkAlt}>
              Have an account? <Text style={styles.link}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default SignupScreen;
