import { Card } from './card';

export class Deck {

  static readonly ranksCount = 13;

  cardIndexes: number[] = [];

  private length: number = 0;

  constructor() {
    this.setDeckLength();
    this.reset();
  }

  static createCardByDeckIndex(deckIndex: number): Card {
    return new Card({
      rank: deckIndex % Deck.ranksCount,
      suit: Math.floor(deckIndex / Deck.ranksCount),
    });
  }

  static getRandomIndex(length: number, excludedIndexes?: number[]) {
    let index = Math.floor(Math.random() * length);

    if (excludedIndexes) {
      while (excludedIndexes.includes(index)) {
        index = Math.floor(Math.random() * length);
      }
    }

    return index;
  }

  getNextCards(count: number, excludedCards?: Card[]): Card[] {
    // if (this.hasEnoughCards(count)) {
    //   return;
    // }

    let excludedIndexes: number[];

    if (excludedCards) {
      excludedIndexes = excludedCards.map(card => this.getIndexByCard(card));
    }

    return Array.from(Array(count))
      .map(() => Deck.createCardByDeckIndex(this.getNextCardIndex(excludedIndexes)));
  }

  hasEnoughCards(count: number): boolean {
    return count <= this.cardIndexes.length;
  }

  reset() {
    this.cardIndexes = Array.from(Array(this.length).keys());
  }

  removeCards(cards: Card[]) {
    cards.forEach((card: Card) => this.removeCard(card));
  }

  removeCard(card: Card) {
    // TODO: implement method
  }

  private setDeckLength() {
    this.length = Deck.ranksCount * Card.suitsCount;
  }

  private getNextCardIndex(excludedIndexes?: number[]): number {
    const randomIndex = Deck.getRandomIndex(this.cardIndexes.length, excludedIndexes);

    return this.cardIndexes.splice(randomIndex, 1)[0];
  }

  private getIndexByCard(card: Card): number {
    return card.rank + card.suit * Deck.ranksCount;
  }

}
