import React, { useEffect, useState } from 'react'
import { FlatList, Image } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native'
import MovieDetailsModal from './movieDetailsModal'

const TMDB_API_KEY = process.env.TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const TV_SHOWS_URL = `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&region=US`

const Tv_series = () => {
  const [tvShows, setTvShows] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [page, setPage] = useState(1)
  const [mediaType, setMediaType] = useState('tv')

  useEffect(() => {
    fetch(TV_SHOWS_URL)
      .then((response) => response.json())
      .then((data) => setTvShows(data.results))
      .catch((error) => console.error(error))
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} onPress={() => handleMoviePress(item)}>
      <View
        style={{
          flex: 1,
          margin: 5,
          width: 110,
          borderRadius: 15,
        }}
      >
        <Image
          style={{ width: 110, height: 150, borderRadius: 10 }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
        />
      </View>
    </TouchableOpacity>
  )

  // for pagination
  const loadMoreMovies = () => {
    setPage(page + 1)
  }

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie)
    setIsVisible(true)
    setMediaType('tv')
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <View style={{ flex: 1, gap: 10, marginVertical: -50 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 500,
          textTransform: 'capitalize',
          marginLeft: 10,
          color: 'white',
        }}
      >
        Tv shows
      </Text>
      <FlatList
        horizontal
        data={tvShows}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.1}
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

export default Tv_series
