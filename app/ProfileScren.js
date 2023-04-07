import React, { useEffect, useState } from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'

import ProfileDrawer from '../components/ProfileDrawer'

const UNSPLASH_ACCESS_KEY = '1vYowutDnjeLphuqJJWa6pSDlS1WeV1DCHMl0F4d7Pk'

const ProfileScreen = () => {
  const [user, setUser] = useState(null)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((data) => {
        setUser(data.results[0])
      })
  }, [])

  if (!user) {
    return <Text>Loading...</Text>
  }

  const { name, email, picture, id } = user
  const { title, first, last } = name // extract individual properties from name object

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <View style={styles.heroHeader}>
          <View style={styles.followWrapper}>
            <Text style={styles.followText}>23.6k </Text>
            <Text style={styles.subFollowText}>Followers </Text>
          </View>

          <View>
            <Image source={{ uri: picture.large }} style={styles.avatar} />
          </View>
          <View style={styles.followWrapper}>
            <Text style={styles.followText}>23.6k </Text>
            <Text style={styles.subFollowText}>Following </Text>
          </View>
        </View>
        <View
          style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}
        >
          <Text style={styles.followText}>{`${title} ${first} ${last}`}</Text>
          <Text> Bio is empty </Text>
        </View>
        <View style={styles.heroHeader}>
          <TouchableWithoutFeedback style={styles.profileBtns}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Edit profile</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Statistic</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.contactBtn}>
              <Text style={styles.buttonText}>Contact</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <ProfileDrawer />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    gap: 10,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  followWrapper: {
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  followText: {
    fontSize: 30,
    fontWeight: 700,
  },
  subFollowText: {
    color: 'grey',
    fontWeight: 600,
    fontSize: 22,
  },
  avatar: {
    borderRadius: 15,
    borderWidth: 5,
    borderColor: 'orange',
    width: 100,
    height: 100,
    margin: 2,
  },
  button: {
    backgroundColor: 'grey',
    height: 40,
    width: 100,
    borderRadius: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactBtn: {
    backgroundColor: '#537FE7',
    height: 40,
    width: 100,
    borderRadius: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 500,
  },
})

export default ProfileScreen
