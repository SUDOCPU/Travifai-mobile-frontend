import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import HotelierDashboard from './src/screens/HotelierDashboard';
import TravellerDashboard from './src/screens/TravellerDashboard';
import TaxiDashboard from './src/screens/TaxiDashboard';
import TravelAgencyDashboard from './src/screens/TravelAgencyDashboard';
import InfoCarousel from './src/screens/InfoCarousel';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="HotelierDashboard" component={HotelierDashboard} />
        <Stack.Screen name="InfoCarousel" component={InfoCarousel} />
        <Stack.Screen
          name="TravellerDashboard"
          component={TravellerDashboard}
        />
        <Stack.Screen name="TaxiDashboard" component={TaxiDashboard} />
        <Stack.Screen
          name="TravelAgencyDashboard"
          component={TravelAgencyDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
