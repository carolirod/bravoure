import React from 'react';

const OmdbContext = React.createContext({
  series: {},
  season: {},
  episodes: [],
  currentEpisode: {}
});

export default OmdbContext;
