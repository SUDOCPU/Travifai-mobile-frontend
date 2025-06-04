import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const tabs = ['My Profile', 'Hotel Profile', 'Bookings'];

const Sidebar = ({
  onSelectTab,
  currentTab,
}: {
  onSelectTab: (tab: string) => void;
  currentTab: string;
}) => {
  return (
    <View style={styles.sidebar}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          onPress={() => onSelectTab(tab)}
          style={currentTab === tab ? styles.activeTab : styles.tab}>
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 120,
    padding: 10,
    backgroundColor: '#eee',
  },
  tab: {
    paddingVertical: 10,
  },
  activeTab: {
    paddingVertical: 10,
    backgroundColor: '#ccc',
  },
  tabText: {
    fontSize: 14,
  },
});

export default Sidebar;
