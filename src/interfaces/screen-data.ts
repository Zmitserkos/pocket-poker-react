import { Card } from '../entities/card';
import { ScreenHeaderData } from './screen-header-data';

export interface ScreenData {
  screenHeaderData: ScreenHeaderData;
  cards: Card[];
}
