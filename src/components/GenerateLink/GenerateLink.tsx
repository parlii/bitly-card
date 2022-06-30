import { useLocalStorage } from 'haversack';
import React, { useContext, useEffect, useState } from 'react';
import { ShareCard, ShareCardContext } from '../../context/ShareCardContext';

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
    if (storedHistory?.length) {
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

    let shareCard: ShareCard;
    try {
      const body = { destinationUrl };
      const response = await fetch('api/generate', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      shareCard = await response.json();
    } catch (err) {
      setSubmitting(false);
      setError(err.message);
    }

    setShareCard({ ...shareCard });
    const updatedHistory = storedHistory?.length
      ? storedHistory.concat([shareCard])
      : [shareCard];
    setStoredHistory(updatedHistory);
  };

  return (
    <div className="container my-4">
      <form name="generate-link" onSubmit={onSubmit}>
        <div className="row align-items-center">
          <div className="col-sm">
            <input
              className="form-control form-control-lg"
              name="destination-url"
              onChange={(e) => {
                setDestinationUrl(e.target.value);
              }}
              placeholder="Enter Long URL"
              required
              type="url"
              value={destinationUrl}
            />
          </div>
          <div className="col-sm-auto">
            <button
              className="btn btn-lg btn-dark w-100 w-sm-auto mt-2 mt-md-0"
              disabled={submitting}
              type="submit"
            >
              Create Link
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger mt-2">{error}</div>}

        {linkHistory?.length && !shareCard && (
          <>
            <div className="list-group mt-4">
              <div className="h4">Recent link history</div>
              {linkHistory.map((historyItem) => (
                <button
                  className="list-group-item"
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
            <div className="row justify-content-end  mt-4">
              <div className="col-auto">
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    resetStoredHistory();
                  }}
                >
                  Clear history
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default GenerateLink;
