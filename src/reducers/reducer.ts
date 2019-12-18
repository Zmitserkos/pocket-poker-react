import { Reducer } from 'redux';
import { ActionType } from '../enums/action-type.enum';
import { Card } from '../entities/card';
import { CardRank } from '../enums/card-rank.enum';
import { CardSuit } from '../enums/card-suit.enum';
import { State } from '../interfaces/state';

const royalFlush = [
  new Card({ rank: CardRank.Ten, suit: CardSuit.Tiles }),
  new Card({ rank: CardRank.Jack, suit: CardSuit.Tiles }),
  new Card({ rank: CardRank.Queen, suit: CardSuit.Tiles }),
  new Card({ rank: CardRank.King, suit: CardSuit.Tiles }),
  new Card({ rank: CardRank.Ace, suit: CardSuit.Tiles }),
];

export const initialState: State = {
  cards: royalFlush,
  score: 3999,
  isWin: true,
  isAnimating: false,
};

const reducer: Reducer<any> = (state: State = initialState, action) => {
  switch ((action as any).type) {
    case ActionType.SetCards:
      const newCards = state.cards.slice();
      action.payload.map((card: Card) => newCards[Number(card.screenNumber)] = card);
      return { ...state, cards: newCards };

    default:
      return state;
  }
};

export default reducer;
