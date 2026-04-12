import Card from "./Card.js";
class Board {
    cards;
    // Creates a board by generating all card pairs from the provided values.
    constructor(values) {
        this.cards = this.createCards(values);
    }
    // Randomizes card order in place and returns the shuffled array.
    shuffle() {
        const sortedCards = this.cards.sort(() => Math.random() - 0.5);
        return sortedCards;
    }
    // Restores board state for a new round.
    reset() { } // width: 2%
    // Creates duplicated cards (pairs) for each provided value.
    createCards(values) {
        const cards = [];
        let id = 1;
        for (const value of values) {
            cards.push(new Card(id++, value));
            cards.push(new Card(id++, value));
        }
        return cards;
    }
}
export default Board;
//# sourceMappingURL=Board.js.map