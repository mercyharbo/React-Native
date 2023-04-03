import { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native'
import MovieDetailsModal from '../components/movieDetailsModal'

const TMDB_API_KEY = process.env.TMDB_API_KEY
// const API_KEY = '4b2b112dbfcd761b7b1ca272fb52cbee'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const TrendingMovies = () => {
  const [mediaType, setMediaType] = useState('movie')
  const [mediaList, setMediaList] = useState([])
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const fetchMediaList = useCallback(() => {
    setIsLoading(true)
    fetch(`${BASE_URL}/${mediaType}/popular?api_key=${TMDB_API_KEY}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setMediaList((prevMediaList) => [...prevMediaList, ...data.results])
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.error(error)
      })
  }, [mediaType, page])

  useEffect(() => {
    setMediaList([])
    setPage(1)
  }, [mediaType])

  useEffect(() => {
    fetchMediaList()
  }, [fetchMediaList])

  const handleMoviePress = (movie) => {
    setMediaType('movie')
  }

  const handleTVShowPress = () => {
    setMediaType('tv')
  }

  const handleClose = () => {
    setSelectedMedia(null)
    setIsVisible(false)
  }

  const handleMediaPress = (media) => {
    setSelectedMedia(media)
    setIsVisible(true)
  }

  const renderMediaItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.mediaItem}
      onPress={() => handleMediaPress(item)}
    >
      <Image
        style={styles.mediaItemImage}
        source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
      />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, mediaType === 'movie' && styles.activeButton]}
          onPress={handleMoviePress}
        >
          <Text style={styles.buttonText}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, mediaType === 'tv' && styles.activeButton]}
          onPress={handleTVShowPress}
        >
          <Text style={styles.buttonText}>TV Shows</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mediaList}
        renderItem={renderMediaItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        onEndReached={() => {
          if (!isLoading) {
            setPage((prevPage) => prevPage + 1)
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isLoading && <ActivityIndicator size='large' />}
      />

      {selectedMedia && (
        <MovieDetailsModal
          movie={selectedMedia}
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
    paddingTop: 30,
    backgroundColor: 'black',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeButton: {
    backgroundColor: '#F8B400',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  mediaItem: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaItemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  mediaItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  touchableMediaItem: {
    backgroundColor: 'transparent',
    padding: 5,
  },
})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',

//   },

// })

export default TrendingMovies
