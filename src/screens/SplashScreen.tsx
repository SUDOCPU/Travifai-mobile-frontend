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
import {getSession} from '../utils/session';
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
    const timer = setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    const checkSession = async () => {
      const {userType, isLoggedIn} = await getSession();
      if (isLoggedIn && userType === 'hotelier') {
        navigation.replace('HotelierDashboard');
      } else if (userType) {
        navigation.replace('AuthScreen');
      } else {
        navigation.replace('HomeScreen');
      }
    };

    const timer = setTimeout(() => {
      checkSession();
    }, 2000);

    return () => clearTimeout(timer);
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
    marginTop: '20%',
  },
  headingText: {
    fontSize: 36,
    fontWeight: 'bold',
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
