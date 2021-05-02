import axios from 'axios';

const APIKEY = process.env.REACT_APP_API_OMDB;

const getInfoById = async (id) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`)
    return response;
  } catch (e) {
    throw Error('Error in Omdb API [getInfoById]: ', e);
  }
}

const getSeason = async (id, season) => {
  const seasonNum = parseInt(season)

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}&Season=${seasonNum}`)
    return response;
  } catch (e) {
    throw Error('Error in Omdb API [getSeason]: ', e);
  }
}

const getAllEpisodes = async (episodes) => {
  const episodesRequests = episodes.map(episode => {
    return axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${episode.imdbID}`);
  });

  try {
    const response = await axios.all(episodesRequests)
    return response.map(episode => (episode.data));
  } catch (e) {
    throw Error('Error in Omdb API [getAllEpisodes]: ', e);
  }
}

// const getSeasonEpisode = async (id, season, episode) => {
//   const seasonNum = parseInt(season)
//   const episodeNum = parseInt(episode)

//   try {
//     const response = await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}&Season=${seasonNum}&Episode=${episodeNum}`)
//     return response;
//   } catch (e) {
//     throw Error('Error in Omdb API call: ', e);
//   }
// }

const OmdbApi = {
  getInfoById,
  getSeason,
  getAllEpisodes,
  // getSeasonEpisode,
};

export default OmdbApi;