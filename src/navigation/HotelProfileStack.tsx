import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PersonalInfoScreen from '../screens/Hotelier/Profile/PersonalInfoScreen';
import HotelInfoScreen from '../screens/Hotelier/Profile/HotelInfoScreen';
import RoomInfoScreen from '../screens/Hotelier/Profile/RoomInfoScreen';
import AmenitiesScreen from '../screens/Hotelier/Profile/AmenitiesScreen';
import ConnectivityPartnersScreen from '../screens/Hotelier/Profile/ConnectivityPartnersScreen';
import PropertyUspScreen from '../screens/Hotelier/Profile/PropertyUspScreen';
import RulesRegulationScreen from '../screens/Hotelier/Profile/RulesRegulationScreen';
import OnboardingCompleteScreen from '../screens/Hotelier/Profile/OnboardingCompleteScreen';
import ComingSoon from '../components/ComingSoon';

const Stack = createStackNavigator();

const HotelProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="HotelInfo" component={HotelInfoScreen} />
      <Stack.Screen name="RoomInfo" component={RoomInfoScreen} />
      <Stack.Screen name="Amenities" component={AmenitiesScreen} />
      <Stack.Screen
        name="Connectivity"
        component={ConnectivityPartnersScreen}
      />
      <Stack.Screen name="USP" component={PropertyUspScreen} />
      <Stack.Screen name="Rules" component={RulesRegulationScreen} />
      <Stack.Screen name="Complete" component={OnboardingCompleteScreen} />
      <Stack.Screen name="ComingSoon" component={ComingSoon} />
    </Stack.Navigator>
  );
};

export default HotelProfileStack;
