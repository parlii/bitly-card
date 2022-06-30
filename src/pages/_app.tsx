import debounce from 'awesome-debounce-promise';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import {
  ShareCard,
  ShareCardContext,
  Themes,
} from '../context/ShareCardContext';
import '../styles/index.scss';

const setViewportHeight = (): void => {
  // fix viewport height inconsistency on mobile browsers with address bar
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const MyApp = ({ Component, pageProps }) => {
  const [shareCard, setShareCard] = useState<ShareCard>();
  const [theme, setTheme] = useState<Themes>(Themes.Bitly);

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
    <ShareCardContext.Provider
      value={{ shareCard, setShareCard, theme, setTheme }}
    >
      <div className={classNames('grid-container', `theme-${theme}`)}>
        <Component {...pageProps} />
      </div>
    </ShareCardContext.Provider>
  );
};

export default MyApp;
