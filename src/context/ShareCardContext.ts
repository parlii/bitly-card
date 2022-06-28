import { createContext } from 'react';

export interface ShareCard {
  backhalf: string;
  destinationDomain: string;
  domain: string;
}

export const ShareCardContext = createContext<{
  shareCard: ShareCard;
  setShareCard: (shareCard: ShareCard) => void;
}>(null);
