// src/screens/hotelier/HotelierDashboard.tsx
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import HotelierTabs from '../../navigation/HotelierTabs';
import {dashboardStore, persistor} from '../../store/dashboard';

const HotelierDashboard = () => (
  <Provider store={dashboardStore}>
    <PersistGate loading={null} persistor={persistor}>
      <HotelierTabs />
    </PersistGate>
  </Provider>
);

export default HotelierDashboard;
