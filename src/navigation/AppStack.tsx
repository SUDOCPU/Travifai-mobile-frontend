// src/navigation/AppStack.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TravelerDashboard from '../screens/Dashboards/TravelerDashboard';
import HotelierDashboard from '../screens/Hotelier/HotelierDashboard';
import TravelAgencyDashboard from '../screens/Dashboards/TravelAgencyDashboard';
import TaxiDashboard from '../screens/Dashboards/TaxiDashboard';

const Stack = createStackNavigator();

const AppStack = ({role}: {role: string}) => {
  let DashboardComponent;

  switch (role) {
    case 'Traveler':
      DashboardComponent = TravelerDashboard;
      break;
    case 'Hotelier':
      DashboardComponent = HotelierDashboard;
      break;
    case 'Travel Agency':
      DashboardComponent = TravelAgencyDashboard;
      break;
    case 'Taxi Driver':
      DashboardComponent = TaxiDashboard;
      break;
    default:
      DashboardComponent = TravelerDashboard;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardComponent} />
    </Stack.Navigator>
  );
};

export default AppStack;
