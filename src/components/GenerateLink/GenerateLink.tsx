import React, { useContext } from 'react';
import { FormContext } from '../../context/formContext';

const GenerateLink: React.FC = () => {
  const { destinationUrl, setDestinationUrl } = useContext(FormContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = { destinationUrl };
    const response = await fetch('api/generate', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  return (
    <form name="generate-link" onSubmit={onSubmit}>
      <div>
        <label htmlFor="destinationUrl">Destination URL</label>
        <input
          name="destinationUrl"
          onChange={(e) => {
            setDestinationUrl(e.target.value);
          }}
          type="text"
          value={destinationUrl}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default GenerateLink;
