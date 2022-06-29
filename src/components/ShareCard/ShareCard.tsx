import classNames from 'classnames';
import { toPng } from 'html-to-image';
import Image from 'next/future/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShareCardContext } from '../../context/ShareCardContext';
import { BitlyLogo } from '../BitlyLogo/BitlyLogo';
import { copyToClipboard } from '../utils/copy';
import VerifiedLink from '../VerifiedLink/VerifiedLink';

type Themes = 'space';

const theme: Themes = 'space';
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

  return (
    <>
      <div
        className={classNames(
          'share-page d-flex align-items-center justify-content-center',
          `share-page--theme-${theme}`,
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
              <em>Forwards to {destinationDomain}/...</em>
            </div>
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
