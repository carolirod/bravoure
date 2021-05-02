import React, { useContext } from 'react';
import TinySlider from 'tiny-slider-react';
import { css } from 'styled-components';
import 'styled-components/macro';
import get from 'lodash.get';

import ArrowIcon from './ArrowIcon';
import OmdbContext from '../context/Omdb';
import { episodes as episodesImgs } from '../assets/posters';
import breakpoint from '../assets/breakpoints';

const sliderSettings = {
  lazyload: true,
  nav: false,
  loop: false,
  mouseDrag: true,
  items: 1,
  controlsPosition: 'bottom',
  controlsContainer: '#controls',
  fixedWidth: 201 + 28,
  responsive: {
    769: {
      items: 3,
    }
  }
};

const styles = css`
  z-index: 1;

  .carousel__item {
    position: relative;
    cursor: pointer;

    &__number {
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 18px;
      padding: 8px 0 4px;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      line-height: 19.54px;
      color: #000;
      background-color: #fff;
    }

    &__img {
      width: 201px;
      height: 134px;
      object-fit: cover;
      opacity: 0.4;

      &--wrapper {
        position: relative;
        max-width: 201px;
        max-height: 134px;

        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background-color: #000000;
        }
      }
    }

    &__img--wrapper.carousel__item--active {
      .carousel__item__img {
        opacity: 1;
      }
      .carousel__item__img--wrapper:after {
        content: none;
      }
    }

    &__info {
      max-width: 201px;
    }

    &__title {
      margin: 19px 0 10px;
      font-size: 15px;
      line-height: 18.32px;
    }

    &__excerpt {
      font-size: 13px;
      line-height: 15.51px;
    }
  }

  #controls {
    display: flex;
    justify-content: flex-end;
    margin: 21px 23px 0 0;

    @media ${breakpoint('xs')} {
      margin-bottom: 21px;
    }

    button {
      background-color: transparent;
      border: 0;

      &:disabled {
        opacity: 20%;
        pointer-events: none;
      }
    }
  }
`;

const Carousel = ({ handleEpisodeClick }) => {
  const {
    episodes: items,
    currentEpisode: {
      imdbID,
    },
    series: {
      imdbID: seriesId,
    },
    season: {
      Season,
    },
  } = useContext(OmdbContext);

  const handleItemClick = (payload) => {
    if (handleEpisodeClick) handleEpisodeClick(payload)
  }

  return items.length && (
    <div className="carousel" css={styles}>
      <TinySlider className="my-tiny-slider" settings={sliderSettings}>
        {items.map((episode) => {
          const { Episode, Title, Plot, Poster, imdbID: currentImdbId } = episode;
          const formattedPlot = Plot.substr(0, 88);
          const activeItemClass = currentImdbId === imdbID ? 'carousel__item--active' : '';

          return (
            <div
              key={Title}
              onClick={() => handleItemClick(episode)}
              className="carousel__item"
            >
              <div className={`carousel__item__img--wrapper ${activeItemClass}`}>
                <img
                  src={get(episodesImgs, `[${seriesId}_season_${Season}][Episode]`, Poster)}
                  alt={Title}
                  className="carousel__item__img"
                />
              </div>
              <div className="carousel__item__info">
                <span className="carousel__item__number">{Episode}</span>
                <h3 className="carousel__item__title">{Title}</h3>
                <p className="carousel__item__excerpt">{formattedPlot}...</p>
              </div>
            </div>
          );
        })}
      </TinySlider>
      <div id="controls">
        <button><ArrowIcon rotate={-180} /></button>
        <button><ArrowIcon /></button>
      </div>
    </div>
  );
};

export default Carousel;