import { createContext } from 'react';

export enum Themes {
  Bitly = 'bitly',
  Space = 'space',
  Waves = 'waves',
}

export interface ShareCard {
  backhalf: string;
  destinationDomain: string;
  domain: string;
  qr: string;
}

export const ShareCardContext = createContext<{
  shareCard: ShareCard;
  setShareCard: (shareCard: ShareCard) => void;
  theme: Themes;
  setTheme: (theme: Themes) => void;
}>(null);
