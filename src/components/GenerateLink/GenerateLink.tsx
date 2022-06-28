import React, { useState } from 'react';
import { useRouter } from '../../../node_modules/next/router';

const GenerateLink: React.FC = () => {
  const [destinationUrl, setDestinationUrl] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    let shortlink;
    try {
      const body = { destinationUrl };
      const response = await fetch('api/generate', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const data = await response.json();
      shortlink = data.shortlink;
    } catch (err) {
      // TODO: error display
      setSubmitting(false);
    }

    router.push(`/share/${shortlink}`);
  };

  return (
    <form name="generate-link" onSubmit={onSubmit}>
      <input
        className="form-control form-control-lg"
        name="destination-url"
        onChange={(e) => {
          setDestinationUrl(e.target.value);
        }}
        placeholder="Enter Long URL"
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
  );
};

export default GenerateLink;
