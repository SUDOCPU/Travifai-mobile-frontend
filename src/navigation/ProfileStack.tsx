// src/navigation/ProfileStack.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileTilesScreen from '../screens/Hotelier/Profile/ProfileTilesScreen';
import PersonalInfoScreen from '../screens/Hotelier/Profile/PersonalInfoScreen';
import HotelInfoScreen from '../screens/Hotelier/Profile/HotelInfoScreen';
import RoomInfoScreen from '../screens/Hotelier/Profile/RoomInfoScreen';
import NearbyScreen from '../screens/Hotelier/Profile/NearbyScreen';
import SecurityScreen from '../screens/Hotelier/Profile/SecurityScreen';
import AmenitiesScreen from '../screens/Hotelier/Profile/AmenitiesScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: true}}>
    <Stack.Screen
      name="ProfileTiles"
      component={ProfileTilesScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
    <Stack.Screen name="HotelInfo" component={HotelInfoScreen} />
    <Stack.Screen name="RoomInfo" component={RoomInfoScreen} />
    <Stack.Screen name="Nearby" component={NearbyScreen} />
    <Stack.Screen name="Security" component={SecurityScreen} />
    <Stack.Screen name="Amenities" component={AmenitiesScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
