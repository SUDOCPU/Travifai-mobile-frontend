// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
