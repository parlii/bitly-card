import 'css-doodle';
import { useLocalStorage } from 'haversack';
import { useEffect, useState } from 'react';
import Background1 from '../components/Backgrounds/Background1';
import Background2 from '../components/Backgrounds/Background2';
import Background3 from '../components/Backgrounds/Background3';
import Background4 from '../components/Backgrounds/Background4';
import Background5 from '../components/Backgrounds/Background5';
import Background6 from '../components/Backgrounds/Background6';
import Background7 from '../components/Backgrounds/Background7';
import Background8 from '../components/Backgrounds/Background8';
import { ShareCard, ShareCardContext } from '../context/ShareCardContext';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }) => {
  const [shareCard, setShareCard] = useState<ShareCard>();
  const [background, setBackground] = useState<number>();
  const { value: storedBackground, setValue: setStoredBackground } =
    useLocalStorage<number>('background', 0);

  useEffect(() => {
    if (typeof storedBackground !== 'undefined') {
      setBackground(storedBackground);
    }
  }, [storedBackground]);

  const changeBackground = (change: 1 | -1) => {
    const newBackground = (background + change) % 8;
    setBackground(newBackground);
    setStoredBackground(newBackground);
  };

  return (
    <>
      {background === 0 && <Background1 />}
      {background === 1 && <Background2 />}
      {background === 2 && <Background3 />}
      {background === 3 && <Background4 />}
      {background === 4 && <Background5 />}
      {background === 5 && <Background6 />}
      {background === 6 && <Background7 />}
      {background === 7 && <Background8 />}

      <ShareCardContext.Provider value={{ shareCard, setShareCard }}>
        <Component {...pageProps} />
      </ShareCardContext.Provider>

      <div className="row justify-content-center fixed-bottom w-100 mb-4">
        <div className="col-auto">
          <button
            className="btn btn-primary"
            onClick={() => changeBackground(-1)}
          >
            ←
          </button>
        </div>
        <div className="col-auto">
          <button
            className="btn btn-primary"
            onClick={() => changeBackground(1)}
          >
            →
          </button>
        </div>
      </div>
    </>
  );
};

export default MyApp;
