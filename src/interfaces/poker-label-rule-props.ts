import { Props } from 'react';
import { Winning } from '../enums/winning.enum';

export interface PokerLabelRuleProps extends Props<any> {
  description: string;
  win: Winning;
}
