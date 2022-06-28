import NextHead from 'next/head';
import React from 'react';

interface HeadProps {
  title?: string;
}

const Head: React.FC<HeadProps> = ({ title = 'Bitly Link Sharing Card' }) => {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </NextHead>
  );
};

export default Head;
