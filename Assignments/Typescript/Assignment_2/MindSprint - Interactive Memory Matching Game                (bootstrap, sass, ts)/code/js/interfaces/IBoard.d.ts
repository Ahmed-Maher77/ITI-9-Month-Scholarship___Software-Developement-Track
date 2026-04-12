import Card from "../models/Card.js";
interface IBoard {
    cards: Card[];
    shuffle(): Card[];
    reset(): void;
    createCards(values: string[]): Card[];
}
export default IBoard;
//# sourceMappingURL=IBoard.d.ts.map