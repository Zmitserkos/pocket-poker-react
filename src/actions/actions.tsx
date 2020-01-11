import { ActionType } from '../enums/action-type.enum';
import { ScreenCardNumber } from '../enums/screen-card-number.enum';
import { AnimationType } from '../enums/animation-type.enum';

export interface HoldCardData {
  cardNumber: ScreenCardNumber,
  isHeld: boolean,
}

const initialize = function () {
  return {
    type: ActionType.Animation,
    payload: AnimationType.Initialization,
  };
};

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
          dispatchLastCardActions(dispatch, data.screenData);
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
    if (data.animationType) {
      dispatch({
        type: ActionType.Animation,
        payload: AnimationType.None,
      });
    }

    dispatch(dealCards({
      cards: data.cards,
      screenData: {
        isHoldOrDraw: true,
        isDealOrDrawFrozen: false,
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
        isDealOrDrawFrozen: false,
      },
    }));

    dispatch({ type: ActionType.Draw });
  };
};

const dispatchLastCardActions = function(dispatch: any, screenData: any) {
  if (screenData.isWin) {
    dispatch({
      type: ActionType.Animation,
      payload: AnimationType.Winning,
    });
  }

  dispatch({
    type: ActionType.SetHeaderData,
    payload: screenData,
  });
};

export default {
  initialize,
  holdCard,
  deal,
  draw,
  setScreenData,
};
