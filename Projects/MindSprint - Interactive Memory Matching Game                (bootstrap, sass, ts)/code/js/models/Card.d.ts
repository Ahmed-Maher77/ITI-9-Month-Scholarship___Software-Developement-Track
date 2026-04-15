import ICard from "../interfaces/ICard.js";
declare class Card implements ICard {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
    isActive: boolean;
    constructor(id: number, value: string);
    flip(): void;
}
export default Card;
//# sourceMappingURL=Card.d.ts.map