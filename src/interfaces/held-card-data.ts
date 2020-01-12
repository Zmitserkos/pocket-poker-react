import { ScreenCardNumber } from '../enums/screen-card-number.enum';

export interface HeldCardData {
  cardNumber: ScreenCardNumber,
  isHeld?: boolean,
}
