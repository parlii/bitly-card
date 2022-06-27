import { useState } from 'react';
import { FormContext, FormState } from '../context/formContext';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  const [destinationUrl, setDestinationUrl] =
    useState<FormState['destinationUrl']>('');
  const [shortlink, setShortlink] = useState<FormState['shortlink']>('');

  return (
    <FormContext.Provider
      value={{ destinationUrl, setDestinationUrl, shortlink, setShortlink }}
    >
      <Component {...pageProps} />
    </FormContext.Provider>
  );
};

export default MyApp;
