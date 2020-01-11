import { Card } from '../entities/card';
import { AnimationType } from '../enums/animation-type.enum';

export interface State {
  isGameOver?: boolean;
  isWin?: boolean;
  isHoldOrDraw?: boolean;
  score?: number;
  cards: Card[];
  isDealOrDrawFrozen?: boolean;
  animationType?: AnimationType;
}
