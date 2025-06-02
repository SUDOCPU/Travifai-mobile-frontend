// src/screens/splashscreen/SplashScreen.tsx
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getSession} from '../utils/session';
import type {StackNavigationProp} from '@react-navigation/stack';

const window = Dimensions.get('window');
const SCREEN_WIDTH = window.width;
const SCREEN_HEIGHT = window.height;

type RootStackParamList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  AuthScreen: undefined;
  InfoCarousel: undefined;
  HotelierDashboard: undefined;
  TravellerDashboard: undefined;
  TravelAgencyDashboard: undefined;
  TaxiDashboard: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const initializeApp = async () => {
      const {token, role, hasSeenIntro} = await getSession();

      setTimeout(() => {
        if (!role) {
          navigation.replace('HomeScreen');
        } else if (token) {
          switch (role) {
            case 'Hotelier':
              navigation.replace('HotelierDashboard');
              break;
            case 'Traveler':
              navigation.replace('TravellerDashboard');
              break;
            case 'Travel Agency':
              navigation.replace('TravelAgencyDashboard');
              break;
            case 'Taxi Driver':
              navigation.replace('TaxiDashboard');
              break;
          }
        } else {
          if (role === 'Hotelier' && hasSeenIntro !== 'true') {
            navigation.replace('InfoCarousel');
          } else {
            navigation.replace('AuthScreen');
          }
        }
      }, 1500);
    };

    initializeApp();
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? '#59077E' : '#D084FF'},
      ]}>
      <View style={styles.topContent}>
        <Text style={styles.headingText}>Travifai</Text>
        <Text style={styles.subText}>
          Together Karein Explore, Milkar Badhe More
        </Text>
        <Image
          source={require('../assets/Images/namaste.png')}
          style={styles.namasteImage}
          resizeMode="contain"
        />
      </View>

      <Image
        source={require('../assets/Images/welcomebg.png')}
        style={styles.busImage}
      />

      <TouchableOpacity
        testID="forceSkip"
        style={styles.arrowContainer}
        onPress={() => navigation.replace('HomeScreen')}>
        <Text style={styles.arrow}>{'>>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  topContent: {
    alignItems: 'center',
    marginTop: '22%',
  },
  headingText: {
    fontSize: 36,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '700',
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  namasteImage: {
    width: SCREEN_WIDTH * 0.4,
    height: SCREEN_HEIGHT * 0.06,
  },
  busImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.68,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  arrow: {
    fontSize: 28,
    color: '#fff',
  },
});

export default SplashScreen;
