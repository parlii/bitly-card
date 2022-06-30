import classNames from 'classnames';
import Image from 'next/future/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShareCardContext } from '../../context/ShareCardContext';
import { BitlyLogo } from '../BitlyLogo/BitlyLogo';
import { copyToClipboard } from '../utils/copy';
import VerifiedLink from '../VerifiedLink/VerifiedLink';

let timeoutID;

const ShareCard: React.FC = () => {
  const { setShareCard, shareCard, theme } = useContext(ShareCardContext);
  const [copyConfirm, setCopyConfirm] = useState<boolean>(false);
  const [displayVerifiedLink, setDisplayVerifiedLink] =
    useState<boolean>(false);
  const cardRef = useRef(null);
  const { backhalf, domain, qr } = shareCard;

  useEffect(() => {
    setTimeout(() => {
      setDisplayVerifiedLink(true);
    }, 1000);
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
    <div className="grid-card">
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
              {displayVerifiedLink && <VerifiedLink />}
            </div>
            <div className="share-page__link-info__domain">{domain}/</div>
            <div className="share-page__link-info__backhalf h1">
              {copyConfirm ? 'Copied!' : backhalf}
            </div>
          </button>
        </div>

        <button
          aria-label="Close share card"
          className="btn-close"
          onClick={() => {
            setShareCard(null);
          }}
          type="button"
        />
      </div>
    </div>
  );
};

export default ShareCard;
