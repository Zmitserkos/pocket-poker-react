import { ActionType } from '../enums/action-type.enum';
import { Card } from '../entities/card';
import { ScreenCardNumber } from '../enums/screen-card-number.enum';

export interface HoldCardData {
  cardNumber: ScreenCardNumber,
  isHeld: boolean,
}

const setCards = function(cards: Card[]) {
  return {
    type: ActionType.SetCards,
    payload: cards,
  };
};

const dealCards = function (cards: Card[]) {
  return (dispatch: any) => {
    const interval = 500;
    const length = cards.length;
    let index = 0;
    let time = 0;

    while(index < length) {
      const newCard = cards[index];
      const isAnimating = index !== length - 1;

      setTimeout(() => {
        dispatch({
          type: ActionType.SetCards,
          payload: {
            cards: [ newCard ],
            isAnimating,
          },
        })
      }, time);

      time += interval;
      index++;
    }
  };
};

const holdCard = function(data: HoldCardData) {
  return {
    type: ActionType.HoldCard,
    payload: data,
  };
};

export default {
  setCards,
  dealCards,
  holdCard,
};
