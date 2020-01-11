import { CardRank } from '../enums/card-rank.enum';
import { CardSuit } from '../enums/card-suit.enum';
import { ScreenCardNumber } from '../enums/screen-card-number.enum';

export interface CardData {
  rank: CardRank;
  suit: CardSuit;
  screenNumber?: ScreenCardNumber;
}
