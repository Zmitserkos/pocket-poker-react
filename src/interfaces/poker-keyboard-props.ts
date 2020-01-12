import { Props } from 'react';

export interface PokerKeyboardProps extends Props<any> {
  holdCard: any;
  startNewGame: any;
  dealOrDraw: any;
  score?: number;
}
