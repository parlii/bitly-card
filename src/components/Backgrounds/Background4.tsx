import React from 'react';
import Doodle from './Doodle';

const Background4: React.FC = () => {
  return (
    <Doodle
      rule={`
      @grid: 1 / 100%;
      background-color: #a090e7;
      background-image: @doodle(
        :doodle {
          @grid: 1 / 10000px;
          transform: scale(1.5) rotate(45deg);
        }
        background-size: 50px 50px;
        background-image: @doodle(
          :doodle {
            @grid: 8x1 / 90%;
            border-radius: 0% 60%;
            overflow: hidden;
          }
          position: absolute;
          border: 1px solid #fff;
          @nth(1) { border-radius: 0% 60%; }
          @size: calc(100% - 100% / @I * (@i - 1));
          background: linear-gradient(
            45deg, @stripe(transparent, #fff 1px, transparent)
          );
        );
      );
      `}
    />
  );
};

export default Background4;
