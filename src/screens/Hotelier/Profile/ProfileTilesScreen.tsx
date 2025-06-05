import React, {useMemo} from 'react';
import {View, StyleSheet, FlatList, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/dashboard';
import TileCard from '../../../components/Hotelier/TileCard';
import ProgressHeader from '../../../components/Hotelier/ProgressHeader';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// Define your navigation stack types
type RootStackParamList = {
  PersonalInfo: undefined;
  HotelInfo: undefined;
  RoomInfo: undefined;
  Nearby: undefined;
  Security: undefined;
  Amenities: undefined;
};

const tiles = [
  {key: 'personal', title: 'Personal Info', icon: 'user'},
  {key: 'hotel', title: 'Hotel Info', icon: 'building-o'},
  {key: 'room', title: 'Room Info', icon: 'bed'},
  {key: 'nearby', title: 'Nearest Locations', icon: 'map-marker'},
  {key: 'security', title: 'Security Info', icon: 'shield'},
  {key: 'amenities', title: 'Amenities', icon: 'coffee'},
] as const;

// Navigation key-to-screen mapping
const tileNavigationMap = {
  personal: 'PersonalInfo',
  hotel: 'HotelInfo',
  room: 'RoomInfo',
  nearby: 'Nearby',
  security: 'Security',
  amenities: 'Amenities',
} as const;

const ProfileTilesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const completed = useSelector(
    (state: RootState) => state.onboarding.completed,
  );

  // Memoize percent calculation for performance
  const percent = useMemo(() => {
    const completeCount = Object.values(completed).filter(Boolean).length;
    return (completeCount / tiles.length) * 100;
  }, [completed]);

  return (
    <View style={styles.container}>
      <ProgressHeader percent={percent} />

      <FlatList
        data={tiles}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <TileCard
            title={item.title}
            icon={item.icon}
            completed={completed[item.key]}
            onPress={() => navigation.navigate(tileNavigationMap[item.key])}
          />
        )}
      />

      {percent === 100 && (
        <View style={styles.submitWrap}>
          <Button
            title="Submit All Data"
            onPress={() => alert('Send to API')}
          />
        </View>
      )}
    </View>
  );
};

export default ProfileTilesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7fb',
  },
  list: {
    padding: 12,
    justifyContent: 'space-between',
  },
  submitWrap: {
    padding: 16,
  },
});
