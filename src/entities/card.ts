import { CardRank } from '../enums/card-rank.enum';
import { CardSuit } from '../enums/card-suit.enum';
import { CardData } from '../interfaces/card-data';
import { ScreenCardNumber } from '../enums/screen-card-number.enum';

export class Card {
  static readonly suitsCount = 4;

  rank: CardRank;
  suit: CardSuit;
  screenNumber?: ScreenCardNumber;
  isHeld?: boolean;
  isVisible = true;
  private _isFrozen?: boolean;

  constructor(data: CardData) {
    this.rank = data.rank;
    this.suit = data.suit;
    this.screenNumber = data.screenNumber;
  }

  static clone(card: Card): Card {
    const { rank, suit, screenNumber } = card;
    return new Card({ rank, suit, screenNumber });
  }

  get isFrozen(): boolean {
    return Boolean(this._isFrozen);
  }

  freeze() {
    this._isFrozen = true;
  }

}
