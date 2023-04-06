import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'

import Splash_Screen from './components/SplashScreen'
import NavTabs from './components/NavTabs'

export default function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    const hideSplashScreen = async () => {
      await SplashScreen.hideAsync()
      setShowSplashScreen(false)
    }

    setTimeout(hideSplashScreen, 2000)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {showSplashScreen ? <Splash_Screen /> : <NavTabs />}
      <StatusBar style='auto' barStyle='light-content' />
    </View>
  )
}
