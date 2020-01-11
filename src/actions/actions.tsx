import { ActionType } from '../enums/action-type.enum';
import { ScreenCardNumber } from '../enums/screen-card-number.enum';

export interface HoldCardData {
  cardNumber: ScreenCardNumber,
  isHeld: boolean,
}

const setScreenData = function(data: any) {
  return (dispatch: any) => {
    dispatch({
      type: ActionType.SetCards,
      payload: data.newCards,
    });

    dispatch({
      type: ActionType.SetHeaderData,
      payload: data.screenData,
    });
  };
};

const dealCards = function (data: any) {
  return (dispatch: any) => {
    const interval = 500;
    const length = data.cards.length;
    let index = 0;
    let time = 0;

    while(index < length) {
      const newCard = data.cards[index];
      const isLast = index === length - 1;

      setTimeout(() => {
        dispatch({
          type: ActionType.SetCards,
          payload: [ newCard ],
        });

        if (isLast) {
          dispatch({
            type: ActionType.SetHeaderData,
            payload: data.screenData,
          });
        }
      }, time);

      time += interval;
      index++;
    }

    dispatch({ type: ActionType.DealCards });
  };
};

const holdCard = function(data: HoldCardData) {
  return {
    type: ActionType.HoldCard,
    payload: data,
  };
};

const deal = function(data: any) {
  return (dispatch: any) => {
    if (!data.isInitialized) {
      dispatch({
        type: ActionType.Initialize,
      });
    }

    dispatch(dealCards({
      cards: data.cards,
      screenData: {
        isHoldOrDraw: true,
        isAnimating: false,
      },
    }));

    dispatch({
      type: ActionType.Deal,
      payload: {
        score: data.score,
      },
    });
  };
};

const draw = function(data: any) {
  return (dispatch: any) => {
    dispatch(dealCards({
      cards: data.cards,
      screenData: {
        isWin: data.isWin,
        score: data.score,
        isGameOver: true,
        isAnimating: false,
      },
    }));

    dispatch({ type: ActionType.Draw });
  };
};

export default {
  holdCard,
  deal,
  draw,
  setScreenData,
};
