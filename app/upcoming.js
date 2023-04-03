import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'

import MovieDetailsModal from '../components/movieDetailsModal'

const BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = process.env.TMDB_API_KEY

const Upcomings = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [showPage, setShowPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [mediaType, setMediaType] = useState('movie')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  // Fetching series, movies, tv show daily trendings
  useEffect(() => {
    fetch(
      `${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&page=${showPage}&pageSize=20`
    )
      .then((response) => response.json())
      .then((json) => {
        setUpcomingMovies((prevMediaList) => [
          ...prevMediaList,
          ...json.results,
        ])
        setLoading(false)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [showPage])

  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} onPress={() => handleMoviePress(item)}>
      <View
        style={{
          flex: 1,
          margin: 5,
          width: 400,
          borderRadius: 15,
          backgroundColor: '#fff',
        }}
      >
        <Image
          style={{
            width: '100%',
            height: 300,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
        />
        <View style={{ paddingVertical: 15, gap: 10, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: '500' }}>
            {item.title || item.name}{' '}
          </Text>
          <Text style={{ fontSize: 14, color: 'grey' }} numberOfLines={3}>
            {item.overview}{' '}
          </Text>
          <Text style={{ fontSize: 14, color: 'grey' }}>
            Release date: {item.release_date}{' '}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie)
    setIsVisible(true)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Movies</Text>
      <FlatList
        data={upcomingMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          isVisible={isVisible}
          onClose={handleClose}
          mediaType={mediaType}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 10,
    alignSelf: 'flex-start',
    color: 'white',
  },
})

export default Upcomings
