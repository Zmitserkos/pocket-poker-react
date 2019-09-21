import {ActionType} from '../enums/display-event.enum';

const initializeGame = function() {
  return {
    type: ActionType.Initialization,
  };
};

export default {initializeGame};
