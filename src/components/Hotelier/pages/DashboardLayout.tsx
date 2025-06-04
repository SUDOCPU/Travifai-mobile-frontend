import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Sidebar from '../Sidebar';
import Header from '../Header';
import MyProfile from './MyProfile';
import HotelProfile from './HotelProfile';
import Bookings from './Bookings';

const DashboardLayout = () => {
  const [selectedTab, setSelectedTab] = useState('My Profile');

  const renderTab = () => {
    switch (selectedTab) {
      case 'My Profile':
        return <MyProfile />;
      case 'Hotel Profile':
        return <HotelProfile />;
      case 'Bookings':
        return <Bookings />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Sidebar onSelectTab={setSelectedTab} currentTab={selectedTab} />
      <View style={styles.content}>
        <Header />
        {renderTab()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flex: 1},
  content: {flex: 1, padding: 10},
});

export default DashboardLayout;
