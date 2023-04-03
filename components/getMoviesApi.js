const BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = process.env.TMDB_API_KEY

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getTvDetails = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
