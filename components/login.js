import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native'
import axios from 'axios'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { tmdbApiKey } from '../config'

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [sessionId, setSessionId] = useState(null)
  const [accountId, setAccountId] = useState(null)

  console.log(sessionId, 'as session id state...')
  console.log(accountId, 'as account id state...')

  useEffect(() => {
    const checkSessionId = async () => {
      const sessionId = await AsyncStorage.getItem('sessionId')
      if (sessionId) {
        setIsLoggedIn(true) // Update isLoggedIn state variable in App.js
        navigation.navigate('Main') // Navigate to main screen
      }
    }

    checkSessionId()
  }, [])

  const handleLogin = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Step 1: Create a new request token
      const tokenResponse = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${tmdbApiKey}`
      )
      const tokenData = tokenResponse.data

      // Step 2: Ask the user to authorize the request token
      Linking.openURL(
        `https://www.themoviedb.org/authenticate/${tokenData.request_token}?redirect_to=urn:ietf:wg:oauth:2.0:oob`
      )

      // Step 3: Validate the authorized request token using the user's credentials
      // This code waits for the user to authorize the request token before continuing
      const authData = await new Promise((resolve, reject) => {
        const checkAuth = async () => {
          const authResponse = await axios.post(
            `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${tmdbApiKey}`,
            {
              username: username,
              password: password,
              request_token: tokenData.request_token,
            }
          )
          const authData = authResponse.data
          setAccountId(authData)
          if (authData.success) {
            resolve(authData)
          } else {
            reject('Invalid username or password.')
          }
        }

        const intervalId = setInterval(async () => {
          const sessionResponse = await axios.get(
            `https://api.themoviedb.org/3/authentication/token/new?api_key=${tmdbApiKey}&request_token=${tokenData.request_token}`
          )
          const sessionData = sessionResponse.data
          setSessionId(sessionData)
          if (sessionData.success) {
            clearInterval(intervalId)
            checkAuth()
          }
        }, 2000)
      })

      // Step 4: Create a new session ID using the authorized request token
      const sessionResponse = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${tmdbApiKey}`,
        {
          request_token: authData.request_token,
        }
      )
      const sessionData = sessionResponse.data

      // Set the session ID and account ID in AsyncStorage to indicate that the user is logged in
      await AsyncStorage.setItem('sessionId', sessionData.session_id)
      await AsyncStorage.setItem('accountId', authData.account_id)

      setIsLoggedIn(true)

      navigation.navigate('Main', {
        sessionId: sessionData.session_id,
        accountId: authData.account_id,
      }) // Pass the session ID and account ID as parameters to the MainScreen
    } catch (error) {
      console.log(error)
      setError('An error occurred while creating a new request token.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/favicon.png')} />
      <Text style={styles.textStyle}> Welcome, let's get you started </Text>
      <TextInput
        placeholder='Email'
        value={username}
        onChangeText={setUsername}
        style={styles.Input}
      />
      <TextInput
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.Input}
      />
      {error ? <Text>{error}</Text> : null}
      <View style={styles.btn}>
        <Button
          title={isLoading ? 'Loading...' : 'Login'}
          disabled={isLoading}
          onPress={handleLogin}
          color='black'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
  },
  Input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDB827',
    width: '100%',
    borderRadius: 10,
    height: 50,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 500,
  },
})

export default LoginScreen
