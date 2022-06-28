import Image from 'next/image';
import React, { useContext, useState } from 'react';
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
    <div
      className={`share-page share-page--theme-${theme} d-flex align-items-center justify-content-center`}
    >
      <div className="share-page__card rounded d-flex align-items-center justify-content-center shadow-lg">
        <div className="share-page__bitly-logo">
          <BitlyLogo />
        </div>
        <div className="share-page__qr-code">
          <Image
            alt={`QR code that leads to ${domain}/${backhalf}`}
            className="rounded"
            height={300}
            src={qr}
            width={300}
          />
        </div>
        <button
          className={`share-page__link-info px-5 py-2 rounded ${
            copyConfirm ? 'share-page__link-info--copy-confirm' : ''
          }`}
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
  );
};

export default ShareCard;
