import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

import {signup, login, sendOtp, verifyOtp} from '../utils/mockAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AuthScreen = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [step, setStep] = useState<'auth' | 'otp'>('auth');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const isDark = useColorScheme() === 'dark';

  const navigation = useNavigation();

  const backgroundImage = isDark
    ? require('../assets/Images/BgImageDarkMode.png')
    : require('../assets/Images/BgImageLightMode.png');

  const handleContinue = async () => {
    // Assume user check or API call here
    if (phoneNumber.trim().length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    await sendOtp(phoneNumber); // this logs the OTP
    try {
      const response =
        mode === 'signup'
          ? await signup(phoneNumber, 'user') // assuming 'user' as default role
          : await login(phoneNumber);

      if (response.success) {
        setStep('otp');
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    const isValid = await verifyOtp(phoneNumber, enteredOtp);

    if (isValid) {
      try {
        const role = await AsyncStorage.getItem('role');
        if (role === 'Hotelier') {
          navigation.navigate('HotelierDashboard' as never);
        } else if (role === 'Traveler') {
          navigation.navigate('TravellerDashboard' as never);
        } else if (role === 'Travel Agency') {
          navigation.navigate('TravelAgencyDashboard' as never);
        } else if (role === 'Taxi Driver') {
          navigation.navigate('TaxiDashboard' as never);
        } else {
          alert('Unknown role in storage.');
        }
      } catch (err) {
        console.error('Error retrieving role:', err);
      }
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 3) otpInputs[index + 1].current?.focus();
  };

  const handleBackspace = (index: number) => {
    if (otp[index] === '' && index > 0) {
      otpInputs[index - 1].current?.focus();
    }
  };

  const renderAuthForm = () => (
    <KeyboardAvoidingView
      style={mode === 'signup' ? styles.signupContainer : styles.loginContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>
        {mode === 'login' ? 'Login' : 'Sign up for hassle-free booking'}
      </Text>
      {mode === 'signup' && (
        <Text style={styles.subtext}>
          Enter your phone number. We’ll send you an OTP to verify.
        </Text>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="+91 9820665935"
          placeholderTextColor="#555"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {phoneNumber.length > 0 && (
          <TouchableOpacity onPress={() => setPhoneNumber('')}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>
          {mode === 'login' ? 'CONTINUE' : 'GET OTP'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        <Text style={styles.switchMode}>
          {mode === 'login'
            ? 'New here? Sign up'
            : 'Already have an account? Log in'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );

  const renderOtpForm = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.otpContainer}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtext}>
        We are detecting the SMS sent to ******{phoneNumber.slice(-4)}
      </Text>
      <Text style={styles.mobileLabel}>Mobile Number</Text>
      <View style={styles.row}>
        <Text style={styles.mobileNumber}>+91 {phoneNumber}</Text>
        <TouchableOpacity onPress={() => setStep('auth')}>
          <Image
          // source={require('../assets/Images/edit_icon.png')}
          // style={{width: 16, height: 16}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={otpInputs[index]}
            value={digit}
            style={[styles.otpBox, digit ? styles.otpFilled : styles.otpEmpty]}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={val => handleOtpChange(index, val)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') handleBackspace(index);
            }}
          />
        ))}
      </View>

      <Text style={styles.resendText}>
        Didn’t receive the OTP?{' '}
        <Text style={styles.resendLink}>RESEND OTP</Text>
      </Text>
      <TouchableOpacity
        style={[styles.button, {marginTop: 24}]}
        onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>VERIFY</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );

  if (step === 'auth') {
    return mode === 'login' ? (
      <ImageBackground source={backgroundImage} style={styles.background}>
        {renderAuthForm()}
      </ImageBackground>
    ) : (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {renderAuthForm()}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      {renderOtpForm()}
    </ScrollView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  loginContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  signupContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  clearText: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#775599',
    paddingVertical: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  switchMode: {
    fontSize: 14,
    color: '#775599',
    textAlign: 'center',
    marginTop: 18,
    fontWeight: '600',
  },
  otpContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mobileLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  mobileNumber: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  otpBox: {
    width: SCREEN_WIDTH / 6,
    height: 60,
    borderRadius: 12,
    fontSize: 24,
    textAlign: 'center',
  },
  otpEmpty: {
    backgroundColor: '#e6ecec',
  },
  otpFilled: {
    backgroundColor: '#8452C7',
    color: '#fff',
  },
  resendText: {
    textAlign: 'center',
    marginTop: 14,
    fontSize: 14,
    color: '#666',
  },
  resendLink: {
    color: '#8452C7',
    fontWeight: '600',
  },
});
