import { Card } from '../entities/card';

export interface DrawData {
  isWin: boolean;
  cards: Card[];
  score: number;
}
