import React from 'react';
import Doodle from './Doodle';

const Background5: React.FC = () => {
  return (
    <Doodle
      rule={`
      @grid: 1 / 100%;
      background: @doodle(
        :doodle {
          @grid: 1 / 10000px;
          transform: rotate(45deg) scale(2);
        }
        background-size: 30px 30px;
        background-image: @doodle(
          @grid: 5x1 / calc(100% + 1px);
          @place-cell: center;
          @size: calc(100% - 100% / @I * (@i - 1));
          border-radius: calc(100% / @I * (@i - 1));
          border: 1px solid #003049;
          background: @pn(
            #d62828, #f77f00, #fcbf49, #eae2b7
          );
        );
      );
      `}
    />
  );
};

export default Background5;
