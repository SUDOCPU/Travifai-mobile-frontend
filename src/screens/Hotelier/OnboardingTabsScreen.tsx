import React from 'react';
import {Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/dashboard';
import DevBackdoor from '../../components/DevBackdoor';
import TileProgressBar from '../../components/Hotelier/TileProgressBar';

type HotelProfileScreens =
  | 'PersonalInfo'
  | 'HotelInfo'
  | 'RoomInfo'
  | 'Amenities'
  | 'Connectivity'
  | 'USP'
  | 'Rules'
  | 'Complete'
  | 'ComingSoon';

const tiles = [
  {key: 'personal', label: 'Personal Information', screen: 'PersonalInfo'},
  {key: 'property', label: 'Property Information', screen: 'HotelInfo'},
  {key: 'room', label: 'Building Rooms', screen: 'RoomInfo'},
  {key: 'connectivity', label: 'Connectivity Partners', screen: 'Connectivity'},
  {key: 'usp', label: 'Property USP', screen: 'USP'},
  {key: 'amenities', label: 'Amenities / Add Ons', screen: 'Amenities'},
  {key: 'documents', label: 'Documents', screen: 'ComingSoon'},
  {key: 'rules', label: 'Property Rules and Information', screen: 'Rules'},
];

const OnboardingTabsScreen = () => {
  const navigation = useNavigation();
  const completed = useSelector(
    (state: RootState) => state.onboarding.completed,
  );

  const goToForm = (section: HotelProfileScreens) => {
    console.log(section);
    const screen = section;
    if (screen) {
      navigation.navigate('HotelProfileStack', {
        screen,
      } as never);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete Your Hotel Profile</Text>

      {tiles.map(({key, label, screen}) => {
        const isDone = completed[key as keyof typeof completed] ?? false;
        const progress = isDone ? 100 : 10; // Replace 40 with real-time form progress if needed

        return (
          <TouchableOpacity
            key={key}
            style={styles.tile}
            onPress={() => goToForm(screen)}>
            <Text style={styles.tileText}>{label}</Text>
            {isDone ? (
              <Icon name="check-circle" size={18} color="green" />
            ) : (
              <TileProgressBar progress={progress} />
            )}
          </TouchableOpacity>
        );
      })}
      <DevBackdoor />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, backgroundColor: '#ffeef2', flexGrow: 1},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 20},
  tile: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  tileText: {fontSize: 16, flexShrink: 1},
});

export default OnboardingTabsScreen;
