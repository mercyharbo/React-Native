import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  FlatList,
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { getMovieDetails, getTvDetails } from './getMoviesApi'

const TMDB_API_KEY = '4b2b112dbfcd761b7b1ca272fb52cbee'
const BASE_URL = 'https://api.themoviedb.org/3'

const MovieDetailsModal = ({ movie, isVisible, onClose, mediaType }) => {
  const [movieDetails, setMovieDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cast, setCast] = useState([])

  const fetchMovieDetails = async () => {
    setIsLoading(true)

    const response =
      mediaType === 'movie'
        ? await getMovieDetails(movie.id, TMDB_API_KEY)
        : await getTvDetails(movie.id, TMDB_API_KEY)

    setMovieDetails(response)
    if (response.credits?.cast) {
      setCast(response.credits.cast.slice(0, 10))
    } else {
      setCast([])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (isVisible) {
      fetchMovieDetails()
    }
  }, [isVisible])

  return (
    <>
      {movieDetails && (
        <Modal
          animationType='fade'
          visible={isVisible}
          onRequestClose={onClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${
                    movieDetails?.poster_path || movie.poster_path
                  }`,
                }}
                style={styles.modalImage}
                // resizeMode='cover'
              />
              <View style={styles.modalHeaderInfo}>
                <Text style={styles.modalTitle}>
                  {movieDetails.title ? movieDetails.title : movie.name}
                </Text>
                {movieDetails?.release_date && (
                  <Text style={styles.textStyle}>
                    <Text>Release date:</Text>{' '}
                    <Text>
                      {' '}
                      {movieDetails?.release_date
                        ? movieDetails.release_date
                        : ''}{' '}
                    </Text>
                  </Text>
                )}
                {movieDetails.runtime && movieDetails.genres?.length ? (
                  <Text
                    style={styles.textStyle}
                    numberOfLines={2}
                    ellipsizeMode='tail'
                  >
                    {movieDetails.runtime
                      ? `${movieDetails.runtime}min - `
                      : ''}
                    {movieDetails?.genres?.length
                      ? movieDetails?.genres
                          ?.map((genre) => genre.name)
                          .join(' / ')
                      : ''}
                  </Text>
                ) : null}

                {movieDetails.vote_average && (
                  <Text style={styles.textStyle}>
                    <Text>Rating:</Text>{' '}
                    <Text> {movieDetails.vote_average.toFixed(1)}</Text>
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.modalOverview}>
              <Text style={{ fontSize: 25, fontWeight: 600, color: 'white' }}>
                Storyline{' '}
              </Text>
              <Text style={{ color: 'white', marginTop: 10 }}>
                {movieDetails?.overview && movieDetails.overview}
              </Text>
            </View>
            <View style={styles.modalDetails}>
              {movieDetails.production_companies && (
                <Text style={{ color: 'white' }}>
                  <Text style={styles.textStyle}>Production Companies: </Text>
                  <Text>
                    {movieDetails.production_companies
                      ? movieDetails?.production_companies
                          ?.map((prod) => prod.name)
                          .join(', ')
                      : ''}
                  </Text>
                </Text>
              )}

              {movieDetails?.homepage && (
                <Text style={{ color: 'white' }}>
                  <Text style={styles.modalTextBold}>Website: </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(movieDetails.homepage)}
                  >
                    <Text style={{ color: 'white' }}>
                      {movieDetails.homepage}
                    </Text>
                  </TouchableOpacity>
                </Text>
              )}

              <View style={{ grid: 'auto', gap: 10 }}>
                <Text style={styles.textStyle}>Cast:</Text>
                <FlatList
                  data={cast}
                  horizontal
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) =>
                    item.profile_path ? (
                      <View style={{ marginRight: 8, gap: 5 }}>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
                          }}
                          style={styles.castImage}
                        />

                        <Text style={{ color: 'white' }}> {item.name} </Text>
                      </View>
                    ) : null
                  }
                />
              </View>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <FontAwesomeIcon icon={faTimes} size={24} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000',
    gap: 15,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 10,
    gap: 20,
  },
  modalHeaderInfo: {
    flexShrink: '',
    flexWrap: 'wrap',
    gap: 10,
  },
  modalOverview: {
    flexDirection: 'column',
    gap: 20,
    paddingRight: 15,
  },
  modalImage: {
    width: 140,
    height: 250,
    marginTop: 100,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    width: '80%',
  },
  modalOverview: {
    fontSize: 16,
    margin: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  modalDetails: {
    grid: 'auto',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 5,
    paddingRight: 15,
    paddingLeft: 10,
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'white',
    width: '90%',
  },
  movieText: {
    fontWeight: 'bold',
    color: 'grey',
  },
  castImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
})

export default MovieDetailsModal
