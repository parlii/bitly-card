import React from 'react';
import Doodle from './Doodle';

const Background7: React.FC = () => {
  return (
    <Doodle
      rule={`
      @grid: 1 / 100%;
      background-size: 83px 135px;
      background-color: #D24B45;
      background-image: @doodle(
        @grid: 2 / 100%;
        background: @pn(#3C2B34, #F7F0E9, #F7F0E9);
        transform-origin: @pn(100% 100%, 0 100%, 100% 0, 0 0);
        transform:
          rotateX(45deg)
          skewY(@pn(34deg, -34deg, -34deg));
      );
      `}
    />
  );
};

export default Background7;
