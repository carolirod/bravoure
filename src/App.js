import React from 'react';

import './App.css';
import Hero from './components/Hero';
import Detail from './components/Detail';
import OmdbApi from './api/Omdb';
import OmdbContext from './context/Omdb';

const SeriesInsecureID = 'tt5024912'; // ID has to be in posters

class App extends React.Component {
  constructor(props) {
    super(props)
    this.id = SeriesInsecureID;
    this.state = {
      series: {},
      season: {},
      episodes: [],
      currentEpisode: {}
    }
  }

  loadSeries = async () => {
    const { data } = await OmdbApi.getInfoById(this.id);
    // console.log('response series', data)
    this.setState({ series: data });
    this.loadSeason();
  }

  loadSeason = async () => {
    const seasonFromQuery = parseInt(window.location.search.split('=')[1]);
    const { data } = await OmdbApi.getSeason(this.id, seasonFromQuery || 1);
    const { Episodes } = data;
    // console.log('response season', data)

    this.setState({ season: data });
    if (Episodes) this.loadEpisodes(Episodes);
  }

  loadEpisodes = async (episodes) => {
    const response = await OmdbApi.getAllEpisodes(episodes);
    // console.log('episodes >', response)

    this.setState({
      episodes: response,
      currentEpisode: response[0]
    });
  }

  handleEpisodeClick = (payloadEpisode) => {
    this.setState({
      currentEpisode: payloadEpisode
    })
  }

  componentDidMount() {
    this.loadSeries();
  }

  render() {
    return (
      <OmdbContext.Provider value={this.state}>
        <div className="App">
          <Hero handleEpisodeClick={this.handleEpisodeClick} />
          <Detail />
        </div>
      </OmdbContext.Provider>
    );
  }
}

export default App;
