import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {dashboardStore} from './src/store/dashboard';

const App = () => {
  return (
    <Provider store={dashboardStore}>
      <NavigationContainer>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
