import React from 'react';
import Doodle from './Doodle';

const Background2: React.FC = () => {
  return (
    <Doodle
      rule={`
      @grid: 1 / 100%;
      background: @doodle(
        @grid: 1 / 100%;
        background-color: #f5f8ff;
        background-size:  160px 160px;
        background-image: @doodle(
          :doodle {
            @grid: 3 / 100%;
            transform: scale(calc(3 / 2));
          }
          :after, :before {
            content: '';
            @size: 100%;
            border-radius: 50%;
            position: absolute;
            border: 3px double #4169E1;
            background: @doodle(
              @grid: 1 / 100%;
              @shape: clover 4;
              background: #4169E1;
            );
            background-size: 45% 45%;
            background-repeat: no-repeat;
            background-position: 50% 52%;
          }
          :before {
            transform: translate(50%, 50%);
          }
        );
      );
      `}
    />
  );
};

export default Background2;
