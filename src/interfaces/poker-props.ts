import { HeldCardData } from './held-card-data';
import { DealData } from './deal-data';
import { DrawData } from './draw-data';
import { ScreenData } from './screen-data';
import { Props } from 'react';
import { State } from './state';

export interface PokerProps extends Props<any>, State {
  initialize: () => any,
  holdCard: (data: HeldCardData) => any,
  deal: (data: DealData) => any,
  draw: (data: DrawData) => any,
  setScreenData: (data: ScreenData) => any,
}
