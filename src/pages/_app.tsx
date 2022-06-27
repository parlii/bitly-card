import { useState } from 'react';
import { FormContext, FormState } from '../context/formContext';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }) => {
  const [destinationUrl, setDestinationUrl] =
    useState<FormState['destinationUrl']>('');

  return (
    <FormContext.Provider value={{ destinationUrl, setDestinationUrl }}>
      <Component {...pageProps} />;
    </FormContext.Provider>
  );
};

export default MyApp;
