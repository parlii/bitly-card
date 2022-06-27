import React, { useContext } from 'react';
import { useRouter } from '../../../node_modules/next/router';
import { FormContext } from '../../context/formContext';

const GenerateLink: React.FC = () => {
  const { destinationUrl, setDestinationUrl } = useContext(FormContext);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = { destinationUrl };
    const response = await fetch('api/generate', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const data = await response.json();
    router.push(`/share/${data.shortlink}`);
  };

  return (
    <form name="generate-link" onSubmit={onSubmit}>
      <input
        className="destinationUrl"
        name="destinationUrl"
        onChange={(e) => {
          setDestinationUrl(e.target.value);
        }}
        type="text"
        placeholder="destination url"
        value={destinationUrl}
      />
    </form>
  );
};

export default GenerateLink;
