import React from 'react';
import { css } from 'styled-components';
import 'styled-components/macro';

const styles = css`
  transform: rotate(${(({ rotate }) => rotate)}deg);
`;

const ArrowIcon = ({ rotate }) => {
  return (
    <svg
      width="30"
      height="21"
      viewBox="0 0 30 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      rotate={rotate}
      css={styles}
    >
      <path d="M0.5 10.5H28.5" stroke="white"/>
      <path d="M19.5 1.5L28.5 10.5L19.5 19.5" stroke="white" stroke-linecap="square"/>
    </svg>
  );
};

export default ArrowIcon;