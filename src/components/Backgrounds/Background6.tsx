import React from 'react';
import Doodle from './Doodle';

const Background6: React.FC = () => {
  return (
    <Doodle
      rule={`
      @grid: 1 / 100%;
      background-color: #fff;
      background-image: @doodle(
        @grid: 1 / 100%;
        background-size:  125px 125px;
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
              @stripe.@m8.@pn(#F7D006, #52514F)
            );
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

export default Background6;
