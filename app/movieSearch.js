import React, { useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import MovieDetailsModal from '../components/movieDetailsModal'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const TMDB_API_KEY = process.env.TMDB_API_KEY

const MovieSearch = () => {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // Modal states
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mediaType, setMediaType] = useState('movie')

  const searchTMDB = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=en-US&query=${searchText}`
      )
      const json = await response.json()
      setSearchResults(json.results)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSearchTextChange = (text) => {
    setSearchText(text)

    if (text.length >= 3) {
      searchTMDB()
    }
  }

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie)
    setIsVisible(true)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const renderItem = ({ item }) => {
    const { id, media_type, title, name, overview, poster_path } = item
    const resultTitle = title || name

    return (
      <TouchableOpacity key={id} onPress={() => handleMoviePress(item)}>
        <View style={styles.result}>
          {poster_path ? (
            <Image
              style={{ width: 100, height: 150, borderRadius: 5 }}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
              }}
            />
          ) : (
            <Image
              style={{ width: 100, height: 150, borderRadius: 5 }}
              source={{
                uri: 'https://via.placeholder.com/500x750.png?text=No+Poster+Available',
              }}
            />
          )}
          <View
            style={{
              grid: 'auto',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 15,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              {resultTitle}
            </Text>
            <Text
              style={{
                color: 'grey',
              }}
              numberOfLines={3}
            >
              {overview}
            </Text>
            <Text
              style={{
                color: 'grey',
                textTransform: 'capitalize',
              }}
            >
              Media type: {media_type}{' '}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <View style={{ paddingTop: 70 }}>
        <TextInput
          placeholder='Search for a movie, TV show, or person'
          value={searchText}
          onChangeText={handleSearchTextChange}
          style={{
            marginTop: 20,
            height: 50,
            width: '90%',
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 50,
            paddingLeft: 45,
            backgroundColor: 'white',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
          }}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size={20}
          color='grey'
          style={{ position: 'absolute', top: 105, left: 36 }}
        />
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
  button: {
    height: 50,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    backgroundColor: '#FDB827',
    grid: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 15,
    width: '80%',
    paddingLeft: 10,
    paddingRight: 40,
    marginTop: 50,
  },
})

export default MovieSearch
