import React, { useContext } from 'react';
import TinySlider from 'tiny-slider-react';
import { css } from 'styled-components';
import 'styled-components/macro';

import ArrowIcon from './ArrowIcon';
import OmdbContext from '../context/Omdb';

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
  const { episodes: items } = useContext(OmdbContext)

  const handleItemClick = (payload) => {
    if (handleEpisodeClick) handleEpisodeClick(payload)
  }

  return items.length && (
    <div className="carousel" css={styles}>
      <TinySlider className="my-tiny-slider" settings={sliderSettings}>
        {items.map((episode) => {
          const { Episode, Title, Plot, Poster } = episode;
          const formattedPlot = Plot.substr(0, 88);

          return (
            <div className="carousel__item" key={Title} onClick={() => handleItemClick(episode)}>
              <img src={Poster} alt={Title} className="carousel__item__img" />
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