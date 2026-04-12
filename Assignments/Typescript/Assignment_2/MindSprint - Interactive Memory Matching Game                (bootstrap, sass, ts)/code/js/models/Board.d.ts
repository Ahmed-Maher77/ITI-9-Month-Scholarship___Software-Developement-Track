import Card from "./Card.js";
import IBoard from "../interfaces/IBoard.js";
declare class Board implements IBoard {
    cards: Card[];
    constructor(values: string[]);
    shuffle(): Card[];
    reset(): void;
    createCards(values: string[]): Card[];
}
export default Board;
//# sourceMappingURL=Board.d.ts.map