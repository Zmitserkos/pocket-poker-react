import { Action } from 'redux';
import { ActionType } from '../enums/action-type.enum';

export interface PokerAction extends Action<ActionType> {
  payload?: any;
}
