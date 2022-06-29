import classNames from 'classnames';
import { toPng } from 'html-to-image';
import Image from 'next/future/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShareCardContext } from '../../context/ShareCardContext';
import { BitlyLogo } from '../BitlyLogo/BitlyLogo';
import { copyToClipboard } from '../utils/copy';
import VerifiedLink from '../VerifiedLink/VerifiedLink';

const themes = ['space', 'waves'] as const;
type Themes = typeof themes[number];

let timeoutID;

const ShareCard: React.FC = () => {
  const {
    shareCard: { backhalf, domain, destinationDomain, qr },
  } = useContext(ShareCardContext);
  const [copyConfirm, setCopyConfirm] = useState<boolean>(false);
  const [imageData, setImageData] = useState<string>();
  const cardRef = useRef(null);

  useEffect(() => {
    const element = cardRef.current;
    const loadCanvas = async () => {
      const imageDataUrl = await toPng(element);
      setImageData(imageDataUrl);
    };
    loadCanvas();
  }, []);

  const [currentTheme, setCurrentTheme] = useState<Themes>('space');

  const showCopyAlert = () => {
    setCopyConfirm(true);
    timeoutID = setTimeout(() => {
      setCopyConfirm(false);
    }, 3000);
  };

  const cancelTimeout = () => {
    setCopyConfirm(false);
    clearTimeout(timeoutID);
  };

  const copyLink = async () => {
    cancelTimeout();
    await copyToClipboard(`https://${domain}/${backhalf}`);

    // show copy status alert
    showCopyAlert();
  };

  const changeTheme = () => {
    let currentIndex = themes.indexOf(currentTheme);
    let nextIndex = (currentIndex + 1) % themes.length;
    console.log(currentIndex, nextIndex, themes[nextIndex]);
    setCurrentTheme(themes[nextIndex]);
  };

  return (
    <>
      <div
        className={classNames(
          'share-page d-flex align-items-center justify-content-center',
          `share-page--theme-${currentTheme}`,
        )}
        ref={cardRef}
      >
        <div className="share-page__card rounded d-flex align-items-center justify-content-center">
          <div className="share-page__bitly-logo">
            <BitlyLogo />
          </div>

          <Image
            alt={`QR code that leads to ${domain}/${backhalf}`}
            className="share-page__qr-code"
            height={300}
            src={qr}
            width={300}
          />

          <button
            className={classNames('share-page__link-info px-5 py-2 rounded', {
              'share-page__link-info--copy-confirm': copyConfirm,
            })}
            onClick={() => {
              copyLink();
            }}
            type="button"
          >
            <div className="share-page__link-info__link-safety">
              <VerifiedLink />
            </div>
            <div className="share-page__link-info__domain">{domain}</div>
            <div className="share-page__link-info__backhalf">
              {copyConfirm ? 'Copied!' : backhalf}
            </div>
            <div className="share-page__link-info__forwards-to">
              Forwards to {destinationDomain}/...
            </div>
          </button>
        </div>

        <div className="share-page__theme-switcher">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => changeTheme()}
          >
            ⟳
          </button>
        </div>
      </div>
      {imageData && (
        <a
          className="btn btn-dark"
          download={`${backhalf}.png`}
          href={imageData}
        >
          Download
        </a>
      )}
    </>
  );
};

export default ShareCard;
