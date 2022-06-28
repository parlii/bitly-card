import Image from 'next/image';
import React, { useContext } from 'react';
import qr from '../../../public/img/qr.png';
import { ShareCardContext } from '../../context/ShareCardContext';

const ShareCard: React.FC = () => {
  const {
    shareCard: { backhalf, domain, destinationDomain },
  } = useContext(ShareCardContext);

  return (
    <div className="share-card-page share-card-page--style-6 d-flex align-items-center">
      <div className="share-card-page__card d-flex align-items-center justify-content-center">
        <div className="share-card-page__qr-code">
          <Image alt={`QR code that leads to ${domain}/${backhalf}`} src={qr} />
        </div>
      </div>
      <div className="share-card-page share-card-page__link-info px-4 py-2">
        <div className="share-card-page__link-info__domain">{domain}</div>
        <div className="share-card-page__link-info__backhalf">{backhalf}</div>
        <div className="share-card-page__link-info__forwards-to">
          Forwards to {destinationDomain}/...
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
