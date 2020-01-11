import { Reducer } from 'redux';
import { ActionType } from '../enums/action-type.enum';
import { Card } from '../entities/card';
import { State } from '../interfaces/state';
import { PokerGame } from '../entities/poker-game';
import { Winning } from '../enums/winning.enum';

export const initialState: State = {
  cards: PokerGame.royalFlush,
  score: Winning.RoyalFlush,
  isWin: true,
  isAnimating: false,
  isInitialized: false,
};

const reducer: Reducer<any> = (state: State = initialState, action) => {
  const newCards = state.cards.slice();

  switch ((action as any).type) {
    case ActionType.Initialize:
      return { ...state, isInitialized: true };
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
      return { ...state, score: action.payload.score, cards: newCards, isWin: false, isGameOver: false, };
    case ActionType.Draw:
      newCards.forEach((card: Card) => card.isVisible = card.isHeld ? card.isVisible : false);
      return { ...state, cards: newCards, isHoldOrDraw: false, };
    case ActionType.SetHeaderData:
      return {
        ...state,
        isHoldOrDraw: action.payload.isHoldOrDraw,
        isGameOver: action.payload.isGameOver,
        isWin: action.payload.isWin,
        isAnimating: action.payload.isAnimating,
        score: action.payload.score !== undefined ? action.payload.score : state.score,
      };
    default:
      return state;
  }
};

export default reducer;
