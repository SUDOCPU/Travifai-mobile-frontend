import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
  title: string;
  icon: string;
  completed: boolean;
  onPress: () => void;
}

const TileCard: React.FC<Props> = ({title, icon, completed, onPress}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <FontAwesome name={icon} size={28} color="#8452C7" />
    <Text style={styles.text}>{title}</Text>
    {completed && (
      <FontAwesome
        name="check-circle"
        size={20}
        color="#32c671"
        style={styles.tick}
      />
    )}
  </TouchableOpacity>
);

export default TileCard;

const styles = StyleSheet.create({
  card: {
    width: '46%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    padding: 16,
    margin: '2%',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  text: {
    marginTop: 8,
    fontWeight: '600',
    color: '#8452C7',
    textAlign: 'center',
  },
  tick: {position: 'absolute', top: 10, right: 10},
});
