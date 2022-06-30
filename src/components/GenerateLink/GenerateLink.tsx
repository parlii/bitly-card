import React, { useContext, useState } from 'react';
import { ShareCard, ShareCardContext } from '../../context/ShareCardContext';

const GenerateLink: React.FC = () => {
  const [destinationUrl, setDestinationUrl] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { setShareCard } = useContext(ShareCardContext);

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
      if (response.status >= 400 && response.status < 600) {
        throw new Error("That didn't work. Is the URL valid?");
      }
      shareCard = await response.json();
    } catch (err) {
      setSubmitting(false);
      setError(err.message);
    }

    shareCard && setShareCard({ ...shareCard });
  };

  return (
    <>
      <form name="generate-link" onSubmit={onSubmit}>
        {error && <div className="alert alert-danger mt-4">{error}</div>}
        <input
          className="form-control form-control-lg"
          name="destination-url"
          onChange={(e) => {
            setDestinationUrl(e.target.value);
            setError(null);
          }}
          placeholder="Enter Long URL"
          required
          type="url"
          value={destinationUrl}
        />

        <div className="row mt-4 justify-content-center">
          <div className="col-auto">
            <button
              className="btn btn-lg btn-dark"
              disabled={submitting}
              type="submit"
            >
              Create Link
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default GenerateLink;
