import React from 'react';
import Doodle from './Doodle';

const Background3: React.FC = () => {
  return (
    <Doodle
      rule={`
      @grid: 1 / 100%;
      background-color: #fff;
      background-image: @doodle(
        @grid: 1 / 100%;
        background-size:  180px 180px;
        background-image: @doodle(
          :doodle {
            @grid: 3 / 100%;
            transform: scale(calc(3 / 2));
          }
          z-index: @ri(100);
          :after, :before {
            content: '';
            @size: 100%;
            border-radius: 50%;
            position: absolute;
            background: radial-gradient(
              @stripe.@m9.@pn(#654062, #fff, transparent)
            );
          }
          :before {
            transform: translateX(50%) translateY(50%);
          }
        );
      );
      `}
    />
  );
};

export default Background3;
