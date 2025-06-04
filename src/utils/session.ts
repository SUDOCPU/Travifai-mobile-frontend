import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@travifai_token';
const ROLE_KEY = '@travifai_role';
const ROLE_FLAG = '@travifai_hasPickedRole';

export const saveRole = async (role: string) => {
  await AsyncStorage.multiSet([
    [ROLE_KEY, role],
    [ROLE_FLAG, 'true'],
  ]);
};

export const createSessionToken = async () => {
  const token =
    'T-' +
    Date.now().toString(36) +
    '-' +
    Math.random().toString(36).slice(2, 8);

  await AsyncStorage.setItem('@travifai_token', token);
  return token;
};

// export const saveAuthData = async (token?: string, role?: string) => {
//   try {
//     if (!token || !role) {
//       console.warn(
//         `saveAuthData called with missing value: ${token} , ${role}`,
//       );
//       return;
//     }
//     await AsyncStorage.multiSet([
//       ['@travifai_token', token],
//       ['@@travifai_role', role],
//     ]);
//   } catch (error) {
//     console.error('Error Storing auth Data', error);
//   }
// };

export const getAuthData = async () => {
  const [[, token], [, role]] = await AsyncStorage.multiGet([
    TOKEN_KEY,
    ROLE_KEY,
  ]);
  return {token, role};
};

export const clearAuthData = async () => {
  await AsyncStorage.multiRemove([TOKEN_KEY, ROLE_KEY]);
};

export const devReset = async () => {
  await AsyncStorage.multiRemove([
    '@travifai_token',
    '@travifai_role',
    '@travifai_hasPickedRole',
  ]);
};
