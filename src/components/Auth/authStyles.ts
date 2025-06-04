import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  bg: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  card: {
    width: '88%',
    borderRadius: 32,
    backgroundColor: '#ffffffee',
    padding: 32,
  },
  cardDark: {backgroundColor: '#1a1a1aee'},
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#775599',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#775599',
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  half: {width: '48%'},
  input: {
    borderWidth: 1,
    borderColor: '#77559950',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    color: '#775599',
  },
  button: {
    backgroundColor: '#775599',
    borderRadius: 32,
    padding: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontWeight: '600', fontSize: 16},
  link: {color: '#775599', fontWeight: '600'},
  linkAlt: {color: '#775599aa', textAlign: 'center', marginTop: 16},
});

export default styles;
