import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from './home';
import Routes from '../routes';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown:false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Workspaces"
        component={Routes}
        options={{
          tabBarLabel: 'Workspaces & Boards',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="devices" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs;
