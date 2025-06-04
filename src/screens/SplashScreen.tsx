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
import {getAuthData} from '../utils/session';
import type {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const window = Dimensions.get('window');
const SCREEN_WIDTH = window.width;
const SCREEN_HEIGHT = window.height;

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Auth: undefined;
  Dashboard: undefined;
};

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const initializeApp = async () => {
      const {token, role} = await getAuthData();
      const firstRun = await AsyncStorage.getItem('@travifai_hasPickedRole');
      setTimeout(() => {
        if (!firstRun) {
          navigation.replace('Home');
        } else if (!token) {
          navigation.replace('Auth');
        } else {
          navigation.replace('Dashboard');
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
        onPress={() => navigation.replace('Home')}>
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
