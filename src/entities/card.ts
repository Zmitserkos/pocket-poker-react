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
  }

  get isFrozen(): boolean {
    return Boolean(this._isFrozen);
  }

  freeze() {
    this._isFrozen = true;
  }

}
