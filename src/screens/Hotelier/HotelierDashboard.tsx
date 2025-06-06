// src/screens/hotelier/HotelierDashboard.tsx
import React from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {dashboardStore, persistor} from '../../store/dashboard';

const HotelierDashboard = () => (
  <Provider store={dashboardStore}>
    <PersistGate loading={null} persistor={persistor}>
      <Text>Welcome</Text>
    </PersistGate>
  </Provider>
);

export default HotelierDashboard;
