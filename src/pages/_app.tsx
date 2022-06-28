import 'css-doodle';
import { useState } from 'react';
import BackgroundSwitch from '../components/BackgroundSwitch/BackgroundSwitch';
import { ShareCard, ShareCardContext } from '../context/ShareCardContext';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }) => {
  const [shareCard, setShareCard] = useState<ShareCard>();

  return (
    <ShareCardContext.Provider value={{ shareCard, setShareCard }}>
      <BackgroundSwitch />
      <Component {...pageProps} />
    </ShareCardContext.Provider>
  );
};

export default MyApp;
