import React, { useContext } from 'react';
import { css } from 'styled-components';
import 'styled-components/macro';

import breakpoint from '../assets/breakpoints';
import posters from '../assets/posters';
import Carousel from './Carousel';
import OmdbContext from '../context/Omdb'

const styles = css`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  max-width: 100%;
  background-image: ${({ poster }) => `url(${poster})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: #fff;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-color: black;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(180.78deg, rgba(0, 0, 0, 0.0001) 30.79%, rgba(0, 0, 0, 0.29713) 87.89%);
  }

  .hero__header {
    max-height: 60vh;
    padding: 0 24px;
    margin-bottom: 66px;

    @media ${breakpoint('lg')} {
      padding: 0 95px;
      max-width: 60%;
      margin-bottom: 121px;
    }
  }

  .hero___subtitle {
    font-size: 16px;
    line-height: 19.44px;

    @media ${breakpoint('lg')} {
      font-size: 23px;
      line-height: 27.44px;
    }
  }

  .hero___title {
    font-size: 38px;
    line-height: 58.35px;
    font-weight: 700;

    @media ${breakpoint('lg')} {
      font-size: 74px;
      line-height: 90.35px;
    }
  }

  .carousel {
    min-height: 40vh;
    margin-left: 24px;

    @media ${breakpoint('lg')} {
      margin-left: 95px;
    }
  }

  @media ${breakpoint('sm')} {
    max-width: 55%;
  }
  @media ${breakpoint('lg')} {
    max-width: 926px;
  }
`;

const Hero = ({ handleEpisodeClick }) => {
  const {
    series: {
      Title,
      Plot,
      imdbID,
    },
    season: {
      Season,
    }
  } = useContext(OmdbContext);

  return (
    <div className="hero" css={styles} poster={posters[imdbID]}>
      <header className="hero__header">
        <p className="hero___subtitle">Season {Season}</p>
        <h1 className="hero___title">{Title}</h1>
        <p className="hero___subtitle">{Plot}</p>
      </header>
      <Carousel handleEpisodeClick={handleEpisodeClick} />
    </div>
  );
};

export default Hero;