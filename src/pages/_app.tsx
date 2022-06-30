import debounce from 'awesome-debounce-promise';
import 'css-doodle';
import { useEffect, useRef, useState } from 'react';
import BackgroundSwitch from '../components/BackgroundSwitch/BackgroundSwitch';
import { ShareCard, ShareCardContext } from '../context/ShareCardContext';
import '../styles/index.scss';

const setViewportHeight = (): void => {
  // fix viewport height inconsistency on mobile browsers with address bar
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const MyApp = ({ Component, pageProps }) => {
  const [shareCard, setShareCard] = useState<ShareCard>();

  const updateWindowData = useRef(
    debounce(() => {
      setViewportHeight();
    }, 300),
  );

  useEffect(() => {
    const handler = updateWindowData.current;
    handler();

    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return (
    <ShareCardContext.Provider value={{ shareCard, setShareCard }}>
      {/* <BackgroundSwitch /> */}
      <Component {...pageProps} />
    </ShareCardContext.Provider>
  );
};

export default MyApp;
