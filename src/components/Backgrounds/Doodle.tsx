import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'css-doodle': {};
    }
  }
}

interface DoodleProps {
  rule: string;
}

const Doodle: React.FC<DoodleProps> = (props) => {
  const { rule } = props;

  return <css-doodle>{rule}</css-doodle>;
};

export default Doodle;
