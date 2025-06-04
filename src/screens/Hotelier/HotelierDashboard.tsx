import React from 'react';
import {UserProvider} from '../../context/UserContext';
import DashboardLayout from '../../components/Hotelier/pages/DashboardLayout';
import DevBackdoor from '../../components/DevBackdoor';

const HotelierDashboard = () => (
  <UserProvider>
    <DashboardLayout />
    <DevBackdoor />
  </UserProvider>
);

export default HotelierDashboard;
