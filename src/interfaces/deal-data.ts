import { Card } from '../entities/card';
import { AnimationType } from '../enums/animation-type.enum';

export interface DealData {
  animationType?: AnimationType;
  cards: Card[];
  score: number;
}
