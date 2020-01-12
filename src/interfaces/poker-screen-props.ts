import { Props } from 'react';
import { Card } from '../entities/card';

export interface PokerScreenProps extends Props<any> {
  isGameOver?: boolean;
  isWin?: boolean;
  isHoldOrDraw?: boolean;
  score?: number;
  cards: Card[];
}
