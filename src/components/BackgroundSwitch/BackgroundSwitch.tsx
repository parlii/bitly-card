import { useLocalStorage } from 'haversack';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const numOfBackgroundOptions = 4;

const Background1 = dynamic(() => import('../Backgrounds/Background1'));
const Background2 = dynamic(() => import('../Backgrounds/Background2'));
const Background3 = dynamic(() => import('../Backgrounds/Background3'));
const Background4 = dynamic(() => import('../Backgrounds/Background4'));
// const Background5 = dynamic(() => import('../Backgrounds/Background5'));
// const Background6 = dynamic(() => import('../Backgrounds/Background6'));
// const Background7 = dynamic(() => import('../Backgrounds/Background7'));
// const Background8 = dynamic(() => import('../Backgrounds/Background8'));

const BackgroundSwitch = () => {
  const [background, setBackground] = useState<number>();
  const { value: storedBackground, setValue: setStoredBackground } =
    useLocalStorage<number>('background', 0);

  useEffect(() => {
    if (typeof storedBackground !== 'undefined') {
      setBackground(storedBackground);
    }
  }, [storedBackground]);

  const changeBackground = (change: 1 | -1) => {
    let newBackground = (background + change) % numOfBackgroundOptions;
    if (newBackground < 0) {
      newBackground = numOfBackgroundOptions - 1;
    }
    setBackground(newBackground);
    setStoredBackground(newBackground);
  };

  return (
    <>
      {background === 0 && <Background1 />}
      {background === 1 && <Background2 />}
      {background === 2 && <Background3 />}
      {background === 3 && <Background4 />}
      {/* {background === 4 && <Background5 />}
      {background === 5 && <Background6 />}
      {background === 6 && <Background7 />}
      {background === 7 && <Background8 />} */}

      <div className="container fixed-bottom mb-4">
        <div className="row justify-content-end">
          <div className="col-auto">
            <button
              className="btn btn-primary"
              onClick={() => changeBackground(1)}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackgroundSwitch;
