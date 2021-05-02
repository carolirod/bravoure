import React, { useContext } from 'react';
import { css } from 'styled-components';
import 'styled-components/macro';
import dayjs from 'dayjs';

import { details as detailsImgs } from '../assets/posters';
import breakpoint from '../assets/breakpoints';
import OmdbContext from '../context/Omdb';
import StarIcon from './StarIcon';

const styles = css`
  width: 100%;
  overflow: hidden;

  .detail__img-wrapper {
    @media ${breakpoint('sm')} {
      min-height: 60vh;
    }
  }

  .detail__img {
    height: 60vh;
    width: 100%;
    object-fit: cover;
  }

  .detail__content {
    min-height: 39vh;
  }

  .detail__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 24px 32px 24px;

    @media ${breakpoint('sm')} {
      padding: 50px 45px 42px 35px;
    }

    &__rating {
      display: flex;
      align-items: center;

      &--number {
        margin-bottom: -7px;
        margin-left: 17px;
      }
    }

    p {
      font-size: 18px;
      line-height: 21.47px;
    }
  }

  .detail__main {
    border-top: 3px solid #97979720;
    padding: 30px 24px 0 24px;

    @media ${breakpoint('sm')} {
      padding: 45px 95px 0 35px;
    }

    &--title {
      font-size: 27px;
      line-height: 32.97px;
      margin-bottom: 6px;
    }
    &--plot {
      font-size: 19px;
      line-height: 22.67px;
    }
  }
`;

const Detail = () => {
  const {
    currentEpisode: {
      Title,
      Plot,
      imdbRating,
      Released,
      Poster,
      Episode,
    },
    series: {
      imdbID: seriesId,
    },
  } = useContext(OmdbContext);

  const formattedReleaseDate = dayjs(Released).format('YYYY-MM-DD');
  const formattedRating = Math.floor(imdbRating);

  return (
    <section className="detail" css={styles}>
      <div className="detail__img-wrapper">
        <img src={detailsImgs[seriesId][Episode] || Poster} alt={Title} className="detail__img" />
      </div>
      <div className="detail__content">
        <header className="detail__header">
          <p>Episode {Episode} — {formattedReleaseDate}</p>
          <div className="detail__header__rating">
            <StarIcon /> <p className="detail__header__rating--number"><b>{formattedRating}</b>/10</p>
          </div>
        </header>

        <main className="detail__main">
          <h2 className="detail__main--title">{Title}</h2>
          <p className="detail__main--plot">{Plot}</p>
        </main>
      </div>
    </section>
  );
};

export default Detail;