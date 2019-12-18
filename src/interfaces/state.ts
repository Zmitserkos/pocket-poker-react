import { Card } from '../entities/card';

export interface State {
  isGameOver?: boolean;
  isWin?: boolean;
  isHoldOrDraw?: boolean;
  score?: number;
  cards: Card[];
  isAnimating?: boolean;
  isInitialized?: boolean;
}
