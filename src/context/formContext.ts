import { createContext } from 'react';

export interface FormState {
  destinationUrl: string;
  setDestinationUrl: (url: string) => void;
}

export const FormContext = createContext<FormState>({
  destinationUrl: '',
  setDestinationUrl: null,
});
