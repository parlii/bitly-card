import { createContext } from 'react';

export interface ShareCard {
  backhalf: string;
  destination: string;
  domain: string;
}

export const ShareCardContext = createContext<{
  shareCard: ShareCard;
  setShareCard: (shareCard: ShareCard) => void;
}>(null);
