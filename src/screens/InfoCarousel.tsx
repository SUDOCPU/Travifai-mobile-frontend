import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const {width} = Dimensions.get('window');

const navigation = useNavigation();
const slides = [
  {
    id: '1',
    // image: require('../assets/Images/slide1.png'),
    title: 'Book Instantly',
    description: 'Get your favorite services in just a few taps.',
  },
  {
    id: '2',
    // image: require('../assets/Images/slide2.png'),
    title: 'Track Your Orders',
    description: 'Real-time updates and notifications.',
  },
  {
    id: '3',
    // image: require('../assets/Images/slide3.png'),
    title: 'Hassle-Free Payments',
    description: 'Secure and easy transactions with one tap.',
  },
];

const InfoCarousel = ({onFinish}: {onFinish: () => void}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  const onViewRef = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      ref.current?.scrollToIndex({index: currentIndex + 1});
    } else {
      onFinish();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {backgroundColor: currentIndex === i ? '#8452C7' : '#ccc'},
            ]}
          />
        ))}
      </View>
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#555',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  button: {
    backgroundColor: '#8452C7',
    marginHorizontal: 40,
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default InfoCarousel;
