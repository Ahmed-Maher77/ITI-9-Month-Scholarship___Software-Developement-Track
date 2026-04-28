interface ICard {
    id: number;
    value: string;
    isFlipped: boolean;
    isMatched: boolean;
    isActive: boolean;
    flip(): void;
}

export default ICard