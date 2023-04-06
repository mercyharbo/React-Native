import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'

const ProfileDrawer = () => {
  const [tab, setTab] = useState('postLayout')

  return (
    <View style={styles.container}>
      <View style={styles.slideButtonContainer}>
        <TouchableOpacity
          style={styles.slideButton}
          onPress={() => setTab('postLayout')}
        >
          <Ionicons
            name={tab === 'postLayout' ? 'grid' : 'grid-outline'}
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.slideButton}
          onPress={() => setTab('reels')}
        >
          <MaterialIcons
            name={tab === 'reels' ? 'video-collection' : 'video-collection'}
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.slideButton}
          onPress={() => setTab('tv')}
        >
          <MaterialIcons
            name={tab === 'tv' ? 'live-tv' : 'live-tv'}
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.slideButton}
          onPress={() => setTab('tags')}
        >
          <FontAwesome
            name={tab === 'tags' ? 'users' : 'users'}
            size={24}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.slideButton}
          onPress={() => setTab('bookmark')}
        >
          <Ionicons
            name={tab === 'bookmark' ? 'ios-bookmark' : 'ios-bookmark-outline'}
            size={24}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.drawer}>
        {tab === 'postLayout' && (
          <View>
            <Text>Here is the post layout</Text>
          </View>
        )}
        {tab === 'reels' && (
          <View>
            <Text>Here is the reels</Text>
          </View>
        )}
        {tab === 'tags' && (
          <View>
            <Text>Here is the tags</Text>
          </View>
        )}
        {tab === 'tv' && (
          <View>
            <Text>Here is the tv</Text>
          </View>
        )}
        {tab === 'bookmark' && (
          <View>
            <Text>Here is the bookmarks</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'grey',
    paddingTop: 15,
  },
  slideButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  drawer: {
    paddingVertical: 15,
  },
})

export default ProfileDrawer
