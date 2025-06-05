import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTab from '../screens/Hotelier/HomeTab';
import ProfileStack from './ProfileStack';
import BookingsTab from '../screens/Hotelier/BookingsTab';
import SettingsTab from '../screens/Hotelier/SettingsTab';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const HomeIcon = ({color, size}: {color: string; size: number}) => (
  <FontAwesome name="home" size={size} color={color} />
);

const ProfileIcon = ({color, size}: {color: string; size: number}) => (
  <FontAwesome name="user" size={size} color={color} />
);

const BookingIcon = ({color, size}: {color: string; size: number}) => (
  <FontAwesome name="calendar-check-o" size={size} color={color} />
);

const SettingIcon = ({color, size}: {color: string; size: number}) => (
  <FontAwesome name="cogs" size={size} color={color} />
);

const HotelierTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#8452C7',
      tabBarInactiveTintColor: '#777',
    }}>
    <Tab.Screen
      name="HomeTab"
      component={HomeTab}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: HomeIcon,
      }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileStack}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ProfileIcon,
      }}
    />
    <Tab.Screen
      name="BookingsTab"
      component={BookingsTab}
      options={{
        tabBarLabel: 'Bookings',
        tabBarIcon: BookingIcon,
      }}
    />
    <Tab.Screen
      name="SettingsTab"
      component={SettingsTab}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: SettingIcon,
      }}
    />
  </Tab.Navigator>
);

export default HotelierTabs;
