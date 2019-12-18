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
  const newCards = state.cards.slice();

  switch ((action as any).type) {
    case ActionType.SetCards:
      action.payload.map((card: Card) => newCards[Number(card.screenNumber)] = card);
      return { ...state, cards: newCards };
    case ActionType.DealCards:
      return { ...state, isAnimating: true };
    case ActionType.HoldCard:
      newCards[action.payload.cardNumber].isHeld = action.payload.isHeld;
      return { ...state, cards: newCards};
    case ActionType.Deal:
      newCards.forEach((card: Card) => card.isVisible = false);
      return { ...state, score: action.payload.score, cards: newCards, isWin: false };
    case ActionType.Draw:
      newCards.forEach((card: Card) => card.isVisible = card.isHeld ? card.isVisible : false);
      return { ...state, cards: newCards, isHoldOrDraw: false, };
    case ActionType.SetScreenData:
      return {
        ...state,
        isHoldOrDraw: action.payload.isHoldOrDraw,
        isGameOver: action.payload.isGameOver,
        isWin: action.payload.isWin,
        isAnimating: action.payload.isAnimating,
      };
    default:
      return state;
  }
};

export default reducer;
