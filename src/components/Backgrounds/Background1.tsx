import React from 'react';
import Doodle from './Doodle';

const Background1: React.FC = () => {
  return (
    <Doodle
      rule={`
      @grid: 1 / 100%;
      background: @doodle(
        @grid: 1 / 100%;
        background-size: 300px 300px;
        background-image: @doodle(
          :doodle {
            @grid: 5x12 / 100% 240%;
            transform: scale(1.25);
          }
          top: calc(@y * -30px);
          :before, :after {
            content: '';
            @size: 100%;
            position: absolute;
            left: @pn(auto, 50%);
            top: @pn(auto, 25%);
            border-radius: 50%;
            z-index: calc(@y - @pn(2, 1));
            background: repeating-radial-gradient(
              @stripe(#a090e7 4px, #ffffff 2px)
            );
          }
        );
      );
      `}
    />
  );
};

export default Background1;
