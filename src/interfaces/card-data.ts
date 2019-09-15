import { CardRank } from '../enums/card-rank.enum';
import { CardSuit } from '../enums/card-suit.enum';

export interface CardData {
  rank: CardRank;
  suit: CardSuit;
}
