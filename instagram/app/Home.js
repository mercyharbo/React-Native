import React from 'react'
import { StyleSheet } from 'react-native'
import { FlatList, Text, View, Image } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text> Hello home </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 35,
  },
  textContainer: {
    width: 180,
    gap: 5,
  },
})
