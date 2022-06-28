import Image from 'next/image';
import React, { useContext } from 'react';
import qr from '../../../public/img/qr.png';
import { ShareCardContext } from '../../context/ShareCardContext';
import { BitlyLogo } from '../BitlyLogo/BitlyLogo';

type Themes = 'space';

const ShareCard: React.FC = () => {
  const {
    shareCard: { backhalf, domain },
  } = useContext(ShareCardContext);
  const theme: Themes = 'space';

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
            src={qr}
          />
        </div>
        <div className="share-page__link-info px-5 py-2 rounded">
          <div className="share-page__link-info__domain">{domain}</div>
          <div className="share-page__link-info__backhalf">{backhalf}</div>
          <div className="share-page__link-info__forwards-to">
            Forwards to domain.com/
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
