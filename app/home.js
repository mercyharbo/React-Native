import React, { useEffect, useState } from 'react'
import { Image, Text, FlatList, View, TouchableOpacity } from 'react-native'
import { getMovieDetails, getTvDetails } from '../components/getMoviesApi'

import MovieDetailsModal from '../components/movieDetailsModal'
import Tv_series from '../components/series'

const TMDB_API_KEY = process.env.TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mediaType, setMediaType] = useState('movie')

  // Fetching upcoming series, movies, tv shows
  useEffect(() => {
    fetch(`${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&pageSize=20`)
      .then((response) => response.json())
      .then((json) => {
        if (json.results) {
          setUpcomingMovies([...upcomingMovies, ...json.results])
        }
      })
      .catch((error) => console.error(error))
  }, [])

  // Fetching popular movies from TMDB
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        )
        const data = await response.json()
        setPopularMovies(data.results)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchPopularMovies()
  }, [])

  // Fetching series, movies, tv show daily trendings
  useEffect(() => {
    fetch(
      `${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&page=${page}&pageSize=50`
    )
      .then((response) => response.json())
      .then((json) => {
        setMovies([...movies, ...json.results])
        setLoading(false)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [page])

  const getMediaDetails = async () => {
    try {
      const mediaId = selectedMedia.id
      const details =
        mediaType === 'movie'
          ? await getMovieDetails(mediaId)
          : await getTvDetails(mediaId)
      setSelectedMedia({ ...selectedMedia, ...details })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (selectedMedia) {
      getMediaDetails()
    }
  }, [selectedMedia])

  // for pagination
  const loadMoreMovies = () => {
    setPage(page + 1)
  }

  const handleMoviePress = (movie) => {
    setSelectedMedia(movie)
    setIsVisible(true)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

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

  const renderPopularMovies = ({ item }) => (
    <TouchableOpacity key={item.id} onPress={() => handleMoviePress(item)}>
      <View
        style={{
          flex: 1,
          margin: 1,
          width: 280,
          // marginTop: 40,
        }}
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            borderRadius: 10,
          }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
          // resizeMode='contain'
        />
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={popularMovies}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPopularMovies}
        />
      </View>

      {selectedMedia && (
        <MovieDetailsModal
          movie={selectedMedia}
          isVisible={isVisible}
          onClose={handleClose}
          mediaType={mediaType}
        />
      )}

      <View style={{ flex: 1, marginVertical: 15, gap: 10 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 500,
            textTransform: 'capitalize',
            marginLeft: 10,
            color: 'white',
          }}
        >
          {' '}
          Trending this week{' '}
        </Text>
        <FlatList
          horizontal
          data={movies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.1}
        />

        <Tv_series />
      </View>
    </View>
  )
}
