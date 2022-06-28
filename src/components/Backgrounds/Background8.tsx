import React from 'react';
import Doodle from './Doodle';

const Background8: React.FC = () => {
  return (
    <Doodle
      rule={`
      @grid: 1 / 100%;
      background: @doodle(
        :doodle {
          @grid: 1 / 10000px;
          transform: scale(1.5) rotate(45deg);
        }
        background-size: 150px 150px;
        background-color: #1d3557;
        background-image: @doodle(
          @grid: 4 / 100%;
          :after {
            content: '';
            @size: 100%;
            position: absolute;
            background: @doodle(
              @grid: @p([1-4]) / 100%;
              @shape: triangle;
              background: @p(#e63946, #f1faee, #a8dadc, #457b9d);
              transform: rotate(@p(0, 180deg)) scale(.8);
            );
          }
        );
      );
      `}
    />
  );
};

export default Background8;
