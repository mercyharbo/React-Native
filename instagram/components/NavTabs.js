import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../app/Home'
import { StyleSheet } from 'react-native'
import ProfileScreen from '../app/ProfileScren'
import ActivityScreen from '../app/ActivityScreen'
import ExploreScreen from '../app/ExploreScreen'
import SeacrhScreen from '../app/SearchScreen'

const Tab = createBottomTabNavigator()

export default function NavTabs() {
  return (
    <NavigationContainer style={styles.navigationContainer}>
      <Tab.Navigator
        initialRouteName='Profile'
        screenOptions={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'ios-home' : 'ios-home-outline'}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Search'
          component={SeacrhScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'search-sharp' : 'search'}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Explore'
          component={ExploreScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                name={focused ? 'plus-square' : 'plus-square-o'}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Activities'
          component={ActivityScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'ios-heart-sharp' : 'ios-heart-outline'}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome
                name={focused ? 'user' : 'user-o'}
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBarStyle: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
})
