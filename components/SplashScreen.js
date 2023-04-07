import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

export default function Splash_Screen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/splashscreen.png')} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
