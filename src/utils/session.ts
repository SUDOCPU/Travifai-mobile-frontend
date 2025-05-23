import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSession = async (userType: string) => {
  await AsyncStorage.setItem('userType', userType);
  await AsyncStorage.setItem('isLoggedIn', 'true');
};

export const getSession = async () => {
  const userType = await AsyncStorage.getItem('userType');
  const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
  return {userType, isLoggedIn: isLoggedIn === 'true'};
};

export const clearSession = async () => {
  await AsyncStorage.clear();
};
