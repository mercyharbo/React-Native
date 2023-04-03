import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = ({ navigation, route, setIsLoggedIn }) => {
  const handleLogout = async () => {
    // Clear the session ID from AsyncStorage to indicate that the user is logged out
    await AsyncStorage.removeItem('sessionId')

    // Call setIsLoggedIn with false to update the state variable in App.js
    setIsLoggedIn(false)

    // Navigate back to the Login screen
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.info}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>John Doe</Text>
      </View>

      <Button title='Logout' onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
})

export default ProfileScreen
