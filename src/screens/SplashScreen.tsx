import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';

const window = Dimensions.get('window');
const SCREEN_WIDTH = window.width;
const SCREEN_HEIGHT = window.height;

type RootStackParamList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  AuthScreen: undefined;
  HotelierDashboard: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;

const SplashScreen = () => {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const role = await AsyncStorage.getItem('role');
        const token = await AsyncStorage.getItem('token');
        const hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro');

        setTimeout(() => {
          if (!role) {
            navigation.navigate('HomeScreen');
          } else if (token) {
            switch (role) {
              case 'Hotelier':
                navigation.navigate('HotelierDashboard');
                break;
              case 'Traveler':
                navigation.navigate('TravellerDashboard' as never);
                break;
              case 'Travel Agency':
                navigation.navigate('TravelAgencyDashboard' as never);
                break;
              case 'Taxi Driver':
                navigation.navigate('TaxiDashboard' as never);
                break;
            }
          } else {
            if (role === 'Hotelier' && hasSeenIntro !== 'true') {
              navigation.navigate('InfoCarousel' as never);
            } else {
              navigation.navigate('AuthScreen');
            }
          }
        }, 2000);
      } catch (error) {
        console.error(`Error ${error}`);
      }
    };

    checkSession();
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
        style={styles.arrowContainer}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.arrow}>{'>>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  topContent: {
    alignItems: 'center',
    marginTop: '22%',
  },
  headingText: {
    fontFamily: 'Quicksand',
    fontSize: 36,
    // fontWeight: 600,
    color: '#fff',
    marginBottom: 10,
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
