// src/navigation/DashboardStack.tsx
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HotelierDashboard from '../screens/Hotelier/HotelierDashboard';
import TravelerDashboard from '../screens/Dashboards/TravelerDashboard';
import TaxiDashboard from '../screens/Dashboards/TaxiDashboard';
import TravelAgencyDashboard from '../screens/Dashboards/TravelAgencyDashboard';
import {getAuthData} from '../utils/session';
// Add others as needed

export type DashboardParamList = {
  HotelierDashboard: undefined;
  TravelerDashboard: undefined;
  TaxiDashboard: undefined;
  TravelAgencyDashboard: undefined;
};

const Stack = createNativeStackNavigator<DashboardParamList>();

const DashboardStack = () => {
  const [start, setStart] = useState<
    | 'HotelierDashboard'
    | 'TravelerDashboard'
    | 'TravelAgencyDashboard'
    | 'TaxiDashboard'
  >('HotelierDashboard');

  useEffect(() => {
    (async () => {
      const {role} = await getAuthData();
      console.log(role);
      switch (role) {
        case 'Traveler':
          setStart('TravelerDashboard');
          break;
        case 'Travel Agency':
          setStart('TravelAgencyDashboard');
          break;
        case 'Taxi Driver':
          setStart('TaxiDashboard');
          break;
        default:
          setStart('TaxiDashboard');
      }
    })();
  }, []);
  console.log(start);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {start === 'HotelierDashboard' ? (
        <Stack.Screen name="HotelierDashboard" component={HotelierDashboard} />
      ) : start === 'TaxiDashboard' ? (
        <Stack.Screen name="TaxiDashboard" component={TaxiDashboard} />
      ) : start === 'TravelAgencyDashboard' ? (
        <Stack.Screen
          name="TravelAgencyDashboard"
          component={TravelAgencyDashboard}
        />
      ) : (
        <Stack.Screen name="TravelerDashboard" component={TravelerDashboard} />
      )}
      {/* Add more dashboards as needed */}
    </Stack.Navigator>
  );
};

export default DashboardStack;
