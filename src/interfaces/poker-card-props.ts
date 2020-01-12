import { Props } from 'react';
import { Card } from '../entities/card';

export interface PokerCardProps extends Props<any> {
  card: Card;
}
