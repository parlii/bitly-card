import React, { useContext } from 'react';
import { FormContext } from '../../context/formContext';

const GenerateLink: React.FC = () => {
  const { destinationUrl, setDestinationUrl } = useContext(FormContext);

  const onSubmit = () => {};

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
      </div>
    </form>
  );
};

export default GenerateLink;
