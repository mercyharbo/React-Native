import React, { useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import LoginScreen from './components/login'
import MainScreen from './components/mainScreen'
import { StyleSheet, View } from 'react-native'

const Stack = createStackNavigator()

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const authToken = await AsyncStorage.getItem('authToken')
      setIsLoggedIn(!!authToken) // Set isLoggedIn to true if authToken exists
    }
    checkAuth()
  }, [])

  const [loaded] = useFonts({
    FontAwesome5Solid: require('./assets/fonts/fontawesome-webfont.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            options={{ headerShown: false, animationEnabled: false }}
            name='Main'
          >
            {(props) => (
              <MainScreen
                {...props}
                IsLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            options={{
              headerShown: false,
              tabBarVisible: false,
              animationEnabled: false,
            }}
            name='Login'
          >
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>

      <StatusBar backgroundColor='#007aff' barStyle='light-content' />
    </NavigationContainer>
  )
}
