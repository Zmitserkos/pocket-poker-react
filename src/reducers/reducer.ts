import { Reducer } from 'redux';
import { ActionType } from '../enums/action-type.enum';
import { Card } from '../entities/card';
import { State } from '../interfaces/state';
import { PokerGame } from '../entities/poker-game';
import { Winning } from '../enums/winning.enum';
import { AnimationType } from '../enums/animation-type.enum';
import { PokerAction } from '../interfaces/poker-action';

export const initialState: State = {
  cards: PokerGame.royalFlush,
  score: Winning.RoyalFlush,
  isWin: true,
  isDealOrDrawFrozen: true,
  animationType: AnimationType.None,
};

const reducer: Reducer<State, PokerAction> = (state: State = initialState, action: PokerAction) => {
  const newCards = state.cards.slice();

  switch (action.type) {
    case ActionType.Animation:
      return { ...state, animationType: action.payload };
    case ActionType.SetCards:
      action.payload.map((card: Card) => newCards[Number(card.screenNumber)] = card);
      return { ...state, cards: newCards };
    case ActionType.DealCards:
      return { ...state, isDealOrDrawFrozen: true };
    case ActionType.HoldCard:
      newCards[action.payload.cardNumber].isHeld = action.payload.isHeld;
      return { ...state, cards: newCards};
    case ActionType.Deal:
      newCards.forEach((card: Card) => card.isVisible = false);
      return { ...state, score: action.payload.score, cards: newCards, isWin: false, isGameOver: false, };
    case ActionType.Draw:
      newCards.forEach((card: Card) => card.isVisible = card.isHeld ? card.isVisible : false);
      return { ...state, cards: newCards, isHoldOrDraw: false, };
    case ActionType.SetScreenHeaderData:
      return {
        ...state,
        isHoldOrDraw: action.payload.isHoldOrDraw,
        isGameOver: action.payload.isGameOver,
        isWin: action.payload.isWin,
        isDealOrDrawFrozen: action.payload.isDealOrDrawFrozen,
        score: action.payload.score !== undefined ? action.payload.score : state.score,
      };
    default:
      return state;
  }
};

export default reducer;
