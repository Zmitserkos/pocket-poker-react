import {Reducer} from 'redux';
import {ActionType} from "../enums/display-event.enum";
import {Card} from "../entities/card";
import {CardRank} from "../enums/card-rank.enum";
import {CardSuit} from "../enums/card-suit.enum";

export const initialState: any = {
  cards: [],
};

const reducer: Reducer<any> = (state: any = initialState, action) => {
  const royalFlush = [
    new Card({rank: CardRank.Ten, suit: CardSuit.Tiles}),
    new Card({rank: CardRank.Jack, suit: CardSuit.Tiles}),
    new Card({rank: CardRank.Queen, suit: CardSuit.Tiles}),
    new Card({rank: CardRank.King, suit: CardSuit.Tiles}),
    new Card({rank: CardRank.Ace, suit: CardSuit.Tiles}),
  ];

  switch ((action as any).type) {
    case ActionType.Initialization:
      return { ...state, username: action.username };
    default:
      return state;
  }
};

export default reducer;
