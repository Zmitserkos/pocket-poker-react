import { ActionType } from '../enums/action-type.enum';
import { Card } from '../entities/card';

const setCards = function(cards: Card[]) {
  return {
    type: ActionType.SetCards,
    payload: cards,
  };
};

const dealCards = function (cards: Card[]) {
  return (dispatch: any) => {
    const interval = 500;
    let index = 0;
    let time = 0;

    while(index < cards.length) {
      const newCard = cards[index];

      setTimeout(() => {
        dispatch({
          type: ActionType.SetCards,
          payload: [ newCard ],
        })
      }, time);

      time += interval;
      index++;
    }
  };
};

export default {
  setCards,
  dealCards,
};
