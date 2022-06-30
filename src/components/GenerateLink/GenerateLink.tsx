import { useLocalStorage } from 'haversack';
import React, { useContext, useEffect, useState } from 'react';
import { ShareCard, ShareCardContext } from '../../context/ShareCardContext';
import { BitlyLogo } from '../BitlyLogo/BitlyLogo';

const GenerateLink: React.FC = () => {
  const [destinationUrl, setDestinationUrl] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { shareCard, setShareCard } = useContext(ShareCardContext);
  const [linkHistory, setLinkHistory] = useState<Array<ShareCard>>();
  const {
    value: storedHistory,
    setValue: setStoredHistory,
    resetValue: resetStoredHistory,
  } = useLocalStorage<Array<ShareCard>>('card-history');

  useEffect(() => {
    if (storedHistory) {
      const uniqueHistory = storedHistory.filter(
        (v, i, a) => a.findIndex((v2) => v2.backhalf === v.backhalf) === i,
      );
      const sortedHistory = uniqueHistory.reverse().slice(0, 5);
      setLinkHistory(sortedHistory);
    }
  }, [storedHistory]);

  const onSubmit = async (e) => {
    setError(null);
    setSubmitting(true);
    e.preventDefault();

    try {
      const body = { destinationUrl };
      const response = await fetch('api/generate', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const shareCard = await response.json();
      setShareCard({ ...shareCard });
      const updatedHistory = storedHistory?.length
        ? storedHistory.concat([shareCard])
        : [shareCard];
      setStoredHistory(updatedHistory);
    } catch (err) {
      setError(err.message);
    }

    setSubmitting(false);
  };

  const disabled = submitting || !!shareCard;

  return (
    <div className="grid-generator">
      <div className="container py-4">
        <form name="generate-link" onSubmit={onSubmit}>
          <div className="row align-items-center gx-2 gx-sm-4 gy-2">
            <div className="col-auto">
              <div className="generate-link__bitly-logo">
                <BitlyLogo />
              </div>
            </div>
            <div className="col">
              <div className="form-floating">
                <input
                  className="form-control form-control-lg"
                  disabled={disabled}
                  name="destination-url"
                  onChange={(e) => {
                    setDestinationUrl(e.target.value);
                  }}
                  placeholder="https://bitly.com"
                  required
                  type="url"
                  value={destinationUrl}
                />
                <label className="text-black" htmlFor="destination-url">
                  Enter Long URL
                </label>
              </div>
            </div>
            <div className="col-sm-auto">
              <button
                className="btn btn-lg btn-dark w-100 w-sm-auto mt-2 mt-md-0"
                disabled={disabled}
                type="submit"
              >
                Create Link
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </form>

        {linkHistory?.length && !shareCard && (
          <>
            <div className="h5 mt-4">Recent link history</div>
            <div className="list-group">
              {linkHistory.map((historyItem) => (
                <button
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setShareCard(historyItem);
                  }}
                  key={historyItem.backhalf}
                  type="button"
                >
                  {historyItem.destinationDomain}
                </button>
              ))}
            </div>
            <div className="row justify-content-end mt-4">
              <div className="col-auto">
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    resetStoredHistory();
                    setLinkHistory(null);
                  }}
                >
                  Clear history
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GenerateLink;
