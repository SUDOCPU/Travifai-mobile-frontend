import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HotelProfileStack from './HotelProfileStack';
import HotelierDashboard from '../screens/Hotelier/HotelierDashboard';
import OnboardingTabsScreen from '../screens/Hotelier/OnboardingTabsScreen';
import TravelerDashboard from '../screens/Dashboards/TravelerDashboard';
import TaxiDashboard from '../screens/Dashboards/TaxiDashboard';
import TravelAgencyDashboard from '../screens/Dashboards/TravelAgencyDashboard';
import {getAuthData} from '../utils/session';
import {useSelector} from 'react-redux';
import {RootState} from '../store/dashboard';
import {ActivityIndicator, View} from 'react-native';

export type DashboardParamList = {
  HotelierDashboard: undefined;
  TravelerDashboard: undefined;
  TaxiDashboard: undefined;
  TravelAgencyDashboard: undefined;
  Onboarding: undefined;
  HotelProfileStack: {screen: string};
};

const Stack = createNativeStackNavigator<DashboardParamList>();

const DashboardStack = () => {
  const [role, setRole] = useState<string | null>(null);
  const onboarding = useSelector((state: RootState) => state.onboarding);
  const isHydrated = onboarding._persist?.rehydrated;
  const hotelierOnboardingComplete = Object.values(onboarding.completed).every(
    Boolean,
  );

  useEffect(() => {
    const init = async () => {
      const {role} = await getAuthData();
      setRole(role);
    };
    init();
  }, []);

  if (!isHydrated || role === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {role === 'Hotelier' ? (
        hotelierOnboardingComplete ? (
          <Stack.Screen
            name="HotelierDashboard"
            component={HotelierDashboard}
          />
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingTabsScreen} />
            <Stack.Screen
              name="HotelProfileStack"
              component={HotelProfileStack}
            />
          </>
        )
      ) : role === 'Traveler' ? (
        <Stack.Screen name="TravelerDashboard" component={TravelerDashboard} />
      ) : role === 'Taxi Driver' ? (
        <Stack.Screen name="TaxiDashboard" component={TaxiDashboard} />
      ) : role === 'Travel Agency' ? (
        <Stack.Screen
          name="TravelAgencyDashboard"
          component={TravelAgencyDashboard}
        />
      ) : (
        <Stack.Screen name="TravelerDashboard" component={TravelerDashboard} />
      )}
    </Stack.Navigator>
  );
};

export default DashboardStack;
