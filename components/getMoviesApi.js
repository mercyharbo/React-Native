import { tmdbApiKey } from '../config'

const BASE_URL = 'https://api.themoviedb.org/3'

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${tmdbApiKey}`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getTvDetails = async (tvId) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${tvId}?api_key=${tmdbApiKey}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
