import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSession = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');
    const hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro');
    return {token, role, hasSeenIntro};
  } catch (error) {
    console.error('Error getting session:', error);
    return {token: null, role: null, hasSeenIntro: null};
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.multiRemove(['token', 'role', 'hasSeenIntro']);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};
