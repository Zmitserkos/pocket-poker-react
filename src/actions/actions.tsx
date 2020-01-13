import { ActionType } from '../enums/action-type.enum';
import { AnimationType } from '../enums/animation-type.enum';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../interfaces/state';
import { ScreenData } from '../interfaces/screen-data';
import { HeldCardData } from '../interfaces/held-card-data';
import { DealData } from '../interfaces/deal-data';
import { DrawData } from '../interfaces/draw-data';
import { ScreenHeaderData } from '../interfaces/screen-header-data';
import { PokerAction } from '../interfaces/poker-action';

const initialize = () => ({
  type: ActionType.Animation,
  payload: AnimationType.Initialization,
});

const setScreenData = (data: ScreenData) => {
  return (dispatch: ThunkDispatch<State, void, PokerAction>) => {
    dispatch({
      type: ActionType.SetCards,
      payload: data.cards,
    });

    dispatch({
      type: ActionType.SetScreenHeaderData,
      payload: data.screenHeaderData,
    });
  };
};

const dealCards = (data: ScreenData) => {
  return (dispatch: ThunkDispatch<State, void, PokerAction>) => {
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
          dispatchLastCardActions(dispatch, data.screenHeaderData);
        }
      }, time);

      time += interval;
      index++;
    }

    if (!length) {
      data.screenHeaderData.isDealOrDrawFrozen = false;
      dispatchLastCardActions(dispatch, data.screenHeaderData);
    } else {
      dispatch({ type: ActionType.DealCards });
    }
  };
};

const holdCard = (data: HeldCardData) => {
  return {
    type: ActionType.HoldCard,
    payload: data,
  };
};

const deal = (data: DealData) => {
  return (dispatch: ThunkDispatch<State, void, PokerAction>) => {
    if (data.animationType) {
      dispatch({
        type: ActionType.Animation,
        payload: AnimationType.None,
      });
    }

    dispatch(dealCards({
      cards: data.cards,
      screenHeaderData: {
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

const draw = (data: DrawData) => {
  return (dispatch: ThunkDispatch<State, void, PokerAction>) => {
    dispatch(dealCards({
      cards: data.cards,
      screenHeaderData: {
        isWin: data.isWin,
        score: data.score,
        isGameOver: true,
        isDealOrDrawFrozen: false,
      },
    }));

    dispatch({ type: ActionType.Draw });
  };
};

const dispatchLastCardActions = (dispatch: ThunkDispatch<State, void, PokerAction>, screenData: ScreenHeaderData) => {
  if (screenData.isWin) {
    dispatch({
      type: ActionType.Animation,
      payload: AnimationType.Winning,
    });
  }

  dispatch({
    type: ActionType.SetScreenHeaderData,
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
