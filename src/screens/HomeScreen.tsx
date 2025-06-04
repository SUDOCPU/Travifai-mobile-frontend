// src/screens/homescreen/HomeScreen.tsx
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuthData, saveRole} from '../utils/session';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const roles = [
  {
    label: 'Traveler',
    image: require('../assets/Images/TravellerIcon.png'),
  },
  {
    label: 'Travel Agency',
    image: require('../assets/Images/TravelAgencyIcon.png'),
  },
  {
    label: 'Hotelier',
    image: require('../assets/Images/Hotel_Icon.png'),
  },
  {
    label: 'Taxi Driver',
    image: require('../assets/Images/TaxiIcon.png'),
  },
];

const HomeScreen = () => {
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation();

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      const {token, role} = await getAuthData();
      if (token && role) {
        navigation.navigate('Dashboard' as never);
      }
    };

    redirectIfLoggedIn();
  }, [navigation]);

  useEffect(() => {
    const checkFirstRun = async () => {
      const flag = await AsyncStorage.getItem('@travifai_hasPickedRole');
      if (flag) {
        navigation.navigate('Auth' as never);
      }
    };
    checkFirstRun();
  }, [navigation]);

  const handleSelect = async (role: string) => {
    try {
      await saveRole(role);
      console.log(role);
      navigation.navigate('Auth' as never);
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const backgroundImage = isDark
    ? require('../assets/Images/BgImageDarkMode.png')
    : require('../assets/Images/BgImageLightMode.png');

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <View style={styles.overlay}>
        <Text style={styles.heading}>
          Welcome from your host <Text style={styles.bold}>Travifai</Text>
        </Text>
        <Text style={styles.subheading}>What describes you best?</Text>

        <View style={styles.grid}>
          {roles.map((role, index) => (
            <TouchableOpacity
              key={index}
              style={styles.roleCard}
              onPress={() => handleSelect(role.label)}>
              <Image source={role.image} style={styles.roleImage} />
              <Text style={styles.roleLabel}>{role.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const CARD_SIZE = SCREEN_WIDTH / 2.4;

const styles = StyleSheet.create({
  container: {flex: 1},
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '400',
  },
  bold: {fontWeight: 'bold'},
  subheading: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 20,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  roleCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff30',
    borderRadius: 16,
    padding: 10,
  },
  roleImage: {
    width: CARD_SIZE * 0.6,
    height: CARD_SIZE * 0.6,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  roleLabel: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;
