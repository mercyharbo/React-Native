import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  faChampagneGlasses,
  faFire,
  faHome,
  faMagnifyingGlass,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import Home from '../app/home'
import Upcomings from '../app/upcoming'
import TrendingMovies from '../app/hottestMovie'
import MovieSearch from '../app/movieSearch'
import ProfileScreen from '../app/profile'

const Tab = createBottomTabNavigator()

function MainScreen({ navigation, setIsLoggedIn, route }) {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: '#F8B400',
        inactiveTintColor: 'gray',
        
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faHome} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Upcomings'
        component={Upcomings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faChampagneGlasses}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Trending'
        component={TrendingMovies}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faFire} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Search Movies'
        component={MovieSearch}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faMagnifyingGlass} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        // component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} size={24} color={color} />
          ),
        }}
      >
        {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export default MainScreen
