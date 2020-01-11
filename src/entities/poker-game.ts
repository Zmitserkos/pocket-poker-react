import { Card } from './card';
import { Deck } from './deck';
import { Winning } from '../enums/winning.enum';
import { CardRank } from '../enums/card-rank.enum';
import { ScreenCardNumber } from '../enums/screen-card-number.enum';

export class PokerGame {
  static readonly initialScore = 200;
  static readonly scoreStep = 5;
  static readonly cardsOnHandCount = 5;

  cardsOnHand: Card[] = [];
  score: number;

  private _isFirstRound = false;
  private deck: Deck;
  private roundCards: Card[] = [];
  private rankCounts: number[] = [];

  constructor() {
    this.deck = new Deck();
    this.score = PokerGame.initialScore;
  }

  static getEmptyRankCounts(): number[] {
    return Array(Deck.ranksCount).fill(0);
  }

  get isFirstRound(): boolean {
    return this._isFirstRound;
  }

  get isGameOver(): boolean {
    return !this.score;
  }

  get isRoyalFlush(): boolean {
    return this.isStrightFlush &&
      this.cardsOnHand.filter(card => card.rank > CardRank.Ten).length === this.cardsOnHand.length;
  }

  get isStrightFlush(): boolean {
    return this.isStright && this.isFlush;
  }

  get isFourOfKind(): boolean {
    return this.rankCounts.includes(4);
  }

  get isFullHouse(): boolean {
    return this.rankCounts.includes(3) && this.rankCounts.includes(2);
  }

  get isFlush(): boolean {
    const mainSuit = this.cardsOnHand[0].suit;

    return this.cardsOnHand.every(card => card.suit === mainSuit);
  }

  get isStright(): boolean {
    const firstIndex = this.rankCounts.indexOf(1);
    const lastIndex = this.rankCounts.lastIndexOf(1);
    const twoIndex = this.rankCounts.indexOf(2);
    const threeIndex = this.rankCounts.indexOf(3);

    return firstIndex > -1 && lastIndex > -1 && lastIndex - firstIndex === 4 && twoIndex === -1 && threeIndex === -1;
  }

  get isThreeOfKind(): boolean {
    return this.rankCounts.includes(3);
  }

  get isTwoPair(): boolean {
    return this.rankCounts.filter(count => count === 2).length === 2;
  }

  get isJacksOrBetter(): boolean {
    return this.rankCounts.slice(CardRank.Jack).includes(2);
  }

  deal(): any {
    this._isFirstRound = true;
    this.withdraw();
    this.resetRoundCards();
    this.setCardsOnHand();

    return {
      cards: this.cardsOnHand,
      score: this.score,
    }
  }

  hold(cardNumber: ScreenCardNumber) {
    if (!this.cardsOnHand) {
      return;
    }

    const card = this.cardsOnHand[cardNumber];

    if (card.isFrozen || !this._isFirstRound) {
      return;
    }

    card.isHeld = !card.isHeld;
  }

  draw(): any {
    this._isFirstRound = false;
    this.freezeHeldCards();
    const newCardsIndexes = this.getNewCardIndexes();

    if (this.deck.hasEnoughCards(newCardsIndexes.length)) {
      const newCards = this.deck.getNextCards(newCardsIndexes.length);

      newCardsIndexes.forEach((cardIndex, index) => this.cardsOnHand[cardIndex] = newCards[index]);
      // TODO: REFACTOR: data inserted twice;
      this.roundCards = this.roundCards.concat(this.cardsOnHand);
    } else {
      const cardIndexesCount = this.deck.cardIndexes.length;
      let newCards = this.deck.getNextCards(cardIndexesCount);

      this.roundCards = this.roundCards.concat(newCards);
      this.deck.reset();
      // TODO: If new deck - delete current cards
      newCards = newCards.concat(this.deck.getNextCards(newCardsIndexes.length - cardIndexesCount, this.roundCards));
      newCardsIndexes.forEach((cardIndex, index) => this.cardsOnHand[cardIndex] = newCards[index]);
    }

    const winning = this.getWinning();
    this.score += winning;

    this.cardsOnHand.forEach((card: Card, index: number) => card.screenNumber = index);
    const cards = this.cardsOnHand.filter((card: Card) => !card.isHeld);

    return {
      cards,
      score: this.score,
      isWin: Boolean(winning),
    }
  }

  private withdraw() {
    this.score -= PokerGame.scoreStep;
  }

  private resetRoundCards() {
    this.roundCards = [];
  }

  private setCardsOnHand() {
    if (this.deck.hasEnoughCards(PokerGame.cardsOnHandCount)) {
      this.cardsOnHand = this.deck.getNextCards(PokerGame.cardsOnHandCount);
      this.roundCards = this.roundCards.concat(this.cardsOnHand);
    } else {
      const cardIndexesCount = this.deck.cardIndexes.length;
      this.cardsOnHand = this.deck.getNextCards(cardIndexesCount);
      this.roundCards = this.roundCards.concat(this.cardsOnHand);
      this.deck.reset();
      this.cardsOnHand = this.cardsOnHand.concat(this.deck.getNextCards(PokerGame.cardsOnHandCount - cardIndexesCount, this.roundCards));
    }

    this.cardsOnHand.forEach((card: Card, index: number) => card.screenNumber = index);
  }

  private getNewCardIndexes(): number[] {
    const cardsIndexes: number[] = [];

    this.cardsOnHand.forEach((card: Card, index: number) => {
      if (!card.isFrozen) {
        cardsIndexes.push(index);
      }
    });

    return cardsIndexes;
  }

  private getWinning(): number {
    this.rankCounts = this.getRankCounts();

    if (this.isRoyalFlush) {
      return Winning.RoyalFlush;
    } else if (this.isStrightFlush) {
      return Winning.StrightFlush;
    } else if (this.isFourOfKind) {
      return Winning.FourOfKind;
    } else if (this.isFullHouse) {
      return Winning.FullHouse;
    } else if (this.isFlush) {
      return Winning.Flush;
    } else if (this.isStright) {
      return Winning.Stright;
    } else if (this.isThreeOfKind) {
      return Winning.ThreeOfKind;
    } else if (this.isTwoPair) {
      return Winning.TwoPair;
    } else if (this.isJacksOrBetter) {
      return Winning.JacksOrBetter;
    } else {
      return 0;
    }
  }

  private getRankCounts(): number[] {
    const rankCounts = PokerGame.getEmptyRankCounts();

    this.cardsOnHand.forEach(card => rankCounts[card.rank] += 1);

    return rankCounts;
  }

  private freezeHeldCards() {
    this.cardsOnHand.forEach(card => {
      if (card.isHeld) {
        card.freeze();
      }
    });
  }

}
