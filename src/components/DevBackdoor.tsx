import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {clearSession} from '../utils/session';
const DevBackdoor = () => {
  const navigation = useNavigation();
  const handleDevbackdoor = () => {
    clearSession();
    navigation.navigate('HomeScreen' as never);
  };

  return (
    <TouchableOpacity onPress={handleDevbackdoor} style={styles.backdoorButton}>
      <Text style={styles.backdoorText}>Dev: Home</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backdoorButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#00000088',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 999,
  },
  backdoorText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DevBackdoor;
